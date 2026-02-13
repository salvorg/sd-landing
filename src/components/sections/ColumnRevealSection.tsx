"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ColumnRevealSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !triggerRef.current) return;

        const columns = gsap.utils.toArray<HTMLElement>(".reveal-col");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "+=200%", // Длительность анимации
                pin: true,     // Фиксируем секцию
                scrub: 1,      // Плавная привязка к скроллу
            }
        });

        // Анимируем каждую колонку с разной задержкой или скоростью
        tl.to(columns, {
            yPercent: -100, // Уводим колонки вверх, открывая контент под ними
            stagger: {
                amount: 0.5,
                from: "random" // Или "start", чтобы шли по порядку
            },
            ease: "power2.inOut"
        });

        // Параллельно анимируем появление текста
        tl.from(".reveal-text", {
            y: 100,
            opacity: 0,
            duration: 0.5,
            stagger: 0.2
        }, "-=0.5");

    }, { scope: triggerRef });

    return (
        <div ref={triggerRef} className="relative h-screen w-full overflow-hidden bg-white">

            {/* НИЖНИЙ СЛОЙ (Контент, который открывается) */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#050505] text-white p-20">
                <div className="max-w-4xl">
                    <h2 className="reveal-text text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
                        The Future <br /> <span className="text-blue-600">Generated</span>
                    </h2>
                    <p className="reveal-text text-xl text-zinc-400 max-w-xl font-light">
                        Our infrastructure is built for the next generation of AI,
                        providing unprecedented scale and performance.
                    </p>
                </div>
            </div>

            {/* ВЕРХНИЙ СЛОЙ (Колонки, которые уезжают) */}
            <div ref={containerRef} className="absolute inset-0 flex pointer-events-none z-20">
                {[...Array(7)].map((_, i) => (
                    <div
                        key={i}
                        className="reveal-col flex-1 bg-white border-r border-zinc-100 last:border-r-0 h-full"
                        style={{
                            // Можно добавить небольшое смещение по высоте изначально для разной скорости
                            transform: `translateY(0%)`
                        }}
                    />
                ))}
            </div>
        </div>
    );
}