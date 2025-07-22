'use client'
import BouquetCard from "@/app/components/BouquetCard";
import localFont from "next/font/local";
import {Bouquet} from "prisma-client-c829a23129f272d8f9429eec7987d398a54d7212bd2dff9ed493e3d9d242195c";

const madeForBold = localFont({
    src: "../../fonts/WixMadeforText-Bold.ttf",
    weight: "200",
});

async function deleteBouquet({ id, title }: {id: number, title: string}) {
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


const EditProducts = ({bouquets, fetchBouquets}) => {
    return <div className={"grid grid-cols-4 gap-4 p-16 gap-y-16"}>
        {bouquets.map((bouquet: Bouquet) => <div key={bouquet.id}>
            <BouquetCard bouquet={bouquet}></BouquetCard>
            <div className={"flex flex-row items-center justify-center gap-2 mt-4"}>
                <div className={`w-[40%] ${madeForBold.className} bg-[rgba(224,134,0,1)] p-2 text-[rgba(255,255,255,1)] flex items-center justify-center rounded-md`}>
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
                    className={`w-[40%] ${madeForBold.className} bg-[rgba(118,58,18,1)] p-2 text-[rgba(255,255,255,1)] flex items-center justify-center rounded-md`}>
                    <p className={"w-fit text-center"}>DELETE</p>
                </div>
            </div>
        </div>)}

    </div>
}

export default EditProducts;