import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export const Layout = ({ children, showSidebar = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <Header />
      <div className="flex-grow flex pt-28">
        {showSidebar && (
          <div className="w-64 flex-shrink-0 border-r border-gray-200 bg-white min-h-[calc(100vh-112px)]">
            <Sidebar />
          </div>
        )}
        <main className="flex-grow px-6 py-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
};
