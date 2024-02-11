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

export { CreateAlbum, GetAlbum }