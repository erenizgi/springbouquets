import Image from "next/image";
import localFont from "next/font/local";
import React, { useRef } from "react";
const madeForItalic = localFont({
    src: "../fonts/WixMadeforText-Italic-VariableFont_wght.ttf",
    weight: "200",
});

const BouquetCard = ({bouquet}) => {
    const containerRef = useRef();


    return <div className={"flex flex-col items-center justify-start gap-8 h-fit group"}>
        <div
             className={"group-hover:brightness-110 transition duration-500 group-hover:rotate-1 cursor-pointer rounded-sm relative w-full aspect-[3/4] overflow-hidden"}>
            <Image fill src={bouquet.image}
                   alt={"bouquet"}
                   style={{width: "100%", height: "100%", objectFit: "cover"}}
                   sizes="(max-width: 768px) 100vw, 25vw"
            ></Image>
        </div>
        <div className={"flex flex-col items-center justify-start h-fit"}>
            <h2 className={`text-lg ${madeForItalic.className}`}>
                {bouquet.title}
            </h2>
            <h3 className={"text-xs mb-4"}>
                ${parseFloat(bouquet.price).toFixed(2)}
            </h3>
            <p className={"text-sm text-center h-25"}>{bouquet.description}</p>
        </div>

    </div>
}

export default BouquetCard;