import BouquetCard from "@/app/components/BouquetCard";
import localFont from "next/font/local";

const madeForBold = localFont({
    src: "../../fonts/WixMadeforText-Bold.ttf",
    weight: "200",
});

const EditProducts = ({bouquets}) => {
    return <div className={"grid grid-cols-4 gap-4 p-16 gap-y-16"}>
        {bouquets.map((bouquet) => <div>
            <BouquetCard bouquet={bouquet}></BouquetCard>
            <div className={"flex flex-row items-center justify-center gap-2 mt-4"}>
                <div className={`w-[40%] ${madeForBold.className} bg-[rgba(224,134,0,1)] p-2 text-[rgba(255,255,255,1)] flex items-center justify-center rounded-md`}>
                    <p>EDIT</p>
                </div>
                <div className={`w-[40%] ${madeForBold.className} bg-[rgba(118,58,18,1)] p-2 text-[rgba(255,255,255,1)] flex items-center justify-center rounded-md`}>
                    <p className={"w-fit text-center"}>DELETE</p>
                </div>
            </div>
        </div>)}
        {bouquets.map((bouquet) => <div>
            <BouquetCard bouquet={bouquet}></BouquetCard>
            <div className={"flex flex-row items-center justify-center gap-2 mt-4"}>
                <div className={`w-[40%] ${madeForBold.className} bg-[rgba(224,134,0,1)] p-2 text-[rgba(255,255,255,1)] flex items-center justify-center rounded-md`}>
                    <p>EDIT</p>
                </div>
                <div className={`w-[40%] ${madeForBold.className} bg-[rgba(118,58,18,1)] p-2 text-[rgba(255,255,255,1)] flex items-center justify-center rounded-md`}>
                    <p className={"w-fit text-center"}>DELETE</p>
                </div>
            </div>
        </div>)}
        {bouquets.map((bouquet) => <div>
            <BouquetCard bouquet={bouquet}></BouquetCard>
            <div className={"flex flex-row items-center justify-center gap-2 mt-4"}>
                <div className={`w-[40%] ${madeForBold.className} bg-[rgba(224,134,0,1)] p-2 text-[rgba(255,255,255,1)] flex items-center justify-center rounded-md`}>
                    <p>EDIT</p>
                </div>
                <div className={`w-[40%] ${madeForBold.className} bg-[rgba(118,58,18,1)] p-2 text-[rgba(255,255,255,1)] flex items-center justify-center rounded-md`}>
                    <p className={"w-fit text-center"}>DELETE</p>
                </div>
            </div>
        </div>)}

    </div>
}

export default EditProducts;