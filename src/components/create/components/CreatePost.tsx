'use client'
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { createFoto } from '@/services/foto';
import { albumType } from '@/type/album';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { BiExpandVertical } from "react-icons/bi";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { GetAlbum } from '@/services/album';
import { fotoType } from '@/type/foto';
import Image from 'next/image';

const CreatePost = () => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [values, setValues] = useState<fotoType>({
        AlbumID: 0,
        JudulFoto: '',
        DeskripsiFoto: '',
        UserID: 0,
        LokasiFile: '',
        TanggalUnggah: new Date
    });
    const [image, setImage] = useState<File>()
    const [open, setOpen] = React.useState(false)
    const [album, setAlbum] = useState<albumType[]>([])

    const { toast } = useToast()

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
        }
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const CreatePostFunc = async () => {
        setLoading(true)
        try {
            await createFoto(values, image)
        } catch (error: any) {
            console.log(error)
            toast({ title: 'Upload Failed', description: error.response.data.msg })
        } finally {
            setLoading(false)
            router.refresh()
            toast({ title: 'Data Created', description: 'Image Uploaded Successfully!' })
        }
    }

    const getAlbum = async () => {
        try {
            const response = await GetAlbum()
            setAlbum(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAlbum()
    }, [open])

    return (
        <>
            <div className="grid gap-4 py-4">
                <div className='flex flex-col items-center gap-2'>
                    <Image src={image ? URL.createObjectURL(image) : ""} alt="Book Image" width={240} height={240} className="border border-dashed" />
                    <div className='flex justify-center'>
                        <input type="file" className='hidden' name='file-input' onChange={handleFileChange} id='file-input' />
                        <label htmlFor="file-input" className='py-2 px-4 bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-md cursor-pointer'>Select Image</label>
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="album" className="text-right">
                        Select Album
                    </Label>
                    <div className='col-span-3'>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between"
                                >
                                    {values.AlbumID !== 0
                                        ? album.find((framework) => framework.AlbumID === values.AlbumID)?.NamaAlbum
                                        : "Select Album..."}
                                    <BiExpandVertical />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Search Album..." />
                                    <CommandEmpty>No Album found.</CommandEmpty>
                                    <CommandGroup>
                                        {album.map((album) => (
                                            <CommandItem
                                                key={album.AlbumID}
                                                value={album.AlbumID.toString()}
                                                onSelect={(currentValue) => {
                                                    setValues(prevValues => ({ ...prevValues, AlbumID: parseInt(currentValue) }))
                                                    setOpen(false)
                                                }}
                                            >
                                                {album.NamaAlbum}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                        Title
                    </Label>
                    <Input onChange={onChangeInput} id="title" placeholder="Title" name='JudulFoto' className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                        Description
                    </Label>
                    <Input onChange={onChangeInput} id="description" placeholder="Description" name='DeskripsiFoto' className="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button onClick={CreatePostFunc} disabled={loading} >Create Post</Button>
            </DialogFooter>
        </>
    )
}

export default CreatePost
