import { apiUrl } from '../config';
import { fetchWrapper } from './fetch-wrapper';

export const kelasMaterialService = {
    saveKelasMaterial, 
    getKelasMaterial,
    updateKelasMaterial,
    deleteKelasMaterial,
    token
};

const baseUrl = `${apiUrl}/kelas_material`;

function saveKelasMaterial(data){
    return fetchWrapper.post(baseUrl+"/tambah", data);
}

function getKelasMaterial(id){
    return fetchWrapper.get(baseUrl, id);
}

function updateKelasMaterial(data){
    return fetchWrapper.put(baseUrl+"/update", data);
}

function deleteKelasMaterial(data){
    return fetchWrapper.put(baseUrl+"/delete", data);
}

function token(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}