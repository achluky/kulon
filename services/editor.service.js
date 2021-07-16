
import { apiUrl } from '../config';
import { fetchWrapper } from './fetch-wrapper';

export const editorService = {
    getTemplate
};

const baseUrl = `${apiUrl}/editor/template`;

function getTemplate(lang){
    return fetchWrapper.get(baseUrl +'/'+ lang);
}
