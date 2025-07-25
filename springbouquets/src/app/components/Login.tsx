'use client'
import Image from "next/image";
import flower_icon from "../images/flower-icon.png"
import userIcon from "../images/user.png"
import cart from "../images/cart.png"
import settings from "../images/settings.png"
import CSS from "csstype";
import {useRouter} from "next/navigation";

type LoginProps = {
    customStyle?: CSS.Properties;
    isAdmin?: boolean;
    setPopUp?: (status: boolean) => void;
    user: {}

}

const Login = ({customStyle, isAdmin, setPopUp, user} : LoginProps) => {
    const router = useRouter();

    console.log(user);

    const adminDashboardRouteHandler = () => {
        router.push("/Admin");
    }

    const mainPageRouteHandler = () => {
        router.push("/")
    }

    return <div className={"w-full flex flex-row items-center justify-end"} style={{...customStyle, background: "white", padding: "1rem", paddingLeft: "2rem", paddingTop: "1.5rem"}}>
        <div className={"w-[10%] box-border"} onClick={mainPageRouteHandler}>
            <Image className={"h-12 w-auto"} src={flower_icon} alt={"flower-icon"}></Image>
        </div>
        <div className={"w-[90%] flex flex-row items-center justify-end"}>
            {isAdmin ? <div>
                <h3 onClick={adminDashboardRouteHandler}>Admin Dashboard</h3>
            </div> : null}
            <Image className={"h-8 w-auto ml-4 mr-4"} src={userIcon} alt={"user-icon"}></Image>

            {!isAdmin && !user && <p onClick={() => {
                {
                    if (setPopUp) {
                        setPopUp(true);
                    }
                }
            }}>Log In</p>}

            {!isAdmin && <Image className={"h-8 w-auto ml-4 mr-4"} src={cart} alt={"cart-icon"}></Image>}
            <Image className={"h-6 w-auto ml-4 mr-4"} src={settings} alt={"settings-icon"}></Image>
        </div>
    </div>
}

export default Login;