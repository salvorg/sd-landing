"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LazySectionProps {
    children: React.ReactNode;
    minHeight?: string | number;
    offset?: string; // Margin for IntersectionObserver
    className?: string; // дополнительные классы (например, responsive min-h)
}

/**
 * LazySection component unmounts its children when they are out of the viewport
 * to optimize performance and reduce GPU/Memory usage.
 */
export default function LazySection({
    children,
    minHeight = "100vh",
    offset = "600px",
    className
}: LazySectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    
    // We use a generous margin to mount/unmount sections slightly before they enter/leave the screen
    // to minimize visible "pop-in" effects.
    const isInView = useInView(ref, { 
        margin: `${offset} 0px ${offset} 0px` as any,
        once: true // Keep mounted once it enters viewport to prevent height jumps
    });

    // We keep track of whether the section has ever been loaded to potentially handle
    // initial loading states differently if needed.
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (isInView) {
            setMounted(true);
            
            // When a new section is mounted, we must refresh ScrollTrigger
            // because the DOM changes and scroll offsets might need recalculation.
            const timer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 50); // Small delay to let the component render
            
            return () => clearTimeout(timer);
        } else {
            // Optional: we can add a small delay before unmounting to avoid flickering on fast scrolling
            setMounted(false);
        }
    }, [isInView]);

    // Если передан className с min-h-* — используем его, иначе inline minHeight
    const hasClassMinHeight = className?.includes('min-h-');
    const style: React.CSSProperties = { width: '100%' };
    if (!hasClassMinHeight) {
        style.minHeight = typeof minHeight === 'number' ? `${minHeight}px` : minHeight;
    }

    return (
        <div
            ref={ref}
            className={`lazy-section-wrapper h-auto${className ? ` ${className}` : ''}`}
            style={style}
        >
            {mounted ? children : null}
        </div>
    );
}
