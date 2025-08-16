'use client'
import Login from "@/app/components/Login";
import React, {useEffect, useState} from "react";
import OutroMainPage from "@/app/components/OutroMainPage";
import {Bouquet, colorful} from "@/types/page";
import bride from "../../images/bride.jpg"
import localFont from "next/font/local";
import login from "@/app/components/Login";
import LoginPopUp from "@/app/components/LoginPopUp";
const madeForItalic = localFont({
    src: "../../fonts/WixMadeforText-Italic-VariableFont_wght.ttf",
    weight: "200",
});


const ProductPage = ({params}) => {
    const [user, setUser] = useState({});
    const {id} = React.use(params);
    const [quantity, setQuantity] = useState(1);
    const [bouquet, setBouquet] = useState<Bouquet>({description: "", id: 0, image: "", price: 0, title: ""});
    const [isAdmin, setAdmin] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [cartPopUpPage, setCartPopUpPage] = useState(false);
    const [loginPopUp, setPopUp] = useState(false);

    useEffect(() => {
        fetch("/api/me")
            .then(res => res.json())
            .then(data => {
                if (!data.error){
                    setUser(data);
                    setAdmin(data.isAdmin);
                    setLoggedIn(true);
                    console.log("logged in:", loggedIn);
                    console.log("User is: " + JSON.stringify(data));
                }

            });

    }, [loggedIn]);
    useEffect(() => {
        fetch(`/api/bouquet?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setBouquet(data);
                console.log(data);
            });
    }, []);

    const addToCartHandler = async () => {
        if (!loggedIn) {
            setPopUp(true)
        }else {
            // @ts-ignore
            setCartPopUpPage(false);
            const response = await fetch('/api/user/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    item: { productId: bouquet.id, count: quantity, bouquet}
                }),
            });
            console.log(await response.json());
        }
    }



    return <div style={{overflow: "scroll"}} className={"h-screen w-screen flex flex-col"}>
        <Login cartPopUpPage={cartPopUpPage} setCartPopUpPage={setCartPopUpPage} loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} customStyle={{position: "relative", zIndex: "1000"}}
               isAdmin={true} setPopUp={setPopUp}></Login>
        {loginPopUp ? <LoginPopUp setPopUp={setPopUp} setLoggedIn={setLoggedIn}/> : null}
        <div style={{backgroundImage: `url(${bride.src})`}}
             className={"w-full relative bg-cover bg-center flex justify-center items-center flex-col gap-64"}>
            <div
                className={"flex gap-16 bg-slate-100 border border-[rgba(0,0,0,0.2)] rounded-lg w-[60vw] h-fit min-h-100 p-16 my-16"}>
                <div className={"h-200 rounded-sm w-[50%]"}>
                    {bouquet?.image &&
                        <img className={"rounded-md"} style={{width: "100%", height: "auto"}} src={bouquet.image}
                             alt={"Bouquet Image"}/>}
                </div>
                <div className={"pt-8 w-[50%] flex items-start justify- center flex-col"}>
                    <h2 className={`${madeForItalic.className} text-xl mb-4`}>{bouquet.title}</h2>
                    <h3 className={"mb-8"}>${bouquet.price}</h3>
                    <h2 className={"text-lg mb-4"}>Quantity *</h2>
                    <div className={"flex gap-8 py-2 border p-4 w-fit"}>
                        <button style={{color: quantity === 1 ? "rgba(0,0,0,.5)" : "black", cursor: quantity !== 1 ? "pointer" : "auto"}} disabled={quantity === 1} onClick={() => {
                            if (quantity > 1) {
                                setQuantity(prev => prev-1);
                        }}}
                                className={"text-xl"}>-</button>
                        <h3 className={"text-xl"}>{quantity}</h3>
                        <button onClick={() => setQuantity(prev => prev+1)} className={"text-xl cursor-pointer"}>+</button>
                    </div>
                    <div className={"w-full flex items-center justify-center mt-16"}>
                        <h1 className={`${colorful} text-2xl from-yellow-400 via-pink-500 to-blue-600 mb-4`}>Liked this?</h1>

                    </div>
                    <h3
                        onClick={addToCartHandler}
                        className={"transition duration-250 hover:scale-105 cursor-pointer w-full border p-2 text-center "}>Add to Cart</h3>
                    <div className={"mt-16"}>
                        <h3>PRODUCT INFO</h3>
                        <p>{bouquet.description}</p>
                    </div>
                </div>
            </div>

            <OutroMainPage backgroundColor={"#f8fafc"}></OutroMainPage>
        </div>


    </div>
}

export default ProductPage;