"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function DreamersReplication() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".dream-section");

        sections.forEach((section, i) => {
            if (i === 0) return; // Пропускаем первую секцию

            gsap.fromTo(section,
                { clipPath: "circle(0% at 50% 50%)" },
                {
                    clipPath: "circle(150% at 50% 50%)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "+=100%",
                        scrub: true,
                        pin: sections[i-1], // Фиксируем ПРЕДЫДУЩУЮ секцию
                        pinSpacing: false,
                    }
                }
            );
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative">
            {/* СЕКЦИЯ 1 */}
            <section className="dream-section relative h-screen w-full bg-zinc-900 flex items-center justify-center">
                <h1 className="text-white text-[10vw] font-black uppercase z-10">Reality</h1>
                <img
                    src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
            </section>

            {/* СЕКЦИЯ 2 (Раскрывается из круга) */}
            <section className="dream-section fixed top-0 left-0 h-screen w-full bg-blue-600 flex items-center justify-center overflow-hidden">
                <h1 className="text-white text-[10vw] font-black uppercase z-10">Dream</h1>
                <img
                    src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
            </section>

            {/* СЕКЦИЯ 3 (Следующий слой) */}
            <section className="dream-section fixed top-0 left-0 h-screen w-full bg-purple-900 flex items-center justify-center overflow-hidden">
                <h1 className="text-white text-[10vw] font-black uppercase z-10">Infinity</h1>
                <img
                    src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
            </section>
        </div>
    );
}