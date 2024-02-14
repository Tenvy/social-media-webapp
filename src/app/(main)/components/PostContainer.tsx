import { Skeleton } from '@/components/ui/skeleton'
import { getFoto } from '@/services/foto'
import { fotoType } from '@/type/foto'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PostContainer = async () => {
    const data = await getFoto()

    return (
        <div className='grid grid-cols-3 gap-1'>
            {data ? (data.map((res: fotoType, key: number) => (
                <Link key={key} href={`/post/${res.FotoID}`}>
                    <div className='w-full aspect-square hover:opacity-90'>
                        <Image src={res.LokasiFile} alt={res.JudulFoto} width={400} height={400} className='w-full h-full object-cover' />
                    </div>
                </Link>
            ))) : (
                <Skeleton className="w-[400px] h-[400px] rounded-full" />
            )}
            {/* {data.map((res: fotoType, key: number) => (
                <Link key={key} href={`/post/${res.FotoID}`}>
                    <div className='w-full aspect-w-1 aspect-square hover:opacity-90'>
                        <Image src={res.LokasiFile} alt={res.JudulFoto} width={400} height={400} className='w-full h-full object-cover' />
                    </div>
                </Link>
            ))} */}
        </div>
    )
}

export default PostContainer
