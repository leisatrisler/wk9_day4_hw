import { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import QuestionType from '../types/question'; // I had to remove this line since the response was "questions"[0][array of questions]?
import UserType from '../types/auth';
import { getAllQuestions } from '../lib/apiWrapper';
import QuestionCard from '../components/QuestionCard';
import image from '../images/hahaha.png'

type HomeProps = {
    user? : any|null
    handleClick?: (e:React.MouseEvent) => void
    flashMessage: (message: string|null) => void
}

export default function Home({ user, flashMessage }: HomeProps) {
    const [questions, setQuestions] = useState<any>([]);
    const [showHTML, setHTML] = useState (false);
    const getQuestions = async () => {
        try {
            const response = await getAllQuestions();
            if (response.data) {
                const responseData = Array.isArray(response.data) ? response.data : [response.data];
            setQuestions(responseData[0].questions); //why does this finally work?
            }
        } catch (error) {
            console.log(error)
        }
    };
    console.log(user)

    useEffect(() => {
        //  getQuestions();
    }, []);

    const handleGetQuestions = async (event: React.FormEvent) => {
        event.preventDefault();
        await getQuestions();
        // setHTML(false);
    };

    const handleSetQuestions = async () => {
        setQuestions([]);
        showJoker ()
    }

    const showJoker = () => {
        setHTML (true)
        setTimeout(() => {
            setHTML(false)
          }, 7000);
    }

    return (
        <>
            <h1>{user ? `Questions Questions ${user?.user.username}` : "Riddle Me This" }</h1>
            <Button className = "button1"onClick={handleGetQuestions}><strong>??? Riddles ???</strong></Button>
            <Button className = "button2" onClick={handleSetQuestions}><strong>Insane In The Membrane</strong></Button>
            {questions.map( q => q && <QuestionCard key={q.id + q.created_on} question={q} />)}
            {showHTML && <img src={image}></img>}
        </>
    )
}
