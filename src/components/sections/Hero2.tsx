"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function IntegratedHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const columns = gsap.utils.toArray<HTMLElement>(".reveal-col");

        // Главный таймлайн для всей сцены
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=400%", // Увеличили путь, так как сцен стало больше
                pin: true,
                scrub: true,
                anticipatePin: 1,
                toggleActions: "play pause resume reset"
            }
        });

        tl.to(".hero-line", { x: (i) => (i + 1) * 600, opacity: 0, stagger: 0.05, ease: "power1.inOut" }, 0)
            .to(bgRef.current, { scale: 2, opacity: 0, x: 200 }, 0)
            .fromTo(columns, { yPercent: 100 }, { yPercent: 0, stagger: { amount: 0.6, from: "random" }, ease: "power2.out" }, "-=0.2")
            .from(".reveal-content", { y: 100, opacity: 0, scale: 0.9, duration: 0.8 }, "-=0.4")
            .to({}, { duration: 1 }) // Пауза
            .to(columns, { yPercent: -100, stagger: { amount: 0.6, from: "random" }, ease: "power2.inIn" })
            .to(".reveal-content", { opacity: 0, y: -50, duration: 0.4 }, "<");


        const xSetter = gsap.quickSetter(".hero-content", "x", "px");
        const ySetter = gsap.quickSetter(".hero-content", "y", "px");

        const handleMouseMove = (e: MouseEvent) => {
            if (!ScrollTrigger.isInViewport(containerRef.current!)) return;

            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 30;
            const yPos = (clientY / window.innerHeight - 0.5) * 30;

            xSetter(xPos);
            ySetter(yPos);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative z-10 bg-[var(--bg-main)] overflow-hidden">
            {/* СЕКЦИЯ 1: HERO */}
            <section className="relative h-screen w-full flex flex-col justify-center px-4 md:px-12 overflow-hidden z-0 bg-[var(--bg-main)]">
                <div className="hero-content w-full max-w-[1400px] mx-auto">
                    <h1 className="font-bold leading-[0.85] tracking-tighter uppercase text-[var(--text-main)]">
                        <div className="overflow-hidden mb-2">
                            <span className="hero-line block text-[15vw] lg:text-[160px]">Digital</span>
                        </div>
                        <div className="overflow-hidden mb-2">
                            <span className="hero-line block text-[10.5vw] lg:text-[120px]">Transformation</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="hero-line block text-[13vw] lg:text-[160px] text-[var(--brand-primary)] italic">Sanarip 2026</span>
                        </div>
                    </h1>
                </div>
                {/* В светлой теме шар делаем очень нежным */}
                <div ref={bgRef} className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[70vw] h-[70vw] bg-blue-100 blur-[120px] rounded-full z-[-1] opacity-50" />
            </section>

            {/* СЛОЙ КОЛОНОК (Светлые) */}
            <div className="absolute inset-0 flex pointer-events-none z-20 h-screen w-full">
                {[...Array(7)].map((_, i) => (
                    <div
                        key={i}
                        className="reveal-col flex-1 relative h-full bg-[var(--bg-secondary)] last:border-r-0"
                    />
                ))}
            </div>

             {/*СЕКЦИЯ 2: CONTENT */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none h-screen w-full bg-transparent">
                <div className="reveal-content max-w-4xl text-[var(--text-main)] px-8 text-center">
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
                        The Future <br /> <span className="text-[var(--brand-primary)]">Generated</span>
                    </h2>
                    <p className="text-[var(--text-muted)] text-xl md:text-2xl max-w-xl mx-auto font-light">
                        Our infrastructure is built for the next generation of AI.
                    </p>
                </div>
            </div>
        </div>
    );
}