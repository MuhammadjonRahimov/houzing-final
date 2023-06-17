import styles from '../Login/index.module.scss';

import { Formik } from 'formik';
import { Button, Form, Input } from '../../components/Generics';
import { SVG } from '../../components/HelperComponents';
import { useRequest } from '../../hooks';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { useState } from 'react';
import Layout from '../../components/Layout';

const Register = () => {
    const request = useRequest();
    const [visible, setVisible] = useState(false);

    const visibilityHandler = () => {
        setVisible(prev => !prev);
    }
    return (
        <Layout centered={true}>

            <Formik
                initialValues={{ email: '', password: '', firstname: '', lastname: '', roleIdSet: [1] }}
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
                    if (!values.firstname) {
                        errors.firstname = 'Firstname is required'
                    }
                    if (!values.lastname) {
                        errors.lastname = 'Lastname is required'
                    }
                    return errors;
                }}
                onSubmit={async values => {
                    values.roleIdSet = [0];
                    const response = await request({
                        url: '/public/auth/register',
                        method: 'POST',
                        me: true,
                        body: values,
                    });
                    if (response?.success) {
                        message.success('Succesfully registered, please now verify by your email');
                    } else {
                        message.error('Wrong email');
                    }
                }}
            >
                {({ values, errors, handleChange, handleSubmit }) =>
                    <div className={styles.login}>
                        <Form className={styles['login__form']} onSubmit={handleSubmit}>
                            <h1 className={`main-text main-text__600 main-text__18 secondary ${styles['login__title']}`}>Register</h1>
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
                            <label htmlFor="firstname">
                                <p className={`main-text main-text__600 main-text__14 secondary ${styles['login__label']}`}>Name</p>
                                <Input
                                    border={errors.firstname ? 'border-bottom-red' : 'border-bottom'}
                                    space='no-left-padding'
                                    id="firstname"
                                    placeholder={errors.firstname || "FirstName"}
                                    type="text"
                                    name='firstname'
                                    values={values.firstname}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="lastname">
                                <p className={`main-text main-text__600 main-text__14 secondary ${styles['login__label']}`}>Lastname</p>
                                <Input
                                    border={errors.lastname ? 'border-bottom-red' : 'border-bottom'}
                                    space='no-left-padding'
                                    id="lastname"
                                    placeholder={errors.lastname || "LastName"}
                                    type="text"
                                    name='lastname'
                                    values={values.lastname}
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
                            <Button mode='mode-blue' type='submit' >Register</Button>
                            <Link to='/login' className={`main-text main-text__16 primary ${styles['login__link']}`}>Already have an account ?</Link>
                        </Form>
                    </div>
                }
            </Formik>
        </Layout>
    )
}

export default Register;