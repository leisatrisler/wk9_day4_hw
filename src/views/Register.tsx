import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserType from '../types/auth';
import { register } from '../lib/apiWrapper';
import CategoryType from '../types/category';

type RegisterProps = {
    flashMessage: (message:string, category: CategoryType) => void
    logUserIn: (user:UserType) => void
}

export default function Register({ flashMessage, logUserIn }: RegisterProps) {

    const [newUser, setNewUser] = useState<UserType>({firstName: '', lastName: '', username: '', email: '', password: ''})

    const navigate = useNavigate()

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const response = await register(newUser)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(response.data?.username + ' has been created', 'success')
            logUserIn(response.data!)
            navigate('/')
        }
    }

    return (
        <>
            <h1 className="text-center">Join Mental Maddness</h1>
            <Card className='mt-3'>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control value={newUser.firstName} name='firstName' onChange={handleInputChange} />
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control value={newUser.lastName} name='lastName' onChange={handleInputChange} />
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={newUser.username} name='username' onChange={handleInputChange} />
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={newUser.email} name='email' type='email' onChange={handleInputChange} />
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={newUser.password} name='password' type='password' onChange={handleInputChange} />
                        <Button variant='outline-primary' className='mt-3 w-100' type='submit'>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
