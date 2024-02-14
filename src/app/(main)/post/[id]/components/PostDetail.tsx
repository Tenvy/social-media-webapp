import React from 'react'
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { fotoType } from '@/type/foto';
import Image from 'next/image';

const PostDetail = async ({
  FotoID,
  JudulFoto,
  DeskripsiFoto,
  LokasiFile,
  AlbumID,
  TanggalUnggah,
  UserID,
  user
}: fotoType) => {
  return (
    <div className='grid grid-cols-2 h-full border rounded-md'>
      <div className='h-[1000px] w-[600px] m-auto'>
        <Image src={LokasiFile} alt={JudulFoto} width={500} height={500} className='w-full h-auto block'/>
      </div>
      <div className='w-full border-l'>
        <div className='border-b flex w-full'>
          <div className='pl-4 py-4 font-semibold w-[90%]'>
            <Link href={`/${user?.Username}`}>
              {user?.Username}
            </Link>
          </div>
          <div className='flex mx-auto'>
            <DropdownMenu>
              <DropdownMenuTrigger><BiDotsHorizontalRounded size={24} /></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div>

        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default PostDetail
