
import { apiUrl } from '../config';
import { fetchWrapper } from './fetch-wrapper';

export const kelasService = {
    saveKelas, 
    getkelas,
    updateKelas,
    deleteKelas,
    kodeKelas
};

const baseUrl = `${apiUrl}/kelas`;

function saveKelas(data){
    return fetchWrapper.post(baseUrl+"/tambah", data);
}

function getkelas(id){
    return fetchWrapper.get(baseUrl, id);
}

function updateKelas(data){
    return fetchWrapper.put(baseUrl+"/update", data);
}


function deleteKelas(data){
    return fetchWrapper.put(baseUrl+"/delete", data);
}

function kodeKelas(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}