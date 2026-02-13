import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import About2 from "@/components/sections/About2";
import ImageGallery from "@/components/sections/ImageGallery";
import ServicesSection from "@/components/sections/ServicesSection";

export default function Home() {
    return (
        <main className="relative w-full">
            <Hero />
            <About />
            <About2 />
            <ImageGallery />
            <ServicesSection />
            {/* Секция 1: Hero */}
            <section className="flex h-screen w-full items-center justify-center bg-zinc-950">
                <h1 className="text-8xl font-bold tracking-tighter text-white">
                    FUTURE
                </h1>
            </section>

            {/* Секция 2: Для проверки скролла и Хедера */}
            <section className="flex h-screen w-full items-center justify-center bg-white text-black">
                <h2 className="text-5xl font-medium tracking-tight">
                    SCROLL EXPERIENCE
                </h2>
            </section>

            {/* Секция 3 */}
            <section className="h-screen w-full bg-zinc-100" />
        </main>
    );
}