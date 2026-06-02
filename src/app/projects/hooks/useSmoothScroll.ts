import { useEffect } from 'react';

/**
 * Custom hook for smooth inertial scrolling.
 */
export const useSmoothScroll = () => {
    useEffect(() => {
        let currentY = window.scrollY;
        let targetY = window.scrollY;

        // Settings for "inertia"
        const scrollSlowdown = 1;
        const maxDelta = 180;
        const lerpFactor = 0.12;

        // Global function to update scroll target (e.g. for link navigation)
        (window as any)._updateScrollTarget = (newY: number) => {
            targetY = newY;
            currentY = newY;
            window.scrollTo(0, newY);
        };

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();

            // Limit "swipe strength"
            const clampedDelta = Math.max(-maxDelta, Math.min(maxDelta, e.deltaY));

            // Accumulate target
            targetY += clampedDelta * scrollSlowdown;

            // Bounds
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            targetY = Math.max(0, Math.min(targetY, maxScroll));
        };

        const smoothScrollLoop = () => {
            // If scroll was changed externally
            if (Math.abs(window.scrollY - currentY) > 5) {
                currentY = window.scrollY;
                targetY = window.scrollY;
            }

            // Smooth approximation
            currentY += (targetY - currentY) * lerpFactor;

            // Apply
            if (Math.abs(targetY - currentY) > 0.5) {
                window.scrollTo({
                    top: currentY,
                    behavior: 'auto'
                });
            } else {
                currentY = targetY;
            }

            requestAnimationFrame(smoothScrollLoop);
        };

        document.addEventListener('wheel', handleWheel, { passive: false, capture: true });
        const scrollMotorId = requestAnimationFrame(smoothScrollLoop);

        return () => {
            document.removeEventListener('wheel', handleWheel, { capture: true });
            cancelAnimationFrame(scrollMotorId);
        };
    }, []);
};
