import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Navigate } from 'react-router-dom';
import { ACCSESS_TOKEN } from '../env';
import { useNavigate } from 'react-router';
import { Navbar } from './Navbar';

const AuthRoute = () => {
    const [isAutherized, setIsAutherized] = useState<boolean | null>(null)
    const navigate = useNavigate()

    const auth = async () => {
        const token = localStorage.getItem(ACCSESS_TOKEN)
        if (!token) {
            setIsAutherized(false)
            navigate(-1)
        } else {
            setIsAutherized(true)
        }
    }

    useEffect(() => {
        auth()
        console.log(isAutherized)
    }, [])
    if (isAutherized === null) return <div className='text-9xl font-extrabold animate-pulse'>Loading</div>
    if (isAutherized) return (<> <Navbar /> <Outlet /> </>
    )
    else <Navigate to={"/login"} />
};

export default AuthRoute;

