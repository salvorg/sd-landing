"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Регистрируем плагин
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
    const containerRef = useRef(null);
    const bgRef = useRef(null);

    useGSAP(() => {
        // 1. Интро-анимация (появление при загрузке)
        const intro = gsap.from(".hero-line", {
            y: "120%",
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
        });

        // 2. Создаем таймлайн для скролла с закреплением (Pin)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",      // Начинаем, когда секция прилипла к верху
                end: "+=2000",         // Длительность "заморозки" экрана в пикселях
                scrub: 1,              // Плавность движения за колесиком
                pin: true,             // ЗАМОРАЖИВАЕМ экран
                anticipatePin: 1,      // Помогает избежать микро-прыжков при фиксации
            }
        });

        // Добавляем анимацию улета текста вправо в таймлайн
        tl.fromTo(".hero-line",
            { x: 0 },
            {
                x: (i) => (i + 1) * 800, // Каждая строка летит со своей скоростью
                opacity: 0,
                stagger: 0.05,
                ease: "power1.inOut"
            }
        );

        // Параллакс фона внутри того же таймлайна
        tl.to(bgRef.current, {
            scale: 2,
            opacity: 0,
            x: 200,
        }, 0); // "0" означает, что анимация начнется одновременно с текстом

        // 3. Интерактив за мышкой (оставляем как есть, он будет работать и при пине)
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 40;
            const yPos = (clientY / window.innerHeight - 0.5) * 40;

            gsap.to(".hero-content", {
                x: xPos,
                y: yPos,
                duration: 1.5,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-12 bg-zinc-950 text-white overflow-hidden py-20">

            {/* Группируем контент для параллакса за мышкой */}
            <div className="hero-content w-full max-w-[1400px] mx-auto z-10">
                <h1 className="font-bold leading-[0.85] tracking-tighter uppercase">
                    <div className="overflow-hidden mb-2">
                        <span className="hero-line block text-[15vw] lg:text-[10vw] xl:text-[160px]">
                            Digital
                        </span>
                    </div>
                    <div className="overflow-hidden mb-2">
                        <span className="hero-line block text-[10.5vw] lg:text-[9vw] xl:text-[120px]">
                            Transformation
                        </span>
                    </div>
                    <div className="overflow-hidden">
                        <span className="hero-line block text-[13vw] lg:text-[10vw] xl:text-[160px] text-blue-500 italic">
                            Sanarip 2026
                        </span>
                    </div>
                </h1>

                <div className="mt-10 md:mt-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <p className="max-w-[300px] md:max-w-lg text-zinc-400 text-base md:text-xl font-light border-l-2 border-blue-500 pl-6 leading-tight">
                        Мы переосмысливаем цифровое будущее Кыргызстана через инновации и технологии.
                    </p>
                    <div className="text-zinc-600 text-[10px] uppercase tracking-[0.5em] hidden lg:block font-mono">
                        [ Perspective / Shift ] <br /> 42.87° N, 74.59° E
                    </div>
                </div>
            </div>

            {/* Оживляем фон: теперь это анимированный шар */}
            <div
                ref={bgRef}
                className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[70vw] h-[70vw] bg-blue-600/20 blur-[120px] rounded-full z-0 pointer-events-none"
            />

            {/* Дополнительный слой для глубины */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
        </section>
    );
}