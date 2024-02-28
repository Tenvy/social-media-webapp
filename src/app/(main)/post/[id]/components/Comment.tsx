'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { postKomentar } from '@/services/komentar'
import { postLike } from '@/services/postlike'
import { komentarfoto } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BiSolidHeart, BiHeart } from 'react-icons/bi'

interface komentar {
  IsiKomentar: string;
}

const Comment = ({FotoID, like, yourlike}:any) => {
    const router = useRouter();
    const [values, setValues] = useState<komentar>({
      IsiKomentar: ''
    })
    const [loading, setLoading] = useState<boolean>(false)
    const { toast } = useToast()
    

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    };

    const clickLikeFunction = async () => {
        await postLike(FotoID)
        router.refresh();
      };

    const postComment = async () => {
      if(!values.IsiKomentar) return toast({title: 'Empty Comment', description: 'Your Comment is empty.'})
      try {
        setLoading(true)
        await postKomentar(FotoID, values)
      } catch (error) {
        toast({title: 'Comment Error', description: `${error}`})
      } finally {
        setLoading(false)
        router.refresh()
        setValues({IsiKomentar: ''})
      }
    }

  return (
    <div className="border-t h-full flex flex-col justify-between">
          <div className="ml-2 my-2">
            <div onClick={clickLikeFunction} className='cursor-pointer'>
                {yourlike.yourLike ? <BiSolidHeart color="red" size={30}/> : <BiHeart size={30} color='white'/>}
            </div>
            <div className="ml-1">{like?.length} likes</div>
          </div>
          <div className="p-2 flex gap-2 items-center">
            <Input value={values.IsiKomentar} name='IsiKomentar' onChange={onChangeInput} placeholder="Comment here..."/>
            <Button disabled={loading} onClick={postComment} className="px-2 cursor-pointer text-blue-500 bg-primary-foreground">
              Post
            </Button>
          </div>
        </div>
  )
}

export default Comment
