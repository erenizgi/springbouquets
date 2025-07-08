import {PrismaClient} from "../../../../generated/prisma/client";

const prisma = new PrismaClient();


async function GetBouquet(request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    try {
        const id = Number(searchParams.get("id"));
        const title = searchParams.get("title");
        let bouquet;
        if (id && !isNaN(id)) {
            bouquet = await prisma.bouquet.findFirst({where: {id: id}})
        } else if (title) {
            bouquet = await prisma.bouquet.findFirst({where: {title: title}})
        } else {
            return Response.json({error: "Bouquet not found"}, {
                status: 404
            });
        }
        if (bouquet) {
            console.log(bouquet || "THERE IS NO USER!");
            return Response.json(bouquet, {
                status: 200
            });
        } else {
            return Response.json({error: "User not found"}, {
                status: 404
            });
        }

    } catch (e) {
        return Response.json({"error": e}, {
            status: 404
        });
    }

}

async function UpdateBouquet(request) {
    const body = await request.json();
    const title = body.title;
    try {
        const bouquet = await prisma.bouquet.upsert({
            where: {title: body.title},
            update: body,
            create: body,
        });
        return Response.json(bouquet, {status: 200});
    } catch (e) {
        return Response.json({error: e}, {
            status: 500
        })
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



