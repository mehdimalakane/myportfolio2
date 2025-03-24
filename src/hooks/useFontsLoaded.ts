import { useEffect, useState } from 'react';

export function useFontsLoaded() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!document.fonts) {
      // Fallback for browsers that don't support the Font Loading API
      setFontsLoaded(true);
      return;
    }

    // Wait for all fonts to load
    document.fonts.ready.then(() => {
      setFontsLoaded(true);
    }).catch((error) => {
      console.error('Font loading error:', error);
      // Still set as loaded to prevent infinite loading state
      setFontsLoaded(true);
    });

    return () => {
      // Cleanup if component unmounts during loading
      setFontsLoaded(false);
    };
  }, []);

  return fontsLoaded;
}