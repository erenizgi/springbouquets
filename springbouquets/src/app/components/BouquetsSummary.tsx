import React, {useEffect} from "react";
import localFont from "next/font/local";
import BouquetCard from "@/app/components/BouquetCard";
import {Bouquet} from "@/types/page"
import {useFadeInOnView} from "@/app/components/SpringIsHere";

const madeForItalic = localFont({
    src: "../fonts/WixMadeforText-Italic-VariableFont_wght.ttf",
    weight: "200",
});

function shuffle(array: Bouquet[]) {
    if (!array) return [];
    const arrayCopy = array.map((item) => item);
    let currentIndex = arrayCopy.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
            arrayCopy[randomIndex], arrayCopy[currentIndex]];
    }
    return arrayCopy;
}


type BouquetSummaryProps = {
    bouquets: Bouquet[];
}

const BouquetsSummary = ({bouquets}: BouquetSummaryProps) => {
    useEffect(() => {
        console.log(bouquets)
    }, []);

    const [fadeRef, isVisible] = useFadeInOnView();


    return <div
        ref={fadeRef}
        style={{position: "relative", zIndex: 150, paddingBottom: "16rem"}} onClick={() => console.log(bouquets)}
                className={`w-full bg-slate-100 flex flex-row items-center justify-center ${isVisible ? "fade-in" : ''}`}>
        <div className={"w-[100%] flex flex-col items-center p-16"}>
            <div className={"mb-16"}>
                <h3 style={{textShadow: "1px 1px 2px rgba(0,255,100, 0.1)"}} className={"mb-4"}>Spring Bouquets</h3>
                <div className="w-[25%] mb-8 bg-gray-300 h-[1px]"></div>
                <h2 className={`text-xl mb-4 ${madeForItalic.className}`}>I&#39;m just little title. Add your own text.</h2>
            </div>

            <div className={"grid grid-cols-4 gap-16 w-[1600px] overflow-hidden"}>
                {shuffle(bouquets).slice(0,12).map((bouquet) => <BouquetCard key={bouquet.title} bouquet={bouquet}></BouquetCard>)}
            </div>
            <div className={"bg-green"}>
                <button
                    className={`${madeForItalic.className} text-white w-fit p-4 pl-8 pr-8 text-xl mt-8 rounded-sm bg-[rgb(0,50,0)] hover:bg-[rgb(0,70,40)]  transition duration-200 hover:scale-105`}>VIEW_ALL
                </button>
            </div>
        </div>
    </div>
}

export default BouquetsSummary;