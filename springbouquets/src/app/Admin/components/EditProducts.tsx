'use client'
import BouquetCard from "@/app/components/BouquetCard";
import localFont from "next/font/local";
import {Bouquet} from "@/types/page"
const madeForBold = localFont({
    src: "../../fonts/WixMadeforText-Bold.ttf",
    weight: "200",
});

async function deleteBouquet({ id, title }: {id: number, title?: string | undefined}) {
    console.log("qlwkngqkwlg")
    try {

        const url = new URL('/api/bouquet', window.location.origin);
        if (id) url.searchParams.set('id', String(id));
        if (title) url.searchParams.set('title', title);

        const response = await fetch(url, {
            method: 'DELETE',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to delete bouquet");
        }
        return data;
    } catch (error) {
        console.error('Delete Error:', error);
        throw error;
    }
}


const EditProducts = ({bouquets, fetchBouquets, setEditPopUp, setEditedBouquet}) => {
    return <div className={"grid grid-cols-4 gap-4 p-16 gap-y-16 max-w-[50%]"}>
        {bouquets.map((bouquet: Bouquet) => <div key={bouquet.id}>
            <BouquetCard bouquet={bouquet}></BouquetCard>
            <div className={"flex flex-row items-center justify-center gap-2 mt-4 h-fit"}>
                <div
                    onClick={() => {
                        setEditedBouquet(bouquet);
                        setEditPopUp(true);
                    }}
                    className={`w-[40%] transition duration-250 hover:scale-105 cursor-pointer ${madeForBold.className} bg-[rgba(224,134,0,1)] p-2 px-8 text-[rgba(255,255,255,1)] flex items-center justify-center rounded-md`}>
                    <p>EDIT</p>
                </div>
                <div
                    onClick={async () => {
                        try {
                            await deleteBouquet({ id: bouquet.id});
                            await fetchBouquets();
                            console.log("DELETED!");
                        } catch (e) {
                            console.log("Not deleted: " + e.message);
                        }
                    }}
                    className={`w-[40%] ${madeForBold.className} transition duration-250 hover:scale-105 cursor-pointer bg-[rgba(118,58,18,1)] p-2 text-[rgba(255,255,255,1)] flex items-center justify-center rounded-md`}>
                    <p className={"w-fit text-center"}>DELETE</p>
                </div>
            </div>
        </div>)}

    </div>
}

export default EditProducts;