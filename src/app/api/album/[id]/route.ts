import { authOptions } from "@/lib/AuthOptions";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
    const id = context.params.id
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json({ msg: "Invalid ID provided." });
    }
    try {
        const response = await prisma.album.findUnique({
          where: {
            AlbumID: parsedId
          },
          include: {
            foto: true
          }
        });
        return NextResponse.json(response);
    } catch (error) {
      console.error("Error fetching data:", error);
      return NextResponse.json({ msg: "Something went wrong.", error });
    }
  }
  