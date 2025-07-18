import {PrismaClient} from "../../../../generated/prisma/client";
const prisma = new PrismaClient();


async function GetUser(request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    try{
        const id = Number(searchParams.get("id"));
        const name = searchParams.get("name");
        let user;
        if (id && !isNaN(id)){
            user = await prisma.user.findFirst({where:{id: id}})
        }else if (name){
            user = await prisma.user.findFirst({where:{name: name}})
        }else {
            return Response.json({error: "Send proper info!"}, {
                status: 404
            });
        }
        if (user){
            console.log(user || "THERE IS NO USER!");
            return Response.json(user, {
                status: 200
            });
        }else {
            return Response.json({error: "User not found"}, {
                status: 404
            });
        }

    }catch (e){
        return Response.json({"error": e}, {
            status: 404
        });
    }

}
async function UpdateUser(request) {
    const body = await request.json();
    const email = body.email;
    try{
        const user = await prisma.user.upsert({
            where: { email: email },
            update: body,
            create: body,
        });
        return Response.json(user, { status: 200 });
    }catch (e){
        return Response.json({error: e}, {
            status: 500
        })
    }
}

async function DeleteUser(request) {
    try {
        const {searchParams} = new URL(request.url);
        const email = searchParams.get('email');
        const id = Number(searchParams.get("id"));
        let deleted;
        if (id) {
            deleted = await prisma.user.delete({
                where: {id},
            });
        } else if (email) {
            deleted = await prisma.user.delete({
                where: {email},
            });
        } else {
            return Response.json({error: "Send proper info!"}, {
                status: 404
            });
        }
        return Response.json(
            {message: "User is deleted!", user: deleted},
            {status: 200}
        );
    } catch (e) {
        return Response.json(
            {error: e instanceof Error ? e.message : String(e)},
            {status: 404}
        );
    }
}



export {GetUser as GET, UpdateUser as POST, DeleteUser as DELETE}



