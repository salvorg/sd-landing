import type { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Вакансии',
    description:
        'Открытые позиции и сотрудничество с командой Санарип Долбоор: разработчики, дизайнеры, операторы и другие специалисты EdTech и видеопроизводства.',
    alternates: { canonical: '/vacancies' },
    openGraph: {
        title: 'Вакансии — Санарип Долбоор',
        description:
            'Открытые двери для талантов: присоединяйся к команде EdTech-интегратора Санарип Долбоор.',
        url: '/vacancies',
        type: 'website',
    },
};

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-[#0045FF] text-white px-1 leading-normal font-medium">{children}</span>
);

export default function VacanciesPage() {
    return (
        <main className="bg-[#F9F9F9] pt-24 sm:pt-30 pb-32 sm:pb-52 font-sans">
            <div className="w-full container mx-auto px-4 sm:px-6 md:px-12">

                <h1 className="sr-only">Вакансии — Санарип Долбоор</h1>

                <div className="flex flex-col md:flex-row items-start gap-8 sm:gap-12 md:gap-16 lg:gap-24 mt-4 sm:mt-10">

                    {/* ЛЕВАЯ ЧАСТЬ: Фото */}
                    <div className="w-full md:w-1/2 md:max-w-[604px] aspect-[4/3] md:h-[467px] relative flex-shrink-0">
                        <Image
                            src="/images/gallery/about-10.jpeg"
                            alt="Команда Санарип Долбоор"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>

                    {/* ПРАВАЯ ЧАСТЬ: Текст */}
                    <div className="flex flex-col pt-2 md:pt-4 flex-1 min-w-0">
                        <h2 className="text-3xl sm:text-4xl font-bold text-muted-dark leading-tight mb-6 sm:mb-10">
                            Открытые двери для <span className="[-webkit-text-fill-color:var(--bg-main)] [-webkit-text-stroke:2px_var(--text-main)] [paint-order:stroke_fill]">талантов</span>
                        </h2>

                        <div className="text-muted-dark text-base sm:text-lg md:text-xl font-normal space-y-5 sm:space-y-7">
                            <p>
                                Вы крутой специалист (разработчик, дизайнер, оператор и др.) и уверены, что мы нужны друг другу — дайте о себе знать!
                            </p>

                            <p>
                                Отправьте ваше резюме и портфолио на <a href="mailto:sanaripdolbor@gmail.com" className="underline hover:text-blue-600 transition-colors break-all">sanaripdolbor@gmail.com</a> с темой письма «Хочу в команду Санарип Долбоор: <Highlight>Ваша специальность.</Highlight>»
                            </p>

                            <p>
                                Мы внимательно изучаем каждое письмо и обязательно свяжемся с вами, когда появится подходящий проект.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
