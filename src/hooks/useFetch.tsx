import axios, { AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react'

const api = axios.create({
    baseURL: 'https://api.github.com/users'
})

export function useFetch<T = unknown>(username: string, options?: AxiosRequestConfig) {
    const [data, setData] = useState<T | null>(null)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        api.get(username, options)
            .then(res => setData(res.data))
            .catch(err => setError(true))
            .finally(() => setIsFetching(false))
    }, [])

    return { data, isFetching, error }
}