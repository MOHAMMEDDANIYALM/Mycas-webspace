import 'app/globals.css';
import { Toaster } from 'react-hot-toast';
import QueryProvider from 'providers/QueryProvider';
import { AuthProvider } from 'providers/AuthProvider';

export const metadata = {
  title: 'MYCAS Institute - College Portal',
  description: 'Role-based college management portal for MYCAS Institute'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white">
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
