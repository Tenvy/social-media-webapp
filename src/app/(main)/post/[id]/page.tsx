import React from 'react'
import PostDetail from './components/PostDetail'
import { getFotoById } from '@/services/foto'

const page = async ({ params }: { params: { id: number } }) => {
  const data = await getFotoById(params.id)
  return (
    <div className='lg:w-[120vh] mx-auto h-[100vh] py-10 px-2'>
      <PostDetail {...data}/>
    </div>
  )
}

export default page
