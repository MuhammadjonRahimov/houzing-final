import React from 'react';
import { useId } from '../hooks';

const HomePage = React.lazy(() => import('../pages/Home'));
const PropertiesPage = React.lazy(() => import('../pages/Properties'));
const LoginPage = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const Favourite = React.lazy(() => import('../pages/Favourite'));
const NewHouse = React.lazy(() => import('../pages/NewHouse'));
const MyProperties = React.lazy(() => import('../pages/MyProperties'));
const HouseItem = React.lazy(() => import('../pages/HouseItem'));



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
        element: <React.Suspense fallback={<h1>Loading...</h1>}><HouseItem /></React.Suspense>,
        title: 'HouseItem',
        path: '/properties/:id',
        private: false,
        hidden: true,
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
        element: <React.Suspense fallback={<h1>Loading...</h1>}><NewHouse /></React.Suspense>,
        title: 'New House',
        path: '/my-profile',
        private: false,
        hidden: true,
        forMenu: true,
    },
    {
        id: useId,
        element: <React.Suspense fallback={<h1>Loading ...</h1>}><NewHouse /></React.Suspense>,
        title: 'Edit House',
        path: '/my-profile/edithouse/:id',
        private: true,
        hidden: true,
        forMenu: false,
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