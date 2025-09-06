'use client'
import Login from "@/app/components/Login";
import React, {useEffect, useState} from "react";
import OutroMainPage from "@/app/components/OutroMainPage";
import localFont from "next/font/local";
import {fetch50Bouquets} from "@/app/Admin/page";
import {Bouquet} from "@/types/page";
import BouquetWorkshop from "../images/bouquetworkshop.jpg"
import BouquetCard from "@/app/components/BouquetCard";
import bride from "@/app/images/bride.jpg";

const madeForItalic = localFont({
    src: "../fonts/WixMadeforText-Italic-VariableFont_wght.ttf",
    weight: "200",
});

const ViewAll = () => {

    const [maxMinPrices, setMaxMinPrices] = useState([0, 0]);
    const [cartPopUpPage, setCartPopUpPage] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [allBouquets, setAllBouquets] = useState([]);
    useEffect(() => {
        fetch("/api/me")
            .then(res => res.json())
            .then(data => {
                setUser(data);
            });
    }, []);

    useEffect(() => {
        (async () => {
            await fetch50Bouquets(setAllBouquets)
        })();

    }, []);

    useEffect(() => {
        if (!allBouquets[0]) return;
        let min = allBouquets[0].price;
        let max = allBouquets[0].price;
        for (let i = 0; i < allBouquets.length; i++){
            const bouquet = allBouquets[i];
            if (bouquet.price < min) {
                min = bouquet.price;
            }
            else if (bouquet.price > max) {
                max = bouquet.price
            }
        }
        setMaxMinPrices([min, max]);
        console.log(min, max);
    }, [allBouquets]);

    return <div  className={"flex items-center justify-center flex-col"}>
        <Login user={user} customStyle={{position: "relative", zIndex: "100"}} isAdmin={true} setPopUp={() => {}} setLoggedIn={setLoggedIn} loggedIn={loggedIn} cartPopUpPage={cartPopUpPage} setCartPopUpPage={setCartPopUpPage}></Login>
        <div style={{backgroundImage: `url(${BouquetWorkshop.src})`}}  className={"flex items-center justify-center border bg-slate-100 border-[rgba(0,0,0,0.2)] rounded-lg w-[100%] h-fit min-h-100 mb-128"}>
            <div className={"w-[60%] py-32 pb-64 bg-slate-100 p-16 rounded-sm my-32"}>
                <h3 className={`text-3xl ${madeForItalic.className} mb-4`}>Our Store</h3>
                <div className={"h-[1px] w-[5%] bg-black mb-8"}></div>
                <div className={"flex items-center justify-start gap-4"}>
                    <h3>Home</h3>
                    <h3 className={"text-center text-xl text-[rgba(0,0,0,0.8)]"}>></h3>
                    <h3>All Products</h3>
                </div>
                <h3 className={"h-[1px] w-[100%] bg-[rgba(0,0,0,.3)] mt-8"}></h3>
                <div className={"mt-16 flex"}>
                    <div className={"w-[30%]"}>
                        <h3 className={"text-2xl"}>Browse By</h3>
                        <h3 className={"h-[1px] w-[10%] bg-[rgba(0,0,0,.3)] mt-8"}></h3>

                        <h3 className={"text-2xl mt-8"}>Filter By</h3>
                        <h3 className={"h-[1px] w-[10%] bg-[rgba(0,0,0,.3)] mt-8"}></h3>
                    </div>
                    <div >
                        <h3 className={"mb-8"}>{allBouquets.length} Products</h3>
                        <div className={"grid grid-cols-4 gap-4"}>
                            {allBouquets.length > 0 && allBouquets.map((bouquet: Bouquet, index) => <div key={bouquet.title+index}>
                                <BouquetCard bouquet={bouquet}></BouquetCard>
                            </div>)}
                        </div>

                    </div>
                </div>
            </div>


        </div>
        <OutroMainPage></OutroMainPage>
    </div>
}

export default ViewAll;