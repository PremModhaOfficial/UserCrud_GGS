import { useState } from "react";
import { Navigate } from "react-router";
import { ACCSESS_TOKEN } from "../env";
import { api } from "../utils/api";

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisterd, setIsRegisterd] = useState(false);

    const handleregister = async () => {
        const responce = await api.post("/register", { email, password })
        try {
            const token = responce.data.token
            const register_id = responce.data.id
            localStorage.setItem(ACCSESS_TOKEN, token)
            alert(`new user created userid: ${register_id}`)

            // console.log(token)
            setIsRegisterd(true)
        } catch (err) {
            console.error(err)
        }
    };
    if (isRegisterd) {
        return (
            <Navigate to={"/login"} />
        )
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 outline-1 outline-black my-20">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleregister(); }}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                >
                    register
                </button>
            </form>
        </div>
    );
}
