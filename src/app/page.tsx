import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import About2 from "@/components/sections/About2";
import ImageGallery from "@/components/sections/ImageGallery";
import ServicesSection from "@/components/sections/ServicesSection";
import PixelFashionSection from "@/components/sections/PixelFashionSection";
import DreamyScroll from "@/components/sections/DreamyScroll";
import ColumnRevealSection from "@/components/sections/ColumnRevealSection";

export default function Home() {
    return (
        <main className="relative w-full">
            <Hero />
            {/*<ColumnRevealSection />*/}
            <DreamyScroll />
            {/*<About />*/}
            <About2 />
            <ImageGallery />
            <ServicesSection />
            <PixelFashionSection />
            {/* Секция 1: Hero */}
            <section className="flex h-screen w-full items-center justify-center bg-zinc-950">
                <h1 className="text-8xl font-bold tracking-tighter text-white">
                    FUTURE
                </h1>
            </section>
        </main>
    );
}