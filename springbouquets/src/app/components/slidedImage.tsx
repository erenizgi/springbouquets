'use client'
import CSS from "csstype";


import a1 from "../images/1.jpg"
import a2 from "../images/2.jpg"
import a3 from "../images/3.jpg"
import {Slide} from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';
import React, {useEffect, useState} from "react";
import localFont from "next/font/local";
import SpringIsHere from "@/app/components/SpringIsHere";



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





const SlidedImage = () => {
    const [isMobile, setMobile] = useState(false);

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setMobile(true);
        }
        console.log(slideImages)
    }, []);
    return <div style={{height: "70vh", zIndex: 0, width: "100%"}}>
        <div style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%"}}>
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
        <SpringIsHere></SpringIsHere>
    </div>
}

export default SlidedImage;