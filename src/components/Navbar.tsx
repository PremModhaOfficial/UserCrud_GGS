import React from 'react'
import { useNavigate } from 'react-router'

export const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className='flex justify-between items-center bg-blue-600 mb-3'>
            <div className="lowercase text-3xl text-white font-bold p-2">Employees</div>
            <div className="lowercase text-3xl text-white flex p-2">
                <button className="ml-2 " onClick={() => navigate("/logout")}>
                    Logout
                </button>
            </div>
        </div >
    )
}

