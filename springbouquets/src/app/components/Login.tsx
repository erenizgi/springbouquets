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

type LoginProps = {
    customStyle?: CSS.Properties;
    isAdmin?: boolean;
    setPopUp?: (status: boolean) => void;
    user: {};
    loggedIn?: boolean;
    setLoggedIn: (status: boolean) => void;

}

const Login = ({customStyle, setPopUp, setLoggedIn, loggedIn} : LoginProps) => {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [isAdmin, setAdmin] = useState(false);
    const [userPopUp, setUserPopUp] = useState(false);

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
    const adminDashboardRouteHandler = () => {
        router.push("/Admin");
    }

    const mainPageRouteHandler = () => {
        router.push("/")
    }

    const handleLogout = async () => {
        const response = await fetch('/api/user/logout', { method: 'POST' });
        if (response.status === 200){
            const data = await response.json();
            console.log(data);
            setLoggedIn(false);
            setUserPopUp(false);
            setUser({});
            setAdmin(false);
            router.push("/");
        }else {
            const data = await response.json();
            console.log("Something went wrong.")
        }
    }

    return <div className={"w-full flex flex-row items-center justify-end bg-slate-100"} style={{...customStyle, padding: "1rem", paddingLeft: "2rem", paddingTop: "1.5rem"}}>
        <div className={"w-[10%] box-border"} onClick={mainPageRouteHandler}>
            <Image className={"h-12 w-auto hover:scale-105 cursor-pointer transition duration-250 "} src={flower_icon} alt={"flower-icon"}></Image>
        </div>
        <div className={"w-[90%] flex flex-row items-center justify-end"}>
            {isAdmin ? <div className={"hover:scale-105 cursor-pointer transition-all duration-250 "}>
                <h3 onClick={adminDashboardRouteHandler}>Admin Dashboard</h3>
            </div> : null}
            {loggedIn && <div className={"relative transition-all duration-300"}>
                <Image
                    onClick={() => setUserPopUp(prev => !prev)}
                    className={"h-8 w-auto ml-4 mr-4 hover:scale-105 cursor-pointer transition duration-250 "}
                       src={userIcon} alt={"user-icon"}></Image>
                {userPopUp && <div className={"transition-all duration-250 absolute bg-gradient-to-r from-slate-400 via-pink-400 to-yellow-500 min-w-[260px] shadow-md h-fit mt-8 right-0 py-2 px-4 rounded-lg"}>
                    <div className={"relative text-slate-100"}>
                        <p
                            onClick={() => setUserPopUp(false)}
                            className={`text-slate-100 transition duration-150 hover:scale-120 cursor-pointer absolute top-[-0.5rem] right-0 text-xl`}>x</p>
                        <h3 className={"text-xl mb-2 py-4"}>{user.name}</h3>
                        <h3 className={"mb-8"}>{user.email}</h3>
                        <div className={"flex w-full justify-end items-center"}>
                            <h3
                                onClick={handleLogout}
                                style={{...textShadow}} className={`${colorful} from-yellow-800 to-blue-700 transition duration-250 hover:scale-110 cursor-pointer`}>
                                Sign Out</h3>

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

            {!isAdmin && <Image className={"h-8 w-auto ml-4 mr-4 hover:scale-105 cursor-pointer transition duration-250"} src={cart} alt={"cart-icon"}></Image>}
            <Image className={"hover:scale-105 cursor-pointer transition duration-250 h-6 w-auto ml-4 mr-4"} src={settings} alt={"settings-icon"}></Image>
        </div>
    </div>
}

export default Login;