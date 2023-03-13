const { REACT_APP_BASE_URL: baseUrl } = process.env;
const newBaseUrl = baseUrl.replace('/v1', '');


const useRequest = () => {

    const request = async ({ url, method = 'GET', body, token = false, me = false }) => {

        const headers = {
            'Content-Type': 'application/json',
        }

        if (token) {
            headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        }

        const options = { method, headers, method, body: JSON.stringify(body) }

        try {
            const response = await fetch(`${me ? newBaseUrl : baseUrl}${url}`, options)
                .then(res => res.json());
            return response;
        } catch (error) {
        }
    }
    return request;
}

export default useRequest;