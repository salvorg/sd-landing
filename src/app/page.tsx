import dynamic from 'next/dynamic';
import Hero from "@/components/sections/Hero";
import Hero2 from "@/components/sections/Hero2";
import About from "@/components/sections/About";
import About2 from "@/components/sections/About2";
import ImageGallery from "@/components/sections/ImageGallery";
import ServicesSection from "@/components/sections/ServicesSection";
import PixelFashionSection from "@/components/sections/PixelFashionSection";
import DreamyScroll from "@/components/sections/DreamyScroll";
import DreamersReplication from "@/components/sections/DreamersReplication";
import ContactUs from "@/components/sections/ContactUs";

const OurHelpSection = dynamic(() => import("@/components/sections/OurHelpSection"), { ssr: true });
const StatsSection = dynamic(() => import("@/components/sections/StatsSection"), { ssr: true });
const TrustedBySection = dynamic(() => import("@/components/sections/TrustedBySection"), { ssr: true });

export default function Home() {
    return (
        <main className="relative w-full">
            <Hero/>
            <OurHelpSection />
            <StatsSection />
            <TrustedBySection />
            {/*<Hero2 />*/}
            {/*<ColumnRevealSection />*/}
            {/*<DreamersReplication />*/}
            {/*<DreamyScroll />*/}
            {/*<About />*/}
            {/*<About2 />*/}
            {/*<ImageGallery />*/}
            {/*<ServicesSection />*/}
            {/*<PixelFashionSection />*/}
            {/* Секция 1: Hero */}
            <ContactUs />
            {/*<section className="flex h-screen w-full items-center justify-center bg-zinc-950">*/}
            {/*    <h1 className="text-8xl font-bold tracking-tighter text-white">*/}
            {/*        FUTURE*/}
            {/*    </h1>*/}
            {/*</section>*/}
        </main>
    );
}