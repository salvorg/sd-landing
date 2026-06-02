import Link from "next/link";
import Image from "next/image";

const links = [
    {path: '/about', label: 'О нас'},
    {path: '/projects', label: 'Проекты'},
    {path: '/vacancies', label: 'Вакансии'}
];

const INSTAGRAM_URL = 'https://www.instagram.com/sanaripdolboor/';
const WHATSAPP_URL = 'https://wa.me/message/SAWDWEUXYVRAO1';

export default function Footer() {
    return (
        <footer
            id="footer"
            className="text-white pt-12 sm:pt-14 pb-6 sm:pb-8 px-4 sm:px-6 md:px-12 font-sans relative z-[100] bg-[radial-gradient(50%_50%_at_50%_50%,#000714_0%,#0F1F3D_100%)]"
        >
            {/* Основной контент */}
            <div className="w-full max-w-[1400px] mx-auto">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[3fr_2fr_3fr_2fr] justify-between items-start gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-16">

                    {/* Логотип и слоган */}
                    <div className="flex flex-col items-start sm:col-span-2 md:col-span-1 flex-shrink-0">
                        <Link href='/' className="flex items-center gap-2 cursor-pointer group mb-4">
                            <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                                <Image src="/images/logo/sd.webp" alt="Logo" width={48} height={48} priority
                                       className="object-contain"/>
                            </div>
                            <div className="flex flex-col justify-center leading-[0.8]">
                                <span
                                    className="relative text-lg sm:text-xl md:text-2xl font-black tracking-tighter uppercase text-white">
                                    SANARIP
                                </span>
                                <span
                                    className="text-[8px] sm:text-[9px] md:text-[11px] font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white mt-1 opacity-70">
                                    Dolboor
                                </span>
                            </div>
                        </Link>
                        <p className="text-base sm:text-lg leading-snug font-medium bg-[linear-gradient(272.93deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.6)_100%)] bg-clip-text text-transparent">
                            Создаем решения, которые работают.
                        </p>
                    </div>

                    {/* Навигация */}
                    <div className="flex flex-col md:pt-1 md:mt-9">
                        <ul className="space-y-3 sm:space-y-4">
                            {links.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.path}
                                          className="text-white hover:opacity-75 transition-opacity text-sm sm:text-base font-medium">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Контакты */}
                    <div className="flex flex-col md:pt-1 md:mt-9">
                        <ul className="space-y-3 sm:space-y-4">
                            <li>
                                <a href="https://wa.me/message/SAWDWEUXYVRAO1"
                                   className="text-white hover:opacity-75 transition-opacity text-sm sm:text-base font-medium flex flex-wrap items-center gap-x-2 gap-y-1">
                                    <span>WhatsApp:</span><span
                                    className="underline decoration-white/30 underline-offset-[3px] break-all">+996 553 212 618</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:sanaripdolbor@gmail.com"
                                   className="text-white hover:opacity-75 transition-opacity text-sm sm:text-base font-medium flex flex-wrap items-center gap-x-2 gap-y-1">
                                    <span>Email:</span> <span
                                    className="underline decoration-white/30 underline-offset-[3px] break-all">sanaripdolbor@gmail.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Социальные сети */}
                    <div className="flex items-center gap-6 md:pt-1 md:mt-9">
                        <a
                            href={INSTAGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:opacity-75 transition-opacity"
                            aria-label="Instagram"
                        >
                            <svg width="35" height="35" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M15.5 5H9.5C7.29086 5 5.5 6.79086 5.5 9V15C5.5 17.2091 7.29086 19 9.5 19H15.5C17.7091 19 19.5 17.2091 19.5 15V9C19.5 6.79086 17.7091 5 15.5 5Z"
                                          stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                          strokeLinejoin="round"></path>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M12.5 15C10.8431 15 9.5 13.6569 9.5 12C9.5 10.3431 10.8431 9 12.5 9C14.1569 9 15.5 10.3431 15.5 12C15.5 12.7956 15.1839 13.5587 14.6213 14.1213C14.0587 14.6839 13.2956 15 12.5 15Z"
                                          stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                          strokeLinejoin="round"></path>
                                    <rect x="15.5" y="9" width="2" height="2" rx="1" transform="rotate(-90 15.5 9)"
                                          fill="#fff"></rect>
                                    <rect x="16" y="8.5" width="1" height="1" rx="0.5" transform="rotate(-90 16 8.5)"
                                          stroke="#fff" strokeLinecap="round"></rect>
                                </g>
                            </svg>
                        </a>
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:opacity-75 transition-opacity"
                            aria-label="WhatsApp"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path
                                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.005a9.87 9.87 0 01-5.03-1.378l-.36-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.463 3.488z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Нижний блок */}
            <div className="w-full max-w-[1484px] mx-auto">
                <div className="pt-6 sm:pt-8 border-t border-white/10 flex justify-center items-center">
                    <p className="text-white opacity-60 text-xs sm:text-sm font-medium text-center">
                        &copy; 2026 Санарип Долбоор. Все права защищены.
                    </p>
                </div>
            </div>
        </footer>
    );
}
