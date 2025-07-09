import React from "react";
import CSS from "csstype";
import localFont from "next/font/local";

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

const SpringIsHere = () => {

    return (<div style={BAHARGELDI}>
        <div className={"mb-4"}>
            <p style={{textShadow: "1px 1px 1px rgba(150, 150, 150, 0.25)"}} className={`text-black text-shadow text-2xl
                ${madeForItalic.className} mb-8`}>Step into spring with a colorful bouquet</p>
            <div className="w-[4rem] bg-gray-700 h-[1px]"></div>
        </div>

        <div className="w-fit">
            <h1 style={{fontSize: "8rem"}} className={"text-gray-200"}>SPR-</h1>
            <div className="w-full bg-gray-200 h-[1px]"></div>
        </div>
        <div className="w-fit">
            <h1 style={{fontSize: "8rem"}} className={"text-gray-200"}>ING IS</h1>
            <div className="w-full bg-gray-200 h-[1px]"></div>
        </div>
        <div className="w-fit">
            <h1 style={{fontSize: "8rem"}} className={"text-gray-200"}>HERE</h1>
            <div className="w-full bg-gray-200 h-[1px]"></div>
        </div>
        <button className={`${madeForItalic.className} w-fit p-2 pl-8 pr-8 text-white text-base mt-4 rounded-sm bg-[rgb(0,50,0)]`}>Shop_Now</button>
    </div>)
}

export default SpringIsHere;
