
import { apiUrl } from '../config';
import { fetchWrapper } from './fetch-wrapper';

export const modulService = {
    saveModul, 
    getModul,
    updateModul,
    deleteModul,
    kodeModul
};

const baseUrl = `${apiUrl}/modul`;

function saveModul(data){
    return fetchWrapper.post(baseUrl+"/tambah", data);
}

function getModul(id){
    return fetchWrapper.get(baseUrl, id);
}

function updateModul(data){
    return fetchWrapper.put(baseUrl+"/update", data);
}


function deleteModul(data){
    return fetchWrapper.put(baseUrl+"/delete", data);
}

function kodeModul(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}