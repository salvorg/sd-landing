"use client";
import React from 'react';
import Image from 'next/image';

const logos = [
    { src: '/images/logo/partners/giz-logo.png', alt: 'Partner giz' },
    { src: '/images/logo/partners/kato-logo.png', alt: 'Partner kato' },
    { src: '/images/logo/partners/koica-logo.png', alt: 'Partner koica' },
    { src: '/images/logo/partners/pir-logo.png', alt: 'Partner pir' },
    { src: '/images/logo/partners/pkr-logo.png', alt: 'Partner pkr' },
    { src: '/images/logo/partners/resource-logo.png', alt: 'Partner resource' },
    { src: '/images/logo/partners/tokoi-logo.png', alt: 'Partner tokoi' },
    { src: '/images/logo/partners/undp-logo.png', alt: 'Partner undp' },
    { src: '/images/logo/partners/wbg-logo-ru.png', alt: 'Partner wbg' },
];

export default function TrustedBySection() {
    return (
        <section className="relative pt-18 pb-32 bg-[var(--bg-main)] overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 mb-12">
                <p className="text-[18px] text-center font-bold uppercase tracking-[0.3em] text-[var(--text-muted)] opacity-60">
                    Нам доверяют лидеры
                </p>
            </div>

            {/* Контейнер с градиентами-заглушками по бокам */}
            <div className="relative flex overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-[var(--bg-main)] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-[var(--bg-main)] after:to-transparent">

                {/* Анимированная лента */}
                <div className="flex animate-infinite-scroll whitespace-nowrap hover:[animation-play-state:paused]">
                    {/* Дублируем массив дважды для бесшовности */}
                    {[...logos, ...logos].map((logo, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center min-w-[200px] px-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={160}
                                height={60}
                                className="object-contain h-12 w-auto pointer-events-none"
                                priority={index < 8}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}