'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GradientButton from '@/components/ui/GradientButton';
import { projects } from './projects.data';

// Адаптивное число пирамид: меньше ядер / mobile / reduced-motion → меньше нагрузка
const getPyramidCount = (): number => {
    if (typeof window === 'undefined') return 12;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0;
    const cores = navigator.hardwareConcurrency || 2;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return 6;
    if (cores <= 2) return 6;
    if (cores <= 4) return 10;
    return 14;
};

function CanvasBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const pyramidCount = getPyramidCount();
        if (pyramidCount === 0) return; // reduced-motion

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let isVisible = true;
        let dpr = window.devicePixelRatio || 1;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        };

        // Debounce resize — не пересоздаём контекст на каждый пиксель
        let resizeTimer: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resize, 200);
        };
        window.addEventListener('resize', handleResize);
        resize();

        // IntersectionObserver — пауза анимации вне вьюпорта
        const observer = new IntersectionObserver(
            ([entry]) => { isVisible = entry.isIntersecting; },
            { threshold: 0 }
        );
        observer.observe(canvas);

        // Pyramid vertices in 3D (Tetrahedron)
        const originalVertices = [
            [0, -1, 0],       // Top
            [-1, 1, -1],      // Base left back
            [1, 1, -1],       // Base right back
            [0, 1, 1]         // Base front
        ];

        const edges = [
            [0, 1], [0, 2], [0, 3], // Top to base
            [1, 2], [2, 3], [3, 1]  // Base triangle
        ];

        class Pyramid {
            x: number;
            y: number;
            z: number;
            size: number;
            rotX: number;
            rotY: number;
            rotZ: number;
            speedX: number;
            speedY: number;
            speedRotX: number;
            speedRotY: number;

            constructor() {
                this.x = (Math.random() - 0.5) * width;
                this.y = (Math.random() - 0.5) * height;
                this.z = Math.random() * 500 + 100;
                this.size = Math.random() * 65 + 15;
                this.rotX = Math.random() * Math.PI * 2;
                this.rotY = Math.random() * Math.PI * 2;
                this.rotZ = Math.random() * Math.PI * 2;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.speedRotX = (Math.random() - 0.5) * 0.015;
                this.speedRotY = (Math.random() - 0.5) * 0.015;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.rotX += this.speedRotX;
                this.rotY += this.speedRotY;

                // Screen wrap
                if (this.x > width / 2 + 100) this.x = -width / 2 - 100;
                if (this.x < -width / 2 - 100) this.x = width / 2 + 100;
                if (this.y > height / 2 + 100) this.y = -height / 2 - 100;
                if (this.y < -height / 2 - 100) this.y = height / 2 + 100;
            }

            draw(ctx: CanvasRenderingContext2D) {
                const rotatedVertices = originalVertices.map(v => {
                    let [x, y, z] = v;

                    // rot Z
                    let nx = x * Math.cos(this.rotZ) - y * Math.sin(this.rotZ);
                    let ny = x * Math.sin(this.rotZ) + y * Math.cos(this.rotZ);
                    x = nx; y = ny;

                    // rot Y
                    nx = x * Math.cos(this.rotY) + z * Math.sin(this.rotY);
                    let nz = -x * Math.sin(this.rotY) + z * Math.cos(this.rotY);
                    x = nx; z = nz;

                    // rot X
                    ny = y * Math.cos(this.rotX) - z * Math.sin(this.rotX);
                    nz = y * Math.sin(this.rotX) + z * Math.cos(this.rotX);
                    y = ny; z = nz;

                    return [x, y, z];
                });

                const focalLength = 500;
                const projected = rotatedVertices.map(v => {
                    const zPos = v[2] * this.size + this.z;
                    const f = focalLength / (focalLength + zPos);
                    const px = (v[0] * this.size * f) + width / 2 + this.x;
                    const py = (v[1] * this.size * f) + height / 2 + this.y;
                    return [px, py];
                });

                // Exact dark magenta / pinkish color from design
                ctx.strokeStyle = 'rgba(215, 160, 195, 0.7)';
                ctx.lineWidth = 1.5;

                edges.forEach(edge => {
                    ctx.beginPath();
                    ctx.moveTo(projected[edge[0]][0], projected[edge[0]][1]);
                    ctx.lineTo(projected[edge[1]][0], projected[edge[1]][1]);
                    ctx.stroke();
                });
            }
        }

        const pyramids = Array.from({ length: pyramidCount }, () => new Pyramid());

        const render = () => {
            if (isVisible) {
                ctx.clearRect(0, 0, width, height);
                pyramids.forEach(p => {
                    p.update();
                    p.draw(ctx);
                });
            }
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
            // Освобождаем память GPU
            canvas.width = 0;
            canvas.height = 0;
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
        />
    );
}

export default function ProjectsSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [resumeAutoSlideTime, setResumeAutoSlideTime] = useState(Date.now());

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const handleManualAction = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let newIndex = prevIndex + newDirection;
            if (newIndex < 0) newIndex = projects.length - 1;
            if (newIndex >= projects.length) newIndex = 0;
            return newIndex;
        });
        setResumeAutoSlideTime(Date.now() + 3500);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (Date.now() >= resumeAutoSlideTime) {
                setDirection(1);
                setCurrentIndex((prevIndex) => {
                    let newIndex = prevIndex + 1;
                    if (newIndex >= projects.length) newIndex = 0;
                    return newIndex;
                });
            }
        }, 3500);
        return () => clearInterval(timer);
    }, [resumeAutoSlideTime]);

    return (
        <div
            className="relative w-full min-h-screen bg-white overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-4"
            style={{ fontFamily: '"Montserrat", sans-serif' }}
        >
            <CanvasBackground />

            {/* Контент */}
            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-screen-2xl">

                {/* Заголовок */}
                <div className="text-center md:mb-12 flex flex-col items-center justify-center">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-muted-dark md:tracking-wider uppercase leading-none mb-4 sm:mb-5">
                        НАШИ ПРОЕКТЫ
                    </h1>
                    {/* Высота зафиксирована — длина названия проекта не двигает страницу */}
                    <div className="relative w-full h-14 sm:h-16 md:h-20 flex items-center justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={currentIndex}
                                initial={{ opacity: 0, y: -25 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 25 }}
                                transition={{
                                    y: { type: "spring", stiffness: 800, damping: 46 },
                                    opacity: { duration: 0.12 }
                                }}
                                className="text-xl sm:text-2xl md:text-3xl font-bold text-muted-dark px-4 leading-tight line-clamp-2"
                            >
                                {projects[currentIndex].title}
                            </motion.h2>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Слайдер */}
                <div className="relative max-w-screen-xl mx-auto px-0 sm:px-4 md:px-8 flex flex-col">
                    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 sm:gap-12 lg:gap-24 items-start mb-8 sm:mb-12 lg:mb-16">
                        {/* Левая часть - изображение ноутбука */}
                        <div className="relative flex flex-col items-center mt-12 lg:mt-16 lg:pt-1.5">
                            <div className="relative w-full max-w-xl">
                                {/* Изображение ноутбука */}
                                <div className="relative">
                                    <Image
                                        src="/images/projects/laptop.png"
                                        alt="Laptop Frame"
                                        width={571}
                                        height={397}
                                        className="w-full h-auto relative z-10 pointer-events-none"
                                        priority
                                    />
                                    {/* Тень под ноутбуком */}
                                    <div
                                        className="absolute left-1/2 -translate-x-1/2 w-4/5 h-10 -bottom-4 z-0"
                                        style={{
                                            background: 'radial-gradient(51.49% 51.49% at 51.29% 50%, rgba(115, 115, 115, 0.5) 23.56%, rgba(164, 164, 164, 0) 100%)'
                                        }}
                                    />
                                    {/* Экран проекта внутри ноутбука */}
                                    <div className="absolute top-2 left-[9.2%] w-[81%] h-[88%] z-20 bg-white overflow-hidden">
                                        <AnimatePresence mode="wait" custom={direction}>
                                            <motion.div
                                                key={currentIndex}
                                                custom={direction}
                                                variants={slideVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{
                                                    x: { type: "spring", stiffness: 800, damping: 46 },
                                                    opacity: { duration: 0.12 }
                                                }}
                                                className="absolute inset-0"
                                            >
                                                <Image
                                                    src={projects[currentIndex].image}
                                                    alt={projects[currentIndex].title}
                                                    fill
                                                    className="object-contain object-center"
                                                    priority
                                                />
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            {/* Стрелки навигации — на мобиле сразу под ноутбуком */}
                            <div className="flex lg:hidden gap-12 sm:gap-16 justify-center mt-2 mb-2">
                                <GradientButton
                                    onClick={() => handleManualAction(-1)}
                                    className="w-12 h-12 !px-0 !py-0 !rounded-full shadow-none"
                                    aria-label="Previous project"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 12H5M12 19l-7-7 7-7" />
                                    </svg>
                                </GradientButton>
                                <GradientButton
                                    onClick={() => handleManualAction(1)}
                                    className="w-12 h-12 !px-0 !py-0 !rounded-full shadow-none"
                                    aria-label="Next project"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </GradientButton>
                            </div>
                        </div>

                        {/* Правая часть - информация (точь-в-точь по дизайну) */}
                        <div className="relative flex flex-col pl-0 lg:pl-10">
                            {/* Блок с текстом — высота зафиксирована, чтобы кнопки навигации не прыгали между слайдами */}
                            <div className="relative h-[26rem] sm:h-[28rem] lg:h-[32rem] overflow-hidden -mx-4 px-4 lg:-mr-24">
                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.div
                                        key={currentIndex}
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: "spring", stiffness: 800, damping: 46 },
                                            opacity: { duration: 0.12 }
                                        }}
                                        className="flex flex-col w-full"
                                    >
                                        <div className="mb-6 sm:mb-8">
                                            <p className="text-muted-dark text-base sm:text-lg font-medium mb-2">Год реализации:</p>
                                            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-muted-dark leading-none">
                                                {projects[currentIndex].year}
                                            </p>
                                        </div>

                                        <div className="min-h-20 sm:min-h-24 mb-8 sm:mb-12">
                                            <p className="text-muted-dark font-medium leading-relaxed text-base sm:text-lg max-w-lg">
                                                {projects[currentIndex].description}
                                            </p>
                                        </div>

                                        <div className="space-y-4 sm:space-y-8 lg:space-y-12">
                                            <p className="text-muted-dark text-base sm:text-lg lg:text-xl">
                                                <span className="font-bold">Заказчик:</span> {projects[currentIndex].client}
                                            </p>
                                            <p className="text-muted-dark text-base sm:text-lg lg:text-xl">
                                                <span className="font-bold">Тип:</span> {projects[currentIndex].type}
                                            </p>
                                            <p className="text-muted-dark text-base sm:text-lg lg:text-xl">
                                                <span className="font-bold">Охват:</span> {projects[currentIndex].reach}
                                            </p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Нижняя часть - CTA (стрелки на мобиле уже под ноутбуком, на десктопе слева в этой строке) */}
                    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-24 items-center">
                        {/* Десктоп: стрелки слева в нижнем ряду */}
                        <div className="hidden lg:flex gap-24 justify-center order-1">
                            <GradientButton
                                onClick={() => handleManualAction(-1)}
                                className="w-12 h-12 !px-0 !py-0 !rounded-full shadow-none"
                                aria-label="Previous project"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </GradientButton>
                            <GradientButton
                                onClick={() => handleManualAction(1)}
                                className="w-12 h-12 !px-0 !py-0 !rounded-full shadow-none"
                                aria-label="Next project"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </GradientButton>
                        </div>

                        {/* Статичная кнопка */}
                        <div className="flex justify-center lg:justify-start pl-0 lg:pl-10 relative z-10 w-full lg:w-auto lg:order-2">
                            <GradientButton href="/projects" className="w-full sm:w-auto px-8 sm:px-12 lg:px-18 py-3 sm:py-4 text-sm sm:text-base">
                                Смотреть все проекты
                            </GradientButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
