"use client";
import { useState } from "react";

const realmCollections = [
    {
        title: "Nomadic Trails",
        subtitle: "Heritage of the Desert",
        img1: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1000",
        img2: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=1000",
    },
    {
        title: "Urban Jungle",
        subtitle: "Future Possibilities",
        img1: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000",
        img2: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1000",
    },
    {
        title: "Digital Realm",
        subtitle: "Metaverse Couture",
        img1: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000",
        img2: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000",
    }
];

export default function PixelFashionSection() {
    return (
        <section className="bg-[#050505] py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-white text-xs font-mono tracking-[0.7em] uppercase mb-4">/ The Future of Fashion</h2>
                    <p className="text-zinc-500 max-w-xl text-sm leading-relaxed uppercase tracking-widest italic">
                        Step into the future where each collection is a doorway to a different realm.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {realmCollections.map((item, i) => (
                        <PixelCard key={i} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function PixelCard({ item }: { item: any }) {
    const [isHovered, setIsHovered] = useState(false);

    // Создаем сетку 10x10 для эффекта "пиксельного" появления
    const gridSize = 10;
    const pixels = Array.from({ length: gridSize * gridSize });

    return (
        <div
            className="group relative cursor-crosshair"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 shadow-2xl">
                {/* ПЕРВОЕ ИЗОБРАЖЕНИЕ (Базовое) */}
                <img
                    src={item.img1}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* ВТОРОЕ ИЗОБРАЖЕНИЕ (Слой с маской) */}
                <div
                    className="absolute inset-0 w-full h-full z-10"
                    style={{
                        clipPath: isHovered ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
                        transition: 'clip-path 0.1s step-end' // Мгновенное переключение для синхронизации с пикселями
                    }}
                >
                    <img
                        src={item.img2}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* СЛОЙ ПИКСЕЛЬНОЙ АНИМАЦИИ */}
                <div className="absolute inset-0 z-20 grid grid-cols-10 grid-rows-10 pointer-events-none">
                    {pixels.map((_, i) => (
                        <div
                            key={i}
                            className="bg-[#050505] transition-all duration-300"
                            style={{
                                opacity: 0,
                                outline: isHovered ? '1px solid rgba(59, 130, 246, 0.5)' : 'none',
                                backgroundColor: isHovered ? 'transparent' : '#050505',
                                // Эффект случайного "проявления" пикселей
                                transitionDelay: isHovered
                                    ? `${Math.random() * 600}ms`
                                    : `${Math.random() * 200}ms`,
                                transform: isHovered ? 'scale(0)' : 'scale(1.05)'
                            }}
                        />
                    ))}
                </div>

                {/* Дополнительный оверлей-шум */}
                <div className="absolute inset-0 z-30 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <div className="mt-8 space-y-3 transition-transform duration-500 group-hover:translate-x-2">
                <div className="flex items-center gap-4">
                    <div className="h-[1px] w-8 bg-blue-600" />
                    <p className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em]">{item.subtitle}</p>
                </div>
                <h3 className="text-white text-2xl font-light uppercase tracking-tighter">{item.title}</h3>
            </div>
        </div>
    );
}