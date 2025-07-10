'use client'
import Image from "next/image";
import flower_icon from "../images/flower-icon.png"
import user from "../images/user.png"
import cart from "../images/cart.png"
import settings from "../images/settings.png"
import CSS from "csstype";
import {useRouter} from "next/navigation";

type LoginProps = {
    customStyle?: CSS.Properties;
    isAdmin?: boolean;
}

const Login = ({customStyle, isAdmin} : LoginProps) => {
    const router = useRouter();



    const adminDashboardRouteHandler = () => {
        router.push("/Admin");
    }

    return <div className={"w-full flex flex-row items-center justify-end"} style={{...customStyle, background: "white", padding: "1rem", paddingLeft: "2rem", paddingTop: "1.5rem"}}>
        <div className={"w-[10%] box-border"}>
            <Image className={"h-12 w-auto"} src={flower_icon} alt={"flower-icon"}></Image>
        </div>
        <div className={"w-[90%] flex flex-row items-center justify-end"}>
            {isAdmin ? <div>
                <h3 onClick={adminDashboardRouteHandler}>Admin Dashboard</h3>
            </div> : null}
            <Image className={"h-8 w-auto ml-4 mr-4"} src={user} alt={"user-icon"}></Image>

            <p>Log In</p>
            <Image className={"h-8 w-auto ml-4 mr-4"} src={cart} alt={"cart-icon"}></Image>
            <Image className={"h-6 w-auto ml-4 mr-4"} src={settings} alt={"settings-icon"}></Image>
        </div>
    </div>
}

export default Login;