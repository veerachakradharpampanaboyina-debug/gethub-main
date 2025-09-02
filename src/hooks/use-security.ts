
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const DEVTOOLS_CHECK_INTERVAL = 1000; // 1 second

export function useSecurity() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let devtoolsCheckInterval: NodeJS.Timeout | null = null;

    const handleDetection = () => {
       // Only redirect if devtools are detected and we are NOT on the homepage.
      if (pathname !== '/') {
        router.replace('/');
      }
    };

    // --- DevTools Detection ---
    const checkDevTools = () => {
      // 1. Check window dimensions
      if (
        window.outerWidth - window.innerWidth > 160 ||
        window.outerHeight - window.innerHeight > 160
      ) {
        handleDetection();
        return;
      }

      // 2. Check for attached debugger (works in most browsers)
      let isDevToolsOpen = false;
      const devtools = /./;
      devtools.toString = function () {
        isDevToolsOpen = true;
        return '';
      };
      // This triggers the toString method if devtools is open
      console.log('%c', devtools); 
      
      if(isDevToolsOpen) {
         handleDetection();
      }
    };
    
    const startDevToolsCheck = () => {
        if (!devtoolsCheckInterval) {
            devtoolsCheckInterval = setInterval(checkDevTools, DEVTOOLS_CHECK_INTERVAL);
        }
    };

    const stopDevToolsCheck = () => {
        if (devtoolsCheckInterval) {
            clearInterval(devtoolsCheckInterval);
            devtoolsCheckInterval = null;
        }
    };

    // Start checks when component mounts
    startDevToolsCheck();

    // Cleanup on component unmount
    return () => {
      stopDevToolsCheck();
    };
  }, [router, pathname]);
}
