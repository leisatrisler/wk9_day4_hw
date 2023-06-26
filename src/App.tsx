import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from "./components/Navigation";
import AlertMessage from './components/AlertMessage';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Container from 'react-bootstrap/Container'
import UserType from './types/auth';


export default function App() {

    const [isLoggedIn, setLoggedIn] = useState((localStorage.getItem('token')  //attempting to get local storage
    && new Date(localStorage.getItem('tokenExp') as string) > new Date()) || false)
    const [loggedInUser, setLoggedInUser] = useState<UserType|null>(null)
    const [message, setMessage] = useState<string|null>(null);

    useEffect(() => {
        const getLoggedInUser = async() => {
            const token = localStorage.getItem('token');
            setLoggedInUser(response.data)
        }
        if (isLoggedIn){
            getLoggedInUser()
        }
    }, [isLoggedIn])

    const logUserIn = (user:UserType): void => {
        setLoggedIn(true);
        setLoggedInUser(user);
        flashMessage('You have successfully logged in');
    }

    const logUserOut = (): void => {
        setLoggedIn(false);
        setLoggedInUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
        flashMessage('You have been logged out');
    }

    const flashMessage = (message:string|null): void => {
        setMessage(message);
    }

    return (
        <div>
            <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut}/>
            <Container>
                {message && <AlertMessage message={message} flashMessage={flashMessage}/>}
                <Routes>
                    <Route path='/' element={<Home user={loggedInUser} flashMessage={flashMessage}/>} />
                    <Route path='/login' element={<Login logUserIn={logUserIn} />} />
                    <Route path='/register' element={<Register flashMessage={flashMessage} logUserIn={logUserIn} />}/>
                </Routes>
                
            </Container>
        </div>
    )
}