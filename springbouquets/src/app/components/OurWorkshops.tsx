'use client'

import localFont from "next/font/local";
import React from "react";
import Image from "next/image";
import bouquetworkshop from "../images/bouquetworkshop.jpg"
import {colorful} from "@/types/page";
import {useFadeInOnView} from "@/app/components/SpringIsHere";
const madeForItalic = localFont({
    src: "../fonts/WixMadeforText-Italic-VariableFont_wght.ttf",
    weight: "200",
});


const OurWorkshops = () => {
    const [ref, isVisible] = useFadeInOnView();



    return <div ref={ref} className={`${isVisible ? "fade-in-2s" : ''}`}>
        <div style={{position: "relative", zIndex: 150, paddingBottom: "8rem"}}
             className={"w-full flex flex-row items-center justify-center"}>
            <div className={"w-fit flex flex-col p-16"}>
                <h3 style={{textShadow: `1px 1px 2px rgba(0,255,100, 0.1)`}} className={`w-fit mb-4 ${colorful} from-pink-700 via-yellow-700 to-blue-700`}>Our Workshops</h3>
                <div className="w-[25%] mb-8 bg-gray-300 h-[1px]"></div>
                <div className={"w-full h-[400px] rounded-sm border-2 border-[rgba(205,0,82,.5)] flex flex-row items-center justify-start"}>
                    <div className={`h-full w-auto`} style={{backgroundImage: `url(${bouquetworkshop.src})`}}>
                        <Image style={{height: "100%", width: "auto"}} src={bouquetworkshop} alt={"bouquetworkshop"}></Image>
                    </div>
                    <div className={"w-80 flex flex-col p-12"}>
                        <div
                            className={`flex flex-col items-start justify-center mb-4 text-xl ${madeForItalic.className}`}>
                            <h3>Flower</h3>
                            <h3>Arrangement</h3>
                            <h3>Workshop</h3>
                        </div>
                        <p>I&#39;m a tagline. Click here to add your own text and edit me.</p>
                        {/*<button*/}
                        {/*    className={`${madeForItalic.className} transition duration-200 hover:scale-105 text-white w-fit p-2 pl-4 pr-4 text-base mt-4 rounded-sm hover:bg-[rgb(0,70,40)] bg-[rgb(0,50,0)] animate-pulse cursor-pointer`}>Book_It*/}
                        {/*</button>*/}


                    </div>

                </div>

            </div>
        </div>
    </div>
}

export default OurWorkshops;