import Image from "next/image";
import localFont from "next/font/local";
const madeForItalic = localFont({
    src: "fonts/WixMadeforText-Italic-VariableFont_wght.ttf",
    weight: "100",
});


export default function Home() {
  return (
      <div>
        <p className={`${madeForItalic.className} text-3xl`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab atque culpa cupiditate delectus dicta enim esse eum excepturi iste nostrum odio officia pariatur perferendis quia quo recusandae sapiente, sunt tempora.</p>
      </div>
  );
}
