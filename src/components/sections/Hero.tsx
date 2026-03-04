"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoWrapperRef = useRef<HTMLDivElement>(null);
    const textContentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !videoWrapperRef.current || !textContentRef.current) return;

        const lines = textContentRef.current.querySelectorAll('.block.uppercase');
        const paragraph = textContentRef.current.querySelector('p');
        const columns = gsap.utils.toArray<HTMLElement>(".reveal-col");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=300%",
                pin: true,
                scrub: 1,
            }
        });

        // ЭТАП 1: Текст улетает, Видео расширяется
        tl.to(lines, {
            x: -1200,
            opacity: 0,
            filter: "blur(15px)",
            stagger: { amount: 0.05, from: "random" },
            ease: "power2.inOut"
        }, 0)
            .to(paragraph, {
                x: -800,
                opacity: 0,
                filter: "blur(5px)",
                ease: "power2.inOut"
            }, 0)
            .to(videoWrapperRef.current, {
                left: "50%",
                top: "50%",
                xPercent: -50,
                yPercent: -50,
                width: "100vw",
                height: "100vh",
                borderRadius: "0px",
                ease: "power2.inOut"
            }, 0);

        // ЭТАП 2: Колонны закрывают видео
        tl.set(columns, { yPercent: 100, opacity: 1 }, ">");

        tl.to(columns, {
            yPercent: 0,
            stagger: {
                amount: 0.5,
                from: "random"
            },
            ease: "power2.out",
            duration: 1
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-[var(--bg-main)] overflow-hidden font-sans">

            <section className="relative h-full w-full flex items-center px-6 md:px-12 z-10 max-w-[1440px] mx-auto">
                {/* ТЕКСТОВЫЙ БЛОК */}
                <div ref={textContentRef} className="max-w-[700px] z-20 relative pointer-events-none">
                    <h1 className="font-bold leading-[0.9] tracking-tighter text-[var(--text-main)] mb-10">
                        <span className="block text-[8vw] lg:text-[72px] uppercase">Комплексные</span>
                        <span className="block text-[8vw] lg:text-[72px] text-[var(--brand-primary)] italic uppercase">Цифровые</span>
                        <span className="block text-[8vw] lg:text-[72px] uppercase">решения для</span>
                        <span className="block text-[8vw] lg:text-[72px] uppercase">развития</span>
                    </h1>
                    <p className="max-w-[550px] text-[15px] md:text-[18px] font-medium text-[var(--text-muted)] leading-relaxed">
                        Мы создаем устойчивые цифровые экосистемы: от разработки сложных веб-платформ до производства профессионального видеоконтента.
                    </p>
                </div>

                {/* КОНТЕЙНЕР С ВИДЕО */}
                <div
                    ref={videoWrapperRef}
                    className="absolute overflow-hidden rounded-3xl border border-[var(--border-color)] shadow-2xl z-0"
                    style={{
                        width: '480px',
                        height: '520px',
                        right: '10%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }}
                >
                    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                        <source src="/videos/hero-section-video.mp4" type="video/mp4"/>
                    </video>
                </div>
            </section>

            {/* СЛОЙ КОЛОНН (Поверх всего) */}
            <div className="absolute inset-0 flex pointer-events-none z-50 h-screen w-full">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="reveal-col flex-1 relative h-full bg-[var(--bg-main)]"
                        style={{ opacity: 0 }}
                    />
                ))}
            </div>
        </div>
    );
}