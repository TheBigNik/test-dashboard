import './globals.css';
import { Inter } from 'next/font/google';
import StoreProvider from '../StoreProvider';
import { ThemeProvider } from '../ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
              <nav className="border-b bg-card border-border p-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                  <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400">
                    AnalyticsDash
                  </span>
                  <div className="flex items-center gap-6">
                    <a href="/products" className="text-sm font-medium">Products</a>
                    <ThemeToggle />
                  </div>
                </div>
              </nav>
              {children}
            </div>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}