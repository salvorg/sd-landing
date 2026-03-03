"use client";
import { useEffect, useRef } from "react";

const SNIPPETS = [
    "function sync() { return blockchain.getHistory(id); }",
    "const data = await fabric.evaluate('GetAllAssets');",
    "template <typename T> class SanaripNode { T value; };",
    "def analyze_traffic(stream): return stream.map(ai.predict)",
    "pub fn connect_gateway(cfg: Config) -> Result<Channel, Error>",
    "interface SmartContract { execute(ctx: Context): void; }",
    "go func() { network.Listen(':8080') }()",
    "document.querySelectorAll('.reveal-col').forEach(anim);",
    "function sync() { return blockchain.getHistory(id); }",
    "const data = await fabric.evaluate('GetAllAssets');",
    "template <typename T> class SanaripNode { T value; };",
    "def analyze_traffic(stream): return stream.map(ai.predict)",
    "pub fn connect_gateway(cfg: Config) -> Result<Channel, Error>",
    "interface SmartContract { execute(ctx: Context): void; }",
    "go func() { network.Listen(':8080') }()",
    "document.querySelectorAll('.reveal-col').forEach(anim);",
];

export const ITBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const spawnCode = () => {
            const el = document.createElement("div");
            const code = SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)];

            // Стилизация строки
            el.innerText = code;
            el.style.position = "absolute";
            el.style.left = Math.random() * 80 + "%";
            el.style.top = Math.random() * 90 + "%";
            el.style.fontSize = Math.floor(Math.random() * 4 + 12) + "px";
            el.style.fontFamily = "'Fira Code', monospace";
            el.style.color = "rgba(45, 91, 255, 0.65)"; // Тот самый синий Sanarip, но очень бледный
            el.style.whiteSpace = "nowrap";
            el.style.pointerEvents = "none";
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
            el.style.transition = "all 2s ease-in-out";

            container.appendChild(el);

            // Анимация появления и исчезновения
            setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }, 100);

            setTimeout(() => {
                el.style.opacity = "0";
                el.style.transform = "translateY(-20px)";
                setTimeout(() => el.remove(), 2000);
            }, 4000);
        };

        // Интервал появления новых строк
        const interval = setInterval(spawnCode, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: -1, background: "#f8fafc" }}
        />
    );
};