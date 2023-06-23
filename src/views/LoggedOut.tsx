import Button from "react-bootstrap/Button";

type Props = {
    handleClick: (e: React.MouseEvent ) => void
}

export default function LoggedOut({ handleClick }: Props) {
    return (
        <>
            <h1>Hello and Welcome</h1>
            <Button variant="primary" onClick={handleClick}>Log In</Button>
        </>
    )
}