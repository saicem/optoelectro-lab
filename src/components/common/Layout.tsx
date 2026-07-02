import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-3">
      <div className="w-10 h-10 border-[3px] border-laser-cyan/20 border-t-laser-cyan rounded-full animate-spin" />
      <span className="text-xs text-lab-muted/60 font-medium tracking-wider">加载中...</span>
    </div>
  );
}

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-lab-bg text-lab-text">
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      <Navbar />
      <main className="md:ml-56 pt-14 md:pt-0 pb-12 min-h-screen md:w-[calc(100%-14rem)] w-full">
        <div className="md:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
