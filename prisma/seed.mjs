import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.resolve(__dirname, '../dev.db')
// Ensure windows path formatting if needed, but file: protocol usually handles forward slashes.
// path.resolve returns backslashes on windows. file: expects forward slashes or URI encoded.
// Better: just use process.env.DATABASE_URL since we set it in .env to file:./dev.db which worked for migration.

// If .env is loaded, DATABASE_URL should be set.
// If not, we fallback.

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL || 'file:./dev.db',
        },
    },
})

async function main() {
    const admin = await prisma.user.upsert({
        where: { email: 'admin@nucleus.com' },
        update: {},
        create: {
            email: 'admin@nucleus.com',
            name: 'Super Admin',
            password: 'password123',
            role: 'SUPER_ADMIN',
            department: 'Administration',
        },
    })
    console.log({ admin })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
