import styles from './index.module.scss';

import { Form, Input, Button } from '../../Generics';
import { SVG } from '../../HelperComponents';
import { Dropdown } from 'antd';
import Items from './Items';
import { useEffect, useState } from 'react';
import { useRequest, useSearch } from '../../../hooks';
import { useLocation } from 'react-router';

const Filter = () => {
    const [categories, setCategories] = useState([]);
    const [value, setValue] = useState('Select Category');

    const query = useSearch();
    const location = useLocation();
    const request = useRequest();

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        const item = categories?.find(ctg => ctg.id === +query.get('category_id'));
        item?.name && setValue(item?.name);
    }, [location?.search, categories]);

    const getCategories = async () => {
        const response = await request({ url: '/categories/list' });
        response && setCategories(response?.data);
    }

    return (
        <div className={styles.filter}>
            <div className='container'>
                <Form className={styles['filter__form']}>
                    <label>
                        <Input
                            className={`main-text main-text__14 secondary ${styles['filter__input']}`}
                            placeholder="Enter an address, neighborhood, city, or ZIP code"
                            border='border-all'
                            space='padding-more'
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