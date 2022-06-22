import { useState, useEffect } from 'react'

export function useFetchGet(url)
{
    const [dataPostsList, setData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!url) return
        setLoading(true)
        async function fetchData() {
          try {
            const response = await fetch(url)
            const data = await response.json()
            setData(data)
          } catch (err) {
            console.log(err)
            setError(true)
          } finally {
            setLoading(false)
          }
        }
        fetchData()
      }, [url])
      return { isLoading, dataPostsList, error }
};

export function useFetchPost(url, jsonObject)
{
    const [data, setData] = useState({});
    //const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    fetch(url, 
        {
            method : "POST",
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