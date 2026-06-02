"use client";
import Image from 'next/image';

const logos = [
    { src: '/images/logo/partners/giz-logo.png', alt: 'GIZ Kyrgyzstan', url: 'https://www.giz.de/en/weltweit/356.html' },
    { src: '/images/logo/partners/kato-logo.png', alt: 'KATO', url: 'https://kato.kg' },
    { src: '/images/logo/partners/koica-logo.png', alt: 'KOICA', url: 'https://www.koica.go.kr/sites/kgz_en/index.do' },
    { src: '/images/logo/partners/pir-logo.png', alt: 'PKI', url: 'https://pki.kg' },
    { src: '/images/logo/partners/resource-logo.png', alt: 'RCE', url: 'http://rce.kg' },
    { src: '/images/logo/partners/tokoi-logo.png', alt: 'KAFLU', url: 'https://kaflu.kg' },
    { src: '/images/logo/partners/undp-logo.png', alt: 'UNDP Kyrgyzstan', url: 'https://www.undp.org/kyrgyzstan' },
    { src: '/images/logo/partners/wbg-logo-ru.png', alt: 'World Bank', url: 'https://www.worldbank.org/en/country/kyrgyzrepublic' },
];

const scrollingLogos = [...logos, ...logos];

export default function TrustedBySection() {
    return (
        <section className="relative pt-18 pb-32 bg-[var(--bg-main)] overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 mb-18">
                <h3 className="text-4xl font-black text-muted-dark text-center uppercase leading-none mb-5">
                    НАМ ДОВЕРЯЮТ ЛИДЕРЫ
                </h3>
            </div>

            {/* Контейнер с градиентами-заглушками по бокам */}
            <div className="relative flex overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-[var(--bg-main)] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-[var(--bg-main)] after:to-transparent">

                {/* Анимированная лента */}
                <div
                    className="flex animate-infinite-scroll whitespace-nowrap hover:[animation-play-state:paused]"
                    // Подсказка браузеру — этот элемент будет трансформироваться
                    style={{ willChange: 'transform' }}
                >
                    {scrollingLogos.map((logo, index) => (
                        <a
                            key={index}
                            href={logo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center min-w-[200px] px-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={200}
                                height={120}
                                className="object-contain h-20 w-auto"
                                // priority только для первых 9 (первый видимый набор),
                                // остальные 9 — дубликаты, грузятся лениво
                                priority={index < logos.length}
                                // Явный размер избавляет Next.js от лишних вычислений
                                sizes="160px"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
