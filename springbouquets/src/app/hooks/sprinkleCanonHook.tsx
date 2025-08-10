"use client";
import { useRef, useEffect, useCallback } from "react";

function randomBetween(a: number, b: number) {
    return a + Math.random() * (b - a);
}

export default function SprinkleLayer() {
    const ref = useRef<HTMLDivElement>(null);

    const fire = useCallback((x: number, y: number) => {
        const rect = ref.current!.getBoundingClientRect();
        const originX = x - rect.left;
        const originY = y - rect.top;
        const sprinkleCount = 22;
        const colors = [
            "bg-pink-300",
            "bg-yellow-300",
            "bg-purple-400",
            "bg-green-300",
            "bg-blue-300",
            "bg-red-300"
        ];

        for (let i = 0; i < sprinkleCount; i++) {
            const angle = (i / sprinkleCount) * 2 * Math.PI;
            const distance = randomBetween(60, 120);
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;

            const div = document.createElement("div");
            div.className =
                "sprinkle absolute w-3 h-3 rounded-full opacity-80 pointer-events-none " +
                colors[Math.floor(Math.random() * colors.length)];
            div.style.left = originX + "px";
            div.style.top = originY + "px";
            div.style.zIndex = "99999";

            div.animate(
                [
                    { transform: "translate(0,0) scale(1)" },
                    {
                        transform: `translate(${dx}px,${dy}px) scale(0.4) rotate(${randomBetween(
                            150,
                            720
                        )}deg)`,
                        opacity: 0
                    }
                ],
                {
                    duration: 900 + Math.random() * 400,
                    easing: "ease-out"
                }
            );
            ref.current!.appendChild(div);

            setTimeout(() => {
                div.remove();
            }, 1500);
        }
    }, []);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            fire(e.clientX, e.clientY);
        }
        window.addEventListener("click", handleClick);

        return () => window.removeEventListener("click", handleClick);
    }, [fire]);

    return (
        <div
            ref={ref}
            className="pointer-events-none fixed inset-0 z-[9999]"
            style={{ width: "100vw", height: "100vh" }}
        >
            <style>
                {`
          .sprinkle {
            transition: opacity 0.2s;
          }
        `}
            </style>
        </div>
    );
}