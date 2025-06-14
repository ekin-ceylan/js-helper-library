async function post(url, params) {
    const options = {
        body: JSON.stringify(params),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    };

    return call(url, options);
}

async function get(url, params) {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const fullUrl = `${url}${query}`;

    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    };

    return call(fullUrl, options);
}

async function call(url, options) {
    const response = await fetch(url, options);

    if (response?.status === 401) {
        window.location.href = '/login';
    }

    if (!response.ok) {
        throw await response.text();
    }

    return response.json();
}

export { post, get };
