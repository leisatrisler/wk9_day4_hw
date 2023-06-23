import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import UserType from '../types/auth';

type LoginProps = {
    logUserIn: (user:UserType) => void
}

export default function Login({ logUserIn }: LoginProps) {
    const navigate = useNavigate();

    const [user, setUser] = useState<UserType>({
        username: '',
        password: '',
      });

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        logUserIn({user});
        navigate('/');
    }

    return (
        <>
        <h1 className='text-center'>Log In</h1>
        <Card className='mt-3'>
            <Card.Body>
            <Form onSubmit={handleFormSubmit}>
                <Form.Label>Username</Form.Label>
                <Form.Control name='username' value={user.username} onChange={handleInputChange} />
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' name='password' value={user.password} onChange={handleInputChange} />
                <Button variant='outline-primary' type='submit' className='w-100 mt-3'>Log In</Button>
            </Form>
            </Card.Body>
        </Card>
    </>
    )
}