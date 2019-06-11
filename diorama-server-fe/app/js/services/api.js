const API_ROOT = apiRoot();

function apiRoot() {
    if(window.location.host == 'localhost:8888'){
        return 'http://localhost:8080/webapi/'
    } else {
        return window.location.protocol + "//"  + window.location.host + window.location.pathname+'webapi/'
    }
}

function callApi (endpoint, request) {
    return fetch(API_ROOT + endpoint,request)
        .then(response => {
            // This is a hack, we should really handle json and satus code in one then block
            if (!response.ok) {
                return Promise.reject(response.json())
            }

            if(response.status === 204) {
                return response;
            }
            return response.json();
        }).then(
            response => ({response}),
            error => ({error: error.message || 'Something bad happened'})
        )

}

export const fetchAllMocks = () => callApi(`mock`)

export const fetchMock = mockId => callApi(`mock/${mockId}`)

export const updateMockConfig = (mockId, name, value) => callApi(`mock/${mockId}?${name}=${value}`, {
    method: 'put',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export const updateStubConfig = (mockId, stubId, name, value) => callApi(`mock/${mockId}/stub/${stubId}?${name}=${value}`, {
    method: 'put',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export const fetchMockRequest = index => callApi(`request/${index}`)

export const fetchMockRequestList = (indexTo, size) => callApi(`request/http/?index=${indexTo}&size=${size}`)
