import { Montserrat } from 'next/font/google';
import "./globals.css";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import React from "react";

const montserrat = Montserrat({
    subsets: ['latin', 'cyrillic'], // Обязательно добавь кириллицу для "Sanarip"
    weight: ['400', '500', '600', '700', '800', '900'],
    variable: '--font-montserrat', // Создаем CSS-переменную
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru" className={montserrat.variable}>
        {/* Добавляем overflow-x-hidden сюда, чтобы пресечь любые попытки расширить экран */}
        <body className="antialiased overflow-x-hidden bg-zinc-950">
        <Header /> {/* Выносим за пределы SmoothScroll */}
        <SmoothScroll>
            {children}
        </SmoothScroll>
        </body>
        </html>
    );
}