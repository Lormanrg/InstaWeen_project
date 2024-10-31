

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getPost = async ()=>
{

    const response = await fetch(`${API_BASE_URL}/auth/posts`)


    if(!response.ok){
        throw new Error('Failed to fetch auth')
    }
    
    const data = await response.json()

    console.log(data)
    
    return data


}
