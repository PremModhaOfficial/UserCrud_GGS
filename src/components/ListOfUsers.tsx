import { useEffect, useState } from 'react'
import { api } from '../utils/api';
import { User } from '../utils/types';
import { useNavigate } from 'react-router';

export const ListOfUsers = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1)

    const [users, setUsers] = useState<object[] | User[]>([])
    const handleUserDelete = (id: number) => {
        setUsers(users.filter(user => user.id !== id));
    };
    useEffect(() => {
        api.get(`/users?page=${page}`).then(res => {
            console.log(res)
            setUsers(res.data.data)
            if (res.status === 200) setIsLoading(false)
        })

    }, [isLoading, page])



    return (
        <div>
            <button className='bg-black p-5 m-2 text-white' onClick={() => setPage(page + 1)}>{page} {isLoading ? "loading..." : ""}</button>
            <div className="bg-black text-white"></div>
            <div className="flex flex-row justify-between items-center">

                {
                    users.map((usr) => <UserCard {...usr} key={usr.id} onDelete={handleUserDelete} />)
                }
            </div>
        </div>
    )

}


const UserCard = ({ id, avatar, email, first_name, last_name, onDelete }: User & { onDelete: (id: number) => void }) => {

    const navigate = useNavigate()
    const handleDelete = () => {
        api.delete(`/api/users/${id}`).then(() => {
            alert('User deleted successfully');
            onDelete(id);
        }).catch(() => {
            alert('Failed to delete user');
        });
    };


    const redirectToEditPage = () => {
        navigate(`${id}`)
    };

    return (
        <span>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4 min-w-1 transition-all">
                <img className="m-auto w-48 h-48 object-cover" src={avatar} alt={`${first_name} ${last_name}`} />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2" > {first_name} </div>
                    <div className="font-bold text-xl mb-2" > {last_name} </div >
                    <div className="text-gray-700 text-base" > {email} </div>
                    <div className='flex justify-center items-center'>
                        <button onClick={redirectToEditPage} className="bg-yellow-500 text-white p-2 mt-2 transition-all rounded-lg w-full">
                            Edit
                        </button>
                        <button onClick={handleDelete} className="bg-red-500 text-white p-2 mt-2 transition-all rounded-lg w-full">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </span>
    )
}
