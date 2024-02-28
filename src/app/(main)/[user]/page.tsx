import { Button } from "@/components/ui/button";
import { getUser } from "@/services/user";
import { userType } from "@/type/user";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { user: string } }) => {
  const data: userType = await getUser(params.user);
  console.log(data);

  return (
    <div className="p-6 container">
      <div className="border-b">
        <div className="mx-auto w-1/2 p-2">
          <div className="text-xl font-bold">{data.NamaLengkap}</div>
          <div className="text-sm text-zinc-600">@{data.Username}</div>
          <div></div>
          <div className="flex gap-4 mt-4">
            <div>{data.album.length} Album</div>
            <div>{data.foto.length} Photo</div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="text-xl font-semibold mb-2">Album List</div>
        <div className="grid grid-cols-3 gap-4">
          {data.album.map((data, index) => (
            <Link href={`/album/${data.AlbumID}`}>
              <Button
                variant={"secondary"}
                className="bg-transparent border border-white w-full"
              >
                {data.NamaAlbum}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
