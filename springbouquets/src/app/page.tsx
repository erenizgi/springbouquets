'use client'
import localFont from "next/font/local";
import SlidedImage from "@/app/components/slidedImage";
import Login from "@/app/components/Login";
import About from "@/app/components/About";
import BouquetsSummary from "@/app/components/BouquetsSummary";
import {useEffect} from "react";
import OurWorkshops from "@/app/components/OurWorkshops";
import OutroMainPage from "@/app/components/OutroMainPage";

const madeForItalic = localFont({
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


export default function Home() {
    useEffect(() => {
            getFirstUser().then(user => {
                if (user && !user.error) {
                    console.log(user);
                } else {
                    console.log(user.error);
                }
            }).catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            <Login customStyle={{position: "fixed", zIndex: "100"}}></Login>
            <SlidedImage/>
            <About></About>
            <BouquetsSummary></BouquetsSummary>
            <OurWorkshops></OurWorkshops>
            <OutroMainPage></OutroMainPage>
        </div>
    );
}
