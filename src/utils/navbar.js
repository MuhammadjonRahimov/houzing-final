import React from 'react';
import { useId } from '../hooks';

const HomePage = React.lazy(() => import('../pages/Home'));
const PropertiesPage = React.lazy(() => import('../pages/Properties'));
const LoginPage = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const Favourite = React.lazy(() => import('../pages/Favourite'));
const MyProfile = React.lazy(() => import('../pages/MyProfile'));
const MyProperties = React.lazy(() => import('../pages/MyProperties'));

const navbar = [
    {
        id: useId,
        element: <React.Suspense fallback={<h1>Loading...</h1>}><HomePage /></React.Suspense>,
        title: 'Home',
        path: '/home',
        private: false,
        hidden: false,
        forMenu: false,
    },
    {
        id: useId,
        element: <React.Suspense fallback={<h1>Loading...</h1>}><PropertiesPage /></React.Suspense>,
        title: 'Properties',
        path: '/properties',
        private: false,
        hidden: false,
        forMenu: false,
    },
    {
        id: useId,
        element: <React.Suspense fallback={<h1>Loading...</h1>}><LoginPage /></React.Suspense>,
        title: 'Login',
        path: '/login',
        private: false,
        hidden: true,
        forMenu: true,
    },
    {
        id: useId,
        element: <React.Suspense fallback={<h1>Loading...</h1>}><Register /></React.Suspense>,
        title: 'Register',
        path: '/register',
        private: false,
        hidden: true,
        forMenu: false,
    },
    {
        id: useId,
        element: <React.Suspense fallback={<h1>Loading...</h1>}><Favourite /></React.Suspense>,
        title: 'Favourite',
        path: '/favourite',
        private: false,
        hidden: true,
        forMenu: true,
    },
    {
        id: useId,
        element: <React.Suspense fallback={<h1>Loading...</h1>}><MyProfile /></React.Suspense>,
        title: 'My Profile',
        path: '/my-profile',
        private: false,
        hidden: true,
        forMenu: true,
    },
    {
        id: useId,
        element: <React.Suspense fallback={<h1>Loading...</h1>}><MyProperties /></React.Suspense>,
        title: 'My Properties',
        path: '/my-properties',
        private: false,
        hidden: true,
        forMenu: true,
    },
];

export default navbar;