import { authOptions } from "@/lib/AuthOptions";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request, context: { params: { user: string } }) => {
    try {
        const session: any = await getServerSession(authOptions);
        const foto = context.params.user;
        const getLike = await prisma.likefoto.findFirst({
            where: {
                FotoID: parseInt(foto),
                UserID: parseInt(session.user.UserID),
            },
        });

        if (!getLike) {
            await prisma.likefoto.create({
                data: {
                    TanggalLike: new Date(),
                    FotoID: parseInt(foto),
                    UserID: parseInt(session.user.UserID),
                },
            });
            return NextResponse.json({ success: true, message: 'Like berhasil ditambahkan.' }, {status:201});
        } else {
            await prisma.likefoto.delete({
                where: {
                    LikeID: getLike.LikeID,
                },
            });
            return NextResponse.json({ success: true, message: 'Like berhasil dihapus.' }, {status:201});
        }
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Terjadi kesalahan saat memproses request.', error: error.message }, {status: 400})
    }
};

export const GET = async (req: Request, context: { params: { user: string } }) => {
    try {
        const session: any = await getServerSession(authOptions);
        const foto = context.params.user;
        const getLike = await prisma.likefoto.findFirst({
            where: {
                FotoID: parseInt(foto),
                UserID: parseInt(session.user.UserID),
            },
        });

        return NextResponse.json({ success: true, message: "success fetch", yourLike: getLike }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ success: false, message: "Terjadi kesalahan saat memproses request.", error: error.message }, { status: 500 });
    }
};