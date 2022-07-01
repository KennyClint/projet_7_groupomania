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
        async function fetchData() {
            try {
                const response = await fetch(url,
                {
                    headers : {
                    "Authorization" : `Bearer ${token}`
                }
                })
                const data = await response.json()
                setData(data)
            } catch (err) {
                setError(true)
            } finally {
                setLoading(false)
            }
          };
          fetchData(url, token);
    }, [url])

    return { isLoading, data, error };
};

export function useFetchPut(url, jsonObject)
{
    const [data, setData] = useState({});
    //const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    fetch(url, 
        {
            method : "PUT",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(jsonObject)
        })
        .then(function(res)
        {
            if(res.ok) 
            {
                return res.json();
            }
        })
        .then(function(data)
        {
            setData(data)
        })
        .catch(function(err)
        {
            setError(err)    
        });
    return { data, error };
};

export function useFetchDelete(url)
{
    const [data, setData] = useState({});
    //const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    fetch(url,
        {
            method : "DELETE"
        })
        .then(function(res)
        {
            if(res.ok)
            {
                return res.json();
            }
        })
        .then(function(data)
        {
            setData(data)
        })
        .catch(function(err)
        {
            setError(err)
        });
        return { data, error };
};