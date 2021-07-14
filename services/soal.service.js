
import { apiUrl } from '../config';
import { fetchWrapper } from './fetch-wrapper';

export const soalService = {
    getRun,
    saveSolusi,
    saveSoal, 
    getSoal,
    updateSoal,
    deleteSoal,
    kodeSoal
};

const baseUrl = `${apiUrl}/soal`;

function saveSoal(data){
    return fetchWrapper.post(baseUrl+"/tambah", data);
}

function saveSolusi(data){
    return fetchWrapper.post(baseUrl+"/solusi/tambah", data);
}

function getSoal(id){
    return fetchWrapper.get(baseUrl, id);
}

function updateSoal(data){
    return fetchWrapper.put(baseUrl+"/update", data);
}

function deleteSoal(data){
    return fetchWrapper.put(baseUrl+"/delete", data);
}

function kodeSoal(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getRun(code){
    return fetchWrapper.post( `${apiUrl}/run`, code);
}
