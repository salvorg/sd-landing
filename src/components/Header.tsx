"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-6 md:px-12 h-[var(--header-height)] flex items-center",
                isScrolled
                    ? "bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm" // Светлая тема при скролле
                    : "bg-zinc-950/80"
            )}
        >
            <div className="w-full max-w-[1400px] mx-auto flex justify-between items-center">

                {/* ЛОГОТИП (Цвета адаптированы под светлую тему) */}
                <div className="flex items-center gap-4 cursor-pointer group">
                    <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0 [perspective:1000px]">
                        <div className={cn(
                            "relative w-full h-full transition-transform duration-1000 [transform-style:preserve-3d]",
                            isScrolled ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
                        )}>
                            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                                <Image src="/images/logo/sd.webp" alt="Logo" width={48} height={48} priority />
                            </div>
                            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                <Image src="/images/logo/sd-color.webp" alt="Logo Color" width={48} height={48} priority />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center leading-[0.8]">
                        <span className={cn(
                            "relative text-xl md:text-2xl font-black tracking-tighter uppercase transition-colors duration-500",
                            isScrolled ? "text-black" : "text-black" // В светлой теме всегда черный или темный
                        )}>
                            SANARIP
                        </span>
                        <span className={cn(
                            "text-[9px] md:text-[11px] font-bold tracking-[0.4em] uppercase transition-all duration-500 mt-1",
                            isScrolled ? "text-blue-600" : "text-zinc-500"
                        )}>
                            Dolboor
                        </span>
                    </div>
                </div>

                {/* НАВИГАЦИЯ (Инверсия цветов) */}
                <div className={cn(
                    "hidden md:flex items-center space-x-10 text-sm font-bold uppercase tracking-widest transition-colors duration-500",
                    isScrolled ? "text-black" : "text-zinc-800"
                )}>
                    {["Projects", "Vision", "Data"].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="relative group overflow-hidden py-1">
                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{item}</span>
                            <span className="absolute left-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-blue-600">{item}</span>
                        </a>
                    ))}

                    <button className="text-[10px] border border-black/10 rounded-md px-2 py-1 hover:bg-black hover:text-white transition-colors">
                        KG / RU
                    </button>

                    <a href="#contact" className="bg-blue-600 text-white px-6 py-2.5 rounded-sm hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                        Contact
                    </a>
                </div>

                {/* Мобильная кнопка (черная для светлой темы) */}
                <div className="md:hidden w-6 h-6 flex flex-col justify-center gap-1.5 items-end cursor-pointer">
                    <div className="w-full h-[2px] bg-black" />
                    <div className="w-2/3 h-[2px] bg-black" />
                </div>
            </div>
        </nav>
    );
}