'use client'
import localFont from "next/font/local";
import SlidedImage from "@/app/components/slidedImage";
import Login from "@/app/components/Login";
import About from "@/app/components/About";
import BouquetsSummary from "@/app/components/BouquetsSummary";
import {useEffect, useState} from "react";
import OurWorkshops from "@/app/components/OurWorkshops";
import OutroMainPage from "@/app/components/OutroMainPage";
import LoginPopUp from "@/app/components/LoginPopUp";
import { motion } from "motion/react";

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
            if (parsed?.error) setBouquets([]);
            else {
                setBouquets([...parsed, ...parsed, ...parsed].slice(0,12));
            }
        }
    }catch (e){
        console.log(e)
    }
}





export default function Home() {
    const [isAdmin, setAdmin] = useState(true);
    const [bouquets, setBouquets] = useState<{}[]>([])
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginPopUpOpen, setLoginPopUpOpen] = useState<boolean>(false);
    const [user, setUser] = useState<{ id: number, name: string, email: string }>({id: 0, name: "", email: ""})
    useEffect(() => {
        (async () => {
            await fetch50Bouquets(setBouquets);
        })()
    }, []);

    useEffect(() => {
        fetch("/api/me")
            .then(res => res.json())
            .then(data => {
                setUser(data);
            });
    }, []);



    return (
        <div style={{overflow: loginPopUpOpen ? "hidden" : "scroll"}} className={"h-screen w-screen"}>

            <Login loggedIn={loggedIn} user={user} setPopUp={setLoginPopUpOpen} customStyle={{position: "fixed", zIndex: "500"}} isAdmin={true}></Login>
            {loginPopUpOpen && <LoginPopUp setLoggedIn={setLoggedIn} setPopUp={setLoginPopUpOpen}></LoginPopUp>}
            <SlidedImage/>
            <motion.div></motion.div>
            <About></About>
            <BouquetsSummary bouquets={bouquets}></BouquetsSummary>
            <OurWorkshops></OurWorkshops>
            <OutroMainPage></OutroMainPage>
        </div>
    );
}
