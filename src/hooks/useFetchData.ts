import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"

import { IUser } from "../models"

export const useFetchData = () => {
    const [data, setData] = useState<IUser[]>([])
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)

    const fetchData = async () => {
        try {
            setError('')
            setLoading(true)
            const response = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`)
            setData(response.data.users)
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }

    const addUser = (res: any) => {
        if(res.success) {
            fetchData()
        } 
    }

    const changePage = () => {
        setPage(prev => ++prev)
    }

    useEffect(() => {
        fetchData()
    }, [page])

    return {data, setData, error, loading, addUser, changePage}
}