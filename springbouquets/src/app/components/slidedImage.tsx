'use client'
import CSS from "csstype";


import a1 from "../images/1.jpg"
import a2 from "../images/2.jpg"
import a3 from "../images/3.jpg"
import {Slide} from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';
import React, {useEffect, useState} from "react";
import localFont from "next/font/local";

const madeForItalic = localFont({
    src: "../fonts/WixMadeforText-Italic-VariableFont_wght.ttf",
    weight: "300",
});

const slideImages = [
    {
        url: a1,
    },
    {
        url: a2,
    },
    {
        url: a3,
    },
];

const spanStyle: CSS.Properties = {
    width: '100%',
    height: "100%",
    display: "flex",
    background: "rgba(100, 100, 100, 0.5)",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "5rem",
    paddingTop: "18rem",
    justifyContent: "center",
    color: '#EEEEEE',
    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.25)",

}

const BAHARGELDI: CSS.Properties = {
    fontSize: "4rem",
    margin: "0",
    textAlign: "left",
    position: "absolute",
    color: '#EEEEEE',
    bottom: "8rem",
    display: "flex",
    flexDirection: "column",
    left: "25%",
    zIndex: 99,
    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.25)",
    lineHeight: "10rem"
};



const SlidedImage = () => {
    const [isMobile, setMobile] = useState(false);

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setMobile(true);
        }
        console.log(slideImages)
    }, []);
    return <div>
        <div style={BAHARGELDI}>
            <div className={"mb-4"}>
                <p style={{textShadow: "1px 1px 1px rgba(255, 255, 255, 0.25)"}} className={`text-black text-shadow  text-3xl 
            ${madeForItalic.className} mb-8`}>Bahara renkli bir buket ile adım atın</p>
                <div className="w-[4rem] bg-black h-[1px]"></div>
            </div>

            <div className="w-fit">
                <h1 style={{fontSize: "8rem"}}>BAHAR</h1>
                <div className="w-full bg-white h-[1px]"></div>
            </div>
            <div className="w-fit">
                <h1 style={{fontSize: "8rem"}}>GEL-</h1>
                <div className="w-full bg-white h-[1px]"></div>
            </div>
            <div className="w-fit">
                <h1 style={{fontSize: "8rem"}}>DI</h1>
                <div className="w-full bg-white h-[1px]"></div>
            </div>


        </div>
        <Slide autoplay={true} transitionDuration={1000} duration={5000} infinite={true} canSwipe={true}>
            {slideImages.map((slideImage, index) => (
                <div key={index}> {/*bg-[url('${slideImage.url}')]*/}
                    <div style={{
                        backgroundImage: `url(${slideImage.url.src})`,
                        width: "100%",
                        height: "100vh",
                        backgroundSize: "cover"
                    }} className={`flex relative items-end justify-start bg-cover m-0`}>
                        <div style={spanStyle}></div>
                    </div>
                </div>
            ))}
        </Slide>
    </div>
}

export default SlidedImage;