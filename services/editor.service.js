
import { apiUrl } from '../config';
import { fetchWrapper } from './fetch-wrapper';

export const editorService = {
    getTemplate,
    runCompiler
};

const baseUrl = `${apiUrl}/editor/`;

function getTemplate(lang){
    return fetchWrapper.get(baseUrl +'template/'+ lang);
}

function runCompiler(data){
    return fetchWrapper.post(baseUrl+'runManager', data);
}