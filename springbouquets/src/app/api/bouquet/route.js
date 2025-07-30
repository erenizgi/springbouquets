import {PrismaClient} from "../../../../generated/prisma/client";
import { promises as fs } from 'fs';
import path from "path";

const prisma = new PrismaClient();


export async function GetBouquet(request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    try {
        const id = Number(searchParams.get("id"));
        const title = searchParams.get("title");
        let bouquet;
        if (id && !isNaN(id)) {
            bouquet = await prisma.bouquet.findFirst({ where: { id: id } });
            if (!bouquet) throw "Bouquet not found";
        } else if (title) {
            bouquet = await prisma.bouquet.findFirst({ where: { title: title } });
            if (!bouquet) throw "Bouquet not found";
        } else {
            bouquet = await prisma.bouquet.findMany({take: 50});
            if (!bouquet || bouquet.length === 0) throw "Bouquet not found";
        }

        return Response.json(bouquet, { status: 200 });
    } catch (e) {
        return Response.json({ error: String(e) }, { status: 404 });
    }
}

async function UpdateBouquet(request) {
    const formData = await request.formData();
    const title = formData.get('title');
    const price = formData.get('price');
    const id = formData.get('id');
    const description = formData.get('description');
    const imageFile = formData.get('image');
    let imagePath = null;
    if (imageFile && typeof imageFile.arrayBuffer === "function") {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const fileName = `${Date.now()}-${imageFile.name}`;

        const uploadDir = path.join(process.cwd(), '/public/uploads');
        await fs.mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, fileName);
        await fs.writeFile(filePath, buffer);
        imagePath = `/uploads/${fileName}`;
    }
    console.log("qwgqgqwgg");
    const body = {
        title, price: Number(price), description
    };
    if (!id) {
        body.image = imagePath;
    }

    try {
        let bouquet;
        console.log(id);
        if (id) { //THIS IS FOR UPDATE
            bouquet = await prisma.bouquet.upsert({
                where: { id: Number(id) },
                update: body,
                create: body,
            });
        }else { //THIS IS FOR CREATION
            bouquet = await prisma.bouquet.upsert({
                where: { title: title },
                update: body,
                create: body,
            });
        }

        return Response.json(bouquet, { status: 200 });
    } catch (e) {
        console.log(e);
        return Response.json({ error: e.toString() }, { status: 500 });
    }
}

export async function DeleteBouquet(request) {
    try {
        const {searchParams} = new URL(request.url);
        const title = searchParams.get('title');
        const id = Number(searchParams.get("id"));
        let deleted;
        if (id) {
            deleted = await prisma.bouquet.delete({
                where: {id},
            });
        } else if (title) {
            deleted = await prisma.bouquet.delete({
                where: {title},
            });
        } else {
            return Response.json({error: "Send proper info!"}, {
                status: 404
            });
        }
        return Response.json(
            {message: "Bouquet is deleted!", bouquet: deleted},
            {status: 200}
        );
    } catch (e) {
        return Response.json(
            {error: e instanceof Error ? e.message : String(e)},
            {status: 404}
        );
    }
}

export {GetBouquet as GET, UpdateBouquet as POST, DeleteBouquet as DELETE}



