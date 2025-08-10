import React, { useRef } from "react";

// Hooks'u safe al
function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}

// SprinkleCannon Component
function SprinkleCannon({
                            sprinkleCount = 18,
                            colors = [
                                "bg-pink-300",
                                "bg-yellow-300",
                                "bg-purple-400",
                                "bg-green-300",
                                "bg-blue-300",
                                "bg-red-300"
                            ],
                            children,
                            trigger = "onClick", // veya onDoubleClick, onMouseEnter, ...
                            className = "",
                            sprinkleOrigin = "mouse", // veya "center"
                        }) {
    const containerRef = useRef();

    // Ana patlatıcı fonk
    const fire = (e) => {
        // Container'ın pozisyonunu bulalım
        const rect = containerRef.current.getBoundingClientRect();
        let originX, originY;
        if (sprinkleOrigin === "center") {
            originX = rect.width / 2;
            originY = rect.height / 2;
        } else {
            // Mouse event
            originX = e.nativeEvent
                ? e.nativeEvent.clientX - rect.left
                : rect.width / 2;
            originY = e.nativeEvent
                ? e.nativeEvent.clientY - rect.top
                : rect.height / 2;
        }

        for (let i = 0; i < sprinkleCount; i++) {
            const angle = (i / sprinkleCount) * 2 * Math.PI;
            const distance = randomBetween(70, 120);
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            const div = document.createElement("div");
            div.className =
                "sprinkle absolute w-3 h-3 rounded-full opacity-80 pointer-events-none " +
                colors[Math.floor(Math.random() * colors.length)];
            div.style.left = originX + "px";
            div.style.top = originY + "px";
            div.style.zIndex = 1000;

            div.animate(
                [
                    { transform: "translate(0,0) scale(1)" },
                    {
                        transform: `translate(${x}px,${y}px) scale(0.4) rotate(${randomBetween(
                            180,
                            720
                        )}deg)`,
                        opacity: 0
                    }
                ],
                {
                    duration: 1000 + Math.random() * 400,
                    easing: "ease-out"
                }
            );
            containerRef.current.appendChild(div);

            setTimeout(() => {
                div.remove();
            }, 1600);
        }
    };

    // Trigger event'ini props'tan al
    const triggerProps = {
        [trigger]: fire,
    };

    return (
        <div
            ref={containerRef}
            className={`relative inline-block ${className}`}
            {...triggerProps}
        >
            {children}
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

// ---------------------------
// KULLANIM ÖRNEKLERİ
// ---------------------------

// 1) Kendi butonunla:
{/*
<SprinkleCannon>
  <button className="bg-pink-500 text-white px-6 py-3 rounded-lg text-lg">
    Bastıkça Şeker Yağsın
  </button>
</SprinkleCannon>
*/}

// 2) Bir kartta, mouse üstüne gelince:
{/*
<SprinkleCannon trigger="onMouseEnter" sprinkleOrigin="center">
  <div className="w-48 h-32 bg-yellow-100 rounded-xl flex items-center justify-center shadow">
    Mouse'u üstüme getir, fışkırt!
  </div>
</SprinkleCannon>
*/}

// 3) Renk veya adeti değiştir:
{/*
<SprinkleCannon sprinkleCount={40} colors={["bg-green-400","bg-pink-500","bg-red-400"]}>
  <span className="p-4 text-xl font-bold">Şampiyon Takıma Bunu Hak Ettik!</span>
</SprinkleCannon>
*/}

export default SprinkleCannon;