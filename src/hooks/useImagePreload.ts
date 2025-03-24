import { useEffect, useState, useCallback, useRef } from 'react';

export function useImagePreload(imageUrls: string[]) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const loadedImagesRef = useRef<Set<string>>(new Set());

  const loadImage = useCallback((url: string): Promise<void> => {
    return new Promise((resolve) => {
      if (loadedImagesRef.current.has(url)) {
        resolve();
        return;
      }

      const img = new Image();
      
      const handleLoad = () => {
        loadedImagesRef.current.add(url);
        setLoadedCount(prev => prev + 1);
        resolve();
      };

      const handleError = () => {
        console.warn(`Failed to load image: ${url}`);
        loadedImagesRef.current.add(url);
        setLoadedCount(prev => prev + 1);
        resolve();
      };

      img.addEventListener('load', handleLoad, { once: true });
      img.addEventListener('error', handleError, { once: true });
      
      if (img.complete) {
        handleLoad();
      } else {
        img.src = url;
      }
    });
  }, []);

  useEffect(() => {
    if (!imageUrls.length) {
      setImagesLoaded(true);
      return;
    }

    let mounted = true;

    Promise.all(imageUrls.map(loadImage))
      .then(() => {
        if (mounted) {
          setImagesLoaded(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, [imageUrls, loadImage]); // Added proper dependencies

  const progress = imageUrls.length > 0 ? (loadedCount / imageUrls.length) * 100 : 100;

  return {
    isLoaded: imagesLoaded,
    progress
  };
}