import styles from './index.module.scss';

import { Formik } from 'formik';
import { Button, Form, Input } from '../../components/Generics';
import { SVG } from '../../components/HelperComponents';
import { useContext, useState } from 'react';
import { useRequest } from '../../hooks';
import { RootContext } from '../../context';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { message } from 'antd';

const Login = () => {
    const request = useRequest();
    const navigate = useNavigate();
    const { login } = useContext(RootContext);

    const [visible, setVisible] = useState(false);

    const visibilityHandler = () => {
        setVisible(prev => !prev);
    }
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validateOnBlur={false}
            validateOnChange={false}
            validate={values => {
                const errors = {}
                if (!values.email) {
                    errors.email = 'Email is required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }
                if (!values.password) {
                    errors.password = 'Password is required'
                }
                return errors;
            }}
            onSubmit={async values => {
                const response = await request({
                    url: '/public/auth/login',
                    method: 'POST',
                    me: true,
                    body: values,
                });
                if (response?.authenticationToken) {
                    localStorage.setItem('token', response?.authenticationToken);
                    localStorage.setItem('user', response?.username);

                    login({
                        user: response?.authenticationToken,
                        isAuth: true,
                        token: response?.username,
                    })
                    message.success('Succesfully Logged in');
                    navigate('/');
                }
            }}
        >
            {({ values, errors, handleChange, handleSubmit }) =>

                <div className={styles.login}>
                    <Form className={styles['login__form']} onSubmit={handleSubmit}>
                        <h1 className={`main-text main-text__600 main-text__18 secondary ${styles['login__title']}`}>Sign in</h1>
                        <label htmlFor="email">
                            <p className={`main-text main-text__600 main-text__14 secondary ${styles['login__label']}`}>Email</p>
                            <Input
                                border={errors.email ? 'border-bottom-red' : 'border-bottom'}
                                space='no-left-padding'
                                id="email"
                                placeholder={errors.email || "Email"}
                                type="text"
                                name='email'
                                values={values.email}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="password">
                            <p className={`main-text main-text__600 main-text__14 secondary ${styles['login__label']}`}>Password</p>
                            <Input
                                border={errors.password ? 'border-bottom-red' : 'border-bottom'}
                                space='no-left-padding'
                                id="password"
                                placeholder={(errors.password) || "Password"}
                                type={visible ? 'text' : 'password'}
                                name='password'
                                values={values.password}
                                onChange={handleChange}
                                className={styles['login__input-right']}
                            />
                            <Button size='size-small' radius='r2' onClick={visibilityHandler}>
                                <SVG name='password' width='20' height='20' mode={visible ? '#0061DF' : ''} />
                            </Button>
                        </label>
                        <Button mode='mode-blue' type='submit' >Login</Button>
                        <Link to='/register' className={`main-text main-text__16 primary ${styles['login__link']}`}>Don't registered yet ?</Link>
                    </Form>
                </div>
            }
        </Formik>
    )
}

export default Login;