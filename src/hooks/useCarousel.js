import { useState, useCallback, useEffect } from "react";

export const useCarousel = (totalItems, autoPlay = false, autoPlayDelay = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalItems - 1 ? 0 : prevIndex + 1
    );
  }, [totalItems]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalItems - 1 : prevIndex - 1
    );
  }, [totalItems]);

  const goToIndex = useCallback((index) => {
    if (index >= 0 && index < totalItems) {
      setCurrentIndex(index);
    }
  }, [totalItems]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || totalItems <= 1) return;

    const interval = setInterval(goToNext, autoPlayDelay);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayDelay, goToNext, totalItems]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          event.preventDefault();
          goToNext();
          break;
        case "Home":
          event.preventDefault();
          goToIndex(0);
          break;
        case "End":
          event.preventDefault();
          goToIndex(totalItems - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious, goToIndex, totalItems]);

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    goToIndex,
    totalItems,
    isFirst: currentIndex === 0,
    isLast: currentIndex === totalItems - 1,
  };
};