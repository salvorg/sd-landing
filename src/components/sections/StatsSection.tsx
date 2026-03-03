"use client";
import React, { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const stats = [
    {
        value: 6,
        suffix: "+",
        label: "Лет успешного опыта работы с международными донорами и госсектором.",
        gradient: "from-blue-600 to-blue-400"
    },
    {
        value: 150,
        suffix: "+",
        label: "Создано обучающих роликов и профессионального видеоконтента.",
        gradient: "from-indigo-600 to-purple-500"
    },
    {
        value: 40,
        suffix: "K+",
        label: "Учителей и специалистов прошли обучение на наших платформах.",
        gradient: "from-purple-600 to-pink-500"
    }
];

export default function StatsSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const numbers = containerRef.current?.querySelectorAll(".stat-number");
        numbers?.forEach((num) => {
            const target = parseInt(num.getAttribute("data-target") || "0");
            gsap.fromTo(num,
                { innerText: 0 },
                {
                    innerText: target,
                    duration: 1.5,
                    snap: { innerText: 1 },
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: num,
                        start: "top 95%",
                    }
                }
            );
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="pt-32 pb-18 bg-[var(--bg-main)] border-t border-[var(--border-subtle)] overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-12 md:gap-12">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col group min-w-[200px]">
                            {/* Контент карточки */}
                            <div className={`text-[12vw] md:text-[10rem] font-black tracking-[-0.07em] leading-[0.8] bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent flex items-baseline mb-6`}>
                                <span className="stat-number" data-target={stat.value}>0</span>
                                <span className="text-[0.6em] tracking-tighter">{stat.suffix}</span>
                            </div>

                            <div className="w-12 h-[2px] mb-6 bg-gradient-to-r from-[var(--text-muted)] to-transparent opacity-30 group-hover:w-full transition-all duration-700" />

                            <p className="text-[11px] md:text-[10px] text-[var(--text-muted)] leading-[1.4] uppercase tracking-wider font-bold max-w-[260px] opacity-80">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}