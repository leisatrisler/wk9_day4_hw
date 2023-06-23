import Card from 'react-bootstrap/Card';
import QuestionType from '../types/question';

type QuestionCardProps = {
    question: QuestionType
}

export default function QuestionCard({ question }: QuestionCardProps) {
    // console.log(question);
    return (
        <Card className='mt-3'>
            <Card.Body id = "joker">
                <Card.Title>{question.question}</Card.Title>
                <Card.Text>{question.answer}</Card.Text>
                <Card.Subtitle>By {question.author} </Card.Subtitle>
                <Card.Text className='text-muted'>Date Created: {question.created_on}</Card.Text>
            </Card.Body>
        </Card>
    )
}