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

        // Фиксация левой колонки с учетом отступа хедера
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top", // Секция прилипает к верху экрана
            end: "bottom bottom",
            pin: leftRef.current,
            pinSpacing: false,
        });

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
        <section
            ref={sectionRef}
            className="relative w-full flex flex-col md:flex-row border-t border-[var(--border-subtle)]"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >

            {/* ЛЕВАЯ ЧАСТЬ (Pinned) */}
            <div
                ref={leftRef}
                // Добавляем pt-[var(--header-height)] чтобы контент не ушел под шапку
                className="md:w-1/3 h-screen hidden md:flex flex-col justify-between p-16 pt-[calc(var(--header-height)+4rem)] border-r border-[var(--border-subtle)]"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
                <div>
                    <span className="text-[var(--brand-blue)] font-mono text-xs tracking-[0.4em] uppercase mb-6 block font-bold">
                        Our Expertise
                    </span>
                    <h2 className="text-6xl font-black uppercase tracking-tighter leading-[0.9] text-[var(--text-main)]">
                        Чем мы <br />
                        <span
                            className="text-transparent"
                            style={{ WebkitTextStroke: '1px var(--text-muted)', opacity: 0.4 }}
                        >
                            помогаем
                        </span>
                    </h2>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-[var(--brand-blue)] rounded-full animate-pulse" />
                        <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">System_Online</span>
                    </div>
                    <p className="text-[var(--text-muted)] font-mono text-[10px] leading-relaxed uppercase tracking-[0.2em]">
                        [ 42.87° N, 74.59° E ] <br />
                        Bishkek_Digital_Hub
                    </p>
                </div>
            </div>

            {/* ПРАВАЯ ЧАСТЬ */}
            <div className="md:w-2/3 w-full">
                {helpItems.map((item, i) => (
                    <div
                        key={i}
                        // Добавляем pt для каждой карточки, чтобы текст центрировался ниже хедера
                        className="help-card relative h-screen w-full flex items-center px-8 md:px-24 pt-[var(--header-height)] border-b border-[var(--border-subtle)] overflow-hidden bg-[var(--bg-primary)]"
                    >
                        <span
                            className="absolute -right-10 -bottom-16 text-[38vw] font-black leading-none select-none pointer-events-none"
                            style={{ color: 'var(--grid-number)' }}
                        >
                            {item.tag}
                        </span>

                        <div className="card-content relative z-10 w-full">
                            <div className="flex flex-wrap items-center gap-3 mb-10">
                                <span className="text-[var(--brand-blue)] font-mono text-sm font-black mr-4">
                                    MOD_0{item.tag}
                                </span>
                                {item.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="px-3 py-1 border border-[var(--border-subtle)] rounded-full text-[10px] font-mono text-[var(--text-muted)] uppercase bg-[var(--bg-secondary)]"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <h3 className="text-4xl md:text-7xl font-bold text-[var(--text-main)] mb-10 tracking-tighter leading-[1.05] max-w-4xl">
                                {item.title}
                            </h3>

                            <p className="text-[var(--text-muted)] text-lg md:text-2xl font-light leading-relaxed mb-16 max-w-2xl">
                                {item.desc}
                            </p>

                            <button className="group flex items-center gap-6 text-[var(--text-main)] font-mono text-[10px] uppercase tracking-[0.4em] hover:text-[var(--brand-blue)] transition-all duration-300">
                                <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-subtle)] group-hover:border-[var(--brand-blue)] group-hover:bg-[var(--brand-blue)] group-hover:text-white transition-all duration-500">
                                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                                        <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                                <span className="font-bold">Explore Details</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}