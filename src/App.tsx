import AuthUser from './components/AuthUser';
import { ListOfUsers } from './components/ListOfUsers';
import UserDetails from './components/UserDetails';
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<AuthUser />} />
                    <Route path='/users/' element={<ListOfUsers />} />
                    <Route path='/users/:id' element={<UserDetails />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
