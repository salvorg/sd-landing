"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => onComplete()
        });

        // 1. Анимация появления логотипа (сразу при старте)
        gsap.to(".preloader-logo",
            { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
        );

        const counter = { val: 0 };
        gsap.to(counter, {
            val: 100,
            duration: 2, // Чуть увеличим время для пафоса
            ease: "power2.inOut",
            onUpdate: () => setPercent(Math.floor(counter.val))
        });

        // 3. Финальный аккорд: шторы уезжают
        tl.to(".preloader-panel", {
            height: 0,
            duration: 1.2,
            ease: "expo.inOut",
            stagger: 0.1,
            delay: 2.2 // Ждем завершения счетчика
        })
            .to(".preloader-content", {
                opacity: 0,
                scale: 1.1,
                filter: "blur(20px)",
                duration: 0.8,
                ease: "power2.in"
            }, "-=1.2") // Исчезает одновременно с началом открытия штор
            .set(".preloader-container", { display: "none" });

    }, [onComplete]);

    return (
        <div className="preloader-container fixed inset-0 z-[100] flex overflow-hidden">
            {/* Панели штор */}
            <div className="preloader-panel fixed top-0 left-0 w-[51%] h-full bg-zinc-950 border-r border-white/5" />
            <div className="preloader-panel fixed top-0 right-0 w-[51%] h-full bg-zinc-950" />

            <div className="preloader-content relative z-[101] m-auto flex flex-col items-center">
                {/* ЛОГОТИП */}
                <div className="preloader-logo mb-8">
                    <Image
                        src="/images/logo/sd-color.webp"
                        alt="Sanarip Logo"
                        width={120}
                        height={120}
                        priority
                    />
                </div>

                {/* ТЕКСТ И ПРОЦЕНТЫ */}
                <div className="overflow-hidden">
                    <h2 className="text-white text-[10px] font-mono tracking-[0.8em] uppercase mb-4 opacity-40">
                        Initializing Systems
                    </h2>
                </div>

                <div className="text-white text-5xl md:text-7xl font-black tabular-nums tracking-tighter">
                    {percent}%
                </div>
            </div>
        </div>
    );
}