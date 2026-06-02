
"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap/all';

const ProjectLine = () => {
    const svgPathRef = useRef<SVGPathElement>(null);
    const glowDotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const path = svgPathRef.current;
        const glowDot = glowDotRef.current;
        if (!path || !glowDot) return;

        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = `${pathLength}`;
        path.style.strokeDashoffset = `${pathLength}`;

        const updateLine = () => {
            const scrollTop = window.scrollY;
            const scrollTotal = document.documentElement.scrollHeight;
            const viewportH = window.innerHeight;

            // Линия теперь охватывает весь путь от самого верха до самого низа
            // Прогресс 1 достигается, когда пользователь долистал до конца страницы
            // Ускоряем линию: она будет достигать конца чуть раньше и двигаться быстрее в начале
            const targetScrollRange = Math.max(scrollTotal - viewportH * 1.3, 1);
            const rawProgress = Math.min(Math.max(scrollTop / targetScrollRange, 0), 1);
            
            // Используем степень < 1 для "быстрого старта"
            const progress = Math.pow(rawProgress, 0.85);
            
            path.style.strokeDashoffset = `${pathLength - (pathLength * progress)}`;

            try {
                const svgEl = document.getElementById('scrollLineSVG') as any;
                if (!svgEl) return;
                const svgRect = svgEl.getBoundingClientRect();
                const viewBoxAttr = svgEl.getAttribute('viewBox');
                if (!viewBoxAttr) return;
                const viewBox = viewBoxAttr.split(' ');
                const svgW = parseFloat(viewBox[2]);
                const svgH = parseFloat(viewBox[3]);
                
                const pt = path.getPointAtLength(pathLength * progress);
                const scaleX = svgRect.width / svgW;
                const scaleY = svgRect.height / svgH;
                const screenX = svgRect.left + pt.x * scaleX;
                const screenY = svgRect.top + pt.y * scaleY;
                
                glowDot.style.left = screenX + 'px';
                glowDot.style.top = (screenY + scrollTop) + 'px';
                // Слегка увеличили зону видимости
                glowDot.style.opacity = (screenY > -100 && screenY < window.innerHeight + 100) ? '1' : '0';
            } catch (e) {}
        };

        // Используем gsap.ticker для идеальной синхронизации с частотой кадров (60/120 FPS)
        gsap.ticker.add(updateLine);
        window.addEventListener('resize', updateLine);
        updateLine();

        return () => {
            gsap.ticker.remove(updateLine);
            window.removeEventListener('resize', updateLine);
        };
    }, []);

    return (
        <>
            <svg id="scrollLineSVG" preserveAspectRatio="none" viewBox="0 0 1440 5872" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#5266F2" />
                        <stop offset="100%" stopColor="#9B5AF0" />
                    </linearGradient>
                </defs>
                <path ref={svgPathRef} id="animatedPath" d="M-1.99992 2.57326C42.0001 -0.426745 99.4079 89.463 173.5 148.073C307.5 254.073 528.5 279.074 707.5 285.074C886.5 291.074 1189 238.574 1332.5 387.574C1476 536.574 1373.5 759.575 1344 794.074C1316.01 826.804 1197 924.075 963 979.574C737.258 1033.12 147.562 961.935 1 1033.57C-109.5 1087.58 -190.5 1316.57 -44 1447.57C31.0316 1514.67 175.314 1554.1 234.5 1541.08C334.5 1519.08 485.5 1491.08 553 1633.08C598.379 1728.54 375.052 1841.58 464.5 2021.58C505 2103.08 870.045 2163.09 980.5 2186.58C1241.5 2242.08 1421.5 2342.08 1364 2557.08C1306.5 2772.08 370.5 2812.08 205.5 2876.08C40.5 2940.08 -24 3109.08 38 3183.58C141.904 3308.43 556.316 3307.58 752 3307.58C980.5 3307.58 1376.5 3314.58 1561.5 3416.58C1746.5 3518.58 1698.46 3940.37 1561.5 3912.58C1046.5 3808.08 556.854 3827.56 491 3985.08C454 4073.58 458.03 4167.83 534 4294.08C602 4407.08 822.5 4522.08 960 4659.58C1097.5 4797.08 1038 5052.58 790 5101.58C542 5150.58 335 5066.08 166.5 5199.08C-1.99997 5332.08 -16.5 5538.08 149 5654.58C314.5 5771.08 560 5729.58 675 5870.08"
                    stroke="url(#lineGradient)" strokeOpacity="0.75" strokeWidth="5" strokeLinecap="round" />
            </svg>
            <div 
                ref={glowDotRef} 
                className="line-glow-dot" 
                id="lineGlowDot" 
                aria-hidden="true"
                style={{
                    backgroundColor: '#9B5AF0',
                    boxShadow: '0 0 20px 6px rgba(155, 90, 240, 0.6)'
                }}
            />
        </>
    );
};

export default ProjectLine;
