import { album, foto } from "@prisma/client";

export type userType = {
    Username: string;
    Password: string;
    Email: string;
    NamaLengkap: string;
    Alamat: string;
    album?: album[];
    foto?: foto[];
}