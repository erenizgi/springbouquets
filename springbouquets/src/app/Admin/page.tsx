'use client'
import Login from "@/app/components/Login";
import React, {useRef, useState} from "react";
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
    const inputRef = useRef<HTMLInputElement>(null);
    const [description, setDescription] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleFrameClick = () => {
        inputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);
        const res = await fetch("/api/bouquet", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        alert(`Yüklenen dosya yolu: ${data.filePath}`);
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
        <AddProduct description={description} setDescription={setDescription} inputClass={inputClass} title={title} setTitle={setTitle} price={price} setPrice={setPrice} handleFrameClick={handleFrameClick} handleFileChange={handleFileChange} imgUrl={imgUrl} inputRef={inputRef}></AddProduct>


    </div>
}

export default Admin;