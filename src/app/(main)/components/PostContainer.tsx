import { Skeleton } from '@/components/ui/skeleton'
import { getFoto } from '@/services/foto'
import { fotoType } from '@/type/foto'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Post from './Post'

const PostContainer = async () => {
    const data = await getFoto()
    console.log(data)
    return (
        <div className='grid grid-cols-3 gap-1'>
            {data.map((res: fotoType, key: number) => (
                    <Post {...res} key={key} />
            ))}
        </div>
    )
}

export default PostContainer
