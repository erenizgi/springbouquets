// app/api/me/route.js
import { cookies } from 'next/headers';
import {PrismaClient} from "../../../../generated/prisma/client";
const prisma = new PrismaClient();


export async function GET() {
    const session = (await cookies()).get('session');
    console.log(session+"sessionnadşnlmadlşna")
    if (!session) {
        return Response.json({ error: 'Login please!' }, { status: 401 });
    }
    const sessionInfo = JSON.parse(Buffer.from(session.value, 'base64').toString('utf-8'));
    console.log(sessionInfo);
    const user = await prisma.user.findUnique({ where: { id: sessionInfo.id } });

    if (!user) {
        return Response.json({ error: 'No User!' }, { status: 401 });
    }

    return Response.json({
        id: user.id,
        email: user.email,
        name: user.name
    }, {
        status: 200
    });
}