import { initialState } from ".";

const reducer = (state, { type, item }) => {
    switch (type) {
        case 'LOGIN':
            return {
                user: item?.user,
                token: item?.token,
                isAuth: item?.isAuth,
            }
        case 'LOGOUT':
            return initialState;
        default: return state;
    }
}

export default reducer;