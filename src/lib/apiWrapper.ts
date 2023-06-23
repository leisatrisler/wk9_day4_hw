import axios, { AxiosResponse } from 'axios';
import UserType from '../types/auth'
import QuestionType from '../types/question';


const base = 'https://cae-bookstore.herokuapp.com/';
const allQuestionsEndpoint = 'question/all';
const userEndpoint = 'users';


const apiClientNoAuth = () => axios.create({
    baseURL: base
})

type APIResponse<T> = {
    error: string | undefined;
    data: T | undefined
}


async function getAllQuestions(): Promise<APIResponse<QuestionType[]>> {
    let error;
    let data;
    try{
        const response: AxiosResponse<QuestionType[]> = await apiClientNoAuth().get(allQuestionsEndpoint)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return {
        error,
        data
    }
}


async function register(newUser: UserType): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try {
        const response: AxiosResponse<UserType> = await apiClientNoAuth().post(userEndpoint, newUser)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {
        error,
        data
    }
}


export {
    getAllQuestions,
    register
}
