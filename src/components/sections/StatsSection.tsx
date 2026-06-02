"use client";
import { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedMap from "@/components/AnimatedMap";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const stats = [
    {
        value: 6,
        suffix: "+",
        label: "Успешного опыта работы с международными донорами (USAID, WB, GIZ) и госсектором."
    },
    {
        value: 150,
        suffix: "+",
        label: "Создано обучающих роликов, документальных фильмов и анимации."
    },
    {
        value: 40,
        suffix: "K+",
        label: "Учителей и госслужащих прошли обучение на наших платформах."
    }
];

export default function StatsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Параллакс контента при движении мыши
    useGSAP(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!contentRef.current) return;
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            gsap.to(contentRef.current, { x: moveX, y: moveY, duration: 1, ease: "power2.out" });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, { scope: containerRef });

    // Анимация счётчиков
    useGSAP(() => {
        const numbers = containerRef.current?.querySelectorAll(".stat-number");
        numbers?.forEach((num) => {
            const target = parseInt(num.getAttribute("data-target") || "0");
            gsap.fromTo(num, { innerText: 0 }, {
                innerText: target, duration: 2, snap: { innerText: 1 }, ease: "power2.out",
                scrollTrigger: { trigger: num, start: "top 90%" }
            });
        });
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full flex items-center md:items-end pt-24 pb-16 md:pb-24 bg-[var(--bg-main)] overflow-hidden"
        >
            {/* Карта — только на md+ */}
            <div className="hidden md:block absolute inset-0">
                <AnimatedMap />
            </div>

            <div className="absolute inset-0 z-5 pointer-events-none flex justify-around items-center opacity-30">
                {stats.map((_, i) => (
                    <div key={i} className="w-[40vw] md:w-[30vw] h-[40vw] md:h-[30vw] rounded-full bg-blue-500/10 blur-[120px]" />
                ))}
            </div>

            {/* Белый градиентный фон внизу */}
            <div
                className="absolute bottom-0 left-0 w-full h-[160px] md:h-[236px] z-[8] pointer-events-none"
                style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 66.1%)' }}
            />

            {/* Контент */}
            <div
                ref={contentRef}
                className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 pointer-events-none"
            >
                <div className="flex flex-col gap-10 sm:gap-12 md:gap-4 lg:gap-6 w-full md:flex-row justify-between items-center">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col group w-full md:flex-1 md:min-w-0 pointer-events-auto items-center">
                            <div className={`text-[clamp(4rem,16vw,10rem)] md:text-[8vw] font-black leading-[0.8] bg-gradient-to-r from-[#2365CE] to-[#D6525E] bg-clip-text text-transparent flex items-baseline mb-4 md:mb-6 select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]
                                ${idx === 0 ? 'bg-[length:300%_100%] bg-left' :
                                    idx === 1 ? 'bg-[length:300%_100%] bg-center' :
                                        'bg-[length:300%_100%] bg-right'}`}
                            >
                                <span className="stat-number" data-target={stat.value}>{stat.value}</span>
                                <span>{stat.suffix}</span>
                            </div>
                            <p className="font-normal text-sm sm:text-base md:text-lg leading-tight text-center max-w-[300px] px-2">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
