'use client'
import Image from "next/image";
import flower_icon from "../images/flower-icon.png"
import userIcon from "../images/user.png"
import cart from "../images/cart.png"
import settings from "../images/settings.png"
import CSS from "csstype";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {colorful, textShadow} from "@/types/page";
import {color} from "motion-dom";
import Link from "next/link";

type LoginProps = {
    customStyle?: CSS.Properties;
    isAdmin?: boolean;
    setPopUp?: (status: boolean) => void;
    user: {};
    loggedIn?: boolean;
    setLoggedIn: (status: boolean) => void;
    cartPopUpPage: boolean;
    setCartPopUpPage: (status: boolean) => void;

}

export const getUserCart = async (userId) => {
    try {
        const res = await fetch(`/api/user/cart?userId=${userId}`);
        const data = await res.json();
        return {...data};
    } catch (e) {
        console.log(e);
        return {error: e};
    }

}

const Login = ({customStyle, setPopUp, setLoggedIn, loggedIn, cartPopUpPage, setCartPopUpPage}: LoginProps) => {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [isAdmin, setAdmin] = useState(false);
    const [userPopUp, setUserPopUp] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetch("/api/me")
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setUser(data);
                    setAdmin(data.isAdmin);
                    setLoggedIn(true);
                    console.log("logged in:", loggedIn);
                    console.log("User is: " + JSON.stringify(data));
                }

            });

    }, [loggedIn]);
    const adminDashboardRouteHandler = () => {
        router.push("/Admin");
    }

    const mainPageRouteHandler = () => {
        router.push("/")
    }

    async function updateCart(userId, item) {
        try {

            const res = await fetch('/api/user/cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, item }),
            });
            console.log(res);
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error?.error || 'Cart update failed!');
            }

            const data = await res.json();
            return data.cart;
        } catch (err) {
            console.error('Cart update error:', err.message);
            throw err;
        }
    }



    const handleLogout = async () => {
        const response = await fetch('/api/user/logout', {method: 'POST'});
        if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            setLoggedIn(false);
            setUserPopUp(false);
            setUser({});
            setAdmin(false);
            router.push("/");
        } else {
            const data = await response.json();
            console.log("Something went wrong.")
        }
    }

    const handleCartClick = async () => {
        const cart = await getUserCart(user.id);
        setCartItems(cart.cart);
        console.log(cart);
        setUserPopUp(false);
        setCartPopUpPage(true);
    }

    return <div className={"w-full flex flex-row items-center justify-end bg-slate-100"}
                style={{...customStyle, padding: "1rem", paddingLeft: "2rem", paddingTop: "1.5rem"}}>
        <div className={"w-[10%] box-border"} onClick={mainPageRouteHandler}>
            <Image className={"h-12 w-auto hover:scale-105 cursor-pointer transition duration-250 "} src={flower_icon}
                   alt={"flower-icon"}></Image>
        </div>
        <div className={"w-[90%] flex flex-row items-center justify-end"}>
            {isAdmin ? <div className={"hover:scale-105 cursor-pointer transition-all duration-250 "}>
                <h3 onClick={adminDashboardRouteHandler}>Admin Dashboard</h3>
            </div> : null}
            {loggedIn && <div className={"relative transition-all duration-300"}>
                <Image
                    onClick={() => {
                        setCartPopUpPage(false);
                        setUserPopUp(true);
                    }}
                    className={"h-8 w-auto ml-4 mr-4 hover:scale-105 cursor-pointer transition duration-250 "}
                    src={userIcon} alt={"user-icon"}></Image>
                {userPopUp && <div
                    className={"transition-all duration-250 absolute bg-gradient-to-r from-slate-400 via-pink-400 to-yellow-500 min-w-[260px] shadow-md h-fit mt-8 right-0 py-2 px-4 rounded-lg"}>
                    <div className={"relative text-slate-100"}>
                        <p
                            onClick={() => setUserPopUp(false)}
                            className={`text-slate-100 transition duration-150 hover:scale-120 cursor-pointer absolute top-[-0.5rem] right-0 text-xl`}>x</p>
                        <h3 className={"text-xl mb-2 py-4"}>{user.name}</h3>
                        <h3 className={"mb-8"}>{user.email}</h3>
                        <div className={"flex w-full justify-end items-center"}>
                            <h3
                                onClick={handleLogout}
                                style={{...textShadow}}
                                className={`${colorful} from-yellow-800 to-blue-700 transition duration-250 hover:scale-110 cursor-pointer`}>
                                Sign Out</h3>

                        </div>
                    </div>


                </div>}
                {cartPopUpPage && <div
                    className={"transition-all duration-250 absolute bg-gradient-to-r from-slate-400 via-pink-400 to-yellow-500 min-w-[460px] shadow-md h-fit mt-8 right-0 py-2 px-2 rounded-lg"}>
                    <div className={"relative text-slate-100 pt-8"}>
                        <p
                            onClick={() => setCartPopUpPage(false)}
                            className={`text-slate-100 transition duration-150 hover:scale-120 cursor-pointer absolute top-[-0.5rem] right-2 text-2xl`}>x</p>
                        <div>
                            <h3 className={` w-full h-fit text-center text-4xl mb-4 flex items-center justify-center`}>
                                <p style={{...textShadow}} className={`text-slate-100 w-fit`}>Your Cart</p>
                            </h3>
                            {cartItems?.length > 0 ? cartItems.map((item, index) => <div
                                className={"w-full h-40  border-b-1 border-[rgba(255,255,255,.4)] rounded-sm flex flex-col items-start justify-center p-4"}
                                key={item.bouquet.title + index}>
                                <div className={"flex gap-4 flex-1 w-full"}>
                                    <Link href={`/products/${item.bouquet.id}`}>
                                        <img
                                            style={{height: 130}}
                                            className={"rounded-sm aspect-[9/16] object-cover"}
                                            src={item.bouquet.image} alt={"bouquet image"}/> </Link>
                                        <div className={"h-full flex-1 w-full"}>
                                            <h3 className={`text-slate-100 text-xl mb-4 w-fit`}>{item.bouquet.title}</h3>
                                            <p className={`text-slate-200 w-fit`}>{item.bouquet.description}</p>
                                            <div className={"flex items-end w-full flex-col"}>
                                                <h3 className={"text-lg"}>Quantity</h3>
                                                <div className={"gap-4 flex w-full items-center justify-end"} style={{}}>
                                                    <p className={"text-xl cursor-pointer"} onClick={async () => {
                                                        const data = await updateCart(user.id, {...item, count: item.count-1});
                                                        setCartItems(data);
                                                    }}>-</p>
                                                    <p className={"text-xl"}>{item.count}</p>
                                                    <p className={"text-xl cursor-pointer"} onClick={async () => {
                                                        const data = await updateCart(user.id, {...item, count: item.count+1});
                                                        setCartItems(data);
                                                    }}>+</p>
                                                </div>

                                            </div>
                                        </div>


                                </div>


                            </div>) : <div>
                                Your cart is empty.
                            </div>}
                            {cartItems?.length > 0 && <div className={"w-full flex items-center justify-end p-2"}>
                                <div
                                    className={"w-full rounded-lg h-full bg-slate-100 flex items-center justify-center"}>
                                    <button
                                        className={`${colorful} text-lg from-slate-800 via-yellow-600 to-blue-800 p-2 px-4 bg-slate-100 text-slate-900 rounded-lg transition-all duration-250 hover:scale-115 cursor-pointer`}>BUY_NOW
                                    </button>
                                </div>
                            </div>}
                        </div>
                    </div>


                </div>}
            </div>
            }
            {!loggedIn && <p
                className={"cursor-pointer hover:scale-105 transition duration-250"}
                onClick={() => {
                    {
                        if (setPopUp) {
                            setPopUp(true);
                        }
                    }
                }}>Log In</p>}

            {!isAdmin && loggedIn && <Image
                onClick={handleCartClick}
                className={"h-8 w-auto ml-4 mr-4 hover:scale-105 cursor-pointer transition duration-250"} src={cart}
                alt={"cart-icon"}></Image>}
        </div>
    </div>
}

export default Login;