import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from "./components/Navigation";
import AlertMessage from './components/FlashMessage';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Container from 'react-bootstrap/Container'
import UserType from './types/auth';


export default function App() {

    const [isLoggedIn, setLoggedIn] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState<UserType|null>(null)
    const [message, setMessage] = useState<string|null>(null);


    const logUserIn = (user:UserType): void => {
        setLoggedIn(true);
        setLoggedInUser(user);
        flashMessage('Riddle Me This, Riddle Me That... You Will Go Insane With My Riddles')
    }

    const logUserOut = (): void => {
        setLoggedIn(false);
        setLoggedInUser(null);
        flashMessage('Bye Bye... For Now')
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
                    <Route path='/login' element={<Login logUserIn={logUserIn}/>} />
                    <Route path='/register' element={<Register flashMessage={flashMessage} logUserIn={logUserIn} />}/>
                </Routes>
            </Container>
        </div>
    )
}