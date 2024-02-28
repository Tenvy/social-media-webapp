const getUser = async (username: string) => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${username}`, {method: 'GET', cache: 'no-store'})
    return response.json()
}

export { getUser }