import { message } from "antd";

const { REACT_APP_BASE_URL: baseUrl } = process.env;
const newBaseUrl = baseUrl.replace('/v1', '');



const useRequest = () => {

    const request = async ({ url, method = 'GET', body, token = false, me = false, size, page }) => {

        const headers = {
            'Content-Type': 'application/json',
        }

        if (token) {
            headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        }

        const options = { method, headers, method, body: JSON.stringify(body) }
        try {
            // const response = await fetch(`${me ? newBaseUrl :
            //     baseUrl}${url}`, options)
            //     .then(res => res.json());
            const response = await fetch(`${me ? newBaseUrl :
                baseUrl}${url}${page || page === 0 ? `?page=${page}` : ''}${size ? `&size=${size}` : ''}`, options)
                .then(res => res.json());
            return response;
        } catch (error) {
            console.log(error);
            // message.error('Email or Password is wrong');
        }
    }
    return request;

}

export default useRequest;