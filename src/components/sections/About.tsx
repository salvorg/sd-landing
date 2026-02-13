"use client";

import { useRef, useEffect, useCallback } from "react";
import { GridItem } from "./GridItem";

type Cell = {
    el: HTMLElement;
    x: number;
    y: number;
    current: number;
    target: number;
};

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const cellsRef = useRef<Cell[]>([]);
    const rafRef = useRef<number>(0);
    const lastShuffleRef = useRef(0);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const cells = Array.from(container.children) as HTMLElement[];

        // КЭШИРУЕМ ГЕОМЕТРИЮ ОДИН РАЗ
        cellsRef.current = cells.map((el) => {
            const rect = el.getBoundingClientRect();
            return {
                el,
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
                current: 0,
                target: 0,
            };
        });

        const radius = 80;
        const radiusSq = radius * radius;
        const lerp = 0.08;

        const update = (time: number) => {
            const { x, y } = mouseRef.current;

            if (time - lastShuffleRef.current > 120) {
                lastShuffleRef.current = time;

                // сбрасываем цели
                for (const c of cellsRef.current) {
                    c.target = 0;
                }

                const near: Cell[] = [];

                for (const c of cellsRef.current) {
                    const dx = x - c.x;
                    const dy = y - c.y;
                    if (dx * dx + dy * dy < radiusSq) {
                        near.push(c);
                    }
                }

                const count = Math.min(
                    near.length,
                    3 + ((Math.random() * 5) | 0)
                );

                for (let i = 0; i < count; i++) {
                    const c = near[(Math.random() * near.length) | 0];
                    c.target = 0.4 + Math.random() * 0.6;
                }
            }

            // инерция — каждый кадр
            for (const c of cellsRef.current) {
                c.current += (c.target - c.current) * lerp;

                if (c.current > 0.001) {
                    c.el.style.setProperty("--i", c.current.toString());
                } else {
                    c.el.style.removeProperty("--i");
                }
            }

            rafRef.current = requestAnimationFrame(update);
        };

        rafRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative min-h-screen bg-zinc-950 overflow-hidden py-24 flex items-center"
        >
            {/* GRID */}
            <div
                ref={containerRef}
                className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] border-l border-t border-white/10"
            >
                {Array.from({ length: 900 }).map((_, i) => (
                    <GridItem key={i} />
                ))}
            </div>

            {/* CONTENT */}
            <div className="container mx-auto px-6 md:px-12 relative z-10 pointer-events-none">
                <h2 className="text-blue-500 font-mono text-sm tracking-[0.5em] mb-8">
                    [ 02 / NETWORK ]
                </h2>

                <p className="text-5xl md:text-8xl font-bold text-white uppercase tracking-tighter leading-none">
                    Связанная <br />
                    <span className="text-zinc-800">инфраструктура</span>
                </p>
            </div>
        </section>
    );
}
