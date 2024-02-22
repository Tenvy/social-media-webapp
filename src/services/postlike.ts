const postLike = async (id: string) => {
    const toInteger = parseInt(id)
      const createData = await fetch(
        `/api/foto/like/${toInteger}`,
        {
          method: "POST",
        }
      );
      return createData.json();
    };

export { postLike }