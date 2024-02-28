import { albumType } from "@/type/album"

const CreateAlbum = async (data: albumType) => {
    const response = await fetch(`/api/album`, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify(data),
    })
    return response.json()
}

const GetAlbum = async () => {
    const response = await fetch(`/api/album`, {
        method: 'GET',
        cache: 'no-store',
    })
    return response.json()
}

const GetAlbumById = async (id: string) => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/album/${id}`, {
        method: 'GET',
        cache: 'no-store',
    })
    return response.json()
}

export { CreateAlbum, GetAlbum, GetAlbumById }