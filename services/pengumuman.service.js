
import { apiUrl } from '../config';
import { fetchWrapper } from './fetch-wrapper';

export const pengumumanService = {
    savePengumuman, 
    getPengumuman,
    updatePengumuman,
    deletePengumuman,
    kodePengumuman
};

const baseUrl = `${apiUrl}/pengumuman`;

function savePengumuman(data){
    return fetchWrapper.post(baseUrl+"/tambah", data);
}

function getPengumuman(id){
    return fetchWrapper.get(baseUrl, id);
}

function updatePengumuman(data){
    return fetchWrapper.put(baseUrl+"/update", data);
}


function deletePengumuman(data){
    return fetchWrapper.put(baseUrl+"/delete", data);
}

function kodePengumuman(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}