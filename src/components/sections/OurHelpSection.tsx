"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const helpItems = [
    {
        tag: "01",
        title: "Разработка веб-приложений и мобильных приложений",
        desc: "Кроссплатформенные, адаптивные, нативные и гибридные приложения с использованием новейших технологий в разработке приложений.",
        tech: ["React", "Next.js", "Mobile"]
    },
    {
        tag: "02",
        title: "Услуги облачной инфраструктуры",
        desc: "Полное внедрение облачных технологий, миграция и расширенные услуги поддержки.",
        tech: ["Cloud", "DevOps", "Migration"]
    },
    {
        tag: "03",
        title: "Управление корпоративным контентом",
        desc: "Интуитивно понятные и масштабируемые системы управления контентом для стартапов и предприятий.",
        tech: ["CMS", "Architecture", "Scalability"]
    },
    {
        tag: "04",
        title: "Телематика",
        desc: "Решения для управления логистикой и телематики для кабин сотрудников, перемещения имущества, отслеживания машин скорой помощи и перемещения корпоративных ресурсов.",
        tech: ["IoT", "Logistics", "Tracking"]
    },
    {
        tag: "05",
        title: "Управление корпоративными активами",
        desc: "Управление процессами технического обслуживания – профилактическое, техническое обслуживание по состоянию/корректирующее и оперативное техническое обслуживание.",
        tech: ["Assets", "Maintenance", "Operations"]
    },
    {
        tag: "06",
        title: "Бизнес-аналитика и аналитика",
        desc: "Инструменты для работы с большими данными и аналитики, которые поразят ваших клиентов персонализированным и контекстным опытом.",
        tech: ["Big Data", "BI", "Analytics"]
    },
];

export default function OurHelpSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current || !leftRef.current) return;

        // Фиксация левого заголовка
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: leftRef.current,
            pinSpacing: false,
        });

        // Анимация появления контента в каждой секции
        const cards = gsap.utils.toArray<HTMLElement>(".help-card");
        cards.forEach((card) => {
            const content = card.querySelector(".card-content");
            gsap.from(content, {
                y: 60,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: card,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                }
            });
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full bg-[#050505] flex flex-col md:flex-row border-t border-white/10">

            {/* ЛЕВАЯ ЧАСТЬ (Pinned) */}
            <div ref={leftRef} className="md:w-1/3 h-screen hidden md:flex flex-col justify-between p-16 border-r border-white/5">
                <div>
                    <span className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase mb-6 block">
                        Our Mission
                    </span>
                    <h2 className="text-6xl font-black uppercase tracking-tighter leading-[0.9] text-white">
                        Чем мы <br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '1px #525252' }}>помогаем</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Active_Service</span>
                    </div>
                    <p className="text-zinc-600 font-mono text-[10px] leading-relaxed uppercase tracking-widest">
                        [ 42.87° N, 74.59° E ] <br />
                        Sanarip_Infrastructure
                    </p>
                </div>
            </div>

            {/* ПРАВАЯ ЧАСТЬ (Полноэкранные блоки) */}
            <div className="md:w-2/3 w-full">
                {helpItems.map((item, i) => (
                    <div
                        key={i}
                        className="help-card relative h-screen w-full flex items-center px-8 md:px-20 border-b border-white/5 overflow-hidden"
                    >
                        {/* Фоновый номер */}
                        <span className="absolute -right-6 -bottom-10 text-[35vw] font-black text-white/[0.02] leading-none select-none pointer-events-none">
                            {item.tag}
                        </span>

                        <div className="card-content relative z-10 w-full">
                            <div className="flex flex-wrap gap-2 mb-8">
                                <span className="text-blue-500 font-mono text-xs font-bold mr-4">ID_0{item.tag}</span>
                                {item.tech.map((t) => (
                                    <span key={t} className="px-3 py-1 border border-white/10 rounded-full text-[9px] font-mono text-zinc-600 uppercase">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <h3 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-[1.1]">
                                {item.title}
                            </h3>

                            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl">
                                {item.desc}
                            </p>

                            <button className="group flex items-center gap-6 text-white font-mono text-[10px] uppercase tracking-[0.4em] hover:text-blue-500 transition-all duration-300">
                                <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 group-hover:border-blue-500 transition-colors">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                                        <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                                Read details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}