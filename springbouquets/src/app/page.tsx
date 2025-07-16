'use client'
import localFont from "next/font/local";
import SlidedImage from "@/app/components/slidedImage";
import Login from "@/app/components/Login";
import About from "@/app/components/About";
import BouquetsSummary from "@/app/components/BouquetsSummary";
import {useEffect, useState} from "react";
import OurWorkshops from "@/app/components/OurWorkshops";
import OutroMainPage from "@/app/components/OutroMainPage";

export const madeForItalic = localFont({
    src: "fonts/WixMadeforText-VariableFont_wght.ttf",
    weight: "100",
});

const getFirstUser = async (setFunction?: () => void | null) => {
    const url = "/api/user";
    const response = await fetch(url,   {
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
    });
    const parsed = await response.json();
    return parsed;

}

const fetch50Bouquets = async (setBouquets?: (value: (((prevState: {}[]) => {}[]) | {}[])) => void) => {
    try{
        const response = await fetch("/api/bouquet");

        const parsed = await response.json();
        if (setBouquets) {
            setBouquets(parsed);
        }
    }catch (e){
        console.log(e)
    }
}





export default function Home() {
    const [isAdmin, setAdmin] = useState(true);
    const [bouquets, setBouquets] = useState<{}[]>([])
    useEffect(() => {
        (async () => {
            await fetch50Bouquets(setBouquets);
        })()
    }, []);

    useEffect(() => {
        console.log(bouquets);
    }, [bouquets]);

    return (
        <div>
            <Login customStyle={{position: "fixed", zIndex: "500"}} isAdmin={isAdmin}></Login>
            <SlidedImage/>
            <About></About>
            <BouquetsSummary bouquets={bouquets}></BouquetsSummary>
            <OurWorkshops></OurWorkshops>
            <OutroMainPage></OutroMainPage>
        </div>
    );
}
