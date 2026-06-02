import React from 'react';
import { projectsData } from '../data';

interface ProjectNavProps {
    activeIndex: number;
    scrollToSection: (e: React.MouseEvent, index: number) => void;
}

const ProjectNav = ({ activeIndex, scrollToSection }: ProjectNavProps) => {
    return (
        <div className="project-step-dot" id="sideDots" role="navigation" aria-label="Навигация по проектам">
            {projectsData.map((_, i) => {
                const ratio = i / (projectsData.length - 1);
                const hue = 232 + (266 - 232) * ratio;
                const color = `hsla(${hue}, 85%, 64%, ${activeIndex === i ? 1 : 0.25})`;
                const shadow = activeIndex === i ? `0 0 12px hsla(${hue}, 85%, 64%, 0.6)` : 'none';
                
                return (
                    <div
                        key={`dot-${i}`}
                        className={`step-dot ${activeIndex === i ? 'active' : ''}`}
                        data-index={i}
                        role="button"
                        tabIndex={0}
                        onClick={(e) => scrollToSection(e, i)}
                        aria-label={`Перейти к проекту ${i + 1}`}
                        style={{ 
                            background: color,
                            boxShadow: shadow
                        } as React.CSSProperties}
                    />
                );
            })}
        </div>
    );
};

export default ProjectNav;
