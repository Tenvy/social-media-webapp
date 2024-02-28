import { fotoType } from '@/type/foto'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Post = ({ AlbumID, DeskripsiFoto, FotoID, JudulFoto, LokasiFile, TanggalUnggah, UserID, user }: fotoType) => {
    return (
        <>
            <Link href={`/post/${FotoID}`}>
                <div className='w-full aspect-square hover:opacity-90'>
                    <Image src={LokasiFile} alt={JudulFoto} width={400} height={400} className={`w-full h-full object-cover`}/>
                </div>
            </Link>
        </>
    )
}

export default Post
