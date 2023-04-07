import styles from './index.module.scss';

import { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearch, uzeReplace } from '../../../hooks';
import { Input } from '../../Generics';
import { Select } from 'antd';

const selectStyle = {
    height: '44px',
    width: '200px',
}

const Items = ({ value, data }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const query = useSearch();

    const countryRef = useRef();
    const regionRef = useRef();
    const cityRef = useRef();
    const zipRef = useRef();

    const roomsRef = useRef();

    const minPriceRef = useRef();
    const maxPriceRef = useRef();

    const changeHandler = ({ target: { name, value } }) => {
        const result = uzeReplace(name, value);
        navigate(`${location.pathname}${result?.search}`);
    }
    const onChangeCategory = (category_id) => {
        const result = uzeReplace('category_id', category_id);
        navigate(`${location.pathname}${result?.search}`);
    }
    const onChangeSort = (sort) => {
        const result = uzeReplace('sort', sort);
        navigate(`${location.pathname}${result?.search}`);
    }
    const getQuery = (queryName) => {
        return query.get(queryName);
    }

    return (
        <div className={styles.menu}>
            <div className={styles['menu__row']}>
                <div className={styles['menu__column']}>
                    <h3 className='main-text main-text__16 main-text__600 secondary'>Address</h3>
                    <div className={styles['column-body']}>
                        <Input border='border-all' placeholder='Country' onChange={changeHandler} defaultValue={getQuery('country')} name='country' ref={countryRef} />
                        <Input border='border-all' placeholder='Region' onChange={changeHandler} defaultValue={getQuery('region')} name='region' ref={regionRef} />
                        <Input border='border-all' placeholder='City' onChange={changeHandler} defaultValue={getQuery('city')} name='city' ref={cityRef} />
                        <Input border='border-all' placeholder='Zip Code' onChange={changeHandler} defaultValue={getQuery('zip_code')} name='zip_code' ref={zipRef} />
                    </div>
                </div>
                <div className={styles['menu__column']}>
                    <h3 className='main-text main-text__16 main-text__600 secondary'>Apartment info</h3>
                    <div className={styles['column-body']}>
                        <Input border='border-all' placeholder='Rooms' onChange={changeHandler} defaultValue={getQuery('room')} name='room' ref={roomsRef} />
                        <Select
                            style={selectStyle}
                            onChange={onChangeSort}
                            defaultValue={getQuery('sort') || 'Select Sort'}
                        >
                            <Select.Option value=''>Select Sort</Select.Option>
                            <Select.Option value='asc'>O'suvchi</Select.Option>
                            <Select.Option value='desc'>Kamayuvchi</Select.Option>
                        </Select>
                        <Select
                            style={selectStyle}
                            onChange={onChangeCategory}
                            defaultValue={value}
                        >
                            <Select.Option value=''>Select Category</Select.Option>
                            {data.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
                        </Select>
                    </div>
                </div>
                <div className={styles['menu__column']}>
                    <h3 className='main-text main-text__16 main-text__600 secondary'>Price</h3>
                    <div className={styles['column-body']}>
                        <Input border='border-all' placeholder='Min Price' onChange={changeHandler} name='min_price' default={getQuery('min_price')} ref={minPriceRef} />
                        <Input border='border-all' placeholder='Max Price' onChange={changeHandler} name='max_price' defaultValue={getQuery('max_price')} ref={maxPriceRef} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Items;