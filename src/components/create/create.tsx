'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import CreateAlbum from './components/CreateAlbum'
import CreatePost from './components/CreatePost'

const Create = () => {
    const [showAlbum, setShowAlbum] = useState<boolean>(false)
    const [showPost, setShowPost] = useState<boolean>(false)
    const [hide, setHide] = useState<boolean>(false)

    const showComponent = (args: string) => {
        switch (args) {
            case 'album':
                setShowAlbum(true);
                break;
            case 'post':
                setShowPost(true);
                break;
            default:
                break;
        }
        setHide(true);
    }

    return (
        <>
            <div className={`grid-cols-2 gap-4 py-4 ${hide ? 'hidden' : 'grid'}`}>
                <Button onClick={() => showComponent('album')}>Create Album</Button>
                <Button onClick={() => showComponent('post')}>Create Post</Button>
            </div>
            {showAlbum && (
                <CreateAlbum/>
            )}
            {showPost && (
                <CreatePost/>
            )}
        </>
    )
}

export default Create
