import type { Metadata } from 'next';
import { projectsData } from './data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sanarip.org';

export const metadata: Metadata = {
    title: 'Проекты',
    description:
        'Реализованные проекты Санарип Долбоор: LMS-платформы, электронные библиотеки, цифровые экосистемы и обучающее видео для USAID, ПРООН, GIZ, Всемирного банка, KOICA и других.',
    alternates: { canonical: '/projects' },
    openGraph: {
        title: 'Проекты — Санарип Долбоор',
        description:
            'Кейсы для USAID, UNDP, GIZ, World Bank, KOICA: LMS, e-learning, видеопроизводство и цифровизация госуслуг в Кыргызстане.',
        url: '/projects',
        type: 'website',
    },
};

const projectsItemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Проекты Санарип Долбоор',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: projectsData.length,
    itemListElement: projectsData.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
            '@type': 'CreativeWork',
            name: p.title,
            url: `${SITE_URL}/projects#${i}`,
            description: p.task,
            sponsor: { '@type': 'Organization', name: p.donor },
        },
    })),
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsItemListJsonLd) }}
            />
            {children}
        </>
    );
}
