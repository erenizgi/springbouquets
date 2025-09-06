import React, {useEffect, useRef, useState} from "react";
import CSS from "csstype";
import localFont from "next/font/local";
import {colorful, textShadow, textShadowWhite} from "@/types/page";
import Link from "next/link";

const BAHARGELDI: CSS.Properties = {
    fontSize: "4rem",
    margin: "0",
    textAlign: "left",
    color: '#EEEEEE',
    background: "rgba(255, 255, 255, 0.02)",
    borderRadius: "2rem",
    width: "50%",
    top: "25%",
    left: "25%",
    zIndex: 99,
    display: "flex",
    position: "relative",
    flexDirection: "column",
    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.05)",
    lineHeight: "7rem"
};

const madeForItalic = localFont({
    src: "../fonts/WixMadeforText-Italic-VariableFont_wght.ttf",
    weight: "200",
});
export function useFadeInOnView() {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new window.IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(node); // bir kere çalışsın, istersen kaldırma
            }
        });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return [ref, isVisible];
}


const SpringIsHere = () => {
    const [fadeRef, isVisible] = useFadeInOnView();


    return (<div style={BAHARGELDI} ref={fadeRef} className={`${isVisible ? "fade-in" : ''}`}>
        <div className={"mb-4"}>
            <p style={{...textShadow}} className={`text-2xl
                ${madeForItalic.className} mb-8 animate-pulse`}>Step into spring with a colorful bouquet</p>
            <div className="w-[4rem] bg-gray-700 h-[1px]"></div>
        </div>

        <div className="w-fit">
            <h1 style={{fontSize: "8rem", ...textShadowWhite}} className={`text-gray-200 ${colorful} from-pink-400 via-yellow-300 to-blue-700`}>SPR-</h1>
        </div>
        <div className="w-fit">
            <h1 style={{fontSize: "8rem", ...textShadowWhite}} className={`text-gray-200 ${colorful} from-blue-700 via-pink-400 to-yellow-300`}>ING IS</h1>
        </div>
        <div className="w-fit">
            <h1 style={{fontSize: "8rem", ...textShadowWhite}} className={`text-gray-200 ${colorful} from-yellow-300 via-blue-700 to-pink-400`}>HERE</h1>
        </div>
        <Link href={"/ViewAll"}>
            <button
                className={`${madeForItalic.className} w-fit p-2 pl-8 pr-8 text-white text-base mt-4 rounded-sm bg-[rgb(0,50,0)] hover:bg-[rgb(0,70,40)] cursor-pointer transition duration-200 hover:scale-105`}>Shop_Now
            </button>

        </Link>
    </div>)
}

export default SpringIsHere;
