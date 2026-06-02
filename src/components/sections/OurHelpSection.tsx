"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedLogo from "@/components/AnimatedLogo";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const helpItems = [
    {
        tag: "01",
        title: "Разработка IT-платформ",
        desc: "Создаем устойчивые цифровые экосистемы любой сложности: от функциональных корпоративных сайтов до комплексных государственных порталов. Наша экспертиза включает проектирование интуитивно понятных интерфейсов, разработку серверной части и создание интерактивных прототипов для детальной проработки логики продукта еще до начала кодинга.",
        tech: [
            "React",
            "Next.js",
            "CI/CD",
            "AI Integration",
            "Mobile"
        ]
    },
    {
        tag: "02",
        title: "Внедрение и кастомизация LMS",
        desc: "Специализированные решения для цифрового образования. Мы осуществляем развертывание и глубокую настройку систем дистанционного обучения «под ключ», адаптируя функционал под конкретные задачи заказчика. Наш подход включает не только техническую установку, но и создание интуитивно понятной среды для эффективного взаимодействия преподавателей и студентов."
    },
    {
        tag: "03",
        title: "Инфраструктура и облачный хостинг",
        desc: "Комплексное обеспечение стабильности и безопасности ваших цифровых активов. Мы объединяем надежные серверные мощности с профессиональным техническим администрированием и мониторингом 24/7. Благодаря локальной поддержке и современным облачным технологиям, мы гарантируем высокую скорость доступа, отказоустойчивость при пиковых нагрузках и полную сохранность данных."
    },
    {
        tag: "04",
        title: "Видеопроизводство: от концепции до готового ролика",
        desc: "Превращаем сложные идеи в захватывающий визуальный контент. Мы реализуем полный цикл производства: от разработки уникального сценария и стратегии до профессиональных съемок, монтажа и графики. Специализируемся на обучающих курсах, анимации, документалистике и динамичных роликах для соцсетей, адаптируя контент под любую аудиторию."
    },
];

export default function OurHelpSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current || !leftRef.current) return;
        if (typeof window === 'undefined') return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Пиннинг левой колонки только на десктопе
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: leftRef.current,
                pinSpacing: false,
                toggleActions: "play pause resume reset"
            });

            gsap.to(".logo-spin", {
                rotation: 360,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                }
            });
        });

        const cards = gsap.utils.toArray<HTMLElement>(".help-card");
        cards.forEach((card) => {
            const content = card.querySelector(".card-content");
            const bgTag = card.querySelector("span.bg-number");

            gsap.from(content, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                }
            });

            if (bgTag) {
                gsap.fromTo(bgTag,
                    { opacity: 0, x: 50 },
                    {
                        opacity: 1,
                        x: 0,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            scrub: true
                        }
                    }
                );
            }
        });

        ScrollTrigger.refresh();

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full flex flex-col md:flex-row border-t border-[var(--border-subtle)]"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            {/* ЛЕВАЯ ЧАСТЬ: pinned на md+, обычная секция на мобиле */}
            <div
                ref={leftRef}
                className="md:w-1/3 w-full md:h-screen flex flex-col justify-between px-6 sm:px-10 md:pl-20 lg:pl-30 md:pr-12 lg:pr-16 pt-[calc(var(--header-height)+2rem)] md:pt-[calc(var(--header-height)+4rem)] pb-10 md:pb-0 md:border-r border-[var(--border-subtle)]"
            >
                <div>
                    <span
                        className="text-[var(--brand-blue)] font-mono text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-4 sm:mb-6 block font-bold">Our Expertise</span>
                    <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-muted-dark mb-8 md:mb-12">
                        Наши <br />
                        <span
                            className="opacity-40 [-webkit-text-fill-color:var(--bg-main)] [-webkit-text-stroke:2px_var(--text-main)] [paint-order:stroke_fill]"
                        >Услуги</span>
                    </h2>

                    {/* AnimatedLogo: показываем только на md+ */}
                    <div className="hidden md:flex justify-center items-center relative group mt-10">
                        <div className="relative w-full aspect-square max-w-[450px] mx-auto overflow-hidden flex items-center justify-center">
                            <AnimatedLogo />
                            <div className="absolute inset-0 bg-[var(--brand-blue)] blur-[100px] opacity-10 -z-10 rounded-full scale-75 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="hidden md:block pb-12 text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-widest">
                    © SANARIP SOLUTIONS
                </div>
            </div>

            {/* ПРАВАЯ ЧАСТЬ */}
            <div className="md:w-2/3 w-full">
                {helpItems.map((item, i) => (
                    <div
                        key={i}
                        className="help-card relative min-h-[80vh] md:h-screen w-full flex items-center px-6 sm:px-10 md:px-16 lg:px-24 py-16 md:pt-[var(--header-height)] md:pb-0 border-b border-[var(--border-subtle)] overflow-hidden"
                    >
                        <span
                            className="bg-number absolute -right-4 sm:-right-10 -bottom-8 sm:-bottom-16 text-[28vw] sm:text-[32vw] md:text-[38vw] font-black leading-none pointer-events-none select-none"
                            style={{
                                color: 'var(--grid-number)',
                                willChange: 'transform, opacity',
                                backfaceVisibility: 'hidden',
                            }}
                        >
                            {item.tag}
                        </span>

                        <div className="card-content relative z-10 w-full text-muted-dark">
                            {item.tech && (
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 md:mb-10">
                                    {item.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="px-3 sm:px-4 py-1 sm:py-1.5 border border-[var(--border-subtle)] rounded-full text-xs sm:text-sm font-mono text-[var(--text-muted)] uppercase bg-[var(--bg-secondary)]"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-extrabold mb-6 md:mb-10 tracking-tighter leading-[1.05] max-w-3xl">
                                {item.title}
                            </h3>

                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed mb-8 md:mb-16 max-w-2xl">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
