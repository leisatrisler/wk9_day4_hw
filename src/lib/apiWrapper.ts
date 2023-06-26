import axios, { AxiosInstance, AxiosResponse } from 'axios';
import UserType from '../types/auth'
import QuestionType from '../types/question';


const base = 'https://cae-bookstore.herokuapp.com';
const allQuestionsEndpoint = '/question/all';
const userEndpoint = '/users';
const loginEndpoint = '/login';
const questionEndpoint = '/question';

const apiClientNoAuth = () => axios.create({
    baseURL: base
})

const buildEndpoint = (baseEndpoint: string, endpoint: string): string => {
    return `${baseEndpoint}${endpoint}`;
  };

const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: 'Bearer ' + btoa(username + ':' + password)
    }
})

const apiClientTokenAuth = (token: string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: 'Bearer ' + token
    }
})

type APIResponse<T> = {
    error: string | undefined;
    data: T | undefined
}

type TokenType = {
    token: string
    token_expiration: string
}


async function register(newUser: UserType): Promise<APIResponse<UserType>> {
    let error;
    let data;
    const endPoint = buildEndpoint(base, userEndpoint);
    try {
        const response: AxiosResponse<UserType> = await apiClientNoAuth().post(endPoint, newUser)
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

async function userLogin(email: string, password: string): Promise<APIResponse<TokenType>> {
    let error;
    let data;
    const endPoint = buildEndpoint(base, loginEndpoint);
    try{
        const response: AxiosResponse<TokenType> = await apiClientBasicAuth(email, password).get(endPoint)
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

async function getQuestion(): Promise<APIResponse<QuestionType[]>> {
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

// The changes here are to submit a Question Type including the ID, to edit the fields using PUT.
// the ID is required
async function editQuetion(editQuestion: QuestionType, token: string): Promise<APIResponse<QuestionType>> {
    let error;
    let data;
    if (editQuestion.id === null) {
        error = "No ID was provided.";
        throw error;
    }
    try{
        const response: AxiosResponse<QuestionType> = await apiClientTokenAuth(token).put(questionEndpoint, editQuestion)
        data = response.data
    } catch(err) {
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

async function createQuestion(newQuestion: QuestionType, token: string): Promise<APIResponse<QuestionType>> {
    let error;
    let data;
    try{
        const response: AxiosResponse<QuestionType> = await apiClientTokenAuth(token).post(questionEndpoint, newQuestion)
        data = response.data
    } catch(err) {
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

// Delete User
    // Endpoint
    // /user
    // Method
    // Delete
    // Content Type
    // application/json
    // Authentication Type
    // Token Authentication
    // Example Payload
        // N/A

// response = requests.request("DELETE", url, headers=headers, data=payload)

// deleting questions doesnt work using Postman.
// Method: DELETE https://cae-bookstore.herokuapp.com/question/123
async function deleteQuestion(questionToDelete: QuestionType, token: string): Promise<APIResponse<QuestionType>> {
    let error;
    let data;
    try{
        const response: AxiosResponse<QuestionType> = await apiClientTokenAuth(token)
        .delete(`${questionEndpoint}/${questionToDelete.id}`)
        data = response.data
    } catch(err) {
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
    editQuetion,
    createQuestion,
    getAllQuestions,
    deleteQuestion,
    apiClientTokenAuth,
    apiClientNoAuth,
    register,
    userLogin,
    type APIResponse
  };