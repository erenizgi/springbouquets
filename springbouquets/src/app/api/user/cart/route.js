import {PrismaClient} from "../../../../../generated/prisma/client";
const prisma = new PrismaClient();
export async function POST(req) {
    try {
        const { userId, item } = await req.json();
        if (!userId || !item) {
            return Response.json({ error: "Need userID and Items!" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { cart: true },
        });

        let cart = [];
        if (user && Array.isArray(user.cart)) {
            cart = [...user.cart];
        }

        const foundIdx = cart.findIndex((i) => i.productId === item.productId);
        if (foundIdx > -1) {
            cart[foundIdx].count += item.count ?? 1;
        } else {
            cart.push(item);
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: { cart },
        });

        return Response.json({ cart: updatedUser.cart });
    } catch (err) {
        console.error("CART ERROR", err);
        return Response.json({ error: "Something went wrong." }, { status: 500 });
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return Response.json({ error: "Missing userId" }, { status: 400 });
    }

    const numericUserId = typeof userId === "string" ? parseInt(userId, 10) : userId;

    const user = await prisma.user.findUnique({
        where: { id: numericUserId },
        select: { cart: true }
    });

    if (!user) {
        return Response.json({ error: "User not found!" }, { status: 404 });
    }

    return Response.json({ cart: user.cart });
}