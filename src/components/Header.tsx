"use client";
import {useState, useEffect} from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion";

const links = [
    {path: '#', label: 'Услуги'},
    {path: '#', label: 'Проекты'},
    {path: '#', label: 'О компании'}
]

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToContact = (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({
                behavior: 'auto',
                block: 'start',
            });
        }
    };

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-6 md:px-12 h-[var(--header-height)] flex items-center",
                isScrolled
                    ? "bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm"
                    : "bg-zinc-950/80"
            )}
        >
            <div className="w-full max-w-[1400px] mx-auto flex justify-between items-center">

                <Link href='/' className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0 [perspective:1000px]">
                        <div className={cn(
                            "relative w-full h-full transition-transform duration-1000 [transform-style:preserve-3d]",
                            isScrolled ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
                        )}>
                            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                                <Image src="/images/logo/sd.webp" alt="Logo" width={48} height={48} priority/>
                            </div>
                            <div
                                className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                <Image src="/images/logo/sd-color.webp" alt="Logo Color" width={48} height={48}
                                       priority/>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center leading-[0.8]">
                        <span className={cn(
                            "relative text-xl md:text-2xl font-black tracking-tighter uppercase transition-all duration-700 ease-in-out",
                            isScrolled
                                // ? "text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B3B] via-[#FF8A00] via-[#FFE600] via-[#14FF00] to-[#0066FF]"
                                ? "text-black"
                                : "text-white"
                        )}>
                            SANARIP
                        </span>
                        <span className={cn(
                            "text-[9px] md:text-[11px] font-bold tracking-[0.4em] uppercase transition-all duration-500 mt-1",
                            isScrolled ? "text-zinc-500" : "text-zinc-500"
                        )}>
                            Dolboor
                        </span>
                    </div>
                </Link>

                {/* НАВИГАЦИЯ (Инверсия цветов) */}
                <div className={cn(
                    "hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest transition-colors duration-500",
                    isScrolled ? "text-zinc-800" : "text-white"
                )}>
                    <div className="flex items-center space-x-6 relative">
                        {links.map((item) => (
                            <motion.a
                                key={item.label}
                                href={item.path}
                                className="relative px-3 py-2 group overflow-hidden"
                                whileHover={{y: -2}} // Легкий подъем всей ссылки
                                whileTap={{y: 0}}
                            >
                                {/* Текстовый эффект (оставляем твой, он хорош) */}
                                <div className="relative z-10 overflow-hidden h-[1.2em]">
                                    <span
                                        className="block transition-transform duration-500 group-hover:-translate-y-full">{item.label}</span>
                                    <span className={cn(
                                        "absolute left-0 top-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0",
                                        isScrolled ? 'text-blue-600' : 'text-yellow-400'
                                    )}>{item.label}</span>
                                </div>

                                {/* Анимированная линия под ссылкой */}
                                <motion.div
                                    className={cn(
                                        "absolute bottom-0 left-0 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full",
                                        isScrolled ? "bg-blue-600" : "bg-yellow-400"
                                    )}
                                />
                            </motion.a>
                        ))}
                    </div>

                    <button onClick={scrollToContact} className="bg-blue-600 text-white px-6 py-2.5 rounded-sm hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                        Контакты
                    </button>
                </div>

                {/* Мобильная кнопка (черная для светлой темы) */}
                <div className="md:hidden w-6 h-6 flex flex-col justify-center gap-1.5 items-end cursor-pointer">
                    <div className="w-full h-[2px] bg-black"/>
                    <div className="w-2/3 h-[2px] bg-black"/>
                </div>
            </div>
        </nav>
    );
}