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
  const formData = await request.formData()
  const JudulFoto = formData.get('JudulFoto') as string
  const DeskripsiFoto = formData.get('DeskripsiFoto') as string
  const AlbumID = formData.get('AlbumID') as string
  const image = formData.get('image') as unknown as File

  const uuid = uuidv4()

  //   if (!image) {
  //       return NextResponse.json({success: false})
  //   }
  
  let uniqueImageName = image.name;

  const { data: existingFile } = await supabase.storage.from('image').upload(`${session?.user?.Username}/${uuid}`, image, {
      cacheControl: '3600',
      upsert: false
    })
  
  console.log({existingFile})
  return NextResponse.json({existingFile})

  // if (existingFile) {
  //   let count = 1;
  
  //   const extension = image.name.split('.').pop();
    
  //   while (existingFile) {
  //     uniqueImageName = `${image.name.split('.')[0]}_${count}.${extension}`;
  //     const { data: checkFile } = await supabase.storage.from('image').getPublicUrl(`${session?.user?.Username}/${uniqueImageName}`);
      
  //     if (!checkFile) {
  //       break;
  //     }
  
  //     count += 1;
  //   }
  // }
  
  // const { data, error } = await supabase.storage.from('image').upload(`${session?.user?.Username}/${uniqueImageName}`, image, {
  //   cacheControl: '3600',
  //   upsert: false
  // });

  // console.log({data, error})
  // return NextResponse.json({data, error})
  // const path = `${rootDir}/public/${session?.user?.Username}/${uniqueImageName}`;
  // await writeFile(path, buffer)



    try {
        // const response = await prisma.foto.create({
        //     data: {
        //         JudulFoto,
        //         DeskripsiFoto,
        //         LokasiFile: `/${session?.user?.Username}/${image.name}`,
        //         TanggalUnggah: new Date,
        //         AlbumID: parseInt(AlbumID),
        //         UserID : session?.user?.UserID,
        //     }
        // })
        // return NextResponse.json({response, data})
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
