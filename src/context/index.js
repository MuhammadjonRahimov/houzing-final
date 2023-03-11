import { createContext, useReducer } from "react";
import reducer from "./reducer";
export const RootContext = createContext();


export const initialState = {
    user: '',
    token: '',
    isAuth: false,
}

const RootProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const login = (item) => {
        dispatch({ type: 'LOGIN', item });
    }
    const logOut = () => dispatch({ type: 'LOGOUT' });

    const rootValue = {
        user: state?.user,
        token: state?.token,
        isAuth: state?.isAuth,
        login,
        logOut,
    }

    return (
        <RootContext.Provider value={rootValue}>
            {children}
        </RootContext.Provider>
    )
}

export default RootProvider;