import { useState, useEffect, useCallback } from 'react';

interface UseCarouselProps<T> {
  items: T[];
  visibleCount: number;
  autoPlayInterval?: number;
}

export function useCarousel<T>({ items, visibleCount, autoPlayInterval = 5000 }: UseCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  }, [items.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  }, [items.length]);

  const getVisibleItems = useCallback(() => {
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % items.length;
      result.push(items[index]);
    }
    return result;
  }, [currentIndex, items, visibleCount]);

  useEffect(() => {
    if (autoPlayInterval > 0) {
      const timer = setInterval(next, autoPlayInterval);
      return () => clearInterval(timer);
    }
  }, [next, autoPlayInterval]);

  return {
    currentIndex,
    next,
    prev,
    getVisibleItems
  };
}