"use client";
import { useRef } from "react";

export default function About2() {
    const gridRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!gridRef.current) return;
        const rect = gridRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Устанавливаем переменные для всего контейнера
        gridRef.current.style.setProperty("--x", `${x}px`);
        gridRef.current.style.setProperty("--y", `${y}px`);
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative min-h-screen bg-zinc-950 overflow-hidden py-24 flex items-center group/grid"
        >
            {/* 1. БАЗОВАЯ СЕТКА (Тусклые линии) */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '100px 100px'
                }}
            />

            {/* 2. СЛОЙ ПОДСВЕТКИ (Светится под мышкой) */}
            <div
                ref={gridRef}
                className="absolute inset-0 pointer-events-none opacity-0 group-hover/grid:opacity-100 transition-opacity duration-500"
                style={{
                    // Рисуем яркую сетку
                    backgroundImage: `
                        linear-gradient(to right, #3b82f6 1px, transparent 1px),
                        linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
                    `,
                    backgroundSize: '100px 100px',
                    // МАСКА: Она ограничивает видимость яркой сетки только кругом вокруг мыши
                    WebkitMaskImage: `radial-gradient(250px circle at var(--x) var(--y), black 20%, transparent 100%)`,
                    maskImage: `radial-gradient(250px circle at var(--x) var(--y), black 20%, transparent 100%)`,
                }}
            />

            {/* 3. МЯГКОЕ ВНУТРЕННЕЕ СВЕЧЕНИЕ (Глоу) */}
            <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover/grid:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(250px circle at var(--x) var(--y), rgba(59, 130, 246, 0.1), transparent 80%)`,
                }}
            />

            {/* КОНТЕНТ */}
            <div className="container mx-auto px-6 md:px-12 relative z-10 pointer-events-none">
                <div className="max-w-4xl">
                    <h2 className="text-blue-500 font-mono text-sm tracking-[0.5em] mb-8 uppercase">[ 02 / Vision ]</h2>
                    <p className="text-5xl md:text-8xl font-bold text-white uppercase tracking-tighter leading-none mb-6">
                        Цифровая <br /> <span className="text-blue-600 italic">Свобода</span>
                    </p>
                    <p className="text-zinc-500 text-xl max-w-lg font-light">
                        Мы создаем системы, которые работают незаметно, но эффективно, как эта сетка.
                    </p>
                </div>
            </div>
        </section>
    );
}