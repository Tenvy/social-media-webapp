import React from "react";
import Link from "next/link";
import { fotoType } from "@/type/foto";
import Image from "next/image";
import Comment from "./Comment";
import { getLike } from "@/services/like";
import { hitungSelisihWaktu } from "@/lib/timeHelper";

const PostDetail = async ({
  FotoID,
  JudulFoto,
  DeskripsiFoto,
  LokasiFile,
  AlbumID,
  TanggalUnggah,
  UserID,
  user,
  likefoto,
  komentarfoto,
}: fotoType) => {
  const yourLike = await getLike(FotoID);

  return (
    <div className="grid grid-cols-2 h-full border rounded-md">
      <div className="m-auto relative w-full h-full">
        <Image
          src={LokasiFile}
          alt={JudulFoto}
          layout="fill"
          className="h-[80%] object-contain"
        />
      </div>
      <div className="w-full h-full border-l flex flex-col justify-between">
        <div>
          <div className="border-b flex w-full">
            <div className="pl-4 py-4 font-semibold w-[90%]">
              <Link href={`/${user?.Username}`}>{user?.Username}</Link>
            </div>
          </div>
          <div className="overflow-y-scroll scrollbar-hide h-[60vh]">
            <div className="px-4 my-2">
              <div>
                <span className="font-semibold">{user?.Username}&nbsp;</span>
                {DeskripsiFoto}
              </div>
              <div className="text-sm text-zinc-600">{hitungSelisihWaktu(new Date(TanggalUnggah))}</div>
            </div>
            {komentarfoto && komentarfoto.map((data, index) => (
              <div key={index} className="px-4 my-2">
                <div>
                  <span className="font-semibold">{data.user.Username}&nbsp;</span>
                  {data.IsiKomentar}
                </div>
                <div className="text-sm text-zinc-600">{hitungSelisihWaktu(new Date(data.TanggalKomentar))}</div>
              </div>
            ))}
          </div>
        </div>
        <Comment FotoID={FotoID} like={likefoto} yourlike={yourLike} />
      </div>
    </div>
  );
};

export default PostDetail;
