; import React, { useEffect, useState } from 'react'
import { api } from '../utils/api';
import { User } from '../utils/types';
import { useParams } from 'react-router';

function UserDetails() {
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams()

    const [user, setUsers] = useState<object | null>(null)

    useEffect(() => {
        api.get(`/users/${id}`).then(res => {
            console.log(res)
            setUsers(res.data.data)
            if (res.status === 200) setIsLoading(false)
        })

    }, [id])



    if (isLoading) {
        return (
            <>
                <div className="animate-pulse flex items-center justify-between m-auto">
                    <div className="text-3xl">
                        Loading
                    </div>
                </div>
            </>
        )
    }
    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
                        First Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="first_name"
                        type="text"
                        value={user?.first_name || ''}
                        onChange={e => ()}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        value={user?.email || ''}
                        onChange={e => ()}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
                        Avatar
                    </label>
                    <img
                        className="w-32 h-32 rounded-full mx-auto"
                        src={user?.avatar || ''}
                        alt="User Avatar"
                    />
                </div>
            </form>
        </div>
    )
}

export default UserDetails
