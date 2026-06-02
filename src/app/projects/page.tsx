"use client";

import React, { useEffect, useState } from 'react';
import { gsap, ScrollTrigger, ScrollToPlugin, Observer } from 'gsap/all';

// Стили
import './projects.css';

// Данные
import { projectsData } from './data';

// Компоненты
import ProjectCanvas from './components/ProjectCanvas';
import ProjectLine from './components/ProjectLine';
import ProjectNav from './components/ProjectNav';
import ProjectSection from './components/ProjectSection';

// Хуки
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function ProjectsPage() {
    const [activeIndex, setActiveIndex] = useState(-1);

    // 1. Активируем движок плавного инерционного скролла
    useSmoothScroll();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);

        // 2. Инициализация анимации появления карточек (IntersectionObserver)
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.project-card').forEach(card => {
            cardObserver.observe(card);
        });

        // 3. Обработчик для определения активной секции (для навигационных точек)
        const handleScrollSections = () => {
            let minDistance = Infinity;
            let closestIndex = -1;

            document.querySelectorAll('section[data-index]').forEach((sec) => {
                const rect = sec.getBoundingClientRect();
                const center = rect.top + rect.height / 2;
                const dist = Math.abs(center - window.innerHeight / 2);
                if (dist < minDistance) {
                    minDistance = dist;
                    closestIndex = parseInt(sec.getAttribute('data-index') || '-1');
                }
            });

            setActiveIndex(closestIndex);
        };

        window.addEventListener('scroll', handleScrollSections, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScrollSections);
            cardObserver.disconnect();
        };
    }, []);

    // 4. Функция перемещения к секции (используется навигационными точками)
    const scrollToSection = (e: React.MouseEvent, index: number) => {
        e.preventDefault();
        const section = document.querySelector(`section[data-index="${index}"]`) as HTMLElement;
        if (section) {
            const newY = section.offsetTop;
            
            // Сообщаем движку скролла новую цель
            if ((window as any)._updateScrollTarget) {
                (window as any)._updateScrollTarget(newY);
            }
            
            gsap.to(window, {
                scrollTo: { y: newY, autoKill: false },
                duration: 1.5,
                ease: "power3.inOut"
            });
        }
    };

    return (
        <div id="projects-wrapper">
            {/* Анимированная SVG линия прогресса и светящаяся точка */}
            <ProjectLine />

            {/* Боковая навигация (точки) */}
            <ProjectNav 
                activeIndex={activeIndex} 
                scrollToSection={scrollToSection} 
            />

            {/* Фоновый Canvas с частицами (логотипы доноров) */}
            <ProjectCanvas />

            {/* Заголовок страницы */}
            <div className="projects-header pt-28 sm:pt-32 md:pt-40 pb-0 text-center relative z-20 px-4">
                <h1 className="page-title !opacity-100 !transform-none !static">
                    Наши <span>проекты</span>
                </h1>
            </div>

            {/* Контейнер со списком проектов */}
            <div id="projects-container">
                {projectsData.map((proj, i) => (
                    <ProjectSection 
                        key={i} 
                        project={proj} 
                        index={i} 
                    />
                ))}
            </div>
        </div>
    );
}
