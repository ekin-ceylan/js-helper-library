/**
 * Sends a JSON POST request.
 * @param {string} url - The endpoint URL.
 * @param {unknown} params - Request payload to serialize as JSON.
 * @returns {Promise<unknown>} The parsed JSON response.
 */
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

/**
 * Sends a GET request with optional query parameters.
 * @param {string} url - The endpoint URL.
 * @param {Record<string, string|number|boolean>} [params] - Query parameters to append to the URL.
 * @returns {Promise<unknown>} The parsed JSON response.
 */
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

/**
 * Executes a fetch request and normalizes common response handling.
 * @param {string} url - The endpoint URL.
 * @param {RequestInit} options - Fetch options.
 * @returns {Promise<unknown>} The parsed JSON response body.
 * @throws {string} Throws the response text for non-successful responses.
 */
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

// https://blog.stackademic.com/beyond-async-await-10-advanced-js-ts-techniques-senior-engineers-use-e9e687940f4d
