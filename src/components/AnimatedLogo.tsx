'use client';
import React, { useEffect, useRef } from 'react';

const rawLogoSVG = `<svg width="428" height="435" viewBox="0 0 428 435" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_359_1769)"><path d="M194.269 0L278.988 50.493L188.621 103.119V3.88462C188.621 2.45791 191.643 0.649791 192.857 0H194.269Z" fill="#FE4A46"/><path d="M93.3115 157.504L92.9585 51.5527L183.665 104.179L93.3115 157.504Z" fill="#FEB548"/><path d="M92.5984 383.517V277.572L183.665 330.898L92.5984 383.517Z" fill="#1ADA1A"/><path d="M281.819 383.517L190.732 330.898L281.819 277.572V383.517Z" fill="#0069E3"/><path d="M91.1863 164.566L90.4732 270.511L0.098877 217.192L91.1863 164.566Z" fill="#FEE100"/><path d="M-7.62939e-06 214.944L0.713097 109L91.0874 162.318L-7.62939e-06 214.944Z" fill="#FEB548"/><path d="M91.1863 158.916L9.34812 111.884C6.23445 109.716 2.61241 107.915 5.13301 103.543L90.4802 52.9648L91.1863 158.902V158.916Z" fill="#FEB548"/><path d="M189 334L269.05 378.834C272.095 380.901 275.638 382.618 273.173 386.786L189.691 435L189 334.013V334Z" fill="#1ADA1A"/><path d="M281.819 157.504L190.732 104.179L281.819 51.5596V157.504Z" fill="#FE4A46"/><path d="M90.0874 382.944L-1 329.619L90.0874 277V382.944Z" fill="#FEE100"/><path d="M186.503 332.663C186.503 365.294 185.274 397.826 185.839 430.52C185.889 432.802 182.831 435.288 180.678 434.956C151.949 419.128 124.272 401.145 95.4367 385.628L186.51 332.67L186.503 332.663Z" fill="#1ADA1A"/><path d="M283.938 158.916V52.9717L369.723 103.818C371.318 108.578 369.052 109.602 365.776 111.884L283.938 158.916Z" fill="#FE4A46"/><path d="M186.457 103.421L94.8176 50.2559L181.847 1.56958C186.765 2.57823 186.513 5.05256 186.843 9.03109L186.457 103.421Z" fill="#FE4A46"/><path d="M0.105957 220.363L90.4873 273.681L7.68187 322.225C5.9238 323.864 0.105957 322.176 0.105957 320.304V220.363Z" fill="#FEE100"/><path d="M283.938 382.104V276.16L366.482 323.899C370.944 325.686 371.728 330.729 367.47 333.243L283.931 382.104H283.938Z" fill="#0069E3"/><path d="M354.144 211.592C372.785 209.951 382.163 201.675 380.687 182.292C380.496 179.753 379.24 177.051 379.262 174.525C379.262 173.443 378.8 172.474 380.354 172.735C382.468 173.096 387.993 179.831 388.838 181.932C392.455 190.944 386.837 203.769 382.113 211.585C393.86 210.524 396.612 200.918 400.882 191.828C406.436 194.962 402.414 207.596 402.975 208.756C403.649 210.149 410.586 210.963 413.047 212.165C425.83 218.391 410.671 224.842 403.429 225.776C402.868 228.506 404.606 241.26 401.577 241.954C399.222 242.491 397.74 235.58 396.86 233.96C396.073 232.503 393.533 228.902 392.377 227.834C391.221 226.766 384.156 222.048 383.532 224.665C383.39 225.266 387.788 233.67 388.433 236.005C390.888 244.833 391.1 250.803 385.241 258.139C384.433 259.15 378.361 266.246 378.751 261.563C379.418 253.541 381.822 249.997 379.779 241.112C376.772 228.011 367.146 224.686 354.761 223.689C350.966 223.385 341.227 222.974 337.857 223.597C334.942 224.135 336.737 228.096 335.29 230.926C334.864 231.76 331.665 235.106 330.792 234.901C327.302 230.232 326.756 223.045 319.095 224.311C319.883 227.657 321.599 230.798 322.323 234.151C323.798 241.013 322.507 251.143 327.565 256.469C333.374 262.588 344.965 259.603 341.383 251.157C339.432 246.552 334.772 250.315 332.58 250.853C329.438 251.631 328.04 241.409 335.361 239.464C339.73 238.304 342.376 241.26 343.539 241.169C344.163 241.119 346.972 234.703 348.817 233.111C357.421 225.712 368.926 232.517 370.622 242.484C373.374 258.641 360.081 268.976 360.116 280.457C360.152 292.476 377.346 293.508 374.012 282.883C372.764 278.915 366.777 279.488 369.324 276.163C371.92 272.775 378.659 273.15 381.751 275.866C384.61 268.785 387.362 261.145 395.569 258.917C393.228 269.393 391.625 283.959 383.56 291.782C380.978 294.287 372.445 298.085 371.438 299.472C370.274 301.078 370.948 304.975 370.295 307.515C368.125 315.975 365.245 306.751 362.996 303.759C359.407 298.998 354.144 295.652 352.158 289.844C351.64 288.323 351.477 284.652 350.782 283.803C349.647 282.395 339.134 285.586 337.503 279.743C346.157 276.1 353.647 270.504 357.903 261.966C360.287 257.191 366.061 238.891 356.3 240.546C350.434 241.543 352.86 256.929 346.731 262.822C336.198 272.959 319.755 267.639 315.584 254.284C314.485 250.761 314.314 242.739 313.087 240.532C312.328 239.167 308.611 242.272 307.228 242.541C301.1 243.736 295.333 233.989 298.51 231.668C299.801 230.72 309.143 234.682 308.342 227.657C307.15 217.188 289.147 226.582 283.437 226.377C280.124 226.257 265.455 220.258 266.016 216.976C266.363 214.946 279.401 209.088 281.997 208.841C288.58 208.225 294.503 212.229 300.326 212.356C312.804 212.625 309.463 200.26 297.844 203.125C297.709 196.999 301.014 191.227 307.952 192.684C309.796 193.073 311.264 195.025 313.421 194.65C314.279 184.768 316.123 173.429 325.948 168.647C334.516 164.48 347.724 169.043 350.618 178.395C351.491 181.224 352.356 200.932 359.833 193.957C367.309 186.982 355.74 167.494 349.207 162.146C347.32 160.604 338.439 156.034 338.921 154.067C339.773 150.637 348.363 151.825 350.959 152.278C350.214 142.417 357.18 138.441 362.273 132.131C363.301 130.851 367.139 124.138 367.607 124.025C369.196 123.65 371.012 127.682 371.211 128.955C371.544 131.063 370.026 134.338 370.934 135.887C371.395 136.673 383.234 142.509 386.022 145.904C390.043 150.799 394.839 168.102 395.534 174.568C395.825 177.249 390.838 173.874 390.263 173.457C385.17 169.743 383.127 160.321 382.149 159.635C381.226 158.977 374.211 163.858 369.749 159.302C366.742 156.232 373.658 155.185 374.303 151.903C376.034 143.11 365.401 142.48 361.67 149.193C356.506 158.489 369.522 173.705 370.707 183.778C372.161 196.157 363.479 211.776 350.008 203.005C346.894 200.975 344.617 194.721 344.114 194.601C340.844 193.823 338.78 197.961 333.992 194.962C331.076 193.137 328.934 188.128 331.048 185.164C332.488 183.148 341.248 189.274 341.716 181.479C342.163 174.072 332.374 174.094 327.905 178.366C323.025 183.028 324.196 190.364 323.139 196.214C322.231 201.286 320.479 205.969 319.088 210.878C327.125 212.399 326.863 204.214 329.331 201.682C333.687 197.218 337.857 207.893 336.084 211.585C341.936 211.211 348.363 212.095 354.144 211.585V211.592Z" fill="#0068E0"/></g></svg>`;

export default function AnimatedLogo() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let logicalWidth: number = 0;
        let logicalHeight: number = 0;
        let particlesArray: any[] = [];
        let animationId: number;
        const mouse = { x: -1000, y: -1000 };

        const CANVAS_OVERFLOW = 1.5;

        const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

        const config = {
            particleCount: 1500,
            particleSize: 0.22,
            mouseRadius: 3000,
            friction: 0.92,
            ease: 0.05,
            rotationSpeed: 0.03,
        };

        const trianglePaths = [
            [new Path2D("M25.6169 9.82498L47.8104 35.7961L14.223 42.0298L25.6169 9.82498Z"), new Path2D("M13.9256 41.9105L30.1113 28.079M30.1113 28.079L48.4512 35.5578M30.1113 28.079L25.9521 9.22898")],
            [new Path2D("M31.5826 4.45737L30.6703 38.6073L1.55305 20.7423L31.5826 4.45737Z"), new Path2D("M1.41241 20.4544L11.8929 19.7012M11.8929 19.7012L31.3061 38.8594M11.8929 19.7012L32.231 4.23915")],
            [new Path2D("M31.5826 4.45737L30.6703 38.6073L1.55305 20.7423L31.5826 4.45737Z"), new Path2D("M1.41265 20.4541L27.5382 20.669M27.5382 20.669L31.3063 38.8592M27.5382 20.669L32.2312 4.2389")]
        ];

        class Particle {
            targetX: number;
            targetY: number;
            color: string;
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            type: number;
            rotation: number;

            constructor(targetPt: { x: number; y: number; color: string }) {
                this.targetX = targetPt.x;
                this.targetY = targetPt.y;
                this.color = targetPt.color;
                this.x = Math.random() * logicalWidth;
                this.y = Math.random() * logicalHeight;
                this.vx = 0;
                this.vy = 0;
                this.size = config.particleSize + Math.random() * 0.1;
                this.type = Math.floor(Math.random() * 3);
                this.rotation = Math.random() * Math.PI * 2;
            }

            draw() {
                if (!ctx) return;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.scale(this.size, this.size);
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 2.5;
                ctx.lineJoin = "round";
                ctx.lineCap = "round";
                ctx.translate(-25, -25);
                ctx.stroke(trianglePaths[this.type][0]);
                ctx.stroke(trianglePaths[this.type][1]);
                ctx.restore();
            }

            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = dx * dx + dy * dy;

                if (distance < config.mouseRadius) {
                    let angle = Math.atan2(dy, dx);
                    let force = -config.mouseRadius / Math.sqrt(distance);
                    this.vx += force * Math.cos(angle) * 0.1;
                    this.vy += force * Math.sin(angle) * 0.1;
                    this.rotation += 0.05;
                }

                this.vx += (this.targetX - this.x) * config.ease;
                this.vy += (this.targetY - this.y) * config.ease;
                this.vx *= config.friction;
                this.vy *= config.friction;
                this.x += this.vx;
                this.y += this.vy;
                this.rotation += config.rotationSpeed;
            }
        }

        const extractLogoPoints = (image: HTMLImageElement, amount: number) => {
            const points = [];
            const tCanv = document.createElement('canvas');
            const tCtx = tCanv.getContext('2d');
            if (!tCtx) return [];

            const baseW = logicalWidth / CANVAS_OVERFLOW;
            const logoW = Math.floor(baseW * 0.95);
            const logoH = Math.floor(logoW * (image.height / image.width));

            tCanv.width = logoW;
            tCanv.height = logoH;
            tCtx.drawImage(image, 0, 0, logoW, logoH);

            try {
                const imageData = tCtx.getImageData(0, 0, logoW, logoH);
                const pixels = imageData.data;
                const offsetX = (logicalWidth - logoW) / 2;
                const offsetY = (logicalHeight - logoH) / 2;

                const validPixels = [];
                for (let y = 0; y < logoH; y += 2) {
                    for (let x = 0; x < logoW; x += 2) {
                        const idx = (y * logoW + x) * 4;

                        if (pixels[idx + 3] > 128) {
                            validPixels.push({
                                x: x + offsetX,
                                y: y + offsetY,
                                color: `rgba(${pixels[idx]}, ${pixels[idx + 1]}, ${pixels[idx + 2]}, 0.9)`
                            });
                        }
                    }
                }

                if (validPixels.length === 0) return [];

                for (let i = 0; i < amount; i++) {
                    const randomIdx = Math.floor(Math.random() * validPixels.length);
                    points.push(validPixels[randomIdx]);
                }
            } catch (e) {
                console.error("Error extracting points:", e);
                return [];
            }
            return points;
        };

        const initApp = (logoImg: HTMLImageElement) => {
            const parent = canvas.parentElement;
            if (!parent) return;

            const rect = parent.getBoundingClientRect();
            if (rect.width === 0) return;

            const dpr = window.devicePixelRatio || 1;

            logicalWidth = rect.width * CANVAS_OVERFLOW;
            logicalHeight = rect.height * CANVAS_OVERFLOW;

            canvas.width = logicalWidth * dpr;
            canvas.height = logicalHeight * dpr;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);

            particlesArray = [];
            const logoPts = extractLogoPoints(logoImg, config.particleCount);
            logoPts.forEach(pt => particlesArray.push(new Particle(pt)));
        };

        const animate = () => {
            if (logicalWidth === 0) {
                animationId = requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, logicalWidth, logicalHeight);
            particlesArray.forEach(p => {
                p.update();
                p.draw();
            });
            animationId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = logicalWidth / rect.width;
            const scaleY = logicalHeight / rect.height;
            mouse.x = (e.clientX - rect.left) * scaleX;
            mouse.y = (e.clientY - rect.top) * scaleY;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const svgBlob = new Blob([rawLogoSVG], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const img = new Image();

        img.onload = function () {
            initApp(img);
            animate();
            URL.revokeObjectURL(svgUrl);
        };
        img.src = svgUrl;

        window.addEventListener('mousemove', handleMouseMove);
        canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', () => img.complete && initApp(img));

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('mousemove', handleMouseMove);
            canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute pointer-events-none block"
            style={{
                width: '150%',
                height: '150%',
                maxWidth: 'none'
            }}
        />
    );
}