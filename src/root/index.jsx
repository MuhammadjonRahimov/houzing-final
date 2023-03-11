import { Routes, Route, Navigate } from "react-router-dom";

import navbar from "../utils/navbar";

function Root() {

    return (
        <Routes>
            {navbar.map(({ id, path, element }) =>
                <Route key={id} path={path} element={element} />
            )}
            <Route path='/' element={<Navigate to={'/home'} />} />
            <Route path='*' element={<h3>Not Found</h3>} />
        </Routes>
    );
}
export default Root;
