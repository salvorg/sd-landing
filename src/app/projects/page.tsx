'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// ─── Данные проектов ────────────────────────────────────────────────────────
const PROJECTS = [
    {
        id: 1,
        title: 'Цифровая платформа обучения',
        donor: 'GIZ',
        donorFull: 'Deutsche Gesellschaft für Internationale Zusammenarbeit',
        description: 'Разработка LMS-системы для дистанционного обучения государственных служащих. Платформа охватила более 40 000 пользователей по всей стране.',
        year: '2021–2023',
        tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
        link: '#',
    },
    {
        id: 2,
        title: 'Система телематики и трекинга',
        donor: 'UNDP',
        donorFull: 'United Nations Development Programme',
        description: 'IoT-решение для отслеживания корпоративного транспорта и медицинских активов в режиме реального времени с аналитической панелью.',
        year: '2022–2023',
        tags: ['React', 'IoT', 'WebSocket', 'Maps API'],
        link: '#',
    },
    {
        id: 3,
        title: 'Портал госуслуг',
        donor: 'World Bank',
        donorFull: 'The World Bank Group',
        description: 'Единый цифровой портал для автоматизации административных процессов и сокращения бюрократии в государственном секторе.',
        year: '2020–2022',
        tags: ['Vue.js', 'Python', 'Microservices', 'Kubernetes'],
        link: '#',
    },
    {
        id: 4,
        title: 'E-learning для учителей',
        donor: 'KOICA',
        donorFull: 'Korea International Cooperation Agency',
        description: 'Образовательная платформа с видеоконтентом и интерактивными курсами для повышения квалификации педагогов.',
        year: '2023–2024',
        tags: ['React', 'Video Streaming', 'AWS', 'CDN'],
        link: '#',
    },
    {
        id: 5,
        title: 'Система управления ресурсами',
        donor: 'KATO',
        donorFull: 'Central Asian Technical Office',
        description: 'Комплексная ERP-система для управления корпоративными ресурсами, включая модули HR, закупок и финансовой отчётности.',
        year: '2022–2024',
        tags: ['TypeScript', 'GraphQL', 'Redis', 'CI/CD'],
        link: '#',
    },
];

const HEADER_HEIGHT = 80;
const TOTAL = PROJECTS.length;

const TRIANGLE_PATHS = [
    [
        'M25.6169 9.82498L47.8104 35.7961L14.223 42.0298L25.6169 9.82498Z',
        'M13.9256 41.9105L30.1113 28.079M30.1113 28.079L48.4512 35.5578M30.1113 28.079L25.9521 9.22898',
    ],
    [
        'M31.5826 4.45737L30.6703 38.6073L1.55305 20.7423L31.5826 4.45737Z',
        'M1.41241 20.4544L11.8929 19.7012M11.8929 19.7012L31.3061 38.8594M11.8929 19.7012L32.231 4.23915',
    ],
];

const getParticleCount = () => {
    if (typeof window === 'undefined') return 500;
    const cores = navigator.hardwareConcurrency || 2;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 150;
    if (cores <= 2) return 250;
    if (cores <= 4) return 500;
    return 800;
};

// ─── Canvas Engine (живёт весь жизненный цикл страницы) ─────────────────────
class TriangleEngine {
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private particles: any[] = [];
    private animId = 0;
    private mouse = { x: -9999, y: -9999 };
    private phase: 'assembling' | 'holding' | 'dispersing' = 'assembling';
    private width = 0;
    private height = 0;
    private paths: { fill: Path2D; stroke: Path2D }[];
    private particleCount: number;
    private onDisperseDone?: () => void;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d', { alpha: true })!;
        this.particleCount = getParticleCount();
        this.paths = TRIANGLE_PATHS.map(([f, s]) => ({
            fill: new Path2D(f),
            stroke: new Path2D(s),
        }));
        this.resize();
        this.loop();
    }

    resize() {
        const rect = this.canvas.parentElement!.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(dpr, dpr);
    }

    private extractPoints(text: string): { x: number; y: number }[] {
        const off = document.createElement('canvas');
        off.width = this.width;
        off.height = this.height;
        const ctx = off.getContext('2d')!;

        let fontSize = Math.floor(this.width * 0.30);
        ctx.font = `900 ${fontSize}px 'Montserrat', sans-serif`;
        while (ctx.measureText(text).width > this.width * 0.85 && fontSize > 20) {
            fontSize -= 4;
            ctx.font = `900 ${fontSize}px 'Montserrat', sans-serif`;
        }
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, this.width / 2, this.height / 2);

        const data = ctx.getImageData(0, 0, this.width, this.height).data;
        const valid: { x: number; y: number }[] = [];
        for (let y = 0; y < this.height; y += 3) {
            for (let x = 0; x < this.width; x += 3) {
                if (data[(y * this.width + x) * 4 + 3] > 128) valid.push({ x, y });
            }
        }
        off.width = 0; off.height = 0;
        return valid;
    }

    // Инициализируем частицы из-за края — fromSide = откуда прилетают
    loadText(text: string, fromSide: 'left' | 'right') {
        const targets = this.extractPoints(text);
        if (!targets.length) return;

        this.particles = Array.from({ length: this.particleCount }, () => {
            const t = targets[Math.floor(Math.random() * targets.length)];
            return {
                // Стартуем ЗА противоположным краем относительно fromSide
                x: fromSide === 'right'
                    ? this.width + 100 + Math.random() * 300
                    : -100 - Math.random() * 300,
                y: t.y + (Math.random() - 0.5) * this.height * 0.6,
                targetX: t.x,
                targetY: t.y,
                vx: 0,
                vy: 0,
                size: 0.18 + Math.random() * 0.12,
                rotation: Math.random() * Math.PI * 2,
                type: Math.floor(Math.random() * 2),
                color: `hsla(${210 + Math.random() * 40}, 80%, ${55 + Math.random() * 25}%, 0.85)`,
            };
        });
        this.phase = 'assembling';
    }

    // Разогнать частицы в сторону toSide, потом вызвать cb
    disperseTo(toSide: 'left' | 'right', cb: () => void) {
        this.phase = 'dispersing';
        this.onDisperseDone = cb;
        this.particles.forEach(p => {
            p.targetX = toSide === 'right'
                ? this.width + 100 + Math.random() * 400
                : -100 - Math.random() * 400;
            p.targetY = p.y + (Math.random() - 0.5) * this.height * 0.5;
        });
    }

    setMouse(x: number, y: number) { this.mouse.x = x; this.mouse.y = y; }
    clearMouse() { this.mouse.x = -9999; this.mouse.y = -9999; }

    private loop = () => {
        const { ctx, width, height } = this;
        ctx.clearRect(0, 0, width, height);

        const ease = this.phase === 'assembling' ? 0.055 : 0.042;
        let doneCount = 0;

        this.particles.forEach(p => {
            // Отталкивание мышью
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const dist2 = dx * dx + dy * dy;
            if (dist2 < 7000 && dist2 > 0) {
                const d = Math.sqrt(dist2);
                const f = (85 - d) / 85;
                p.vx -= (dx / d) * f * 2.5;
                p.vy -= (dy / d) * f * 2.5;
            }

            p.vx += (p.targetX - p.x) * ease;
            p.vy += (p.targetY - p.y) * ease;
            p.vx *= 0.87;
            p.vy *= 0.87;
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += 0.022;

            if (Math.abs(p.x - p.targetX) < 10 && Math.abs(p.y - p.targetY) < 10) doneCount++;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.scale(p.size, p.size);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.translate(-25, -20);
            ctx.stroke(this.paths[p.type].fill);
            ctx.stroke(this.paths[p.type].stroke);
            ctx.restore();
        });

        // Переходы фаз
        if (this.phase === 'assembling' && doneCount > this.particles.length * 0.93) {
            this.phase = 'holding';
        }
        if (this.phase === 'dispersing' && doneCount > this.particles.length * 0.90) {
            this.onDisperseDone?.();
            this.onDisperseDone = undefined;
        }

        this.animId = requestAnimationFrame(this.loop);
    };

    destroy() {
        cancelAnimationFrame(this.animId);
        this.canvas.width = 0;
        this.canvas.height = 0;
        this.particles = [];
    }
}

// ─── Главная страница ────────────────────────────────────────────────────────
export default function ProjectsPage() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<TriangleEngine | null>(null);

    // Все DOM-ссылки на инфо-блоки и панели
    const infoRef = useRef<HTMLDivElement>(null);
    const currentIndexRef = useRef(0);
    const isTransitioningRef = useRef(false);

    // Рендерим инфо-блок по индексу
    const renderInfo = useCallback((idx: number) => {
        const p = PROJECTS[idx];
        const el = infoRef.current;
        if (!el) return;
        el.innerHTML = `
            <div class="flex items-center gap-3 mb-6">
                <div class="w-8 h-[2px] bg-[#2563eb]"></div>
                <span class="text-[11px] uppercase tracking-[0.35em] text-[#2563eb] font-bold">${p.donorFull}</span>
            </div>
            <h2 class="text-[38px] lg:text-[48px] font-black leading-[1] tracking-tighter text-[var(--text-main)] mb-6 uppercase">${p.title}</h2>
            <p class="text-[15px] text-[var(--text-muted)] leading-relaxed mb-8 max-w-[420px]">${p.description}</p>
            <div class="flex items-center gap-2 mb-6">
                <span class="text-[11px] uppercase tracking-[0.3em] text-[var(--text-muted)] opacity-60">Период</span>
                <span class="text-[13px] font-bold text-[var(--text-main)]">${p.year}</span>
            </div>
            <div class="flex flex-wrap gap-2 mb-10">
                ${p.tags.map(t => `<span class="text-[11px] px-3 py-1 border border-[#2563eb] text-[#2563eb] font-mono uppercase tracking-wider opacity-70">${t}</span>`).join('')}
            </div>
            <a href="${p.link}" class="inline-flex items-center gap-3 group-link">
                <span class="text-[13px] uppercase tracking-[0.2em] font-bold text-[var(--text-main)]">Подробнее о проекте</span>
                <div class="w-8 h-[1px] bg-[var(--text-main)] transition-all duration-300"></div>
            </a>
        `;
    }, []);

    // Обновляем прогресс-индикатор и номер
    const renderMeta = useCallback((idx: number) => {
        const dots = wrapperRef.current?.querySelectorAll('.progress-dot');
        dots?.forEach((d, i) => {
            const el = d as HTMLElement;
            el.style.height = i === idx ? '40px' : '16px';
            el.style.opacity = i === idx ? '1' : '0.3';
            el.style.background = i === idx ? '#2563eb' : 'var(--text-muted, #71717a)';
        });
        const numEl = wrapperRef.current?.querySelector('.project-number') as HTMLElement;
        if (numEl) numEl.textContent = String(idx + 1).padStart(2, '0');
    }, []);

    // Обновляем расположение (чёт/нечет)
    const renderLayout = useCallback((idx: number) => {
        const leftPanel = wrapperRef.current?.querySelector('.panel-left') as HTMLElement;
        const rightPanel = wrapperRef.current?.querySelector('.panel-right') as HTMLElement;
        const canvasWrap = wrapperRef.current?.querySelector('.canvas-wrap') as HTMLElement;
        if (!leftPanel || !rightPanel || !canvasWrap || !infoRef.current) return;

        if (idx % 2 === 0) {
            // Чётный: инфо слева, canvas справа
            leftPanel.appendChild(infoRef.current);
            rightPanel.appendChild(canvasWrap);
        } else {
            // Нечётный: canvas слева, инфо справа
            leftPanel.appendChild(canvasWrap);
            rightPanel.appendChild(infoRef.current);
        }
    }, []);

    // Переход к проекту idx, треугольники перетекают через сторону direction
    const goTo = useCallback((idx: number, scrollDirection: 'down' | 'up') => {
        if (isTransitioningRef.current) return;
        if (idx === currentIndexRef.current) return;
        isTransitioningRef.current = true;

        const engine = engineRef.current;
        if (!engine) return;

        const isEvenNext = idx % 2 === 0;

        // При скролле вниз (следующий проект):
        //   - треугольники улетают ВЛЕВО (туда откуда они пришли)
        //   - новые прилетают СПРАВА
        // При скролле вверх (предыдущий проект):
        //   - треугольники улетают ВПРАВО
        //   - новые прилетают СЛЕВА
        const exitTo = scrollDirection === 'down' ? 'left' : 'right';
        const enterFrom = scrollDirection === 'down' ? 'right' : 'left';

        // Анимируем инфо-блок
        const infoEl = infoRef.current;
        if (infoEl) {
            infoEl.style.transition = 'opacity 0.3s, transform 0.3s';
            infoEl.style.opacity = '0';
            infoEl.style.transform = `translateX(${scrollDirection === 'down' ? '-20px' : '20px'})`;
        }

        // Частицы улетают, потом прилетают новые
        engine.disperseTo(exitTo, () => {
            currentIndexRef.current = idx;
            renderInfo(idx);
            renderMeta(idx);
            renderLayout(idx);

            // Небольшая задержка чтобы layout успел переключиться
            setTimeout(() => {
                engine.loadText(PROJECTS[idx].donor, enterFrom);

                if (infoEl) {
                    infoEl.style.transform = `translateX(${scrollDirection === 'down' ? '20px' : '-20px'})`;
                    requestAnimationFrame(() => {
                        infoEl.style.opacity = '1';
                        infoEl.style.transform = 'translateX(0)';
                    });
                }

                setTimeout(() => { isTransitioningRef.current = false; }, 600);
            }, 80);
        });
    }, [renderInfo, renderMeta, renderLayout]);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const canvas = canvasRef.current;
        if (!wrapper || !canvas) return;

        // Инициализируем движок и первый проект
        engineRef.current = new TriangleEngine(canvas);
        requestAnimationFrame(() => {
            engineRef.current?.resize();   // теперь getBoundingClientRect даёт реальный размер
            engineRef.current?.loadText(PROJECTS[0].donor, 'right'); // работает
        });
        renderInfo(0);
        renderMeta(0);
        renderLayout(0);

        // Мышь
        let lastMouse = 0;
        const onMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            if (now - lastMouse < 32) return;
            lastMouse = now;
            const rect = canvas.getBoundingClientRect();
            engineRef.current?.setMouse(e.clientX - rect.left, e.clientY - rect.top);
        };
        const onMouseLeave = () => engineRef.current?.clearMouse();
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseleave', onMouseLeave);

        // Resize
        let resizeTimer: ReturnType<typeof setTimeout>;
        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => engineRef.current?.resize(), 200);
        };
        window.addEventListener('resize', onResize);

        // ScrollTrigger — создаём ОДИН РАЗ, без зависимости от state
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: wrapper,
                start: 'top top',
                end: `+=${TOTAL * 100}vh`,
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const rawIdx = self.progress * (TOTAL - 1);
                    const newIdx = Math.round(rawIdx);
                    const cur = currentIndexRef.current;
                    if (newIdx !== cur && !isTransitioningRef.current) {
                        goTo(newIdx, newIdx > cur ? 'down' : 'up');
                    }
                },
            });
        }, wrapper);

        return () => {
            ctx.revert();
            clearTimeout(resizeTimer);
            canvas.removeEventListener('mousemove', onMouseMove);
            canvas.removeEventListener('mouseleave', onMouseLeave);
            window.removeEventListener('resize', onResize);
            engineRef.current?.destroy();
        };
    }, [goTo, renderInfo, renderLayout, renderMeta]);

    return (
        <div
            ref={wrapperRef}
            className="relative w-full bg-[var(--bg-main)] overflow-hidden"
            style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
        >
            {/* Фоновая сетка */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Декоративный номер */}
            <div className="project-number absolute top-6 right-10 z-20 font-black text-[130px] leading-none text-[var(--text-main)] opacity-[0.04] select-none pointer-events-none">
                01
            </div>

            {/* Прогресс */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
                {PROJECTS.map((_, i) => (
                    <div
                        key={i}
                        className="progress-dot w-[2px] transition-all duration-400"
                        style={{
                            height: i === 0 ? '40px' : '16px',
                            background: i === 0 ? '#2563eb' : 'var(--text-muted, #71717a)',
                            opacity: i === 0 ? 1 : 0.3,
                        }}
                    />
                ))}
            </div>

            {/* Основной контент */}
            <div className="h-full flex">
                {/* Левая панель */}
                <div className="panel-left relative w-1/2 h-full flex items-center justify-center" />

                {/* Разделитель */}
                <div
                    className="w-[1px] self-stretch my-12 flex-shrink-0"
                    style={{ background: 'linear-gradient(to bottom, transparent, #2563eb40, transparent)' }}
                />

                {/* Правая панель */}
                <div className="panel-right relative w-1/2 h-full flex items-center justify-center" />
            </div>

            {/* Canvas — перемещается между панелями через renderLayout */}
            <div className="canvas-wrap absolute w-1/2 h-full" style={{ display: 'contents' }}>
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            </div>

            {/* Инфо-блок — перемещается между панелями через renderLayout */}
            <div
                ref={infoRef}
                className="px-12 py-8 max-w-[520px] w-full"
                style={{ transition: 'opacity 0.4s, transform 0.4s' }}
            />

            {/* Подсказка скролла */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-40">
                <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--text-muted)]">Скролл</span>
                <div className="w-[1px] h-8 bg-[var(--text-muted)] animate-pulse" />
            </div>
        </div>
    );
}
