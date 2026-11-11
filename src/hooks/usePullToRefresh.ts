import { useEffect, useState, useRef, useCallback } from 'react';

interface UsePullToRefreshOptions {
  onRefresh?: () => Promise<void> | void;
  pullThreshold?: number; // Distance in px needed to trigger refresh (default 65)
  maxPullDistance?: number; // Maximum indicator displacement (default 90)
  resistance?: number; // Damping factor (default 0.4)
  disabled?: boolean;
}

export function usePullToRefresh({
  onRefresh,
  pullThreshold = 65,
  maxPullDistance = 90,
  resistance = 0.4,
  disabled = false,
}: UsePullToRefreshOptions = {}) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canRelease, setCanRelease] = useState(false);

  const startYRef = useRef(0);
  const startXRef = useRef(0);
  const isEligibleRef = useRef(false);
  const isRefreshingRef = useRef(false);
  const hasVibratedRef = useRef(false);

  // Helper to find if touch started on an element that is already scrolled down
  const isAtScrollTop = useCallback((target: EventTarget | null): boolean => {
    if (!target || !(target instanceof HTMLElement)) return true;

    let el: HTMLElement | null = target;
    while (el && el !== document.body && el !== document.documentElement) {
      // If any scrollable ancestor has scrollTop > 2, do NOT activate pull-to-refresh
      if (el.scrollHeight > el.clientHeight) {
        const overflowY = window.getComputedStyle(el).overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollTop > 2) {
          return false;
        }
      }
      el = el.parentElement;
    }

    return window.scrollY <= 2;
  }, []);

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;

    const handleTouchStart = (e: TouchEvent) => {
      if (isRefreshingRef.current) return;
      if (e.touches.length !== 1) return;

      const touch = e.touches[0];
      startYRef.current = touch.clientY;
      startXRef.current = touch.clientX;
      hasVibratedRef.current = false;

      // Only eligible if user starts touch at the very top of the scroll container
      isEligibleRef.current = isAtScrollTop(e.target);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isEligibleRef.current || isRefreshingRef.current) return;
      if (e.touches.length !== 1) return;

      const touch = e.touches[0];
      const diffY = touch.clientY - startYRef.current;
      const diffX = touch.clientX - startXRef.current;

      // If dragging upward, immediately disqualify and let native scrolling work
      if (diffY <= 0) {
        isEligibleRef.current = false;
        if (isPulling) {
          setIsPulling(false);
          setPullDistance(0);
        }
        return;
      }

      // If user is swiping horizontally more than vertically, do not hijack
      if (Math.abs(diffX) > Math.abs(diffY)) {
        isEligibleRef.current = false;
        return;
      }

      // Double check that container hasn't scrolled down
      if (!isAtScrollTop(e.target)) {
        isEligibleRef.current = false;
        setIsPulling(false);
        setPullDistance(0);
        return;
      }

      // Compute damped pull distance
      const distance = Math.min(diffY * resistance, maxPullDistance);

      if (distance > 5) {
        setIsPulling(true);
        setPullDistance(distance);
        const reachedThreshold = distance >= pullThreshold;
        setCanRelease(reachedThreshold);

        // Haptic feedback once when threshold is reached
        if (reachedThreshold && !hasVibratedRef.current) {
          hasVibratedRef.current = true;
          try {
            if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
              navigator.vibrate(15);
            }
          } catch {}
        }

        // Prevent pull-to-refresh from triggering browser default page pull on Android Chrome
        if (e.cancelable && distance > 15) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = async () => {
      if (!isEligibleRef.current) return;
      isEligibleRef.current = false;

      if (pullDistance >= pullThreshold && !isRefreshingRef.current) {
        isRefreshingRef.current = true;
        setIsRefreshing(true);
        setPullDistance(50); // Keep indicator visible while refreshing

        try {
          if (onRefresh) {
            await onRefresh();
          } else {
            // Default action: smooth page reload
            await new Promise((resolve) => setTimeout(resolve, 350));
            window.location.reload();
          }
        } finally {
          setIsRefreshing(false);
          isRefreshingRef.current = false;
          setIsPulling(false);
          setPullDistance(0);
          setCanRelease(false);
        }
      } else {
        // Did not reach threshold - animate back to top
        setIsPulling(false);
        setPullDistance(0);
        setCanRelease(false);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [disabled, isAtScrollTop, onRefresh, pullThreshold, maxPullDistance, resistance, pullDistance]);

  return {
    pullDistance,
    isPulling,
    isRefreshing,
    canRelease,
  };
}
