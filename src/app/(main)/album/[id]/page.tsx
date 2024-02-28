import { fotoType } from "@/type/foto";
import React from "react";
import { GetAlbumById } from "@/services/album";
import Post from "./Post";

const PostContainer = async ({ params }: { params: { id: string } }) => {
  const data = await GetAlbumById(params.id);
  return (
    <div className="lg:w-[110vh] mx-auto py-10">
      <div className="my-2">
        <div className="text-xl font-semibold">{data.NamaAlbum}</div>
        <div className="text-zinc-500">{data.Deskripsi}</div>
      </div>
      <div className="grid grid-cols-3 gap-1 border-t pt-4">
        {data.foto.map((res: fotoType, key: number) => (
          <Post {...res} key={key} />
        ))}
      </div>
    </div>
  );
};

export default PostContainer;
