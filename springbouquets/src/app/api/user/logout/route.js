import {hashPassword} from "../../../utils/password";
import {cookies} from "next/headers";

const logOutHandler = async (request) => {
    try{
        (await cookies()).delete('session');
        return Response.json({status: "Successfully logged out."}, {
            status: 200
        });
    }catch (e) {
        return Response.json({error: "Something went wrong"}, {
            status: 500
        });
    }

}


export {logOutHandler as POST}