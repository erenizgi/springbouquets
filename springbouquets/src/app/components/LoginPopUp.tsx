
import localFont from "next/font/local";
import Image from "next/image";
import flower_icon from "@/app/images/flower-icon.png";
import {useState} from "react";
import {motion} from "framer-motion";

const popupVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.97 },
};

export const madeForItalic = localFont({
    src: "../fonts/WixMadeforText-Italic-VariableFont_wght.ttf",
    weight: "100",
});
type LoginPopUpProps = {
    setPopUp: (status: boolean) => void;
}

const LoginPopUp = ({setPopUp}: LoginPopUpProps) => {
    const [loginOrRegister, setLoginOrRegister] = useState("login");

    return <div style={{zIndex: 10000}}
             className={"flex flex-col items-center justify-center absolute w-screen h-screen bg-[rgba(0,0,0,.5)]"}>
                {loginOrRegister === "login" && <motion.div
                    key="login"
                    variants={popupVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.25, type: "tween" }}
                    className={"relative bg-slate-300 w-100 h-150 rounded-lg flex flex-col items-center justify-start box-border pt-32"}>
                    <button
                        onClick={() => setPopUp(false)}
                        className="absolute top-2 right-2 rounded-full hover:bg-slate-700 hover:text-white transition hover:scale-120  w-8 h-8 text-2xl"
                        aria-label="Close">
                        ×
                    </button>

                    <Image className={"h-12 w-auto mb-4 animate-pulse"} src={flower_icon} alt={"flower-icon"}></Image>
                    <h1 style={{textShadow: '1px 1px 2px #000000'}}
                        className={`mb-24 text-4xl ${madeForItalic.className} 
                    bg-gradient-to-r from-pink-600 via-yellow-500 to-blue-700
                    text-transparent bg-clip-text
                    drop-shadow-lg
                    select-none`}>Spring Bouquets</h1>
                    <div className={"flex flex-col items-center justify-center gap-4"}>
                        <div className={"flex gap-4 items-center"}>
                            <h3 style={{textShadow: '1px 1px 2px #000000'}}
                                className={"border-r-1 pr-1 w-20 text-right animate-pulse"}>E-mail</h3>
                            <input placeholder={"This is your id."} type={"string"}
                                   className={"shadow-md bg-slate-700 text-white rounded-2xl pl-4 text-left h-8"}/>
                        </div>
                        <div className={"flex gap-4 items-center"}>
                            <h3 style={{textShadow: '1px 1px 2px #000000'}}
                                className={"border-r-1 pr-1 w-20 animate-pulse"}>Password</h3>
                            <input placeholder={"Type your pass..."} type={"password"}
                                   className={"shadow-md bg-slate-700 text-white rounded-2xl pl-4 text-left h-8"}/>
                        </div>
                        <div className={"flex w-full items-center justify-end"}>
                            <button
                                className={"hover:bg-slate-500 bg-slate-700 text-white py-2 transition hover:scale-105 hover:bg-slate-600 px-8 rounded-3xl text-sm"}>Sign-In
                            </button>
                        </div>
                        <p
                            onClick={() => setLoginOrRegister("register")}
                            className="
                    text-base font-bold
                    bg-gradient-to-r from-pink-600 via-yellow-900 to-blue-700
                    text-transparent bg-clip-text
                    drop-shadow-lg
                    select-none">
                            Don't you have an account?
                        </p>
                    </div>

                </motion.div>}
                {loginOrRegister === "register" && <motion.div
                    key="register"
                    variants={popupVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.25, type: "tween" }}
                    className={"relative bg-slate-300 w-100 h-150 rounded-lg flex flex-col items-center justify-start box-border pt-32"}>
                    <button
                        onClick={() => setPopUp(false)}
                        className="absolute top-2 right-2 rounded-full hover:bg-slate-700 hover:text-white transition hover:scale-120  w-8 h-8 text-2xl"
                        aria-label="Close">
                        ×
                    </button>
                    <Image className={"h-12 w-auto mb-4 animate-pulse"} src={flower_icon} alt={"flower-icon"}></Image>
                    <h1 style={{textShadow: '1px 1px 2px #000000'}}
                        className={`mb-12 text-4xl ${madeForItalic.className} 
                    bg-gradient-to-r from-pink-600 via-yellow-500 to-blue-700
                    text-transparent bg-clip-text
                    drop-shadow-lg
                    select-none`}>Spring Bouquets</h1>
                    <div className={"flex flex-col items-center justify-center gap-4"}>
                        <div className={"flex gap-4 items-center"}>
                            <h3 style={{textShadow: '1px 1px 2px #000000'}}
                                className={"border-r-1 pr-1 w-20 text-right animate-pulse"}>Name</h3>
                            <input placeholder={"Your identity."} type={"string"}
                                   className={"shadow-md bg-slate-700 text-white rounded-2xl pl-4 text-left h-8"}/>
                        </div>
                        <div className={"flex gap-4 items-center"}>
                            <h3 style={{textShadow: '1px 1px 2px #000000'}}
                                className={"border-r-1 pr-1 w-20 text-right animate-pulse"}>Surname</h3>
                            <input placeholder={"Family name."} type={"string"}
                                   className={"shadow-md bg-slate-700 text-white rounded-2xl pl-4 text-left h-8"}/>
                        </div>
                        <div className={"flex gap-4 items-center"}>
                            <h3 style={{textShadow: '1px 1px 2px #000000'}}
                                className={"border-r-1 pr-1 w-20 text-right animate-pulse"}>E-mail</h3>
                            <input placeholder={"This is your id."} type={"string"}
                                   className={"shadow-md bg-slate-700 text-white rounded-2xl pl-4 text-left h-8"}/>
                        </div>
                        <div className={"flex gap-4 items-center"}>
                            <h3 style={{textShadow: '1px 1px 2px #000000'}}
                                className={"border-r-1 pr-1 w-20 animate-pulse"}>Password</h3>
                            <input placeholder={"Type your pass..."} type={"password"}
                                   className={"shadow-md bg-slate-700 text-white rounded-2xl pl-4 text-left h-8"}/>
                        </div>
                        <div className={"flex w-full items-center justify-end"}>
                            <button
                                className={"hover:bg-slate-500 bg-slate-700 text-white py-2 transition hover:scale-105 hover:bg-slate-600 px-8 rounded-3xl text-sm"}>Sign-Up
                            </button>
                        </div>
                        <p
                            onClick={() => setLoginOrRegister("login")}
                            className="
                    text-base font-bold
                    bg-gradient-to-r from-pink-600 via-yellow-900 to-blue-700
                    text-transparent bg-clip-text
                    drop-shadow-lg
                    select-none">
                            Don't you have an account?
                        </p>
                    </div>


                </motion.div>}

        </div>

}

export default LoginPopUp;