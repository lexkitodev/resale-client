import { ReactNode, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export const Layout = ({ children, showSidebar = true }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      {/* Fixed Header */}
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content Area */}
      <div className="flex-1 flex mt-[112px] mb-auto">
        {/* Sidebar - Desktop */}
        {showSidebar && (
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-[112px] overflow-y-auto">
              <Sidebar />
            </div>
          </div>
        )}

        {/* Sidebar - Mobile */}
        {showSidebar && isSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 z-50">
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 py-8">{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
