"use client";
import React, { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedMap from "@/components/AnimatedMap";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const stats = [
    {
        value: 150,
        suffix: "+",
        label: "Создано обучающих роликов и профессионального видеоконтента.",
        gradient: "from-[#FF4A48] to-[#FF4A48]"
    },
    {
        value: 40,
        suffix: "K+",
        label: "Учителей и специалистов прошли обучение на наших платформах.",
        gradient: "from-[#0068E0] to-[#8059E1]"
    },
    {
        value: 6,
        suffix: "+",
        label: "Лет успешного опыта работы с международными донорами и госсектором.",
        gradient: "from-[#0068E0] to-[#0068E0]"
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
            className="relative min-h-screen w-full flex items-center bg-[var(--bg-main)] overflow-hidden"
        >
            {/* Единственная карта — без дублирования */}
            <AnimatedMap />

            {/* Фоновые glow-эффекты */}
            <div className="absolute inset-0 z-5 pointer-events-none flex justify-around items-center opacity-30">
                {stats.map((_, i) => (
                    <div key={i} className="w-[30vw] h-[30vw] rounded-full bg-blue-500/10 blur-[120px]" />
                ))}
            </div>

            {/* Контент */}
            <div
                ref={contentRef}
                className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 pointer-events-none"
            >
                <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-12">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col group min-w-[280px] pointer-events-auto">
                            <div className={`text-[12vw] font-black leading-[0.8] bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent flex items-baseline mb-6 select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]`}>
                                <span className="stat-number" data-target={stat.value}>{stat.value}</span>
                                <span className="text-[0.6em]">{stat.suffix}</span>
                            </div>
                            <div className="w-12 h-[2px] mb-6 bg-[var(--text-muted)] opacity-30 group-hover:w-full transition-all duration-700" />
                            <p className="text-[12px] min-h-[90px] px-4 py-2 text-zinc-600 font-bold uppercase tracking-wider max-w-[260px] bg-zinc-100/90">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
