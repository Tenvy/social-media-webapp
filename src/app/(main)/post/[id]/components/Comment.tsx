'use client'
import { Input } from '@/components/ui/input'
import { postLike } from '@/services/postlike'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BiSolidHeart, BiHeart } from 'react-icons/bi'

const Comment = ({FotoID, like, yourlike}:any) => {
    console.log(FotoID, like, yourlike)
    const router = useRouter();

    const clickLikeFunction = async () => {
        await postLike(FotoID)
        router.refresh();
      };

  return (
    <div className="border-t h-full flex flex-col justify-between">
          <div className="ml-2 my-2">
            <div onClick={clickLikeFunction} className='cursor-pointer'>
                {yourlike.yourLike ? <BiSolidHeart color="red" size={30}/> : <BiHeart size={30} color='white'/>}
            </div>
            <div className="ml-1">{like?.length} likes</div>
          </div>
          <div className="p-2 flex gap-2 items-center">
            <Input placeholder="Comment here..."/>
            <div className="px-2 cursor-pointer text-blue-500">
              Post
            </div>
          </div>
        </div>
  )
}

export default Comment
