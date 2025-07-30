'use client'
import Login from "@/app/components/Login";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import AddProduct from "@/app/Admin/components/AddProduct";
import EditProducts from "@/app/Admin/components/EditProducts";
import EditProductPopUp from "@/app/Admin/components/EditProductPopUp";

const inputClass = "w-[90%] p-3 pl-3 rounded-lg outline-none";

const fetch50Bouquets = async (setBouquets?: (value: (((prevState: object[]) => object[]) | object[])) => void) => {
    try{
        const response = await fetch("/api/bouquet");

        const parsed = await response.json();
        if (setBouquets) {
            if (parsed?.error) setBouquets([]);
            else setBouquets([...parsed]);
        }
        console.log("SET!!")
    }catch (e){
        console.log(e)
    }
}




const Admin = () => {
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [description, setDescription] = useState<string>("")
    const [allBouquets, setAllBouquets] = useState<{}[]>([]);
    const [isAdmin, setAdmin] = useState<true | false>(true);
    const [editPopUp, setEditPopUp] = useState(false);
    const [user, setUser] = useState({});
    const [editedBouquet, setEditedBouquet] = useState({});

    useEffect(() => {
        fetch("/api/me")
            .then(res => res.json())
            .then(data => {
                setUser(data);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target?.files[0]) {
            setFile(e.target?.files[0]);
        }
    };


    const handleFrameClick = () => {
        // @ts-ignore
        inputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("l1kşwgwqlkng")

        if (!title || !price) {
            console.log("Fill the title and price!");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", title);
        formData.append("price", price);
        formData.append("description", description);
        console.log(formData);

        try {
            // @ts-ignore
            const res = await fetch("/api/bouquet", {
                method: "POST",
                body: formData,
            });
            console.log(res);

            if (!res.ok) {
                const err = await res.json();
                console.log("Kayıt başarısız: " + (err.error || res.status));
                return;
            }

            const data = await res.json();
            console.log(`Yüklenen dosya yolu: ${data.image || data.filePath}`);
            setFile(null);
            setImgUrl(null);
            setTitle("");
            setPrice("");
            setDescription("");
            // if (inputRef.current) inputRef.current.value = "";
            await fetch50Bouquets(setAllBouquets);
        } catch (e) {
            console.log("Bir hata oluştu: " + e);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setFile(file);
        const url = URL.createObjectURL(file);
        setImgUrl(url);
    };

    useEffect(() => {
        (async () => {
            await fetch50Bouquets(setAllBouquets)
        })();
        console.log(isAdmin);
    }, []);

    useEffect(() => {
        if (editPopUp) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => document.body.classList.remove('overflow-hidden');
    }, [editPopUp]);

    return <div className={"flex flex-col w-screen h-full bg-slate-100"}>
        <Login user={user} customStyle={{position: "relative", zIndex: "100"}} isAdmin={isAdmin} setPopUp={() => {}}></Login>
        <div
            className={"flex flex-row h-full"}>

            {editPopUp && <EditProductPopUp updateAdminPage={() => fetch50Bouquets(setAllBouquets)} bouquet={editedBouquet} setEditPopUp={setEditPopUp}></EditProductPopUp>}
            <AddProduct submit={async (e: React.FormEvent<Element>) => {
                await handleSubmit(e)
            }} description={description} setDescription={setDescription} inputClass={inputClass} title={title} setTitle={setTitle} price={price} setPrice={setPrice} handleFrameClick={handleFrameClick} handleFileChange={handleFileChange} imgUrl={imgUrl} inputRef={inputRef}></AddProduct>
            <EditProducts setEditedBouquet={setEditedBouquet} setEditPopUp={setEditPopUp} fetchBouquets={async () => await fetch50Bouquets(setAllBouquets)} bouquets={allBouquets}></EditProducts>
        </div>


    </div>
}

export default Admin;