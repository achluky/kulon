
import { apiUrl } from '../config';
import { fetchWrapper } from './fetch-wrapper';

export const Kelas_mahasiswaService = {
    savekelas_mahasiswa, 
    getkelas_mahasiswa,
    updatekelas_mahasiswa,
    deletekelas_mahasiswa
};

const baseUrl = `${apiUrl}/kelas_mahasiswa`;

function savekelas_mahasiswa(data){
    return fetchWrapper.post(baseUrl+"/tambah", data);
}

function getkelas_mahasiswa(id){
    return fetchWrapper.get(baseUrl, id);
}

function updatekelas_mahasiswa(data){
    return fetchWrapper.put(baseUrl+"/update", data);
}

function deletekelas_mahasiswa(data){
    return fetchWrapper.put(baseUrl+"/delete", data);
}
