"use client";
import {useRef, useState} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import LogoToMapScene from "@/components/AnimatedLogo";
import MorphingCanvas from "@/components/AnimatedLogo";
import {useInView} from "framer-motion";
import AnimatedLogo from "@/components/AnimatedLogo";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const helpItems = [
    {
        tag: "01",
        title: "Разработка IT-платформ и систем",
        desc: "Разработка интуитивно понятных интерфейсов (UI/UX) и функциональной серверной части (Backend) для государственных и международных структур. Развертывание и глубокая кастомизация систем обучения под ключ.",
        tech: ["React", "Next.js", "Mobile"]
    },
    {
        tag: "02",
        title: "IT-инфраструктура и Облачные решения",
        desc: "Разработка интуитивно понятных интерфейсов (UI/UX) и функциональной серверной части (Backend) для государственных и международных структур. Развертывание и глубокая кастомизация систем обучения под ключ.",
        tech: ["Cloud", "DevOps", "Migration"]
    },
    {
        tag: "03",
        title: "От концепции до готового ролика",
        desc: "Разработка интуитивно понятных интерфейсов (UI/UX) и функциональной серверной части (Backend) для государственных и международных структур. Развертывание и глубокая кастомизация систем обучения под ключ.",
        tech: ["CMS", "Architecture", "Scalability"]
    },
    {
        tag: "04",
        title: "Телематика",
        desc: "Решения для управления логистикой и телематики для кабин сотрудников, перемещения имущества, отслеживания машин скорой помощи и перемещения корпоративных ресурсов.",
        tech: ["IoT", "Logistics", "Tracking"]
    },
    // {
    //     tag: "05",
    //     title: "Управление корпоративными активами",
    //     desc: "Управление процессами технического обслуживания – профилактическое, техническое обслуживание по состоянию/корректирующее и оперативное техническое обслуживание.",
    //     tech: ["Assets", "Maintenance", "Operations"]
    // },
    // {
    //     tag: "06",
    //     title: "Бизнес-аналитика и аналитика",
    //     desc: "Инструменты для работы с большими данными и аналитики, которые поразят ваших клиентов персонализированным и контекстным опытом.",
    //     tech: ["Big Data", "BI", "Analytics"]
    // },
];

export default function OurHelpSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current || !leftRef.current) return;

        // Фиксация левой колонки
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: leftRef.current,
            pinSpacing: false,
            toggleActions: "play pause resume reset"
        });

        gsap.to(".logo-spin", {
            rotation: 360, // Полный оборот (можно поставить 720 для большей скорости)
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",      // Начинаем крутить, когда секция зафиксировалась
                end: "bottom bottom",  // Заканчиваем, когда секция расфиксировалась
                scrub: 1,              // Плавная привязка к позиции скролла
            }
        });

        const cards = gsap.utils.toArray<HTMLElement>(".help-card");

        cards.forEach((card) => {
            const content = card.querySelector(".card-content");
            const bgTag = card.querySelector("span.absolute"); // Тот самый огромный номер

            // Анимация контента
            gsap.from(content, {
                y: 40, // Уменьшил амплитуду (легче для CPU)
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    // preventOverlaps: true, // Помогает при быстром скролле
                    // fastScrollEnd: true,   // Завершает анимацию мгновенно при прокрутке мимо
                    toggleActions: "play none none reverse",
                }
            });

            // Легкая анимация для фонового номера (по желанию)
            if (bgTag) {
                gsap.fromTo(bgTag,
                    {opacity: 0, x: 50},
                    {
                        opacity: 1,
                        x: 0,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            scrub: true // Будет двигаться плавно со скроллом
                        }
                    }
                );
            }
        });

        // Освежаем ScrollTrigger после рендера всех карточек
        ScrollTrigger.refresh();

    }, {scope: sectionRef});

    return (
        <section
            ref={sectionRef}
            className="relative w-full flex flex-col md:flex-row border-t border-[var(--border-subtle)]"
            style={{backgroundColor: 'var(--bg-primary)'}}
        >
            {/*<Image*/}
            {/*    src="/images/cell-bg.svg"*/}
            {/*    alt="Background"*/}
            {/*    fill*/}
            {/*    priority*/}
            {/*    className="object-cover z-0 opacity-50" // object-cover заменяет background-size: cover*/}
            {/*/>*/}

            {/* ЛЕВАЯ ЧАСТЬ (Pinned) */}
            <div
                ref={leftRef}
                className="md:w-1/3 h-screen hidden md:flex flex-col justify-between pl-30 pr-16 pt-[calc(var(--header-height)+4rem)] border-r border-[var(--border-subtle)]"
            >
                <div>
                    <span
                        className="text-[var(--brand-blue)] font-mono text-xs tracking-[0.4em] uppercase mb-6 block font-bold">Our Expertise</span>
                    <h2 className="text-8xl font-black uppercase tracking-tighter leading-[0.9] text-[var(--text-main)] mb-12">
                        Наши <br/>
                        <span
                            className="text-transparent"
                            style={{WebkitTextStroke: '1px var(--text-main)', opacity: 0.4}}
                        >Услуги</span>
                    </h2>

                    {/* КОНТЕЙНЕР ДЛЯ ЛОГОТИПА */}
                    <div className="flex justify-center items-center relative group mt-10">
                        {/* Обертка с фиксированным макс-размером, которая центрует логотип */}
                        <div className="relative w-full aspect-square max-w-[450px] mx-auto overflow-visible flex items-center justify-center">

                            {/* Сам компонент AnimatedLogo */}
                            <AnimatedLogo />

                            {/* Слой свечения — теперь он под канвасом */}
                            <div className="absolute inset-0 bg-[var(--brand-blue)] blur-[100px] opacity-10 -z-10 rounded-full scale-75 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="pb-12 text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-widest">
                    {/* Твой блок с координатами или доп. инфо */}
                    © SANARIP SOLUTIONS
                </div>
            </div>

            {/* ПРАВАЯ ЧАСТЬ */}
            <div className="md:w-2/3 w-full">
                {helpItems.map((item, i) => (
                    <div
                        key={i}
                        className="help-card relative h-screen w-full flex items-center px-8 md:px-24 pt-[var(--header-height)] border-b border-[var(--border-subtle)] overflow-hidden"
                    >
                        <span
                            className="absolute -right-10 -bottom-16 text-[38vw] font-black ..."
                            style={{
                                color: 'var(--grid-number)',
                                willChange: 'transform, opacity',
                                backfaceVisibility: 'hidden',
                            }}
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

                            <button
                                className="group flex items-center gap-6 text-[var(--text-main)] font-mono text-[10px] uppercase tracking-[0.4em] hover:text-[var(--brand-blue)] transition-all duration-300">
                                <span
                                    className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-subtle)] group-hover:border-[var(--brand-blue)] group-hover:bg-[var(--brand-blue)] group-hover:text-white transition-all duration-500">
                                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg"
                                         className="group-hover:translate-x-1 transition-transform">
                                        <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5"
                                              strokeLinecap="round" strokeLinejoin="round"/>
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