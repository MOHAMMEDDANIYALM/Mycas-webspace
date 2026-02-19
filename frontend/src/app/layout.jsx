import 'app/globals.css';
import { Toaster } from 'react-hot-toast';
import QueryProvider from 'providers/QueryProvider';
import { AuthProvider } from 'providers/AuthProvider';

export const metadata = {
  title: 'CollegeHub',
  description: 'Role-based college management portal'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
