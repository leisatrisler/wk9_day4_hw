import Alert from 'react-bootstrap/Alert';

type AlertMessageProps = {
    message: string|null
    flashMessage: (message: string|null) => void
}

export default function AlertMessage({ message, flashMessage }: AlertMessageProps) {
    return (
        <Alert className='text-center' onClose={() => flashMessage(null)} dismissible>
            { message }
        </Alert>
    )
}
