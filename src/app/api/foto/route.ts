import { authOptions } from "@/lib/AuthOptions";
import prisma from "@/utils/db"
import { existsSync , mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const session: any = await getServerSession(authOptions);  
  if (!session) return NextResponse.json({msg: 'Kamu belum login'})
  const formData = await request.formData()
  const JudulFoto = formData.get('JudulFoto') as string
  const DeskripsiFoto = formData.get('DeskripsiFoto') as string
  const AlbumID = formData.get('AlbumID') as string
  const image = formData.get('image') as unknown as File

    if (!image) {
        return NextResponse.json({success: false})
    }


  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const rootDir = process.cwd();
  const imageName = image.name;

  const folderName = `${rootDir}/public/${session?.user?.Username}`;
  if (!existsSync(folderName)) {
    mkdirSync(folderName);
  }

  let count = 1;
  let uniqueImageName = imageName;
  while (existsSync(`${rootDir}/public/${session?.user?.Username}/${uniqueImageName}`)) {
    const extension = imageName.split('.').pop();
    uniqueImageName = `${imageName.split('.')[0]}_${count}.${extension}`;
    count += 1;
  }

  const path = `${rootDir}/public/${session?.user?.Username}/${uniqueImageName}`;
  await writeFile(path, buffer)

    try {
        const response = await prisma.foto.create({
            data: {
                JudulFoto,
                DeskripsiFoto,
                LokasiFile: `/${session?.user?.Username}/${uniqueImageName}`,
                TanggalUnggah: new Date,
                AlbumID: parseInt(AlbumID),
                UserID : session?.user?.UserID,
            }
        })
        return NextResponse.json(response)
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
