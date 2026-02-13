"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const helpSteps = [
    {
        title: "Цифровизация госуслуг",
        desc: "Автоматизация процессов для исключения бюрократии.",
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
        effect: "slide-up"
    },
    {
        title: "IT-инфраструктура",
        desc: "Сети нового поколения и мощные дата-центры.",
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
        effect: "zoom-in"
    },
    {
        title: "Цифровое образование",
        desc: "Подготовка кадров для новой экономики.",
        img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1000",
        effect: "diagonal-fly"
    },
    {
        title: "Кибербезопасность",
        desc: "Защита данных на государственном уровне.",
        img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000",
        effect: "reveal-right"
    },
    {
        title: "AI и Big Data",
        desc: "Аналитика больших данных для принятия решений.",
        img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000",
        effect: "3d-flip"
    },
    {
        title: "Smart City",
        desc: "Интеллектуальное управление городской средой.",
        img: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=1000",
        effect: "lens-blur"
    }
];

export default function ServicesSection() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const steps = gsap.utils.toArray(".help-step");
        const images = gsap.utils.toArray(".step-img-container");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=500%", // Теперь скролл стал длиннее и медленнее
                pin: true,
                scrub: 2, // Увеличили инерцию для плавности
                invalidateOnRefresh: true,
            }
        });

        steps.forEach((step: any, i) => {
            const img = images[i] as any;
            const effect = helpSteps[i].effect;
            const stepTL = gsap.timeline();

            // ВАРИАНТЫ ПОЯВЛЕНИЯ
            switch (effect) {
                case "slide-up":
                    stepTL.fromTo(step, { opacity: 0, y: 150 }, { opacity: 1, y: 0 })
                        .fromTo(img, { opacity: 0, scale: 0.8, y: 200 }, { opacity: 1, scale: 1, y: 0 }, "<");
                    break;
                case "zoom-in":
                    stepTL.fromTo(step, { opacity: 0, x: -100 }, { opacity: 1, x: 0 })
                        .fromTo(img, { opacity: 0, scale: 2, filter: "blur(20px)" }, { opacity: 1, scale: 1, filter: "blur(0px)" }, "<");
                    break;
                case "diagonal-fly":
                    stepTL.fromTo(step, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1 })
                        .fromTo(img, { opacity: 0, x: 500, y: 500, rotate: 45 }, { opacity: 1, x: 0, y: 0, rotate: 0 }, "<");
                    break;
                case "reveal-right":
                    stepTL.fromTo(step, { opacity: 0, filter: "blur(10px)" }, { opacity: 1, filter: "blur(0px)" })
                        .fromTo(img, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }, "<");
                    break;
                case "3d-flip":
                    stepTL.fromTo(step, { opacity: 0, rotateX: -90 }, { opacity: 1, rotateX: 0 })
                        .fromTo(img, { opacity: 0, rotateY: 90, perspective: 1000 }, { opacity: 1, rotateY: 0 }, "<");
                    break;
                case "lens-blur":
                    stepTL.fromTo(step, { opacity: 0, y: 100 }, { opacity: 1, y: 0 })
                        .fromTo(img, { opacity: 0, scale: 1.5, filter: "brightness(2) blur(30px)" }, { opacity: 1, scale: 1, filter: "brightness(1) blur(0px)" }, "<");
                    break;
            }

            tl.add(stepTL);

            // УХОД (кроме последнего)
            if (i < steps.length - 1) {
                tl.to([step, img], {
                    opacity: 0,
                    y: -100,
                    filter: "blur(10px)",
                    duration: 0.5,
                    delay: 0.5
                });
            }
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative h-screen bg-[#050505] text-white overflow-hidden font-sans">
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                 style={{ backgroundImage: 'linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

            <div className="container mx-auto px-6 h-full relative flex items-center justify-center">
                {helpSteps.map((item, i) => (
                    <div key={i} className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-12 pointer-events-none">

                        <div className="help-step w-full md:w-1/2 z-20 px-4">
                            <h4 className="text-blue-500 font-mono text-xl mb-4 opacity-50 tracking-widest">STEP_0{i+1}</h4>
                            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6 italic">
                                {item.title}
                            </h3>
                            <p className="text-zinc-400 text-xl max-w-sm font-light border-l-2 border-blue-600 pl-6">
                                {item.desc}
                            </p>
                        </div>

                        <div className="step-img-container w-full md:w-1/2 flex justify-center">
                            <div className="relative w-full aspect-square md:w-[550px] md:h-[550px] group">
                                <div className="absolute -inset-4 bg-blue-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10" />
                                <div className="absolute top-4 right-4 bg-blue-600 text-[10px] px-2 py-1 font-mono">ACTIVE_PROCESS</div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            {/* ПРОГРЕСС-ИНДИКАТОР ВНИЗУ */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
                {helpSteps.map((_, i) => (
                    <div key={i} className="h-1 w-12 bg-white/10 overflow-hidden">
                        <div className="h-full bg-blue-600 w-full origin-left scale-x-0" />
                    </div>
                ))}
            </div>
        </section>
    );
}