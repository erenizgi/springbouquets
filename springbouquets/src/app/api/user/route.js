import {PrismaClient} from "../../../generated/prisma/client";


async function GetFirstUser(request) {
    const prisma = new PrismaClient();


    try{
        const user = await prisma.user.findFirst();
        console.log(user || "THERE IS NO USER!");
        return Response.json(user, {
            status: 200
        });
    }catch (e){
        return Response.json({"error": e}, {
            status: 404
        });
    }

}

export {GetFirstUser as GET}



