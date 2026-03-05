"use client";
import React, {useRef, useEffect} from 'react';
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import AnimatedMap from "@/components/AnimatedMap";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const stats = [
    {
        value: 150,
        suffix: "+",
        label: "Создано обучающих роликов и профессионального видеоконтента.",
        gradient: "from-[#FF4A48] to-[#FF4A48]"
    },
    {
        value: 40,
        suffix: "K+",
        label: "Учителей и специалистов прошли обучение на наших платформах.",
        gradient: "from-[#0068E0] to-[#8059E1]"
    },
    {
        value: 6,
        suffix: "+",
        label: "Лет успешного опыта работы с международными донорами и госсектором.",
        gradient: "from-[#0068E0] to-[#0068E0]"
    }
];

export default function StatsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contentRef = useRef<HTMLDivElement>(null); // Реф для контента
    const cachedNodes = useRef<HTMLCanvasElement[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', {alpha: true});
        if (!ctx) return;

        const colorStops = [
            {r: 255, g: 74, b: 72},  // Red
            {r: 128, g: 89, b: 225}, // Purple
            {r: 0, g: 104, b: 224}   // Blue
        ];

        const getInterpolatedColor = (t: number) => {
            t = Math.max(0, Math.min(1, t));
            const scaledT = t * (colorStops.length - 1);
            const i = Math.floor(scaledT);
            const f = scaledT - i;
            if (i >= colorStops.length - 1) return colorStops[colorStops.length - 1];
            const c1 = colorStops[i];
            const c2 = colorStops[i + 1];
            return {
                r: Math.round(c1.r + (c2.r - c1.r) * f),
                g: Math.round(c1.g + (c2.g - c1.g) * f),
                b: Math.round(c1.b + (c2.b - c1.b) * f)
            };
        };

        // Создаем 30 цветовых ступеней, в каждой по 3 типа треугольника (итого 90 пре-рендеров)
        const createCache = () => {
            const steps = 30;
            const nodes: HTMLCanvasElement[] = [];
            for (let i = 0; i <= steps; i++) {
                const color = getInterpolatedColor(i / steps);
                for (let type = 0; type < 3; type++) {
                    const offCanvas = document.createElement('canvas');
                    offCanvas.width = 60;
                    offCanvas.height = 60;
                    const oCtx = offCanvas.getContext('2d')!;
                    oCtx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.7)`;
                    oCtx.lineWidth = 2;
                    oCtx.lineCap = "round";
                    oCtx.lineJoin = "round";
                    oCtx.translate(30, 30);
                    oCtx.beginPath();
                    if (type === 0) {
                        oCtx.moveTo(-10, -15);
                        oCtx.lineTo(12, 10);
                        oCtx.lineTo(-20, 16);
                        oCtx.closePath();
                        oCtx.moveTo(-20, 16);
                        oCtx.lineTo(-4, 3);
                        oCtx.lineTo(12, 10);
                        oCtx.lineTo(-8, -16);
                    } else if (type === 1) {
                        oCtx.moveTo(10, -18);
                        oCtx.lineTo(9, 16);
                        oCtx.lineTo(-20, -2);
                        oCtx.closePath();
                        oCtx.moveTo(-20, -2);
                        oCtx.lineTo(-10, -3);
                        oCtx.lineTo(10, 16);
                        oCtx.lineTo(11, -18);
                    } else {
                        oCtx.moveTo(10, -18);
                        oCtx.lineTo(9, 16);
                        oCtx.lineTo(-20, -2);
                        oCtx.closePath();
                        oCtx.moveTo(-20, -2);
                        oCtx.lineTo(6, -2);
                        oCtx.lineTo(10, 16);
                        oCtx.lineTo(11, -18);
                    }
                    oCtx.stroke();
                    nodes.push(offCanvas);
                }
            }
            cachedNodes.current = nodes;
        };

        createCache();

        let particlesArray: TriangleParticle[] = [];
        const svgPathString = "M506.284 7.85238C536.113 23.6611 548.158 39.8201 587.492 49.8046C608.341 55.1033 630.986 63.0734 635.542 37.1051C659.063 36.7109 691.388 44.4182 713.858 41.528C726.123 39.9515 731.685 30.3174 741.365 29.6605C751.046 29.0036 765.938 37.7181 777.852 39.0757C810.133 42.7542 851.219 37.1926 881.792 38.8567C895.94 39.6012 913.286 48.7974 933.39 49.5418C939.216 49.7608 947.363 45.8634 949.246 46.2137C955.598 47.3961 953.977 59.8328 957.043 64.7375C959.846 69.1604 967.249 70.2552 970.884 74.5905C974.301 78.5756 973.688 86.677 975.045 87.9031C979.031 91.5378 1011.23 82.6044 1027.69 92.2385C1033.91 95.8294 1070.09 133.534 1057.13 141.591C1047.32 146.233 1035.1 140.365 1025.46 145.27C1017.44 149.343 1018.8 161.21 1017.18 162.48C1014.42 164.67 1005.75 161.954 1000.84 163.049C997.559 163.794 997.647 170.012 993.135 171.983C953.846 189.718 944.034 197.382 910.526 220.547C906.803 223.131 899.532 221.73 893.838 225.408C883.501 232.152 873.733 273.666 860.636 278.79C854.592 281.155 847.715 276.031 840.137 277.301C831.552 278.702 824.544 287.636 811.71 288.687C794.234 290.132 754.813 280.104 743.468 286.848C728.926 295.518 736.547 300.248 733.043 307.736C730.985 312.159 725.334 315.4 722.969 321.706C719.859 329.895 724.896 339.573 722.969 342.638C721.83 344.39 714.428 345.046 711.581 348.988C705.405 357.658 709.741 349.207 686.22 363.001C670.539 361.03 664.1 367.949 657.574 371.715C653.194 374.255 653.5 389.276 631.906 381.963C617.671 377.146 628.271 347.98 615.481 339.397C589.594 354.286 578.6 373.861 546.932 355.119C540.274 364.315 551.575 372.153 550.874 376.576C549.954 382.401 538.916 379.204 533.134 382.05C521.483 387.875 510.007 405.61 499.889 408.456C491.348 410.865 475.798 404.822 465.68 415.113C464.498 416.295 449.693 442.701 449.342 444.278C447.546 451.985 456.482 457.021 456.92 466.612C458.584 502.564 429.676 486.58 412.374 489.077C405.103 490.128 396.211 500.156 383.509 502.564C357.491 507.513 331.079 492.536 302.915 504.272C295.337 507.425 298.14 520.256 289.993 521.745C278.211 517.804 280.094 514.257 277.422 510.534C274.969 507.119 276.765 500.769 276.196 500.2C269.669 493.981 230.292 533.393 240.936 484.478L223.634 488.288L215.4 464.816C206.201 472.961 184.651 474.713 178.3 478.61C173.964 481.282 173.613 490.171 168.051 491.573C165.16 492.273 160.298 489.033 156.706 489.295C151.275 489.733 145.537 492.58 141.025 492.361C137.696 492.186 137.828 442.132 93.8949 472.699L86.0107 478.523C66.0811 493.412 53.8167 461.794 38.6177 460.831C28.6748 460.174 15.622 471.648 1.82463 464.597C1.38661 453.036 -3.82574 412.967 5.63534 405.917C10.4535 402.369 18.5567 416.251 25.2145 413.711C21.2286 406.88 20.0898 394.399 28.1054 390.195C32.6607 387.787 72.2571 378.109 77.2066 379.072C79.6595 379.554 117.986 399.348 121.534 401.888C126.045 405.128 125.651 412.66 129.199 413.755C139.142 416.952 132.002 402.107 138.879 396.02C145.756 389.933 167.087 391.86 169.715 389.539C171.774 387.699 170.109 376.007 176.022 375.525C178.694 375.306 183.6 379.072 187.805 378.284C201.033 375.788 199.325 367.643 218.641 378.459C224.204 381.569 219.561 391.772 240.936 382.357C242.206 410.865 249.389 386.298 252.631 384.327C266.122 376.095 257.843 385.773 269.669 372.11C286.883 352.141 289.073 351.09 311.543 366.679C316.23 360.417 298.272 334.755 309.616 335.369C311.237 335.456 323.37 351.659 332.831 351.177C334.627 351.09 334.933 345.922 336.773 344.784C339.576 343.032 344.088 343.47 345.577 342.069C348.205 339.441 347.329 332.96 350.702 329.501C357.184 322.8 375.581 323.632 382.107 313.736C368.792 305.459 348.643 312.641 335.021 305.897C324.377 300.642 286.007 298.058 291.921 288.249C292.621 282.731 292.84 260.66 286.007 260.879C284.912 260.879 281.715 267.098 278.298 267.142C277.379 267.142 261.741 260.879 261.128 260.179C258.807 257.464 261.654 246.034 259.814 239.903C256.748 229.568 258.5 211.745 242.819 223.525C233.971 229.043 244.834 232.765 237.125 243.319C234.804 246.516 228.277 251.377 225.167 248.924C223.81 247.829 228.19 239.465 221.225 241.173L215.312 254.88L209.487 264.689L201.602 272.572C183.95 262.719 196.784 268.893 195.777 268.587C186.929 260.222 162.575 259.39 156.399 248.88C153.946 244.72 158.108 238.502 156.75 233.203C150.924 210.563 137.302 230.313 129.637 228.868C124.512 227.904 120.526 218.402 115.139 215.774C108.525 212.534 91.2668 216.037 100.027 202.374C100.684 201.323 117.416 196.156 123.023 191.952C133.185 184.419 137.521 171.808 151.012 164.932C156.049 162.392 165.466 163.268 166.211 162.568C168.138 160.597 164.897 148.51 166.386 147.022C167.043 146.365 178.081 147.722 183.031 146.102C190.389 143.65 196.302 134.891 205.632 135.198C208.786 130.994 194.988 116.543 191.397 115.93C188.068 115.36 172.606 130.644 170.328 117.506C168.532 107.128 188.55 93.0267 189.338 91.5378C190.389 89.5234 183.775 78.8821 186.097 76.4736C186.578 75.9481 193.806 76.9115 197.529 74.284C205.282 68.6787 202.96 60.1832 218.159 55.4537C221.488 54.4465 267.523 48.666 270.151 48.9725C279.437 50.2425 284.825 58.2125 289.993 58.9132C307.207 61.2779 331.298 63.993 348.337 73.233C353.812 76.2108 354.469 83.3926 359.637 85.5822C370.412 90.0927 384.735 86.677 396.518 91.6692C406.067 95.6542 408.213 109.93 421.485 107.741C415.834 98.2817 412.155 89.7862 413.294 78.269C413.732 74.0213 425.514 36.0103 427.398 33.2952C434.406 23.5297 449.693 18.0996 459.373 12.2315C462.132 10.5675 462.702 3.51703 466.206 2.99153C470.323 2.37845 478.295 7.63342 485.61 5.92556C492.925 4.21769 478.12 -7.43083 506.372 7.54584V7.80859L506.284 7.85238Z";
        const mapPath = new Path2D(svgPathString);
        const svgWidth = 1060, svgHeight = 522;
        let scale = 1, offsetX = 0, offsetY = 0;
        const mouse = {x: -2000, y: -2000, radius: 80};

        class TriangleParticle {
            svgX: number;
            svgY: number;
            x: number;
            y: number;
            size: number;
            angle: number;
            density: number;
            nodeIdx: number;

            constructor(svgX: number, svgY: number) {
                this.svgX = svgX;
                this.svgY = svgY;
                this.x = 0;
                this.y = 0;
                this.size = (Math.random() * 12) + 8;
                this.angle = Math.random() * 360;
                this.density = (Math.random() * 15) + 5;

                // Выбираем индекс из кэша на основе позиции (30 ступеней * 3 типа)
                const t = svgX / svgWidth;
                const stepIdx = Math.round(t * 30);
                const type = Math.floor(Math.random() * 3);
                this.nodeIdx = (stepIdx * 3) + type;
            }

            update() {
                const targetX = this.svgX * scale + offsetX;
                const targetY = this.svgY * scale + offsetY;
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distSq = dx * dx + dy * dy;
                const activeRadius = mouse.radius;
                const activeRadiusSq = activeRadius * activeRadius;

                if (distSq < activeRadiusSq) {
                    const dist = Math.sqrt(distSq);
                    const force = (activeRadius - dist) / activeRadius;
                    this.x -= (dx / dist) * force * this.density * 0.4;
                    this.y -= (dy / dist) * force * this.density * 0.4;
                    this.angle += force * 5;
                } else {
                    this.x += (targetX - this.x) * 0.04;
                    this.y += (targetY - this.y) * 0.04;
                }
            }

            draw() {
                const img = cachedNodes.current[this.nodeIdx];
                if (!img) return;
                const s = (this.size / 30) * scale;
                ctx!.save();
                ctx!.translate(this.x, this.y);
                ctx!.rotate(this.angle * Math.PI / 180);
                ctx!.scale(s, s);
                ctx!.drawImage(img, -30, -30);
                ctx!.restore();
            }
        }

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const sW = canvas.width / svgWidth, sH = canvas.height / svgHeight;
            scale = Math.min(sW, sH) * 0.85;
            offsetX = (canvas.width - svgWidth * scale) / 2;
            offsetY = (canvas.height - svgHeight * scale) / 2;

            particlesArray = [];
            const isMobile = window.innerWidth < 768;
            const maxP = isMobile ? 500 : 1800;
            let att = 0;
            while (particlesArray.length < maxP && att < 40000) {
                const tx = Math.random() * svgWidth, ty = Math.random() * svgHeight;
                if (ctx.isPointInPath(mapPath, tx, ty)) {
                    const p = new TriangleParticle(tx, ty);
                    p.x = tx * scale + offsetX;
                    p.y = ty * scale + offsetY;
                    particlesArray.push(p);
                }
                att++;
            }
        };

        let frame: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0, len = particlesArray.length; i < len; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            frame = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!canvasRef.current) return;

            // Используем getBoundingClientRect для получения реальных координат холста на экране
            const rect = canvasRef.current.getBoundingClientRect();

            // ВАЖНО: Если у вас есть CSS scale или смещения, нужно нормировать координаты
            const scaleX = canvasRef.current.width / rect.width;
            const scaleY = canvasRef.current.height / rect.height;

            // Точный расчет позиции курсора внутри системы координат Canvas
            mouse.x = (e.clientX - rect.left) * scaleX;
            mouse.y = (e.clientY - rect.top) * scaleY;

            // Параллакс для контента (оставляем как был, он работает хорошо)
            if (contentRef.current) {
                const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
                const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
                gsap.to(contentRef.current, { x: moveX, y: moveY, duration: 1, ease: "power2.out" });
            }
        };

        window.addEventListener('resize', init);
        window.addEventListener('mousemove', handleMouseMove);
        init();
        animate();

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', init);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useGSAP(() => {
        const numbers = containerRef.current?.querySelectorAll(".stat-number");
        numbers?.forEach((num) => {
            const target = parseInt(num.getAttribute("data-target") || "0");
            gsap.fromTo(num, {innerText: 0}, {
                innerText: target, duration: 2, snap: {innerText: 1}, ease: "power2.out",
                scrollTrigger: {trigger: num, start: "top 90%"}
            });
        });
    }, {scope: containerRef});

    return (
        <section ref={containerRef}
                 className="relative min-h-screen w-full flex items-center bg-[var(--bg-main)] overflow-hidden">
            <AnimatedMap />
            <div className="absolute inset-0 z-5 pointer-events-none flex justify-around items-center opacity-30">
                {stats.map((_, i) => (
                    <div key={i} className="w-[30vw] h-[30vw] rounded-full bg-blue-500/10 blur-[120px]" />
                ))}
            </div>
            <div className="absolute inset-0 z-5 pointer-events-none flex justify-around items-center opacity-30">
                {stats.map((_, i) => (
                    <div key={i} className="w-[30vw] h-[30vw] rounded-full bg-blue-500/20 stats-glow"/>
                ))}
            </div>
            <div
                ref={contentRef}
                className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 pointer-events-none">
                <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-12">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col group min-w-[280px] pointer-events-auto">
                            <div className={`text-[12vw] font-black leading-[0.8] bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent flex items-baseline mb-6 select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]`}>
                                <span className="stat-number" data-target={stat.value}>{stat.value}</span>
                                <span className="text-[0.6em]">{stat.suffix}</span>
                            </div>
                            <div
                                className="w-12 h-[2px] mb-6 bg-[var(--text-muted)] opacity-30 group-hover:w-full transition-all duration-700"/>
                            <p className="text-[12px] min-h-[90px] px-4 py-2 text-zinc-600 font-bold uppercase tracking-wider max-w-[260px] bg-zinc-100/90">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}