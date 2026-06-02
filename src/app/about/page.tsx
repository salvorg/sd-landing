import type { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'О компании — Санарип Долбоор',
    description:
        'ОсОО «Санарип Долбоор» — системный интегратор EdTech в Кыргызстане с 2019 года. Резиденты Парка Креативных Индустрий. Внедряем системы национального масштаба, консультируем по цифровой трансформации.',
    alternates: { canonical: '/about' },
    openGraph: {
        title: 'О компании — Санарип Долбоор',
        description:
            'Команда экспертов EdTech и цифровой трансформации. Миссия, ценности и история ОсОО «Санарип Долбоор».',
        url: '/about',
        type: 'website',
    },
};

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-[#0045FF] text-white px-1 py-0.5 leading-6 font-medium">{children}</span>
);

export default function AboutPage() {
    return (
        <main className="bg-white min-h-screen pt-24 sm:pt-30 pb-16 sm:pb-24 font-sans overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 relative">

                {/* ЗАГОЛОВОК СТРАНИЦЫ */}
                <div className="flex items-center justify-between gap-4 mb-12 sm:mb-20 mt-4 sm:mt-10">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-muted-dark leading-none tracking-wide whitespace-nowrap">
                        О компании
                    </h1>
                    <div className="h-[1px] bg-muted-dark flex-1 mt-2"></div>
                </div>

                {/* 1. HERO SECTION */}
                <section className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 mb-16 sm:mb-20">
                    <div className="w-full md:w-2/5 flex flex-col">
                        <h2 className="text-lg sm:text-xl font-bold text-center md:text-left text-muted-dark mb-4 sm:mb-5.5">
                            ОсОО «Санарип Долбоор»: Инновации в EdTech и автоматизации бизнеса
                        </h2>

                        <div className="text-muted-dark text-base sm:text-lg md:text-xl leading-relaxed space-y-4 font-normal">
                            <p>
                                Основанная в 2019 году как объединение профессионалов-единомышленников, компания «Санарип Долбоор» сегодня является ведущим системным интегратором в сфере EdTech в Кыргызской Республике. Мы гордимся тем, что наша команда, состоящая преимущественно из женщин-экспертов, привносит уникальный взгляд и многогранный опыт в каждый проект.
                            </p>
                            <p>
                                Являясь резидентами Парка Креативных Индустрий, мы специализируемся на внедрении систем национального масштаба и консалтинге в области цифровой трансформации. Нам доверяют крупнейшие международные компании, с которыми мы строим долгосрочные партнерские отношения, основанные на надежности и технологическом превосходстве.
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 relative aspect-[8/7]">
                        <Image
                            src="/images/gallery/about-15.jpeg"
                            alt="Санарип Долбоор"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </section>

                {/* 2. НАША МИССИЯ */}
                <section className="flex flex-col md:flex-row justify-between gap-10 md:gap-12 mb-20 sm:mb-32">
                    <div className="w-full md:w-2/5 relative aspect-[4/3] order-2 md:order-1">
                        <Image
                            src="/images/gallery/about-14.jpeg"
                            alt="Миссия компании"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col order-1 md:order-2">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-muted-dark leading-tight md:leading-[4.7rem] mb-6 sm:mb-10 md:text-right whitespace-nowrap">
                            Наша <span className="[-webkit-text-fill-color:var(--bg-main)] [-webkit-text-stroke:2px_var(--text-main)] [paint-order:stroke_fill]">миссия</span>
                        </h2>

                        <p className="text-muted-dark text-base sm:text-lg md:text-xl leading-relaxed md:leading-6 font-normal">
                            Мы стремимся стать <Highlight>катализатором цифровой трансформации</Highlight> в Кыргызстане и за его пределами.
                            Наша цель — делать сложные технологии интуитивно понятными, образование — непрерывным и доступным,
                            а процессы в государственных и общественных институтах — прозрачными и эффективными.
                            Мы верим, что через качественные IT-продукты и профессиональный контент мы <Highlight>улучшаем жизнь людей</Highlight> и
                            открываем новые возможности для развития страны.
                        </p>
                    </div>
                </section>

                {/* 3. НАШИ ЦЕННОСТИ */}
                <section className="mb-16 sm:mb-24">
                    <div className="flex items-center justify-between gap-4 mb-8 sm:mb-11 md:pl-24">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-muted-dark leading-tight md:leading-[4.7rem] whitespace-nowrap">
                            <span className="[-webkit-text-fill-color:var(--bg-main)] [-webkit-text-stroke:2px_var(--text-main)] [paint-order:stroke_fill]">Наши</span> ценности
                        </h2>
                        <div className="h-[1px] bg-muted-dark flex-1 mt-2"></div>
                    </div>

                    <p className="text-muted-dark text-base sm:text-lg md:text-xl leading-tight max-w-xl mb-12 sm:mb-20 md:pl-24 font-normal">
                        В эпоху цифровой трансформации правильные технологии способны решать масштабные задачи.<br />
                        Вот <Highlight>5 принципов</Highlight>, на которых строятся все наши проекты.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-10 gap-y-10 sm:gap-y-16">
                        {[
                            <>Создаем не просто красивые концепции, а устойчивые<br /><Highlight>решения, которые работают</Highlight><br /> в реальной жизни и приносят пользу.</>,
                            <>Делаем сложные технологии и знания<br /><Highlight>простыми и доступными</Highlight><br /> для всех.</>,
                            <>Соединяем международные стандарты и точное понимание<br /><Highlight>местного контекста.</Highlight></>,
                            <>Закрываем все задачи<br /><Highlight>от IT до контента,</Highlight><br /> сдавая проекты под ключ.</>,
                            <>Запускаем продукты, которые обучают людей и<br /><Highlight>меняют общество к лучшему.</Highlight></>,
                        ].map((content, idx) => (
                            <div key={idx} className="flex items-start gap-5 sm:gap-7.5">
                                <div className="text-[4rem] sm:text-[5rem] md:text-[6.6rem] min-w-[4rem] sm:min-w-[6rem] md:min-w-33 overflow-hidden text-muted-dark font-medium leading-[0.8] flex-shrink-0">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                                <div className="text-muted-dark flex-1 text-base sm:text-lg leading-6 mt-1 pr-2 sm:pr-4 font-normal">
                                    {content}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
