
'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

const DEVTOOLS_CHECK_INTERVAL = 1000; // 1 second

export function useSecurity() {
  const router = useRouter();
  const pathname = usePathname();
  const toastIdRef = useRef<string | null>(null);

  useEffect(() => {
    let devtoolsCheckInterval: NodeJS.Timeout | null = null;

    const handleDetection = () => {
      if (pathname === '/') {
        // If on homepage, show a toast message.
        // Use a ref to ensure we don't show the same toast multiple times.
        if (!toastIdRef.current) {
            const { id } = toast({
                title: "Security Alert",
                description: "Developer tools and debugging are disabled on this site.",
                variant: "destructive",
                duration: 5000,
            });
            toastIdRef.current = id;
        }
      } else {
        // If on any other page, redirect to home.
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
      } else {
         // If dev tools are closed, clear the toast ref
         toastIdRef.current = null;
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
        handleDetection();
      }
    };
    
    // Prevent right-clicking to open context menu
    const handleContextMenu = (event: MouseEvent) => {
        event.preventDefault();
        handleDetection();
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
