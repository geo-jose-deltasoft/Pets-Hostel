const getAuthToken = () => {
    return localStorage.getItem('token');
};

const ApiRequest = (url, options = {}) => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(url, {
        ...options,
        headers,
    })
    .then(response => {
        if (response.status === 204) {
            return response.status; 
        }
        return response=response.json(); // Attempt to parse JSON response
    })
    .catch(error => {
        console.error('Error in ApiRequest:', error);
        throw error;
    });
};

export default ApiRequest;
