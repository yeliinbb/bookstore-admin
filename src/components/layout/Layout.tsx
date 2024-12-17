import { type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen flex flex-col overflow-auto bg-gray-900 bg-main-gradient bg-cover bg-top bg-no-repeat bg-fixed">
      <main className="flex flex-col flex-1 overflow-hidden container mx-auto px-4 py-8 max-w-[1200px]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
