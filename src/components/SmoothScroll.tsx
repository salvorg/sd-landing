"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ReactLenis } from "lenis/react"; // Импортируем из нового пакета

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    // В новой версии Lenis для React 19 лучше использовать хук или правильную типизацию ref
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        // Синхронизация с тикером GSAP
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update);

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);

    return (
        <ReactLenis
            root
            ref={lenisRef}
            options={{
                lerp: 0.05,        // Меньше значение = больше плавности
                duration: 2,
                smoothWheel: true,
                wheelMultiplier: 1, // Можно ускорить/замедлить реакцию на колесико
                touchMultiplier: 2, // Чувствительность на тачскринах
            }}
        >
            {children}
        </ReactLenis>
    );
}