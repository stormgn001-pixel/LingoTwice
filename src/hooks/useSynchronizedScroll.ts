import { useCallback, useEffect, useRef, useState } from 'react';

interface UseSynchronizedScrollOptions {
  enabled: boolean;
  onActivePassageChange?: (passageId: string) => void;
}

export function useSynchronizedScroll({
  enabled,
  onActivePassageChange,
}: UseSynchronizedScrollOptions) {
  const sourceRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  // Tracks which container is currently being driven by user interaction ('source' | 'target' | null)
  const activeScrollerRef = useRef<'source' | 'target' | null>(null);
  const scrollEndTimerRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isProgrammaticScrollRef = useRef<boolean>(false);

  const [activePassageId, setActivePassageId] = useState<string | null>(null);
  const currentPassageIdRef = useRef<string | null>(null);

  /**
   * Find the passage in container that is closest to the focal line (top 20% of container)
   */
  const getActivePassageElement = (container: HTMLElement): { element: HTMLElement; passageId: string } | null => {
    const passageElements = Array.from(
      container.querySelectorAll<HTMLElement>('[data-passage-id]')
    );

    if (passageElements.length === 0) return null;

    const containerRect = container.getBoundingClientRect();
    const focalY = containerRect.top + Math.min(120, containerRect.height * 0.2);

    let closestEl = passageElements[0];
    let minDistance = Infinity;

    for (const el of passageElements) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= focalY && rect.bottom >= focalY) {
        return {
          element: el,
          passageId: el.getAttribute('data-passage-id') || '',
        };
      }
      const dist = Math.abs(rect.top - focalY);
      if (dist < minDistance) {
        minDistance = dist;
        closestEl = el;
      }
    }

    return {
      element: closestEl,
      passageId: closestEl.getAttribute('data-passage-id') || '',
    };
  };

  /**
   * Sync peer container to align matching paragraph with driving container
   */
  const performSync = useCallback(
    (origin: 'source' | 'target') => {
      if (!enabled || isProgrammaticScrollRef.current) return;

      const fromContainer = origin === 'source' ? sourceRef.current : targetRef.current;
      const toContainer = origin === 'source' ? targetRef.current : sourceRef.current;

      if (!fromContainer || !toContainer) return;

      const active = getActivePassageElement(fromContainer);
      if (!active || !active.passageId) return;

      // Update active passage id without excessive re-renders
      if (currentPassageIdRef.current !== active.passageId) {
        currentPassageIdRef.current = active.passageId;
        setActivePassageId(active.passageId);
        if (onActivePassageChange) {
          onActivePassageChange(active.passageId);
        }
      }

      // Locate matching passage in the other container
      const matchingEl = toContainer.querySelector<HTMLElement>(
        `[data-passage-id="${active.passageId}"]`
      );

      if (!matchingEl) return;

      const fromRect = fromContainer.getBoundingClientRect();
      const toRect = toContainer.getBoundingClientRect();
      const fromElRect = active.element.getBoundingClientRect();
      const toElRect = matchingEl.getBoundingClientRect();

      // Desired distance from container top
      const relativeTopInFrom = fromElRect.top - fromRect.top;
      const currentRelativeTopInTo = toElRect.top - toRect.top;
      const delta = currentRelativeTopInTo - relativeTopInFrom;

      if (Math.abs(delta) > 1.5) {
        isProgrammaticScrollRef.current = true;
        toContainer.scrollTop += delta;

        // Reset programmatic flag on next frame
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => {
          isProgrammaticScrollRef.current = false;
        });
      }
    },
    [enabled, onActivePassageChange]
  );

  useEffect(() => {
    const sourceEl = sourceRef.current;
    const targetEl = targetRef.current;

    if (!sourceEl || !targetEl) return;

    // Detect direct user input on source container
    const markSourceActive = () => {
      activeScrollerRef.current = 'source';
      if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = window.setTimeout(() => {
        activeScrollerRef.current = null;
      }, 200);
    };

    // Detect direct user input on target container
    const markTargetActive = () => {
      activeScrollerRef.current = 'target';
      if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = window.setTimeout(() => {
        activeScrollerRef.current = null;
      }, 200);
    };

    sourceEl.addEventListener('wheel', markSourceActive, { passive: true });
    sourceEl.addEventListener('touchstart', markSourceActive, { passive: true });
    sourceEl.addEventListener('pointerdown', markSourceActive, { passive: true });

    targetEl.addEventListener('wheel', markTargetActive, { passive: true });
    targetEl.addEventListener('touchstart', markTargetActive, { passive: true });
    targetEl.addEventListener('pointerdown', markTargetActive, { passive: true });

    const handleSourceScroll = () => {
      if (isProgrammaticScrollRef.current) return;
      if (activeScrollerRef.current === 'target') return; // Target is driving, don't echo back!

      markSourceActive();
      performSync('source');
    };

    const handleTargetScroll = () => {
      if (isProgrammaticScrollRef.current) return;
      if (activeScrollerRef.current === 'source') return; // Source is driving, don't echo back!

      markTargetActive();
      performSync('target');
    };

    sourceEl.addEventListener('scroll', handleSourceScroll, { passive: true });
    targetEl.addEventListener('scroll', handleTargetScroll, { passive: true });

    return () => {
      sourceEl.removeEventListener('wheel', markSourceActive);
      sourceEl.removeEventListener('touchstart', markSourceActive);
      sourceEl.removeEventListener('pointerdown', markSourceActive);
      sourceEl.removeEventListener('scroll', handleSourceScroll);

      targetEl.removeEventListener('wheel', markTargetActive);
      targetEl.removeEventListener('touchstart', markTargetActive);
      targetEl.removeEventListener('pointerdown', markTargetActive);
      targetEl.removeEventListener('scroll', handleTargetScroll);

      if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [performSync]);

  /**
   * Jump both panels to a specific passage programmatically
   */
  const scrollToPassage = useCallback((passageId: string, smooth: boolean = true) => {
    const sourceEl = sourceRef.current;
    const targetEl = targetRef.current;

    const sourcePassage = sourceEl?.querySelector<HTMLElement>(`[data-passage-id="${passageId}"]`);
    const targetPassage = targetEl?.querySelector<HTMLElement>(`[data-passage-id="${passageId}"]`);

    isProgrammaticScrollRef.current = true;

    if (sourceEl && sourcePassage) {
      sourcePassage.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'center',
      });
    }

    if (targetEl && targetPassage) {
      targetPassage.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'center',
      });
    }

    setActivePassageId(passageId);

    setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 400);
  }, []);

  return {
    sourceRef,
    targetRef,
    activePassageId,
    scrollToPassage,
  };
}
