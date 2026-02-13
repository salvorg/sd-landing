"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const slides = [
    { title: "Digital Genesis", bg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000" },
    { title: "Virtual Horizon", bg: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000" },
    { title: "Neural Network", bg: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000" },
    { title: "Cyber City", bg: "https://images.unsplash.com/photo-1510511459019-5dee9954ff92?q=80&w=2000" }
];

export default function HorizontalScroll() {
    // Явно указываем типы для useRef
    const containerRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Проверка на существование элементов для TS
        if (!containerRef.current || !pinRef.current) return;

        const sections = gsap.utils.toArray<HTMLElement>(".panel");

        // Главная анимация движения "поезда"
        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: pinRef.current,
                pin: true,
                scrub: 2,
                start: "top top",
                // Теперь TS понимает, что такое offsetWidth
                end: () => `+=${containerRef.current?.offsetWidth || 0}`,
                snap: 1 / (sections.length - 1),
                invalidateOnRefresh: true,
            }
        });

        // Усиленное сопротивление контента
        sections.forEach((panel) => {
            const titleMain = panel.querySelector(".title-main");
            const titleOutline = panel.querySelector(".title-outline");
            const bg = panel.querySelector(".bg-image");

            // Сильное сопротивление основного текста (уходит вправо)
            gsap.fromTo(titleMain,
                { x: -300 },
                {
                    x: 400,
                    ease: "none",
                    scrollTrigger: {
                        trigger: panel,
                        containerAnimation: undefined, // В горизонтальных схемах GSAP подхватит автоматом через scrub
                        start: "left right",
                        end: "right left",
                        scrub: true
                    }
                }
            );

            // Экстремальное сопротивление контура (уходит еще дальше)
            gsap.fromTo(titleOutline,
                { x: -150 },
                {
                    x: 600,
                    ease: "none",
                    scrollTrigger: {
                        trigger: panel,
                        start: "left right",
                        end: "right left",
                        scrub: true
                    }
                }
            );

            // Параллакс фона (движется медленнее в ту же сторону, что и всё)
            gsap.fromTo(bg,
                { xPercent: -20 },
                {
                    xPercent: 20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: panel,
                        start: "left right",
                        end: "right left",
                        scrub: true
                    }
                }
            );
        });
    }, { scope: pinRef });

    return (
        <div ref={pinRef} className="overflow-hidden">
            <main
                ref={containerRef}
                className="flex w-[400vw] h-screen bg-[#050505]"
            >
                {slides.map((slide, i) => (
                    <section
                        key={i}
                        className="panel relative h-screen w-[100vw] flex-shrink-0 flex items-center justify-center overflow-hidden border-r border-white/5 shadow-2xl"
                    >
                        {/* ФОН С ПАРАЛЛАКСОМ */}
                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                            <img
                                src={slide.bg}
                                className="bg-image w-full h-full object-cover opacity-30 scale-125"
                                alt=""
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                        </div>

                        {/* ТЕКСТ С УСИЛЕННЫМ СОПРОТИВЛЕНИЕМ */}
                        <div className="relative z-10 w-full max-w-7xl px-12 pointer-events-none">
                            <h2 className="text-7xl md:text-[12rem] font-black text-white uppercase tracking-tighter leading-[0.75] flex flex-col">
                                <span className="title-main inline-block">
                                    {slide.title.split(' ')[0]}
                                </span>
                                <span
                                    className="title-outline inline-block ml-24 md:ml-60"
                                    style={{
                                        WebkitTextStroke: '2px rgba(59, 130, 246, 0.5)',
                                        color: 'transparent'
                                    }}
                                >
                                    {slide.title.split(' ')[1]}
                                </span>
                            </h2>
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
}