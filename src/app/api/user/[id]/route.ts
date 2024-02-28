import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } } ) {
    const id = context.params.id
    try {
        if(id) {
            const response = await prisma.user.findUnique({
                where: {
                    Username: id
                },
                select: {
                    UserID: true,
                    Username: true,
                    Email: true,
                    NamaLengkap: true,
                    Alamat: true,
                    album: true,
                    foto: true
                }
            })
            return NextResponse.json(response)
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({msg: 'Something went wrong.', error})
    }
}