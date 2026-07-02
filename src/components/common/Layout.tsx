import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-lab-bg text-lab-text">
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      <Navbar />
      <main className="md:ml-56 pt-14 md:pt-0 pb-12 min-h-screen md:w-[calc(100%-14rem)] w-full">
        <div className="md:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div ref={contentRef}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
