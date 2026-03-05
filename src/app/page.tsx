"use client";
import {useEffect, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';
import Hero from "@/components/sections/Hero";
import ContactUs from "@/components/sections/ContactUs";
import Preloader from "@/components/Preloader";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

const OurHelpSection = dynamic(() => import("@/components/sections/OurHelpSection"), { ssr: true });
const StatsSection = dynamic(() => import("@/components/sections/StatsSection"), { ssr: true });
const TrustedBySection = dynamic(() => import("@/components/sections/TrustedBySection"), { ssr: true });

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const lenis = useLenis();

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
            }, 1100);

            return () => clearTimeout(timer);
        }
    }, [isLoading, lenis]);

    useEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
    }, []);

    return (
        <main className="relative w-full bg-zinc-950">
            <AnimatePresence>
                {isLoading && (
                    <Preloader onComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full overflow-hidden"
            >
                <Hero/>
                <OurHelpSection />
                <StatsSection />
                <TrustedBySection />
                <ContactUs />
            </motion.div>
        </main>
    );
}