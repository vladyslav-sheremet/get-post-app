import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IUser } from "../models"

export const useFetchData = (): [IUser[], string, boolean, (user: {success: boolean, user_id: number, message: string}) =>void, () => void] => {
    const [data, setData] = useState<IUser[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

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
    console.log('data' ,data)

    const addUser = (user: {success: boolean, user_id: number, message: string}) => {
        // console.log('data', data)
        // setData(prev => [...prev, user])
        if(user.success) {
            fetchData()
        } 
    }

    const changePage = () => {
        setPage(prev => ++prev)
    }

    
    
    useEffect(() => {
        fetchData()
    }, [page])

    return [data, error, loading, addUser, changePage]
}