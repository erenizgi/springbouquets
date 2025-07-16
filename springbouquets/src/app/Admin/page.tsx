'use client'
import Login from "@/app/components/Login";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import AddProduct from "@/app/Admin/components/AddProduct";

type AdminProps = {
    isAdmin?: boolean;
}

const inputClass = "w-[90%] p-3 pl-3 rounded-lg outline-none";





const Admin = ({isAdmin}: AdminProps) => {
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [description, setDescription] = useState<string>("")

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
            if (inputRef.current) inputRef.current.value = "";
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

    return <div className={"flex flex-col w-screen h-screen bg-slate-100"}>
        <Login customStyle={{position: "relative", zIndex: "100"}} isAdmin={isAdmin}></Login>
        <AddProduct submit={handleSubmit} description={description} setDescription={setDescription} inputClass={inputClass} title={title} setTitle={setTitle} price={price} setPrice={setPrice} handleFrameClick={handleFrameClick} handleFileChange={handleFileChange} imgUrl={imgUrl} inputRef={inputRef}></AddProduct>


    </div>
}

export default Admin;