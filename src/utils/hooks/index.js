import { useState, useEffect } from 'react'

/*Fonction : Récupérer et formater les données stringifiées provenant du localStorage*/
function getUserIdToken()
{
  const userIdTokenStringify = localStorage.getItem("userIdToken");
  const userIdToken = JSON.parse(userIdTokenStringify);
 
  return userIdToken;
};

export function useFetchGet(url)
{
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const userIdToken = getUserIdToken();
        const token = userIdToken.token;
        const localUserId = userIdToken.userId
        async function fetchData(url, token) {
            try {
                const response = await fetch(url,
                {
                    headers : {
                        "Authorization" : `Bearer ${token} ${localUserId}`
                    }
                })
                const data = await response.json()
                setData(data)
            } catch (err) {
                console.log(err)
                setError(true)
            } finally {
                setLoading(false)
            }
          };
          fetchData(url, token);
    }, [url])

    return { isLoading, data, error };
};