"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function IntegratedHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const columns = gsap.utils.toArray<HTMLElement>(".reveal-col");

        // Главный таймлайн для всей сцены
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=400%", // Увеличили путь, так как сцен стало больше
                pin: true,
                scrub: 1.5,
                anticipatePin: 1,
            }
        });

        // --- ЭТАП 1: Уход Hero ---
        tl.to(".hero-line", {
            x: (i) => (i + 1) * 600,
            opacity: 0,
            stagger: 0.05,
            ease: "power1.inOut"
        }, 0);

        tl.to(bgRef.current, {
            scale: 2,
            opacity: 0,
            x: 200,
        }, 0);

        // --- ЭТАП 2: Появление колонок СНИЗУ (Заход секции) ---
        // Колонки теперь черные (#050505), чтобы сливаться с контентом
        tl.fromTo(columns,
            { yPercent: 100 },
            {
                yPercent: 0,
                stagger: { amount: 0.6, from: "random" },
                ease: "power2.out"
            },
            "-=0.2" // Начинаем чуть раньше, чем Hero до конца улетит
        );

        // Появление текста "Generated Future"
        tl.from(".reveal-content", {
            y: 100,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
        }, "-=0.4");

        // --- ЭТАП 3: Пауза (Держим контент на экране) ---
        tl.to({}, { duration: 1 }); // Пустая анимация для задержки внимания

        // --- ЭТАП 4: Уход колонок ВВЕРХ (Выход из секции) ---
        tl.to(columns, {
            yPercent: -100,
            stagger: { amount: 0.6, from: "random" },
            ease: "power2.inIn"
        });

        tl.to(".reveal-content", {
            opacity: 0,
            y: -50,
            duration: 0.4
        }, "<"); // Начинаем одновременно с уходом колонок


        // Интерактив за мышкой для первой секции
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 30;
            const yPos = (clientY / window.innerHeight - 0.5) * 30;
            gsap.to(".hero-content", { x: xPos, y: yPos, duration: 1.5, ease: "power2.out" });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-zinc-950 overflow-hidden">
            {/* СЕКЦИЯ 1: HERO */}
            <section className="relative h-screen w-full flex flex-col justify-center px-4 md:px-12 overflow-hidden">
                <div className="hero-content w-full max-w-[1400px] mx-auto z-10">
                    <h1 className="font-bold leading-[0.85] tracking-tighter uppercase text-white">
                        <div className="overflow-hidden mb-2">
                            <span className="hero-line block text-[15vw] lg:text-[160px]">Digital</span>
                        </div>
                        <div className="overflow-hidden mb-2">
                            <span className="hero-line block text-[10.5vw] lg:text-[120px]">Transformation</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="hero-line block text-[13vw] lg:text-[160px] text-blue-500 italic">Sanarip 2026</span>
                        </div>
                    </h1>
                </div>
                <div ref={bgRef} className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[70vw] h-[70vw] bg-blue-600/20 blur-[120px] rounded-full z-0" />
            </section>

            {/* СЛОЙ КОЛОНОК (Транспорт для контента) */}
            <div className="absolute inset-0 flex pointer-events-none z-20">
                {[...Array(7)].map((_, i) => (
                    <div
                        key={i}
                        className="reveal-col flex-1 bg-[#050505] h-full"
                        // Убрали border-r для эффекта литой стены
                    />
                ))}
            </div>

            {/* СЕКЦИЯ 2: GENERATED FUTURE (Лежит поверх всего в центре) */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <div className="reveal-content max-w-4xl text-white px-8 text-center">
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
                        The Future <br /> <span className="text-blue-600 underline">Generated</span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
                        Our infrastructure is built for the next generation of AI,
                        providing unprecedented scale and performance.
                    </p>
                </div>
            </div>
        </div>
    );
}