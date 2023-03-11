import React from 'react';
import useId from '../hooks/useId';

const HomePage = React.lazy(() => import('../pages/Home'));
const PropertiesPage = React.lazy(() => import('../pages/Properties'));

const navbar = [
    {
        id: useId,
        element: <React.Suspense fallback={<h1>Loading...</h1>}><HomePage /></React.Suspense>,
        title: 'Home',
        path: '/home',
        private: false,
        hidden: false,
    },
    {
        id: useId,
        element: <React.Suspense fallback={<h1>Loading...</h1>}><PropertiesPage /></React.Suspense>,
        title: 'Properties',
        path: '/properties',
        private: false,
        hidden: false,
    },
];

export default navbar;