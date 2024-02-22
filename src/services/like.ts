import { headers } from "next/headers";

const getLike = async (id: number) => {
  const fetchData = await fetch(
    `${process.env.NEXTAUTH_URL}/api/foto/like/${id}`,
    {
        method: 'GET',
      cache: "no-store",
      headers: headers()
    }
  );
  return fetchData.json();
};


export { getLike };
