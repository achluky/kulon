
import { apiUrl } from '../config';
import { fetchWrapper } from './fetch-wrapper';

export const kelasService = {
    getkelasAll,
    saveKelas, 
    getkelas,
    updateKelas
};

const baseUrl = `${apiUrl}/kelas`;

function getkelasAll(){
    return fetchWrapper.get(baseUrl);
}

function saveKelas(data){
    return fetchWrapper.post(baseUrl+"/tambah", data);
}

function getkelas(id){
    return fetchWrapper.get(baseUrl, id);
}

function updateKelas(data){
    return fetchWrapper.put(baseUrl, data);
}