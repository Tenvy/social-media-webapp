import prisma from "@/utils/db"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
    const { Username, Password, Email, NamaLengkap, Alamat } = await request.json()
    try {
        const check = await prisma.user.findUnique({
            where: {
                Username: Username
            }
        })
        if (check) return NextResponse.json({msg: "Username Already Exists!"})

        const encryptedPass = await bcrypt.hash(Password, 5)

        const response = await prisma.user.create({
            data: {
                Username: Username,
                Password: encryptedPass,
                Email: Email,
                NamaLengkap: NamaLengkap,
                Alamat: Alamat
            }
        })
        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json({msg: "Something went wrong.", error})
    }
}