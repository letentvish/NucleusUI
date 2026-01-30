import { NextResponse } from 'next/server';
import { Agent } from '@/lib/ai/agent';

/**
 * Layer 1: Reception Layer (API)
 * Delegates to the Agent Layer
 */
export async function POST(req) {
    try {
        const body = await req.json();
        const { message, userId } = body;

        // Instantiate Agent (Layer 2)
        const agent = new Agent(userId || 'guest');

        // Process via Agent
        const result = await agent.process(message);

        // Simulate think time for realism
        await new Promise(r => setTimeout(r, 600));

        return NextResponse.json(result);
    } catch (error) {
        console.error('AI Agent Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
