import "./globals.css";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
        <body className="antialiased">
        <SmoothScroll>
            <Header />
            {children}
        </SmoothScroll>
        </body>
        </html>
    );
}