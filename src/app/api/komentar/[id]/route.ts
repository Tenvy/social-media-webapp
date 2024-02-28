import { authOptions } from "@/lib/AuthOptions";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
  const id = context.params.id;
  try {
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json({ msg: "Invalid ID provided." });
    }

    if (id) {
      const response = await prisma.komentarfoto.findMany({
        where: {
          KomentarID: parsedId,
        },
        include: {
          user: true,
        },
      });
      return NextResponse.json(response);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ msg: "Something went wrong.", error });
  }
}

export async function POST(req: Request, context: { params: { id: string } }) {
  const session: any = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ msg: "Kamu belum login" });
  const id = context.params.id;
  const { IsiKomentar } = await req.json();

  try {
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json({ msg: "Invalid ID provided." });
    }

    if (id) {
      const response = await prisma.komentarfoto.create({
        data: {
            FotoID: parsedId,
            UserID: session?.user?.UserID,
            IsiKomentar,
            TanggalKomentar: new Date,
        }
      });
      return NextResponse.json(response);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ msg: "Something went wrong.", error });
  }
}
