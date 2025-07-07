import Image from "next/image";
import localFont from "next/font/local";
import SlidedImage from "@/app/components/slidedImage";
const madeForItalic = localFont({
    src: "fonts/WixMadeforText-VariableFont_wght.ttf",
    weight: "100",
});


export default function Home() {
  return (
      <div>
          <Login></Login>
          <SlidedImage/>
          <div style={{height: "100vh", div: "100vw"}}></div>
      </div>
  );
}
