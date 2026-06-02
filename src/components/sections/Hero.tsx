"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import GradientButton from "@/components/ui/GradientButton";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const GRID_SIZE = 35;
const VIDEO_INDEX = 17;

const GALLERY_IMAGES = [
    "/images/gallery/about-1.png",
    "/images/gallery/about-2.png",
    "/images/gallery/about-3.png",
    "/images/gallery/about-4.png",
    "/images/gallery/about-6.png",
    "/images/gallery/about-7.png",
    "/images/gallery/about-8.png",
    "/images/gallery/about-9.png",
    "/images/gallery/about-10.jpeg",
    "/images/gallery/about-11.jpeg",
    "/images/gallery/about-12.jpeg",
    "/images/gallery/about-13.jpeg",
    "/images/gallery/about-14.jpeg",
    "/images/gallery/about-15.jpeg",
];

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textContentRef = useRef<HTMLDivElement>(null);
    const mainTransformRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const [gridVisible, setGridVisible] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 768px)');
        const apply = () => setIsDesktop(mq.matches);
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

    // На мобиле показываем фото-сетку сразу (она маленькая, фоновая)
    useEffect(() => {
        if (!isDesktop) {
            setGridVisible(true);
            return;
        }
        const handleScroll = () => setGridVisible(true);
        window.addEventListener('scroll', handleScroll, { passive: true, once: true } as AddEventListenerOptions);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isDesktop]);

    useGSAP(() => {
        if (!isDesktop) return; // GSAP-сценарий только на md+
        if (!containerRef.current || !mainTransformRef.current || !textContentRef.current) return;

        const cards = containerRef.current.querySelectorAll('.grid-card');
        const wrappers = containerRef.current.querySelectorAll('.grid-card-wrapper');

        const textRect = textContentRef.current.getBoundingClientRect();
        const sectionRect = sectionRef.current!.getBoundingClientRect();
        const vh = window.innerHeight;
        const vw = window.innerWidth;

        const cellH = vh * 0.66;
        const cellW = vw * 0.56;

        const gap = 70;
        const availableW = sectionRect.right - textRect.right - gap;

        const scaleByH = textRect.height / cellH;
        const scaleByW = availableW / cellW;
        const initialScale = Math.min(scaleByH, scaleByW);

        const scaledCellW = cellW * initialScale;
        const videoLeftEdge = textRect.right + gap;
        const videoCenterX = videoLeftEdge + scaledCellW / 2;
        const xOffset = videoCenterX - vw / 2;

        gsap.set(mainTransformRef.current, {
            scale: initialScale,
            xPercent: -50,
            yPercent: -50,
            x: xOffset,
            top: "50%",
            left: "50%"
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

        const textElements = textContentRef.current.querySelectorAll('h1 > *, p, .pointer-events-auto');

        tl.to(textElements, {
            x: -1200,
            opacity: 0,
            stagger: { amount: 0.2, from: "start" },
            ease: "power2.out",
            duration: 3
        }, 0)
            .to(mainTransformRef.current, {
                scale: 1.8,
                left: "50%",
                top: "50%",
                xPercent: -50,
                yPercent: -50,
                x: 0,
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

    }, { scope: containerRef, dependencies: [isDesktop] });

    return (
        <div
            ref={containerRef}
            className="relative w-full min-h-screen md:h-screen bg-[var(--bg-main)] overflow-hidden md:perspective-2000"
        >
            <section
                ref={sectionRef}
                className="relative h-full w-full flex flex-col md:flex-row md:items-center pt-[calc(var(--header-height)+1rem)] md:pt-0 pb-8 md:pb-0 px-4 sm:px-6 md:px-12 z-10 max-w-[1440px] mx-auto"
            >

                <div
                    ref={textContentRef}
                    className="w-full max-w-[491px] z-20 relative pointer-events-none"
                >
                    <h1 className="font-black leading-[0.95] md:leading-[0.9] tracking-tighter text-muted-dark mb-4 md:mb-[18px] flex flex-col">
                        <span className="block text-[clamp(2.25rem,9vw,3.75rem)]">Комплексные</span>
                        <span className="block text-[clamp(2.25rem,9vw,3.75rem)]">цифровые</span>
                        <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                            <span className="text-[clamp(2.25rem,9vw,3.75rem)] [-webkit-text-fill-color:var(--bg-main)] [-webkit-text-stroke:2px_var(--text-main)] [paint-order:stroke_fill]">решения</span>
                            <span className="text-[clamp(2.25rem,9vw,3.75rem)]">для</span>
                        </div>
                        <span className="block text-[clamp(2.25rem,9vw,3.75rem)]">развития</span>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-muted-dark leading-relaxed mb-6 md:mb-[30px] max-w-md">
                        Мы создаем устойчивые цифровые экосистемы: от разработки сложных веб-платформ (LMS)
                        до производства профессионального образовательного видеоконтента.
                    </p>
                    <div className="pointer-events-auto">
                        <GradientButton href="/projects" className="w-auto uppercase px-5 sm:px-12 py-3 sm:py-4 text-xs sm:text-base">
                            Смотреть проекты
                        </GradientButton>
                    </div>
                </div>

                {/* Сетка / видео — на десктопе анимируется GSAP, на мобиле — фоновое видео */}
                {isDesktop ? (
                    <div
                        ref={mainTransformRef}
                        className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div
                            className="absolute grid grid-cols-7 gap-6 w-[395vw] h-[330vh]"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {Array.from({ length: GRID_SIZE }).map((_, i) => (
                                <div
                                    key={i}
                                    className="grid-card-wrapper relative w-full h-full overflow-hidden"
                                >
                                    {i === VIDEO_INDEX ? (
                                        <div className="absolute w-full h-full z-40">
                                            <Image
                                                src="/videos/hero-poster.webp"
                                                alt="hero background"
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                preload="auto"
                                                className="absolute inset-0 w-full h-full object-cover z-10"
                                            >
                                                <source src="/videos/hero-section-video.webm" type="video/webm" />
                                                <source src="/videos/hero-section-video-compressed.mp4" type="video/mp4" />
                                            </video>
                                        </div>
                                    ) : (
                                        <div className="grid-card w-full h-full relative opacity-0">
                                            {gridVisible && (() => {
                                                const col = i % 7;
                                                const row = Math.floor(i / 7);
                                                const imgIndex = (col * 3 + row * 5) % GALLERY_IMAGES.length;
                                                return (
                                                    <Image
                                                        src={GALLERY_IMAGES[imgIndex]}
                                                        alt={`Gallery image ${i}`}
                                                        fill
                                                        className="object-cover"
                                                        loading="lazy"
                                                        sizes="(max-width: 768px) 60vw, 30vw"
                                                    />
                                                );
                                            })()}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Мобильная версия: видео идёт отдельным блоком ПОД текстом
                    <div className="md:hidden relative w-full h-[38vh] mt-8 z-0 pointer-events-none overflow-hidden rounded-2xl">
                        <Image
                            src="/videos/hero-poster.webp"
                            alt="hero background"
                            fill
                            className="object-cover"
                            priority
                        />
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 w-full h-full object-cover"
                        >
                            <source src="/videos/hero-section-video.webm" type="video/webm" />
                            <source src="/videos/hero-section-video-compressed.mp4" type="video/mp4" />
                        </video>
                    </div>
                )}

            </section>
        </div>
    );
}
