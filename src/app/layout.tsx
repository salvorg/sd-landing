import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import "./globals.css";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '600', '700', '800', '900'],
    variable: '--font-montserrat',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sanarip.org';
const SITE_NAME = 'Санарип Долбоор';
const DEFAULT_DESCRIPTION =
    'Санарип Долбоор — ведущий системный интегратор EdTech в Кыргызстане. Разработка LMS, веб-платформ, цифровых экосистем и видеоконтента «под ключ» для госсектора и международных доноров (USAID, UNDP, GIZ, World Bank).';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: `${SITE_NAME} — Комплексные цифровые решения для развития`,
        template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    applicationName: SITE_NAME,
    keywords: [
        'Санарип Долбоор',
        'Sanarip Dolboor',
        'EdTech Кыргызстан',
        'LMS разработка',
        'дистанционное обучение',
        'цифровая трансформация',
        'разработка веб-платформ',
        'Moodle Кыргызстан',
        'видеопроизводство Бишкек',
        'обучающие ролики',
        'госуслуги цифровизация',
        'USAID UNDP GIZ World Bank Кыргызстан',
    ],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: 'technology',
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        siteName: SITE_NAME,
        locale: 'ru_RU',
        url: SITE_URL,
        title: `${SITE_NAME} — Комплексные цифровые решения для развития`,
        description: DEFAULT_DESCRIPTION,
        images: [
            {
                url: '/images/logo/sd-color.webp',
                width: 1200,
                height: 630,
                alt: SITE_NAME,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${SITE_NAME} — Комплексные цифровые решения`,
        description: DEFAULT_DESCRIPTION,
        images: ['/images/logo/sd-color.webp'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
    icons: {
        icon: [
            { url: '/images/logo/sd-color.webp', type: 'image/webp' },
        ],
        shortcut: '/images/logo/sd-color.webp',
        apple: '/images/logo/sd-color.webp',
    },
    formatDetection: {
        email: false,
        telephone: false,
        address: false,
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#09090b' },
    ],
};

const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: 'Sanarip Dolboor',
    legalName: 'ОсОО «Санарип Долбоор»',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo/sd-color.webp`,
    description: DEFAULT_DESCRIPTION,
    foundingDate: '2019',
    email: 'sanaripdolbor@gmail.com',
    telephone: '+996553212618',
    address: {
        '@type': 'PostalAddress',
        addressCountry: 'KG',
        addressLocality: 'Бишкек',
    },
    areaServed: { '@type': 'Country', name: 'Кыргызстан' },
    sameAs: [
        'https://wa.me/message/SAWDWEUXYVRAO1',
    ],
    knowsAbout: [
        'EdTech',
        'Learning Management Systems',
        'Видеопроизводство',
        'Цифровая трансформация',
        'Веб-разработка',
        'Облачная инфраструктура',
    ],
};

const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'ru',
    publisher: { '@type': 'Organization', name: SITE_NAME },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru" className={`${montserrat.variable} overflow-x-hidden`}>
        <body className="antialiased overflow-x-hidden bg-zinc-950">
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Header />
        <SmoothScroll>
            {children}
        </SmoothScroll>
        <Footer />
        </body>
        </html>
    );
}
