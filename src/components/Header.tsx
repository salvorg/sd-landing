"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Хедер меняет состояние, как только мы отъехали на 20px от верха
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-6 md:px-12",
                // Теперь хедер всегда translate-y-0 (на месте)
                "translate-y-0",
                // Стили меняются плавно
                isScrolled
                    ? "py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
                    : "py-4 bg-transparent"
            )}
        >
            <div className="max-w-[1400px] mx-auto flex justify-between items-center">

                {/* Логотип */}
                <div className="flex items-center gap-4 cursor-pointer group">
                    {/* Контейнер для иконок */}
                    <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0 [perspective:1000px] group">
                        {/* Контейнер-вращатель */}
                        <div className={cn(
                            "relative w-full h-full transition-transform duration-1000 [transform-style:preserve-3d]",
                            isScrolled ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
                        )}>

                            {/* Передняя сторона: Белый логотип */}
                            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                                <Image
                                    src="/images/logo/sd.webp"
                                    alt="Sanarip Icon White"
                                    width={48}
                                    height={48}
                                    priority
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Задняя сторона: Цветной логотип */}
                            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                <Image
                                    src="/images/logo/sd-color.webp"
                                    alt="Sanarip Icon Color"
                                    width={48}
                                    height={48}
                                    priority
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Текстовая часть — теперь она снаружи контейнера иконок */}
                    <div className="flex flex-col justify-center leading-[0.8]">
                        <span className="relative text-xl md:text-2xl font-black tracking-tighter uppercase text-zinc-400">
                            {/* Основной текст (серый) */}
                            SANARIP

                            {/* Слой с градиентом сверху */}
                            <span className={cn(
                                "absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent transition-opacity duration-1000",
                                isScrolled ? "opacity-100" : "opacity-0"
                            )}>
                                SANARIP
                            </span>
                        </span>
                        <span className={cn(
                            "text-[9px] md:text-[11px] font-light tracking-[0.4em] uppercase transition-all duration-500 mt-1",
                            isScrolled ? "text-blue-500" : "text-zinc-400"
                        )}>
                            Dolboor
                        </span>
                    </div>
                </div>

                {/* Навигация */}
                <div className="hidden md:flex items-center space-x-10 text-sm font-medium uppercase tracking-widest text-white">
                    {["Projects", "Vision", "Data"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="relative group overflow-hidden py-1"
                        >
                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                                {item}
                            </span>
                            <span className="absolute left-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-blue-500">
                                {item}
                            </span>
                        </a>
                    ))}

                    <button className="text-[10px] border border-white/20 rounded-md px-2 py-1 hover:bg-white hover:text-black transition-colors">
                        KG / RU
                    </button>

                    <a
                        href="#contact"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-sm transition-all active:scale-95 shadow-lg shadow-blue-900/20"
                    >
                        Contact
                    </a>
                </div>

                {/* Мобильная кнопка */}
                <div className="md:hidden w-6 h-6 flex flex-col justify-center gap-1.5 items-end cursor-pointer">
                    <div className="w-full h-[1.5px] bg-white" />
                    <div className="w-2/3 h-[1.5px] bg-white" />
                </div>
            </div>
        </nav>
    );
}