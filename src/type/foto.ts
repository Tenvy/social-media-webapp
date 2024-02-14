import { userType } from "./user";

export type fotoType = {
    FotoID: number;
    JudulFoto: string;
    DeskripsiFoto: string;
    TanggalUnggah: Date;
    LokasiFile: string;
    AlbumID: number
    UserID: number;
    user?: userType;
}