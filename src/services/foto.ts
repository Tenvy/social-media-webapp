
const createFoto = async (state: any, image: any) => {
    const { JudulFoto, DeskripsiFoto, AlbumID } = state;
  
    const formData = new FormData()
    formData.append('JudulFoto', JudulFoto);
    formData.append('DeskripsiFoto', DeskripsiFoto);
    formData.append('AlbumID', AlbumID);
    formData.set('image', image);
    
  
    try {
      const response = await fetch(`/api/foto`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error(await response.text())
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error()
    }
  };

const getFoto = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/foto`, {method: 'GET', cache: 'no-store'})
  return response.json()
}

const getFotoById = async (id: number) => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/foto/${id}`, {method: 'GET', cache: 'no-store'})
  return response.json()
}

export { createFoto, getFoto, getFotoById }