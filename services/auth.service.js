import { apiUrl } from '../config';
import { fetchWrapper } from './fetch-wrapper';

export const authService = {
    authUser,
    saveUser, 
    getUser,
    updateUser
};

const baseUrl = `${apiUrl}/auth`;

function authUser(data) {
    return fetchWrapper.post(baseUrl, data);
}

function saveUser(data){
    return fetchWrapper.post(baseUrl, data);
}

function getUser(id){
    return fetchWrapper.get(baseUrl, id);
}

function updateUser(data){
    return fetchWrapper.put(baseUrl, data);
}