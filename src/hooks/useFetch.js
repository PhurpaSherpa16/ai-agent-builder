import { useCallback, useEffect, useState } from "react"
import { getData } from "../api/fetch"

export const useFetch = ()=>{
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = useCallback(async () =>{
        setLoading(true)
        setError(null)
        try{
            const response = await getData()
            setData(response)
        }catch(error){
            console.error('Error fetching data:', error)
            setError(error.message || 'Failed to fetch data')
        }finally{
            setLoading(false)
        }
    },[])

    useEffect(()=>{
        fetchData()
    },[fetchData])

    return {data, loading, error, fetchData}
}