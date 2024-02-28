import { user } from "@prisma/client";
import { likeType } from "./like";
import { userType } from "./user";

interface komentarfoto {
    KomentarID: number;
    FotoID: number;
    UserID: number;
    IsiKomentar: string;
    TanggalKomentar: Date;
    user: user;
}

export type fotoType = {
    FotoID: number;
    JudulFoto: string;
    DeskripsiFoto: string;
    TanggalUnggah: Date;
    LokasiFile: string;
    AlbumID: number
    UserID: number;
    user?: userType;
    likefoto?: likeType;
    komentarfoto?: komentarfoto[];
}