import { authOptions } from "@/lib/AuthOptions";
import { supabase } from "@/lib/supabaseClient";
import prisma from "@/utils/db"
import { existsSync , mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const session: any = await getServerSession(authOptions);  
  if (!session) return NextResponse.json({msg: 'Kamu belum login'})
  const uuid = uuidv4()
  const formData = await request.formData()
  const JudulFoto = formData.get('JudulFoto') as string
  const DeskripsiFoto = formData.get('DeskripsiFoto') as string
  const AlbumID = formData.get('AlbumID') as string
  const image = formData.get('image') as unknown as File

  const { data: uploadedFile } = await supabase.storage.from('image').upload(`${session?.user?.Username}/${uuid}`, image, {
      cacheControl: '3600',
      upsert: false
    })

    if (!uploadedFile) return NextResponse.json({msg: 'failed uploading image'}) 

    const { data } = supabase.storage.from('image').getPublicUrl(uploadedFile.path)

    try {
        const response = await prisma.foto.create({
            data: {
                JudulFoto,
                DeskripsiFoto,
                LokasiFile: `${data.publicUrl}`,
                TanggalUnggah: new Date,
                AlbumID: parseInt(AlbumID),
                UserID : session?.user?.UserID,
            }
        })
        return NextResponse.json({response, data})
    } catch (error) {
        return NextResponse.json({msg: "Something went wrong.", error})
    }
}

export async function GET(req: Request) {
  try {
    const response = await prisma.foto.findMany();
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ msg: "Something went wrong.", error });
  }
}
