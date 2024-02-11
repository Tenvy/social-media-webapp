
const createFoto = async (state: any, image: any) => {
    const { JudulFoto, DeskripsiFoto, AlbumID } = state;
  
    const formData = new FormData()
    formData.append('JudulFoto', JudulFoto);
    formData.append('DeskripsiFoto', DeskripsiFoto);
    formData.append('AlbumID', AlbumID);
    formData.append('image', image);
    
  
    try {
      const response = await fetch(`/api/foto`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  };

export { createFoto }