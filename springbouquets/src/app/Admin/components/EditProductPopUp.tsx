import {useEffect, useState} from "react";
import editProducts from "@/app/Admin/components/EditProducts";

const EditProductPopUp = ({setEditPopUp, bouquet, updateAdminPage}) => {
    const [editBouquet, setEditBouquet] = useState(bouquet);
    console.log(bouquet);


    const updateProduct = async (id, title, description, price) => {
        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append("description", description);
        formdata.append("price", price);
        formdata.append("id", id);


        // @ts-ignore
        const response = await fetch('/api/bouquet', {
            method: 'POST',
            body: formdata,
        });
        if (response.status === 200){
            if (setEditPopUp) setEditPopUp(false);
            if (updateAdminPage) updateAdminPage();
        }
        console.log(await response.json());
    }



    return <div style={{zIndex: 999, overflow: "hidden"}} className={"w-screen flex items-center justify-center h-screen absolute bg-[rgba(0,0,0,0.5)]"}>
        <div className={"h-[70%] w-[40%] bg-white flex rounded-lg flex-col items-start p-16 relative"}>
            <h1 className={"text-center mb-8 text-4xl bg-gradient-to-r from-pink-600 via-yellow-500 to-blue-400 text-transparent bg-clip-text drop-shadow-lg select-none"}>Update</h1>
            <div className={"flex flex-col"}>
                <div className={"flex"}>
                    <div className={"w-[50%] flex flex-col gap-4"}>
                        <div className={"flex gap-1"}>
                            <h3 className={""}>Title:</h3>
                            <input
                                value={editBouquet.title}
                                onChange={(e) => setEditBouquet({...editBouquet, title: e.target.value})}
                                className={"pl-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-l-none\n" +
                                    "    focus:border-slate-500 transition-all duration-200"} placeholder={"Bouquet Title"}/>
                        </div>


                        <div className={"flex gap-1"}>
                            <h3>Price:</h3>
                            <input
                                onChange={(e) => setEditBouquet({...editBouquet, price: e.target.value})}
                                value={editBouquet.price}
                                className={"pl-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-l-none\n" +
                                    "    focus:border-slate-500 transition-all duration-200"} placeholder={"Bouquet Price"}/>
                        </div>

                        <div className={"flex flex-col"}>
                            <h3>Description</h3>
                            <textarea
                                onChange={(e) => setEditBouquet({...editBouquet, description: e.target.value})}
                                className={"h-64 p-4 pl-2 pt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-l-none\n" +
                                    "    focus:border-slate-500 transition-all duration-200"}
                                style={{resize: "none"}}
                                value={editBouquet.description}
                                placeholder={"Bouquet Description"}/>
                        </div>

                    </div>
                    <div className={"w-[50%] p-8 pt-0"}>
                        <img className={"w-full h-full"} src={editBouquet.image} alt={"image"}/>
                    </div>
                </div>
                <div
                    onClick={async () => await updateProduct(editBouquet.id, editBouquet.title, editBouquet.description, editBouquet.price)}
                    className={"w-fit transition duration-200 text-xl hover:scale-105 text-center text-transparent bg-gradient-to-r from-pink-400 via-yellow-700 to-blue-800 bg-clip-text drop-shadow-lg cursor-pointer"}>
                    <p>CONFIRM</p>
                </div>
            </div>
            <div
                onClick={() => setEditPopUp(false)}
                className={"w-10 h-10 bg-slate-800 text-white hover:bg-slate-700 transition duration-200  text-center absolute cursor-pointer shadow-md rounded-3xl right-4 top-2 text-2xl"}>
                x</div>
        </div>

    </div>
}

export default EditProductPopUp;