"use client";
import {useState, useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {motion, AnimatePresence} from "framer-motion";
import GradientButton from "@/components/ui/GradientButton";

import {useLenis} from "lenis/react";

const links = [
    {path: '/projects', label: 'Проекты'},
    {path: '/about', label: 'О компании'},
    {path: '/vacancies', label: 'Вакансии'}
]

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const lenis = useLenis();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Блокируем скролл body при открытом меню
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const scrollToContact = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMenuOpen(false);

        if (lenis) {
            lenis.scrollTo('#footer', {
                duration: 1.6,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Beautiful exponential ease-out
            });
            return;
        }

        const element = document.getElementById('footer');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }

        // Если #footer на этой странице нет — уходим на главную и скроллим там
        if (pathname !== '/') {
            router.push('/#footer');
        }
    };

    // После навигации на главную (или загрузки главной с #footer в URL) — доскроллить
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (window.location.hash !== '#footer') return;

        const tryScroll = () => {
            if (lenis) {
                lenis.scrollTo('#footer', {
                    duration: 1.6,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
                return true;
            }
            const el = document.getElementById('footer');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return true;
            }
            return false;
        };

        if (tryScroll()) return;
        const t1 = setTimeout(tryScroll, 100);
        const t2 = setTimeout(tryScroll, 300);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [pathname, lenis]);

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 w-full z-[2147483647] md:z-[300] transition-all duration-500 ease-in-out px-4 sm:px-6 md:px-12 h-[var(--header-height)] flex items-center",
                    isScrolled || isMenuOpen
                        ? "bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm"
                        : "bg-zinc-950/80"
                )}
            >
                <div className="w-full max-w-[1400px] mx-auto flex justify-between items-center">

                    <Link href='/' className="flex items-center gap-2 cursor-pointer group" onClick={() => setIsMenuOpen(false)}>
                        <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0 [perspective:1000px]">
                            <div className={cn(
                                "relative w-full h-full transition-transform duration-1000 [transform-style:preserve-3d]",
                                isScrolled || isMenuOpen ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
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
                                "relative text-lg sm:text-xl md:text-2xl font-black tracking-tighter uppercase transition-all duration-700 ease-in-out",
                                isScrolled || isMenuOpen ? "text-black" : "text-white"
                            )}>
                                SANARIP
                            </span>
                            <span className={cn(
                                "text-[8px] sm:text-[9px] md:text-[11px] font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase transition-all duration-500 mt-1",
                                "text-zinc-500"
                            )}>
                                Dolboor
                            </span>
                        </div>
                    </Link>

                    {/* Десктоп навигация */}
                    <div className={cn(
                        "hidden md:flex items-center space-x-4 lg:space-x-8 text-sm font-bold uppercase tracking-widest transition-colors duration-500",
                        isScrolled ? "text-black" : "text-white"
                    )}>
                        <div className="flex items-center space-x-4 lg:space-x-6 relative">
                            {links.map((item) => (
                                <motion.a
                                    key={item.label}
                                    href={item.path}
                                    className="relative px-3 py-2 group overflow-hidden"
                                    whileHover={{y: -2}}
                                    whileTap={{y: 0}}
                                >
                                    <div className="relative z-10 overflow-hidden h-[1.2em]">
                                        <span
                                            className="block transition-transform duration-500 group-hover:-translate-y-full">{item.label}</span>
                                        <span className={cn(
                                            "absolute left-0 top-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0",
                                            isScrolled ? 'text-blue-600' : 'text-yellow-400'
                                        )}>{item.label}</span>
                                    </div>

                                    <motion.div
                                        className={cn(
                                            "absolute bottom-0 left-0 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full",
                                            isScrolled ? "bg-blue-600" : "bg-yellow-400"
                                        )}
                                    />
                                </motion.a>
                            ))}
                        </div>

                        <GradientButton
                            onClick={scrollToContact}
                            className="px-4 lg:px-6 py-2.5 text-xs uppercase"
                        >
                            Контакты
                        </GradientButton>
                    </div>

                    {/* Мобильная кнопка-бургер / крестик */}
                    <button
                        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen((v) => !v)}
                        className="md:hidden w-10 h-10 flex items-center justify-center cursor-pointer relative z-[2147483647]"
                    >
                        {isMenuOpen ? (
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-black"
                                aria-hidden="true"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        ) : (
                            <span className="flex flex-col items-end gap-1.5 w-7">
                                <span className={cn(
                                    "h-[2px] w-7 transition-colors duration-300",
                                    isScrolled ? "bg-black" : "bg-white"
                                )}/>
                                <span className={cn(
                                    "h-[2px] w-5 transition-colors duration-300",
                                    isScrolled ? "bg-black" : "bg-white"
                                )}/>
                                <span className={cn(
                                    "h-[2px] w-3 transition-colors duration-300",
                                    isScrolled ? "bg-black" : "bg-white"
                                )}/>
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            {/* Мобильный дровер */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.25}}
                        className="md:hidden fixed inset-0 z-[2147483645] bg-white pt-[var(--header-height)]"
                    >
                        <motion.div
                            initial={{y: -20, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            exit={{y: -20, opacity: 0}}
                            transition={{delay: 0.05, duration: 0.3, ease: "easeOut"}}
                            className="h-full flex flex-col justify-between px-6 py-10"
                        >
                            <ul className="flex flex-col gap-6">
                                {links.map((item, i) => (
                                    <motion.li
                                        key={item.label}
                                        initial={{x: -20, opacity: 0}}
                                        animate={{x: 0, opacity: 1}}
                                        transition={{delay: 0.1 + i * 0.07}}
                                    >
                                        <Link
                                            href={item.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block text-3xl sm:text-4xl font-black uppercase tracking-tighter text-black hover:text-blue-600 transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="flex flex-col gap-4">
                                <GradientButton
                                    onClick={scrollToContact}
                                    className="w-full py-4 text-sm uppercase tracking-[0.2em]"
                                >
                                    Контакты
                                </GradientButton>
                                <div className="text-zinc-500 text-xs font-mono uppercase tracking-widest text-center">
                                    © SANARIP DOLBOOR
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
