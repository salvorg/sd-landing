"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Карточки сетки — рендерим только когда нужно
// Вынесено за пределы компонента чтобы не пересоздавать массив
const GRID_SIZE = 25;
const VIDEO_INDEX = 12;

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textContentRef = useRef<HTMLDivElement>(null);
    const mainTransformRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Сетка (24 фото) рендерится только после начала скролла — они не нужны сразу
    const [gridVisible, setGridVisible] = useState(false);

    // Показываем сетку при первом скролле
    useEffect(() => {
        const handleScroll = () => setGridVisible(true);
        window.addEventListener('scroll', handleScroll, { passive: true, once: true } as any);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useGSAP(() => {
        if (!containerRef.current || !mainTransformRef.current || !textContentRef.current) return;

        const lines = textContentRef.current.querySelectorAll('.block');
        const paragraph = textContentRef.current.querySelector('p');
        const cards = containerRef.current.querySelectorAll('.grid-card');
        const wrappers = containerRef.current.querySelectorAll('.grid-card-wrapper');

        gsap.set(mainTransformRef.current, {
            scale: 0.5,
            xPercent: -30,
            yPercent: -50,
            top: "50%",
            left: "70%"
        });
        gsap.set(cards, { opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=400%",
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                onEnter: () => setGridVisible(true),
            }
        });

        tl.to([lines, paragraph], {
            x: -1200,
            opacity: 0,
            stagger: { amount: 0.10, from: "random" },
            ease: "power2.out",
            duration: 3
        }, 0)
        .to(mainTransformRef.current, {
            scale: 1.8,
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            ease: "power2.in",
            duration: 2
        }, 0)
        .to(wrappers, {
            borderRadius: "0px",
            ease: "power2.in",
            duration: 1.5
        }, 0)
        .to(cards, {
            opacity: 1,
            duration: 1.5,
            stagger: { amount: 0.5, from: "center" },
            ease: "none"
        }, "-=1")
        .to(mainTransformRef.current, {
            scale: 0.4,
            rotationX: 15,
            rotationZ: -4,
            x: -200,
            ease: "expo.out",
            duration: 6
        }, ">");

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen bg-[var(--bg-main)] overflow-hidden perspective-2000"
        >
            <section className="relative h-full w-full flex items-center px-6 md:px-12 z-10 max-w-[1440px] mx-auto">

                {/* ТЕКСТ */}
                <div ref={textContentRef} className="max-w-[700px] z-20 relative pointer-events-none">
                    <h1 className="font-bold leading-[0.9] tracking-tighter text-[var(--text-main)] mb-10">
                        <span className="block text-[8vw] lg:text-[72px] uppercase">Комплексные</span>
                        <span className="block text-[8vw] lg:text-[72px] text-[var(--brand-primary)] italic uppercase">Цифровые</span>
                        <span className="block text-[8vw] lg:text-[72px] uppercase">решения для</span>
                        <span className="block text-[8vw] lg:text-[72px] uppercase">развития</span>
                    </h1>
                    <p className="max-w-[550px] text-[15px] md:text-[18px] font-medium text-[var(--text-muted)] leading-relaxed">
                        Мы создаем устойчивые цифровые экосистемы: от разработки сложных веб-платформ до производства
                        профессионального видеоконтента.
                    </p>
                </div>

                {/* СЕТКА */}
                <div
                    ref={mainTransformRef}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div
                        className="absolute grid grid-cols-5 gap-6 w-[300vw] h-[300vh]"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {Array.from({ length: GRID_SIZE }).map((_, i) => (
                            <div
                                key={i}
                                className="grid-card-wrapper relative w-full h-full rounded-3xl overflow-hidden"
                            >
                                {i === VIDEO_INDEX ? (
                                    // Центральная ячейка — видео
                                    <div className="absolute w-full h-full z-40">
                                        {/* Poster — виден мгновенно, пока видео не загрузилось */}
                                        <Image
                                            src="/videos/hero-poster.webp"
                                            alt="hero background"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                        {/* Видео грузится сразу поверх poster.
                                            preload="auto" — браузер начинает качать сразу.
                                            Когда готово — перекрывает poster (z-10 > z-0 у Image) */}
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            preload="auto"
                                            className="absolute inset-0 w-full h-full object-cover z-10"
                                        >
                                            {/* WebM первым — 3MB вместо 18MB, большинство браузеров возьмут его */}
                                            <source src="/videos/hero-section-video.webm" type="video/webm" />
                                            <source src="/videos/hero-section-video-compressed.mp4" type="video/mp4" />
                                        </video>
                                    </div>
                                ) : (
                                    // Остальные ячейки — фото, грузятся лениво
                                    <div className="grid-card w-full h-full relative opacity-0">
                                        {gridVisible && (
                                            <Image
                                                src={`https://picsum.photos/seed/${i + 50}/800/600`}
                                                alt="work"
                                                fill
                                                className="object-cover"
                                                loading="lazy"
                                                sizes="(max-width: 768px) 60vw, 30vw"
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </div>
    );
}
