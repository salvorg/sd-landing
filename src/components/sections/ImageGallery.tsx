"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const images = [
    {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070",
        title: "Classic Zoom In",
        desc: "Эффект погружения (Scale 1.0 -> 1.3)",
        size: "w-full md:w-[50%]",
        align: "self-start",
        effect: "zoom-in"
    },
    {
        url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070",
        title: "Reverse Reveal",
        desc: "Эффект отдаления (Scale 1.4 -> 1.0)",
        size: "w-full md:w-[50%]",
        align: "self-end -mt-32 md:-mt-40",
        effect: "zoom-out"
    },
    {
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072",
        title: "3D Tilt & Shift",
        desc: "Наклон + Смещение по X",
        size: "w-full md:w-[55%]",
        align: "self-start -mt-32 md:-mt-40",
        effect: "tilt"
    },
    {
        url: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070",
        title: "Exposure Drift",
        desc: "Игра света + Скорость",
        size: "w-full md:w-[50%]",
        align: "self-end -mt-32 md:-mt-40",
        effect: "exposure"
    }
];

export default function ImageGallery() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const items = gsap.utils.toArray(".gallery-item");

        items.forEach((item: any, i: number) => {
            const image = item.querySelector("img");
            const effectType = images[i].effect;

            let fromProps = {};
            let toProps = {};

            // Выбираем эффект для конкретной карточки
            switch (effectType) {
                case "zoom-in":
                    fromProps = { y: "-10%", scale: 1 };
                    toProps = { y: "10%", scale: 1.3 };
                    break;
                case "zoom-out":
                    fromProps = { y: "-20%", scale: 1.4 };
                    toProps = { y: "20%", scale: 1 };
                    break;
                case "tilt":
                    fromProps = { y: "-15%", scale: 1.2, rotation: -2, x: -20 };
                    toProps = { y: "15%", scale: 1.2, rotation: 2, x: 20 };
                    break;
                case "exposure":
                    fromProps = { y: "-25%", scale: 1.1, filter: "brightness(0.3) contrast(1.5)" };
                    toProps = { y: "25%", scale: 1.2, filter: "brightness(1.2) contrast(1)" };
                    break;
            }

            gsap.fromTo(image, fromProps, {
                ...toProps,
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2,
                }
            });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-zinc-950 py-40 px-6 sm:px-12 md:px-24 flex flex-col">
            <div className="max-w-[1400px] mx-auto w-full mb-20">
                <h2 className="text-blue-500 font-mono text-sm tracking-[0.5em] uppercase mb-4">
                    [ 03 / Prototype Lab ]
                </h2>
                <p className="text-zinc-500 max-w-sm text-xs uppercase leading-relaxed">
                    Тестирование различных механик взаимодействия с контентом для Sanarip 2026.
                </p>
            </div>

            <div className="flex flex-col w-full max-w-[1400px] mx-auto">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`gallery-item relative overflow-hidden bg-zinc-900 aspect-[4/3] md:aspect-[16/9] ${img.size} ${img.align} z-[${index}] group shadow-2xl`}
                    >
                        {/* Картинка */}
                        <img
                            src={img.url}
                            alt={img.title}
                            className="w-full h-[140%] object-cover absolute top-0 left-0 will-change-transform opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
                        />

                        {/* Инфо-блок */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent p-6 md:p-12 flex flex-col justify-end">
                            <span className="text-blue-500 font-mono text-xs mb-2">{img.desc}</span>
                            <h3 className="text-white text-2xl md:text-4xl font-bold uppercase tracking-tighter">
                                {img.title}
                            </h3>
                        </div>

                        {/* Технологичный декор */}
                        <div className="absolute top-0 right-0 p-4">
                            <div className="text-[10px] text-white/20 font-mono uppercase vertical-text">
                                System_Mode: {img.effect}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}