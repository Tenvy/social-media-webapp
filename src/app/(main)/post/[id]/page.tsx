import React from 'react'
import PostDetail from './components/PostDetail'
import { getFotoById } from '@/services/foto'

const page = async ({ params }: { params: { id: number } }) => {
  const data = await getFotoById(params.id)
  console.log(data)
  return (
    <div className='lg:w-[120vh] mx-auto py-10 px-2 h-[100vh]'>
      <PostDetail {...data}/>
    </div>
  )
}

export default page
