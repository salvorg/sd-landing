"use client";

export function GridItem() {
    return (
        <div className="grid-cell relative aspect-square border-l border-t border-white/10">
            {/* Слой свечения: рендерим ОДИН РАЗ, управляем только прозрачностью */}
            <div
                className="absolute inset-0 pointer-events-none bg-blue-500/10 shadow-[inset_0_0_20px_rgba(59,130,246,0.3)]"
                style={{
                    opacity: "var(--i, 0)",
                    willChange: "opacity" // Подсказка браузеру вынести это на GPU
                }}
            />

            {/* Усиленные грани */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: "var(--i, 0)" }}
            >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-500" />
                <div className="absolute top-0 left-0 h-full w-[1px] bg-blue-500" />
            </div>
        </div>
    );
}