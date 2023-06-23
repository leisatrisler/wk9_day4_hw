import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

type NavigationProps = {
    isLoggedIn: boolean
    logUserOut: () => void
}

export default function Navigation({ isLoggedIn, logUserOut }:NavigationProps) {
    return (
        <>
            <Navbar bg='dark' data-bs-theme='dark'>
                <Container>
                    <Navbar.Brand to="/" as={Link}>Questions</Navbar.Brand>
                    <Nav className='me-auto'>
                        { isLoggedIn ? (
                            <>
                                <Nav.Link to='/' as={Link} onClick={logUserOut}>Log Out</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link to='/login' as={Link}>Log In</Nav.Link>
                                <Nav.Link to='/register' as={Link}>Sign Up</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}