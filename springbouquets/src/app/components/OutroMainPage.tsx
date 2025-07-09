import bride from "../images/bride.jpg"
import React from "react";
import localFont from "next/font/local";
const madeForItalic = localFont({
    src: "../fonts/WixMadeforText-Italic-VariableFont_wght.ttf",
    weight: "200",
});


const OutroMainPage = () => {
    return <div style={{backgroundImage: `url(${bride.src})`}} className={"w-full bg-cover bg-fixed h-fit p-45 pl-120 pr-120"}>
        <div className={"bg-white flex flex-row p-16 pt-24 pb-24 gap-16"}>
            <div className={"w-fit] flex flex-col items-start justify-start"}>
                <h3 style={{textShadow: "1px 1px 2px rgba(0,255,100, 0.1)"}}
                    className={`tracking-widest text-lg mb-4`}>CONTACT US</h3>
                <div className="w-[25%] mb-8 bg-gray-800 h-[1px]"></div>
                <div style={{lineHeight: "1.6rem"}} className={`text-sm ${madeForItalic.className}`}>
                    <p>
                        500 Terry Francine Street, <br/>
                        San Francisco, CA<br/>
                        123-456-7890
                    </p>
                </div>

            </div>
            <div className={"w-fit flex flex-col items-start justify-start"}>
                <h3 style={{textShadow: "1px 1px 2px rgba(0,255,100, 0.1)"}}
                    className={`tracking-widest text-lg mb-4 `}>OPENING HOURS</h3>
                <div className="w-[25%] mb-8 bg-gray-800 h-[1px]"></div>
                <div style={{lineHeight: "1.6rem"}} className={`text-sm ${madeForItalic.className}`}>
                    <p>
                        Mon - Fri: 7am - 10pm <br/>
                        Saturday: 8am - 10pm<br/>
                        Sunday: 8am - 11pm
                    </p>
                </div>

            </div>
            <div className={"w-fit flex flex-col items-start justify-start"}>
                <h3 style={{textShadow: "1px 1px 2px rgba(0,255,100, 0.1)"}}
                    className={`tracking-widest text-lg mb-4`}>STAY UPDATED</h3>
                <div className="w-[25%] mb-8 bg-gray-800 h-[1px]"></div>
                <div style={{lineHeight: "1.6rem"}} className={`w-full text-sm ${madeForItalic.className}`}>
                    <p>Sign up for our newsletter</p>
                    <div className={"w-full flex flex-row items-center justify-center"}>
                        <input className={"border h-8 mr-4 w-50"}/>
                        <button
                            className={`${madeForItalic.className} w-20 text-base flex justify-center items-center h-8  text-white w-fit p-2 pl-4 pr-4 rounded-sm bg-[rgb(0,50,0)]`}>
                            <p>JOIN_NOW</p>
                        </button>
                    </div>
                </div>

            </div>


        </div>
    </div>
}
export default OutroMainPage;