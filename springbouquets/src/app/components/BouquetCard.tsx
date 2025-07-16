import Image from "next/image";
import localFont from "next/font/local";
const madeForItalic = localFont({
    src: "../fonts/WixMadeforText-Italic-VariableFont_wght.ttf",
    weight: "200",
});

const BouquetCard = ({bouquet}) => {
    return <div className={"flex flex-col items-center justify-center gap-8"}>
        <div className={"relative w-full aspect-[3/4] overflow-hidden"}>
            <Image fill src={bouquet.image}
                   alt={"bouquet"}
                   style={{width: "100%", height: "100%", objectFit: "cover"}}
                   sizes="(max-width: 768px) 100vw, 25vw"
            ></Image>
        </div>
        <div className={"flex flex-col items-center justify-center"}>
            <h2 className={`text-lg ${madeForItalic.className}`}>
                {bouquet.title}
            </h2>
            <h3 className={"text-sm"}>
                ${parseFloat(bouquet.price).toFixed(2)}
            </h3>
        </div>

    </div>
}

export default BouquetCard;