import { useEffect, useState } from 'react'
import { api } from '../utils/api';
import { User } from '../utils/types';
import { useNavigate } from 'react-router';

export const ListOfUsers = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1)

    const [users, setUsers] = useState<object[]>([])
    const handleUserDelete = async (id: number) => {
        const response = await api.delete(`/user/${id}`)
        // console.log(response, "ddd")
        alert(response.status === 200 || response.status === 204 ? ("User deleted") : (`Something Went Wrong code ${response.status}`))
    };
    useEffect(() => {
        const getUsers = async () => {
            const responce = await api.get(`/users?page=${page}`, {
            })
            console.log(responce)
            setUsers(responce.data.data)
            if (responce.status === 200) setIsLoading(false)

        }
        getUsers()


    }, [page])



    return (
        <div>
            <div className="flex justify-center items-center">

                <div className="text-3xl my-2 font-bold shadow-2xl shadow-black rounded-lg px-5">Users</div>
            </div>
            <div className="bg-black text-white"></div>
            <div className="flex flex-row justify-between items-center">

                {
                    users.map((usr) => <UserCard {...usr} key={usr.id} onDelete={handleUserDelete} />)
                }
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-center shadow-md">
                {
                    Array.from({ length: 5 }, (_, index) => (
                        <button
                            key={index}
                            className={`p-2 m-1 ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-full transition-colors duration-300`}
                            onClick={() => setPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))
                }
            </div>
        </div>
    )

}


const UserCard = ({ id, avatar, email, first_name, last_name, onDelete }: User & { onDelete: (id: number) => void }) => {

    const navigate = useNavigate()
    const handleDelete = () => {
        api.delete(`/api/users/${id}`).then(() => {
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
                    <div className="flex flex-col justify-center items-center" >
                        <button onClick={redirectToEditPage} className="outline-1 outline-black bg-green-500   p-2 transition-all rounded-lg w-full text-black m-2">
                            Edit
                        </button>
                        <button onClick={handleDelete} className="outline-1 outline-black bg-red-500  text-black p-2 mt-2 transition-all rounded-lg w-full m-2">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </span >
    )
}
