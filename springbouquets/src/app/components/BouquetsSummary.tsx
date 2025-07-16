import React, {useEffect} from "react";
import localFont from "next/font/local";
import BouquetCard from "@/app/components/BouquetCard";

const madeForItalic = localFont({
    src: "../fonts/WixMadeforText-Italic-VariableFont_wght.ttf",
    weight: "200",
});

function shuffle(array) {

    const arrayCopy = array.map(item => item);
    let currentIndex = arrayCopy.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
            arrayCopy[randomIndex], arrayCopy[currentIndex]];
    }
    return arrayCopy;
}

const BouquetsSummary = ({bouquets}) => {
    useEffect(() => {
        console.log(bouquets)
    }, []);
    return <div style={{position: "relative", zIndex: 150, paddingBottom: "16rem"}} onClick={() => console.log(bouquets)}
                className={"w-full bg-slate-100 flex flex-row items-center justify-center"}>
        <div className={"w-[100%] flex flex-col items-center p-16"}>
            <div className={"mb-16"}>
                <h3 style={{textShadow: "1px 1px 2px rgba(0,255,100, 0.1)"}} className={"mb-4"}>Spring Bouquets</h3>
                <div className="w-[25%] mb-8 bg-gray-300 h-[1px]"></div>
                <h2 className={`text-xl mb-4 ${madeForItalic.className}`}>I&#39;m just little title. Add your own text.</h2>
            </div>

            <div className={"grid grid-cols-4 gap-4 w-[1600px]"}>
                {shuffle(bouquets).map((bouquet) => <BouquetCard key={bouquet.title} bouquet={bouquet}></BouquetCard>)}
                {shuffle(bouquets).map((bouquet) => <BouquetCard key={bouquet.title} bouquet={bouquet}></BouquetCard>)}
                {shuffle(bouquets).map((bouquet) => <BouquetCard key={bouquet.title} bouquet={bouquet}></BouquetCard>)}
            </div>
        </div>
    </div>
}

export default BouquetsSummary;