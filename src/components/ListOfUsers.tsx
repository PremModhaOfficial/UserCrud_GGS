import React, { useEffect, useState } from 'react'
import { api } from '../utils/api';
import { User } from '../utils/types';

export const ListOfUsers = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1)

    const [users, setUsers] = useState<object[] | User[]>([])
    useEffect(() => {
        api.get(`/users?page=${page}`).then(res => {
            console.log(res)
            setUsers(res.data.data)
            if (res.status === 200) setIsLoading(false)
        })

    }, [page])


    return (
        <div>
            <button className='bg-black p-5 m-2 text-white' onClick={() => setPage(page + 1)}>{page} {isLoading ? "loading..." : ""}</button>
            <div className="bg-black text-white"></div>
            {
                users.map((usr) => <UserCard {...usr} />)
            }
        </div>
    )

}


const UserCard = ({ id, avatar, email, first_name, last_name }: User) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
            <img className="w-full h-48 object-cover" src={avatar} alt={`${first_name} ${last_name}`} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{first_name} {last_name}</div>
                <p className="text-gray-700 text-base">{email}</p>
            </div>
        </div>
    )
}
