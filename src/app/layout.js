import './globals.css';

export const metadata = {
  title: 'Nucleus AI | HRMS',
  description: 'AI-Powered Human Resource Management System',
};

import { Providers } from '../components/Providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
