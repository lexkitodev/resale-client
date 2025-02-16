import { ReactNode, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export const Layout = ({ children, showSidebar = false }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <Header onMenuClick={toggleSidebar} />
      <div className="flex-grow flex pt-28">
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        {showSidebar && (
          <div
            className={`
              fixed lg:static top-[7rem] lg:top-0 bottom-0 left-0 z-50 lg:z-0 w-64 
              transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
              lg:translate-x-0 transition-transform duration-200 ease-in-out
              bg-white border-r border-gray-200 overflow-y-auto
              lg:min-h-[calc(100vh-112px)]
            `}
          >
            <div className="h-full">
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main content */}
        <main
          className={`
          flex-grow px-4 sm:px-6 py-4 
          ${showSidebar ? 'lg:pl-4' : ''} 
          transition-all duration-200 ease-in-out
        `}
        >
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
