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
      <div className='m-auto relative w-full h-full'>
        <Image src={LokasiFile} alt={JudulFoto} layout='fill' className='h-[80%] object-contain'/>
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
        <div className='overflow-y-scroll scrollbar-hide h-[60vh]'>
          <div className='px-4 my-2'>
            <div><span className='font-semibold'>tenvy&nbsp;</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ipsum libero nulla nemo, similique commodi omnis. Labore, impedit similique vel earum voluptatum culpa eveniet rem? Possimus, unde adipisci. Ducimus, impedit?</div>
            <div className='text-sm text-zinc-600'>2m</div>
          </div>
          <div className='px-4 my-2'>
            <div><span className='font-semibold'>kepinkun&nbsp;</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ipsum libero nulla nemo</div>
            <div className='text-sm text-zinc-600'>2m</div>
          </div>
          <div className='px-4 my-2'>
            <div><span className='font-semibold'>tenvy&nbsp;</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ipsum libero nulla nemo, similique commodi omnis. Labore, impedit similique vel earum voluptatum culpa eveniet rem? Possimus, unde adipisci. Ducimus, impedit?</div>
            <div className='text-sm text-zinc-600'>2m</div>
          </div>
          <div className='px-4 my-2'>
            <div><span className='font-semibold'>tenvy&nbsp;</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ipsum libero nulla nemo, similique commodi omnis. Labore, impedit similique vel earum voluptatum culpa eveniet rem? Possimus, unde adipisci. Ducimus, impedit?</div>
            <div className='text-sm text-zinc-600'>2m</div>
          </div>
          <div className='px-4 my-2'>
            <div><span className='font-semibold'>tenvy&nbsp;</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ipsum libero nulla nemo, similique commodi omnis. Labore, impedit similique vel earum voluptatum culpa eveniet rem? Possimus, unde adipisci. Ducimus, impedit?</div>
            <div className='text-sm text-zinc-600'>2m</div>
          </div>
          <div className='px-4 my-2'>
            <div><span className='font-semibold'>tenvy&nbsp;</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ipsum libero nulla nemo, similique commodi omnis. Labore, impedit similique vel earum voluptatum culpa eveniet rem? Possimus, unde adipisci. Ducimus, impedit?</div>
            <div className='text-sm text-zinc-600'>2m</div>
          </div>
        </div>
        <div className='border-t h-fit'>
          
        </div>
      </div>
    </div>
  )
}

export default PostDetail
