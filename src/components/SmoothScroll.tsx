"use client";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.08,        // Чуть быстрее реакция (0.05 иногда слишком "вязкий")
                duration: 1.2,
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 1.5,
                prevent: (node) => node.classList.contains('preloader-container'), // Важно!
            }}
        >
            {children}
        </ReactLenis>
    );
}