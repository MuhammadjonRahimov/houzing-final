import { message } from "antd";
const { REACT_APP_BASE_URL: baseUrl } = process.env;
const newBaseUrl = baseUrl.replace('/v1', '');



const useRequest = () => {

    const request = async ({ url, method = 'GET', body, token = false, me = false, size, page }) => {
        const withQuery = page !== 'undefined' && url.includes('?') ? `&page=${page}` : `?page=${page}`;

        const headers = {
            'Content-Type': 'application/json',
        }

        if (token) {
            headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        }

        const options = { method, headers, body: JSON.stringify(body) }
        try {

            const response = await fetch(`${me ? newBaseUrl :
                baseUrl}${url}`, options)
                .then(res => res.json());

            // const response = await fetch(`${me ? newBaseUrl :
            //     baseUrl}${url}${page !== 'undefined' ? withQuery : ''}${size && `&size=${size}`}`, options)
            //     .then(res => res.json());

            return response;
        } catch (error) {
            // message.error('Wrong email');
        }
    }
    return request;

}

export default useRequest;