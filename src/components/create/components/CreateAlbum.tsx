'use client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { albumType } from '@/type/album'
import { CreateAlbum } from '@/services/album'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

const CreateAlbumPage = () => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [values, setValues] = useState<albumType>({
        NamaAlbum: 'hey',
        Deskripsi: 'hey',
        UserID: 0,
    });

    const { toast } = useToast()

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      };
    
    const CreateAlbumFunc = async () => {
        try {
            setLoading(true)
            await CreateAlbum(values)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            router.refresh()
            toast({title: 'Data Created', description: 'Album Created Successfully!'})
        }
    }

    return (
        <>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="album" className="text-right">
                        Album Name
                    </Label>
                    <Input onChange={onChangeInput} id="album" placeholder="Album Name" name='NamaAlbum' className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                        Description
                    </Label>
                    <Input onChange={onChangeInput} id="description" placeholder="Description" name='Deskripsi' className="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                
                <Button onClick={CreateAlbumFunc} disabled={loading} >Create Album</Button>
            </DialogFooter>
        </>
    )
}

export default CreateAlbumPage
