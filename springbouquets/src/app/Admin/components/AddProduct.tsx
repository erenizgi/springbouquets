import React, {useEffect} from "react";

type AddProductTypes = {
    inputClass: string;
    title: string;
    setTitle: (title: string) => void;
    price: string;
    setPrice: (price: string) => void;
    handleFrameClick: () => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    imgUrl: string | null;
    inputRef: React.RefObject<HTMLInputElement | null>;
    description: string;
    setDescription: (description: string) => void;
}
const floatRegex = /^-?\d*\.\d+$/;




const AddProduct = ({
                        inputClass,
                        title,
                        setTitle,
                        price,
                        setPrice,
                        handleFrameClick,
                        imgUrl,
                        inputRef,
                        handleFileChange,
                        description,
                        setDescription,
                        submit
                    }: AddProductTypes) => {

    useEffect(() => {
        console.log(imgUrl);
    }, []);
    
    return <div className={"flex flex-col border-r p-8 pt-12 w-[50%] h-[80%]"}>
        <h2 className={"text-3xl mb-8"}>Add Product</h2>
        <div className={"w-full p-3 flex flex-row w-full gap-10 h-fit"}>
            <div className={"flex flex-col w-[60%]"}>
                <div className={"flex"}>
                    <div className={"flex items-center"}>
                        <h3 className={"w-15 text-xl border-r-1 p-1"}>Title</h3>
                    </div>
                    <input placeholder={"enter a title..."} className={inputClass} type={"text"}
                           onChange={(e) => setTitle(e.target.value)}
                           value={title}/>
                </div>
                <div className={"w-[100%] bg-black h-[1px] mb-2"}></div>
                <div className={"flex"}>
                    <div className={"flex items-center"}>
                        <h3 className={"w-15 text-xl border-r-1 p-1"}>Price</h3>
                    </div>
                    <input placeholder={"enter a price..."} className={inputClass} type={"number"} step="any"
                           onChange={(e) => {
                               setPrice(e.target.value);

                           }}
                           value={price}/>
                </div>
                <div className={"w-[100%] bg-black h-[1px] mb-2"}></div>
                <div className={"flex flex-col"}>
                    <div className={"flex items-center"}>
                        <h3 className={"w-30 text-xl p-1 mb-2"}>Description</h3>
                    </div>
                    <textarea placeholder={"...description"} className={"w-[100%] h-90 text-top p-3 pl-3 outline-none border-b-1 border-t-1 border-[rgba(0,0,0,.1)] resize-none rounded-lg mb-8"} type={"text"}
                           onChange={(e) => setDescription(e.target.value)}
                           value={description}/>
                </div>


                <div className={"w-full pl-24 pr-24 m-0 flex items-end justify-start flex-1"}>
                    <button
                        onClick={submit}
                        className={"hover:bg-[rgb(0,70,50)] ease-in-out hover:scale-105 transition duration-350 h-12 w-full rounded-lg text-white align-top bg-[rgb(0,50,0)]"}>CREATE_NOW
                    </button>
                </div>

            </div>
            <div
                // @ts-ignore
                style={{border: imgUrl === null ? "1px solid rgba(0,0,0,0.5)" : null}}
                className={`ease-in-out transition duration-300 hover:scale-102 h-[100%] w-[40%] flex items-center justify-center rounded-lg`}
                onClick={handleFrameClick}>
                {imgUrl ? (
                    <img width={60} height={60} src={imgUrl} alt="Önizleme"
                         style={{objectFit: "cover", width: "100%", height: "100%", borderRadius: "0.5rem"}}></img>
                ) : (
                    <span className="text-gray-400">+ Add Photo</span>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

        </div>
    </div>

}

export default AddProduct;