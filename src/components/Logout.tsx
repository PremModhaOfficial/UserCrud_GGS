import { useNavigate } from 'react-router'
import { ACCSESS_TOKEN } from '../env'
import { useEffect } from 'react'

export const Logout = () => {
    localStorage.removeItem(ACCSESS_TOKEN)

    const navigate = useNavigate()
    useEffect(() => {
        navigate("/login")
    }, [])

}

