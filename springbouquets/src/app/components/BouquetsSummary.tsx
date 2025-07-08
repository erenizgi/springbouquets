import React from "react";
import localFont from "next/font/local";
const madeForItalic = localFont({
    src: "../fonts/WixMadeforText-Italic-VariableFont_wght.ttf",
    weight: "200",
});

const products: {}[] = []






const BouquetsSummary = () => {

    return <div style={{position: "relative", zIndex: 150, paddingBottom: "16rem"}} className={"w-full flex flex-row items-center justify-center"}>
        <div className={"w-[40%] flex flex-col  p-16"}>
            <h3 style={{textShadow: "1px 1px 2px rgba(0,255,100, 0.1)"}} className={"mb-4"}>Spring Bouquets</h3>
            <div className="w-[25%] mb-8 bg-gray-300 h-[1px]"></div>

            <h2 className={`text-xl mb-4 ${madeForItalic.className}`}>I'm just little title. Add your own text.</h2>

        </div>
    </div>
}

export default BouquetsSummary;