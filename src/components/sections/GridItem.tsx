"use client";

export function GridItem() {
    return (
        <div
            className="grid-cell relative aspect-square"
            style={{
                borderColor:
                    "rgba(255,255,255, calc(0.08 + var(--i, 0) * 0.5))",
                boxShadow:
                    "inset 0 0 calc(var(--i, 0) * 26px) rgba(59,130,246,0.35)",
            }}
        >
            {/* усиленные грани */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: "var(--i, 0)" }}
            >
                <div className="absolute top-0 left-0 w-full h-px bg-blue-500" />
                <div className="absolute top-0 left-0 h-full w-px bg-blue-500" />
            </div>
        </div>
    );
}
