import axios, { AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react'

const api = axios.create({
    baseURL: 'https://api.github.com/users'
})

export function useFetch<T = unknown>(username: string, options?: AxiosRequestConfig) {
    const [data, setData] = useState<T | null>(null)

    useEffect(() => {
        api.get(username, options)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    return { data }
}