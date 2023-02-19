import { useState } from "react";

export const useTouchControls = (onMove: (direction: [number, number]) => void) => {
  const [touchStart, setTouchStart] = useState<[number, number] | null>(null);

  const handleTouchStart = (event: React.TouchEvent) => {
    setTouchStart([event.touches[0].clientX, event.touches[0].clientY]);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const touchEnd = [event.touches[0].clientX, event.touches[0].clientY];

    if (!touchStart) return;

    const deltaX = touchEnd[0] - touchStart[0];
    const deltaY = touchEnd[1] - touchStart[1];

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // horizontal swipe
      if (deltaX > 0) {
        // swipe right
        onMove([0, 1]);
      } else {
        // swipe left
        onMove([0, -1]);
      }
    } else {
      // vertical swipe
      if (deltaY > 0) {
        // swipe down
        onMove([1, 0]);
      } else {
        // swipe up
        onMove([-1, 0]);
      }
    }

    setTouchStart(null);
  };

  return { handleTouchMove, handleTouchStart }
};
