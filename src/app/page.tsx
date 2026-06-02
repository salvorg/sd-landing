"use client";
import {useEffect, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';
import Hero from "@/components/sections/Hero";
import ContactUs from "@/components/sections/ContactUs";
import Preloader from "@/components/Preloader";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import LazySection from "@/components/ui/LazySection";

const OurHelpSection = dynamic(() => import("@/components/sections/OurHelpSection"), { ssr: true });
const StatsSection = dynamic(() => import("@/components/sections/StatsSection"), { ssr: true });
const TrustedBySection = dynamic(() => import("@/components/sections/TrustedBySection"), { ssr: true });
const ProjectSection = dynamic(() => import("@/components/sections/ProjectSection"), { ssr: true });

// Глобальная переменная в области видимости модуля для мгновенного отслеживания на клиенте
let hasLoadedOnceGlobal = false;

export default function Home() {
    // Чтобы избежать hydration mismatch (несоответствия разметки сервера и клиента),
    // изначально ставим true (для SSR), но если глобально на клиенте уже загружалось — ставим false сразу.
    const [isLoading, setIsLoading] = useState(() => {
        return !hasLoadedOnceGlobal;
    });
    const lenis = useLenis();

    useEffect(() => {
        // Если в сессии браузера уже есть флаг завершения прелоадера, пропускаем его
        if (typeof window !== "undefined" && sessionStorage.getItem("hasLoadedOnce")) {
            hasLoadedOnceGlobal = true;
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isLoading) {
            lenis?.stop();
            document.documentElement.classList.add('lenis-stopped');
        } else {
            const timer = setTimeout(() => {
                document.documentElement.classList.remove('lenis-stopped');
                lenis?.start();

                window.scrollTo(0, 0);
                ScrollTrigger.refresh();
            }, 800);

            return () => clearTimeout(timer);
        }
    }, [isLoading, lenis]);

    useEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
    }, []);

    const handlePreloaderComplete = () => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem("hasLoadedOnce", "true");
        }
        hasLoadedOnceGlobal = true;
        setIsLoading(false);
    };

    return (
        <main className="relative w-full bg-zinc-950">
            <AnimatePresence>
                {isLoading && (
                    <Preloader onComplete={handlePreloaderComplete} />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full overflow-hidden"
            >
                <Hero/>
                
                <LazySection className="min-h-[340vh] md:min-h-[400vh]">
                    <OurHelpSection />
                </LazySection>

                <LazySection minHeight="100vh">
                    <StatsSection />
                </LazySection>

                <LazySection minHeight="300px">
                    <TrustedBySection />
                </LazySection>

                <LazySection minHeight="100vh">
                <ProjectSection />
                </LazySection>

                <ContactUs />
            </motion.div>
        </main>
    );
}
