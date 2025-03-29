import { ListOfUsers } from './components/ListOfUsers';
import UserDetails from './components/UserDetails';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import AuthRoute from './components/AuthRoute';
import { Login } from './components/Login';
import { Logout } from './components/Logout';
import { Register } from './components/Register';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route element={<AuthRoute />} >
                        <Route path='/users' element={<ListOfUsers />} />
                        <Route path='/users/:id' element={<UserDetails />} />
                    </Route>


                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App

