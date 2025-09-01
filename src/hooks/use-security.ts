'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const DEVTOOLS_CHECK_INTERVAL = 1000; // 1 second

export function useSecurity() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let devtoolsCheckInterval: NodeJS.Timeout | null = null;

    const redirectToHome = () => {
      // Only redirect if not already on the homepage
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
        redirectToHome();
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
         redirectToHome();
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

    // --- Event Listeners ---
    const handleKeyDown = (event: KeyboardEvent) => {
      // Block common devtools shortcuts
      if (
        (event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(event.key.toUpperCase())) || // Ctrl+Shift+I/J/C
        (event.key === 'F12') // F12
      ) {
        event.preventDefault();
        redirectToHome();
      }
    };
    
    // Prevent right-clicking to open context menu
    const handleContextMenu = (event: MouseEvent) => {
        event.preventDefault();
    };

    // Start checks when component mounts
    startDevToolsCheck();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);


    // Cleanup on component unmount
    return () => {
      stopDevToolsCheck();
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [router, pathname]);
}
