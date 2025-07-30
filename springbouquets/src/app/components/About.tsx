import React from "react";
import localFont from "next/font/local";
const madeForItalic = localFont({
    src: "../fonts/WixMadeforText-Italic-VariableFont_wght.ttf",
    weight: "200",
});


const About = () => {

    return <div style={{position: "relative", zIndex: 150, paddingBottom: "8rem"}} className={"w-full flex flex-row items-center justify-center animate-fade-inn"}>
        <div className={"w-[40%] flex flex-col bg-slate-100 p-16"}>
            <h3 style={{textShadow: "1px 1px 2px rgba(0,255,100, 0.1)"}} className={"mb-4 fade-in"}>About Us</h3>
            <div className="w-[25%] mb-8 bg-gray-300 h-[1px]"></div>

            <h2 className={`text-xl mb-4 ${madeForItalic.className}`}>I'm just little title. You can change me!</h2>
            <p className={"mb-4"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias animi architecto consequatur dignissimos dolore doloremque eos est,
                illo laboriosam maiores maxime minus neque nisi officia sint ut voluptatem. Hic.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus ea esse laboriosam laudantium molestias porro repudiandae rerum, tempora voluptate voluptatem?
                Aliquam beatae blanditiis consectetur dolores et maxime odio, quisquam voluptate?</p>
            <p className={"mb-[8rem]"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus ea esse laboriosam laudantium molestias porro repudiandae rerum, tempora voluptate voluptatem?
                Aliquam beatae blanditiis consectetur dolores et maxime odio, quisquam voluptate?</p>
        </div>
    </div>
}

export default About;