import { Montserrat } from 'next/font/google';
import "./globals.css";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";

const montserrat = Montserrat({
    subsets: ['latin', 'cyrillic'], // Обязательно добавь кириллицу для "Sanarip"
    weight: ['400', '500', '600', '700', '800', '900'],
    variable: '--font-montserrat', // Создаем CSS-переменную
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru" className={montserrat.variable}>
        <body className="antialiased">
        <SmoothScroll>
            <Header />
            {children}
        </SmoothScroll>
        </body>
        </html>
    );
}