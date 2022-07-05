import { useState, useEffect } from 'react'

/*Fonction : Récupérer et formater les données stringifiées provenant du localStorage*/
function getUserIdToken()
{
  const userIdTokenStringify = localStorage.getItem("userIdToken");
  const userIdToken = JSON.parse(userIdTokenStringify);
 
  return userIdToken;
};

export function useFetchGet(url, newModification)
{
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const userIdToken = getUserIdToken();
        const token = userIdToken.token;
        const localUserId = userIdToken.userId
        
        fetch(url,
        {
            headers : {
                "Authorization" : `Bearer ${token} ${localUserId}`
            }
        })
        .then(function(res)
        {
            if(res.ok)
            {
                return res.json()
                .then(function(data)
                {
                    setData(data)
                })
            };
        })
        .catch(function(error)
        {
            setError(true)
        }).finally(function()
        {
            setLoading(false)
        })
    }, [url, newModification])

    return { isLoading, data, error };
};