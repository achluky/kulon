export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

async function get(url, token) {
    const requestOptions = {
        method: 'GET',
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

async function post(url, data, token) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

async function put(url, body, token) {
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

async function _delete(url, token) {
    const requestOptions = {
        method: 'DELETE',
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}