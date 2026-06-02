"use client";
import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from 'gsap/all';
import { projectsData } from '../data';
import { donorSVGs } from '../constants';
// --- НАСТРОЙКИ СИСТЕМЫ ЧАСТИЦ ---
const ANIMATION_CONFIG = {
    // Адаптивное количество частиц по числу ядер, mobile и prefers-reduced-motion
    getParticleCount: () => {
        if (typeof window === 'undefined') return 600;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return 0;
        const cores = navigator.hardwareConcurrency || 2;
        const isMobile = window.innerWidth < 768;
        if (isMobile) return 350;
        if (cores <= 2) return 400;
        if (cores <= 4) return 600;
        return 800;
    },

    // Шаг сканирования SVG (1 = максимальная точность)
    gridStep: 1,

    // Базовые размеры треугольников
    minSize: 0.3,
    maxSize: 0.6,

    // Толщина линий (зависит от "глубины" частицы)
    minThickness: 0.8,
    maxThickness: 1.5,

    // Параметры взаимодействия с мышью
    mouseRadius: 4500, // Радиус влияния
    mouseForce: 0.12,  // Сила отталкивания
    friction: 0.88,    // Затухание импульса мыши

    // Скорость возврата на место (без "прыжков")
    lerpSpeed: 0.13,

    // Цвета градиента (как у линии)
    gradientStart: '#5266F2',
    gradientEnd: '#9B5AF0',

    // Скорость вращения треугольников вокруг своей оси
    rotationSpeed: 0.02
};
const ProjectCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        let animationFrameId: number;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;
        // На мобиле и планшете канвас скрыт через CSS — не тратим CPU на анимацию
        if (window.innerWidth < 1024) return;
        const tweenedScatter = { value: 1 };
        let activeLayoutIndex = -1;
        let width = window.innerWidth;
        let height = window.innerHeight;
        const currentParticleCount = ANIMATION_CONFIG.getParticleCount();
        if (currentParticleCount === 0) return; // prefers-reduced-motion — анимация выключена

        let isVisible = true;
        let dpr = window.devicePixelRatio || 1;
        const createdTriggers: ScrollTrigger[] = [];
        const customShapes = [
            { path: new Path2D("M25.6 9.8 L47.8 35.8 L14.2 42.0 Z M13.9 41.9 L30.1 28.1 L48.5 35.6 M30.1 28.1 L25.9 9.2"), cx: 30, cy: 30 },
            { path: new Path2D("M31.6 4.5 L30.7 38.6 L1.6 20.7 Z M1.4 20.5 L11.9 19.7 L31.3 38.9 M11.9 19.7 L32.2 4.2"), cx: 20, cy: 20 },
            { path: new Path2D("M31.6 4.5 L30.7 38.6 L1.6 20.7 Z M1.4 20.5 L27.5 20.7 L31.3 38.9 M27.5 20.7 L32.2 4.2"), cx: 20, cy: 20 }
        ];
        class Particle {
            index: number;
            x: number; y: number;
            vx: number; vy: number; // Скорости
            currentSize: number; currentZ: number;
            scatterDirX: number; scatterDirY: number;
            shapeIndex: number;
            rotation: number;
            z: number;
            currentAlpha: number;  // Текущая прозрачность
            targetAlpha: number;   // Целевая прозрачность
            currentRatioX: number; // Текущая позиция в градиенте (0-1)
            targetRatioX: number;  // Целевая позиция в градиенте

            constructor(idx: number) {
                this.index = idx;
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = 0;
                this.vy = 0;
                this.currentSize = ANIMATION_CONFIG.minSize;
                this.currentZ = 0;
                this.currentAlpha = 0; // Начинаем с нуля для плавного появления
                this.targetAlpha = 1;
                this.currentRatioX = 0.5;
                this.targetRatioX = 0.5;
                this.scatterDirX = (Math.random() - 0.5) * width * 2;
                this.scatterDirY = (Math.random() - 0.5) * height * 2;
                this.shapeIndex = Math.floor(Math.random() * 3);
                this.rotation = Math.random() * Math.PI * 2;
                this.z = Math.random();
            }
            draw() {
                if (!ctx) return;
                const shape = customShapes[this.shapeIndex];
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.scale(this.currentSize, this.currentSize);

                // Итоговая прозрачность — произведение базовой (по глубине) и управляемой (для скрытия)
                ctx.globalAlpha = (0.4 + (this.currentZ * 0.6)) * this.currentAlpha;
                let thickness = ANIMATION_CONFIG.minThickness + (ANIMATION_CONFIG.maxThickness - ANIMATION_CONFIG.minThickness) * Math.pow(this.currentZ, 2);
                ctx.lineWidth = thickness / this.currentSize;

                // Рассчитываем цвет частицы на основе её горизонтальной позиции в логотипе
                // #5266F2 (hsl 232, 85%, 64%) -> #9B5AF0 (hsl 266, 83%, 65%)
                const ratio = Math.max(0, Math.min(1, this.currentRatioX));
                const hue = 232 + (266 - 232) * ratio;
                ctx.strokeStyle = `hsl(${hue}, 85%, 65%)`;

                ctx.lineJoin = "round";
                ctx.lineCap = "round";
                // Смещаемся на центр фигуры, чтобы вращение было строго "у себя"
                ctx.translate(-shape.cx, -shape.cy);
                ctx.stroke(shape.path);
                ctx.restore();
            }
            update(scatterFactor: number, currentLayoutIndex: number, targetLayouts: any[][], mouse: { x: number, y: number }) {
                let target = null;
                let tX = 0, tY = 0, tZ = 0;

                // Проверяем, есть ли для этой частицы точка в текущем макете
                if (currentLayoutIndex >= 0 && targetLayouts[currentLayoutIndex]) {
                    const currentTargetPoints = targetLayouts[currentLayoutIndex];
                    if (this.index < currentTargetPoints.length) {
                        target = currentTargetPoints[this.index];
                        this.targetAlpha = 1;
                    } else {
                        this.targetAlpha = 0;
                    }
                } else {
                    this.targetAlpha = 1;
                }

                if (target) {
                    tZ = target.depth;
                    this.targetRatioX = target.ratioX;
                    const baseX = target.x;
                    const baseY = target.y;
                    tX = baseX * (1 - scatterFactor) + ((width / 2) + this.scatterDirX) * scatterFactor;
                    tY = baseY * (1 - scatterFactor) + ((height / 2) + this.scatterDirY) * scatterFactor;
                } else {
                    tZ = this.z;
                    this.targetRatioX = 0.5;
                    tX = (width / 2) + this.scatterDirX;
                    tY = (height / 2) + this.scatterDirY;
                }

                // 1. Взаимодействие с мышью (как в AnimatedLogo)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < ANIMATION_CONFIG.mouseRadius) {
                    const angle = Math.atan2(dy, dx);
                    const force = -ANIMATION_CONFIG.mouseRadius / Math.sqrt(distSq);
                    this.vx += force * Math.cos(angle) * ANIMATION_CONFIG.mouseForce;
                    this.vy += force * Math.sin(angle) * ANIMATION_CONFIG.mouseForce;
                    this.rotation += 0.03;
                }

                // 2. Движение к цели через прямой lerp (0% попрыгунчика)
                // При этом добавляем импульс от мыши (vx, vy)
                this.x += (tX - this.x) * ANIMATION_CONFIG.lerpSpeed + this.vx;
                this.y += (tY - this.y) * ANIMATION_CONFIG.lerpSpeed + this.vy;

                // Гасим импульс мыши со временем
                this.vx *= ANIMATION_CONFIG.friction;
                this.vy *= ANIMATION_CONFIG.friction;

                // 3. Обновление остальных параметров
                let baseSize = ANIMATION_CONFIG.minSize + (ANIMATION_CONFIG.maxSize - ANIMATION_CONFIG.minSize) * Math.pow(tZ, 2);
                this.currentSize += (baseSize - this.currentSize) * ANIMATION_CONFIG.lerpSpeed;
                this.currentZ += (tZ - this.currentZ) * ANIMATION_CONFIG.lerpSpeed;
                this.currentAlpha += (this.targetAlpha - this.currentAlpha) * 0.1;
                this.currentRatioX += (this.targetRatioX - this.currentRatioX) * ANIMATION_CONFIG.lerpSpeed;
                this.rotation += ANIMATION_CONFIG.rotationSpeed;
            }
        }
        let particlesArray: Particle[] = [];
        let targetLayouts: any[][] = [];
        function getDistanceToEdge(pixels: Uint8ClampedArray, w: number, h: number, x: number, y: number) {
            const max = 15;
            for (let d = 1; d < max; d++) {
                if (x + d >= w || pixels[(y * w + (x + d)) * 4 + 3] < 50) return d;
                if (x - d < 0 || pixels[(y * w + (x - d)) * 4 + 3] < 50) return d;
                if (y + d >= h || pixels[((y + d) * w + x) * 4 + 3] < 50) return d;
                if (y - d < 0 || pixels[((y - d) * w + x) * 4 + 3] < 50) return d;
            }
            return max;
        }
        function extractPoints(tCtx: CanvasRenderingContext2D, w: number, h: number, targetW: number, targetCenterX: number, flipGradient: boolean = false) {
            const data = tCtx.getImageData(0, 0, w, h).data;
            const pts = [];
            const scale = targetW / w;
            const offX = targetCenterX - targetW / 2;
            const offY = (height - (h * scale)) / 2;

            // Фиксированный шаг сетки для обеспечения одинаковой плотности (независимо от длины слова)
            // Значение 4.2 подобрано так, чтобы длинное слово (5-6 букв) забирало около 800 частиц
            const fixedStep = 4.2;

            for (let y = 0; y < h; y += fixedStep) {
                for (let x = 0; x < w; x += fixedStep) {
                    if (data[(Math.floor(y) * w + Math.floor(x)) * 4 + 3] > 50) {
                        pts.push({
                            x: x * scale + offX,
                            y: y * scale + offY,
                            depth: getDistanceToEdge(data, w, h, Math.floor(x), Math.floor(y)) / 15,
                            ratioX: flipGradient ? 1 - (x / w) : (x / w)
                        });
                    }
                }
            }

            // Рандомизируем порядок для анимации, но ограничиваем максимумом в 800
            return pts.sort(() => Math.random() - 0.5).slice(0, currentParticleCount);
        }
        const buildLayouts = async () => {
            const promises = projectsData.map((proj, i) => {
                return new Promise<any[]>((resolve) => {
                    const centerX = (i % 2 === 0) ? width * 0.75 : width * 0.25;
                    const responsiveCenterX = window.innerWidth < 992 ? width / 2 : centerX;
                    const tmp = document.createElement('canvas');
                    const tCtx = tmp.getContext('2d');
                    if (!tCtx) { resolve([]); return; }
                    const w = 400, h = 200;
                    tmp.width = w; tmp.height = h;
                    const svgCode = donorSVGs[proj.shortName] || donorSVGs['USAID'];
                    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
                    const url = URL.createObjectURL(blob);
                    const img = new Image();
                    img.onload = () => {
                        tCtx.drawImage(img, 0, 0, w, h);
                        const isReversed = i % 2 === 1;
                        const points = extractPoints(tCtx, w, h, Math.min(width * 0.5, 750), responsiveCenterX, isReversed);
                        URL.revokeObjectURL(url);
                        resolve(points);
                    };
                    img.src = url;
                });
            });
            targetLayouts = await Promise.all(promises);
            particlesArray = Array.from({ length: currentParticleCount }, (_, i) => new Particle(i));
        };
        const mouse = { x: -1000, y: -1000 };
        // Throttle mousemove до ~30fps
        let lastMouseMove = 0;
        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            if (now - lastMouseMove < 32) return;
            lastMouseMove = now;
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const applyCanvasSize = () => {
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

        const animate = () => {
            if (!ctx) return;
            // Не рисуем кадры, когда канвас вне вьюпорта
            if (isVisible) {
                ctx.clearRect(0, 0, width, height);
                particlesArray.sort((a, b) => a.currentZ - b.currentZ);
                particlesArray.forEach(p => {
                    p.update(tweenedScatter.value, activeLayoutIndex, targetLayouts, mouse);
                    p.draw();
                });
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        const init = async () => {
            applyCanvasSize();
            await buildLayouts();
            animate();
            projectsData.forEach((_, i) => {
                const sectionEl = document.querySelector(`section[data-index="${i}"]`);
                if (!sectionEl) return;
                const trigger = ScrollTrigger.create({
                    trigger: sectionEl,
                    start: 'top center',
                    end: 'bottom center',
                    onUpdate: (self) => {
                        activeLayoutIndex = i;
                        if (self.progress < 0.25) tweenedScatter.value = 1.0 - (self.progress / 0.25);
                        else if (self.progress > 0.75) tweenedScatter.value = (self.progress - 0.75) / 0.25;
                        else tweenedScatter.value = 0;
                    }
                });
                createdTriggers.push(trigger);
            });
        };

        // Debounce resize — пересчёт макетов дорогой, не дергаем на каждый пиксель
        let resizeTimer: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                applyCanvasSize();
                buildLayouts();
            }, 250);
        };

        // IntersectionObserver — пауза рендера, когда канвас не виден
        const observer = new IntersectionObserver(
            ([entry]) => { isVisible = entry.isIntersecting; },
            { threshold: 0 }
        );
        observer.observe(canvas);

        init();
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', handleResize);
        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(resizeTimer);
            observer.disconnect();
            createdTriggers.forEach(t => t.kill());
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
            // Освобождаем память GPU
            canvas.width = 0;
            canvas.height = 0;
            particlesArray = [];
            targetLayouts = [];
        };
    }, []);
    return <canvas ref={canvasRef} id="mainCanvas" aria-hidden="true" />;
};
export default ProjectCanvas;