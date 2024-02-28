interface komentar {
    IsiKomentar: string;
  }

const getKomentar = async (id: string) => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/komentar/${id}`, {method: 'GET', cache: 'no-store'})
    return response.json()
}

const postKomentar = async (id: string, data:komentar) => {
    const response = await fetch(`/api/komentar/${id}`, {method: 'POST', cache: 'no-store', body: JSON.stringify(data)})
    return response.json()
}

export { getKomentar, postKomentar }