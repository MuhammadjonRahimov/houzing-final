import { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { RootContext } from "../context";
import navbar from "../utils/navbar";
import NotFound from "../pages/NotFound/inex";

function Root() {
    const { login } = useContext(RootContext);
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');


    useEffect(() => {
        login({
            user: user,
            isAuth: token ? true : false,
            token: token,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    return (
        <Routes>
            {navbar.map(({ id, path, element }) =>
                <Route key={id} path={path} element={element} />
            )}
            <Route path='/' element={<Navigate to={'/home'} />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}
export default Root;
