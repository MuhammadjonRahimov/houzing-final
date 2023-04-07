import styles from './index.module.scss';

import { Form, Input, Button } from '../../Generics';
import { SVG } from '../../HelperComponents';
import { Dropdown } from 'antd';
import Items from './Items';
import { useEffect, useRef, useState } from 'react';
import { useRequest, useSearch, uzeReplace } from '../../../hooks';
import { useLocation, useNavigate } from 'react-router';

const Filter = () => {
    const [categories, setCategories] = useState([]);
    const [value, setValue] = useState('Select Category');
    const inputRef = useRef('');


    const query = useSearch();
    const request = useRequest();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const item = categories?.find(ctg => ctg.id === +query.get('category_id'));
        item?.name && setValue(item?.name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location?.search, categories]);

    const getCategories = async () => {
        const response = await request({ url: '/categories/list' });
        response && setCategories(response?.data);
    }

    const onChangeRef = () => {
        const result = uzeReplace('city', inputRef.current.value);
        navigate(`${location.pathname}${result?.search}`);
    }

    return (
        <div className={styles.filter}>
            <div className='container'>
                <Form className={styles['filter__form']}>
                    <label>
                        <Input
                            className={`main-text main-text__14 secondary ${styles['filter__input']}`}
                            placeholder="Enter a city you want to buy a house"
                            border='border-all'
                            space='padding-more'
                            ref={inputRef}
                        />
                        <SVG name='house' />
                    </label>
                    <Dropdown overlay={<Items data={categories} value={value} />} trigger='onclick' placement='bottomRight'>
                        <Button
                            size='size-medium'
                            border='border-gray'
                            className={`main-text main-text__14 secondary ${styles['filter__btn']}`}>
                            <SVG name='settings' />
                            <span>Advanced</span>
                        </Button>
                    </Dropdown>
                    <Button
                        size='size-medium'
                        mode='mode-blue'
                        className={`main-text main-text__14 ${styles['filter__btn']}`}
                        onClick={onChangeRef}
                    >
                        <SVG name='search' />
                        <span>Search</span>
                    </Button>
                </Form>
            </div>
        </div >
    )
}

export default Filter;