import React from 'react';

interface ProjectSectionProps {
    project: any;
    index: number;
}

const ProjectSection = ({ project, index }: ProjectSectionProps) => {
    const isReverse = index % 2 === 1;
    return (
        <section className="project-section relative overflow-visible min-h-screen lg:h-screen" data-index={index}>
            <span
                className={`absolute top-1/2 -translate-y-1/2 text-[28vw] sm:text-[32vw] md:text-[35vw] font-black opacity-[0.07] tracking-[-0.05em] transition-opacity duration-1000 pointer-events-none select-none z-0 ${isReverse ? 'left-0' : 'right-5'}`}
                style={{
                    color: '#4c4c4c',
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden',
                    lineHeight: 1,
                    zIndex: 0,
                    whiteSpace: 'nowrap'
                }}
            >
                {String(index + 1).padStart(2, '0')}
            </span>

            <div className={`section-inner ${isReverse ? 'reverse' : ''} relative z-10`}>
                <div className="content-half">
                    <div className={`project-card relative z-10 ${isReverse ? 'from-right' : ''}`}>
                        <div className="text-col w-full">
                            <h2 className="project-title">{project.title}</h2>
                            <div className="text-row">
                                <strong>{project.donorLabel || 'Донор'}:</strong>
                                <span className="donor-badge">
                                    {project.donor}
                                </span>
                            </div>
                            <div className="text-row">
                                <strong>Задача:</strong>
                                <p dangerouslySetInnerHTML={{ __html: project.task }} />
                            </div>
                            <div className="text-row">
                                <strong>Наше решение:</strong>
                                <ul className="custom-list">
                                    {project.solution.map((item: string, idx: number) => (
                                        <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                                    ))}
                                </ul>
                            </div>
                            <div className="text-row">
                                <strong>Ключевые результаты:</strong>
                                <ul className="custom-list">
                                    {project.results.map((item: string, idx: number) => (
                                        <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="empty-half" />
            </div>
        </section>
    );
};

export default ProjectSection;
