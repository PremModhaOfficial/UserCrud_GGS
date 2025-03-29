; import { useEffect, useState } from 'react'
import { api } from '../utils/api';
import { useNavigate, useParams } from 'react-router';

function UserDetails() {
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams()

    const [first_name, set_first_name] = useState()
    const [last_name, set_last_name] = useState()
    const [email, setEmail] = useState()
    const [avatar, setAvatar] = useState("")

    const navigate = useNavigate()
    useEffect(() => {
        api.get(`/users/${id}`).then(res => {
            const user = res.data.data
            console.log(user)
            if (res.status === 200) {
                setIsLoading(false)
                set_first_name(user?.first_name)
                set_last_name(user?.last_name)
                setEmail(user?.email)
                setAvatar(user?.avatar)
            }

        })

    }, [])

    const handelSave = async () => {
        const response = await api.patch(`/user/${id}`, { first_name, last_name, email, })
        alert(response.status === 200 ? "Saved User Data Successfully" : `Something went wrong (${response.status})`)
        if (response.status === 200) navigate(-1)
    }


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
        <>
            <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4">User Details</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar"> Avatar </label>
                        <img
                            className="w-32 h-32 rounded-full mx-auto"
                            src={avatar}
                            alt="User Avatar"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
                            First Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="first_name"
                            type="text"
                            value={first_name}
                            onChange={e => set_first_name(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
                            Last Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="last_name"
                            type="text"
                            value={last_name}
                            onChange={e => set_last_name(e.target.value)}
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
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div
                        className="shadow appearance-none border rounded w-full py-2 px-3   focus:outline-none focus:shadow-outline flex justify-center items-center bg-green-500"
                        onClick={() => handelSave()} >Save</div>
                </form >
            </div >
        </>
    )
}

export default UserDetails
