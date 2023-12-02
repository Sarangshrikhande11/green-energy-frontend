const baseURL = 'http://my-env2.eba-ywmjxpre.us-east-1.elasticbeanstalk.com';

const fetchData = (url, token = '') => {
    let hdrr = {
        'Content-Type': 'application/json', // You can adjust other headers as needed
    }
    if (token.length > 0) {
        hdrr['Authorization'] = `Bearer ${token}`
    }
    return fetch(url, {
        headers: hdrr
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
};

function postData(url, data, token = '') {
    let hdrr = {
        'Content-Type': 'application/json', // You can adjust other headers as needed
    }
    if (token.length > 0) {
        hdrr['Authorization'] = `Bearer ${token}`
    }
    return fetch(url, {
        method: 'POST',
        headers: hdrr,
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
}