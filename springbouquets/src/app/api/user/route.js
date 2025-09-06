import {PrismaClient} from "../../../../generated/prisma/client"
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
async function CreateUser(request) {
    const body = await request.json();
    const email = body.email;
    if (email === "erenizgi007@gmail.com"){
        body.isAdmin = true;
    }
    const hashedPassword = await hashPassword(body.password);
    try{
        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) {
            return Response.json(
                {error: "Email already used!"},
                {status: 409}
            );
        }

        const user = await prisma.user.create({
            data: {...body, password: hashedPassword}
        });
        return Response.json(user, { status: 200 });
    }catch (e){
        console.log(e);
        return Response.json({error: e}, {
            status: 500
        })
    }
}

async function UpdateUser(request) {
    const body = await request.json();
    const email = body.email
    console.log(body);
    try{
        const user = await prisma.user.upsert({
            where: { email: email },
            update: body,
            create: body,
        });
        return Response.json(user, { status: 200 });
    }catch (e){
        console.log(e);
        return Response.json({error: e}, {
            status: 500
        })
    }
}

import { cookies } from 'next/headers';
import {hashPassword, verifyPassword} from "../../utils/password";
import {error} from "next/dist/build/output/log";

async function LoginUser(request) {
    const body = await request.json();
    const { email, password } = body;
    console.log(body);

    if (!email) {
        return Response.json({ error: "Type an email!" }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return Response.json({ error: "No user has been found." }, { status: 404 });
        }

        const hashedPassword = user.password;
        if (!(await verifyPassword(password, hashedPassword))){
            return Response.json({ message: "Tekrar deneyiniz!"}, {
                status: 401
            });
        }
        const sessionValue = Buffer.from(JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            t: Date.now()
        })).toString('base64');
        (await cookies()).set('session', sessionValue, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 20*60 // 20 saniye
        });

        return Response.json({ message: "Giriş başarılı!", user: {
                id: user.id,
                email: user.email,
                name: user.name
            }});
    } catch (err) {
        return Response.json({ error: err.message || String(err) }, { status: 500 });
    }
}

export { LoginUser as PATCH }

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



export {GetUser as GET, CreateUser as POST, DeleteUser as DELETE}



