import { authOptions } from "@/lib/AuthOptions";
import prisma from "@/utils/db"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const { NamaAlbum, Deskripsi } = await request.json()
    try {
        const session: any = await getServerSession(authOptions);  
        if (!session) return NextResponse.json({msg: 'Kamu belum login'})
        const response = await prisma.album.create({
            data: {
                NamaAlbum,
                Deskripsi,
                TanggalDibuat: new Date,
                UserID : session?.user?.UserID,
            }
        })
        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json({msg: "Something went wrong.", error})
    }
}