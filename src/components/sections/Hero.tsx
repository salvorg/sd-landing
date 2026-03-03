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

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=150%",
                pin: true,
                scrub: 1,
            }
        });

        tl.to(textContentRef.current, {
            x: -200,      // Немного уводим влево
            opacity: 0,
            filter: "blur(10px)",
            ease: "power2.inOut"
        }, 0)
            .to(videoWrapperRef.current, {
                // Анимируем из правой части в центр и на весь экран
                left: "50%",
                top: "50%",
                xPercent: -50,
                yPercent: -50,
                width: "100vw",
                height: "100vh",
                borderRadius: "0px",
                ease: "power2.inOut"
            }, 0);

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-[var(--bg-main)] overflow-hidden font-sans">
            {/* СЕТКА / ГРИД (опционально для стиля Sanarip) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                 style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '50px 50px' }}
            />

            <section className="relative h-full w-full flex items-center px-6 md:px-12 z-10 max-w-[1440px] mx-auto">

                {/* ТЕКСТОВЫЙ БЛОК */}
                <div ref={textContentRef} className="max-w-[700px] z-20 relative">
                    <h1 className="font-bold leading-[0.9] tracking-tighter text-[var(--text-main)] mb-10">
                        <div className="overflow-hidden">
                            <span className="block text-[8vw] lg:text-[72px] uppercase">Комплексные</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="block text-[8vw] lg:text-[72px] text-[var(--brand-primary)] italic uppercase">Цифровые</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="block text-[8vw] lg:text-[72px] uppercase">решения для</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="block text-[8vw] lg:text-[72px] uppercase">развития</span>
                        </div>
                    </h1>

                    <p className="max-w-[550px] text-[15px] md:text-[18px] font-medium text-[var(--text-muted)] leading-relaxed">
                        Мы создаем устойчивые цифровые экосистемы: от разработки сложных веб-платформ до производства профессионального видеоконтента.
                    </p>
                </div>

                {/* КОНТЕЙНЕР С ВИДЕО (Абсолютное позиционирование) */}
                <div
                    ref={videoWrapperRef}
                    className="absolute overflow-hidden rounded-3xl border border-[var(--border-color)] shadow-2xl z-0"
                    style={{
                        width: '480px',
                        height: '520px',
                        right: '10%', // Начальная позиция справа
                        top: '50%',
                        transform: 'translateY(-50%)', // Центрируем по вертикали изначально
                    }}
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source src="/videos/hero-section-video.mp4" type="video/mp4" />
                    </video>

                    {/* Финальный титр (появится в конце анимации) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-700 bg-black/20">
                        <h2 className="text-white text-5xl font-black uppercase tracking-tighter">
                            Sanarip Dolboor
                        </h2>
                    </div>
                </div>
            </section>
        </div>
    );
}