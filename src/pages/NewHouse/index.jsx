import styles from '../../components/Sections/Filter/index.module.scss';
import style from './index.module.scss';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRequest } from '../../hooks';
import { Form, Input, Button } from '../../components/Generics';
import { Checkbox, message, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { SVG } from '../../components/HelperComponents';
import { useFormik } from 'formik';
import Layout from '../../components/Layout';

const selectStyle = {
    height: '44px',
    width: '200px',
}

const initialState = {
    houseDetails: {},
    homeAmenitiesDto: {},
    componentsDto: {},
    status: true,
    locations: {
        longitude: 0,
        latitude: 0,
    }
}

const initialInfo = { categories: [], imgs: [], path: '', initial: initialState }

const newHouseItems = {
    address: [
        { placeholder: 'Country', name: 'country', type: 'text' },
        { placeholder: 'Region', name: 'region', type: 'text' },
        { placeholder: 'City', name: 'city', type: 'text' },
        { placeholder: 'Address', name: 'address', type: 'text' },
        { placeholder: 'Zip Code', name: 'zipCode', type: 'text' },
    ],
    apartment: [
        { placeholder: 'Area', name: 'houseDetails.area', type: 'number' },
        { placeholder: 'Bath(s)', name: 'houseDetails.bath', type: 'number' },
        { placeholder: 'Room(s)', name: 'houseDetails.room', type: 'number' },
        { placeholder: 'Bed(s)', name: 'houseDetails.beds', type: 'number' },
        { placeholder: 'Garage', name: 'houseDetails.garage', type: 'number' },
        { placeholder: 'Year Build', name: 'houseDetails.yearBuilt', type: 'number' },
    ],
    amenities: [
        { name: 'homeAmenitiesDto.busStop', title: 'Bus Stop' },
        { name: 'homeAmenitiesDto.garden', title: 'Garden' },
        { name: 'homeAmenitiesDto.market', title: 'Market' },
        { name: 'homeAmenitiesDto.park', title: 'Park' },
        { name: 'homeAmenitiesDto.parking', title: 'Parking' },
        { name: 'homeAmenitiesDto.school', title: 'School' },
        { name: 'homeAmenitiesDto.statium', title: 'Statium' },
        { name: 'homeAmenitiesDto.subway', title: 'Subway' },
        { name: 'homeAmenitiesDto.superMarket', title: 'Supermarket' },
        { name: 'componentsDto.tv', title: 'TV' },
        { name: 'componentsDto.airCondition', title: 'Air Conditioning' },
        { name: 'componentsDto.courtyard', title: 'Country Card' },
        { name: 'componentsDto.furniture', title: 'Furniture' },
        { name: 'componentsDto.gasStove', title: 'Gas' },
        { name: 'componentsDto.internet', title: 'Internet' },
    ]
}

const NewHouse = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const request = useRequest();


    const [info, setInfo] = useState(initialInfo);

    useEffect(() => {
        id && getData();
    }, []);

    const getData = async () => {
        const response = await request({
            url: `/houses/id/${id}`,
            token: true,
        });
        if (response) {
            setInfo(prev => ({ ...prev, imgs: response?.data?.attachments, initial: response?.data }));
        }
    }
    const actionImgHandler = (action, id) => {
        console.log(action, id);
        if (action === 'add') {
            if (info.path.length > 0) {
                setInfo(prev => ({ ...prev, imgs: [...info.imgs, { imgPath: info.path }] }));
                setInfo(prev => ({ ...prev, path: '' }));
            }
        }
        if (action === 'delete') {
            const filteredImgs = info.imgs.filter((_, index) => id !== index);
            setInfo(prev => ({ ...prev, imgs: filteredImgs }));
        }
    }

    const imgPathHandler = ({ target: { value } }) => {
        setInfo(prev => ({ ...prev, path: value }));
    }

    const formik = useFormik({
        initialValues: info.initial,
        enableReinitialize: true,

        onSubmit: (values) => {
            request({
                url: id ? `/houses/${id}` : '/houses',
                method: id ? 'PUT' : 'POST',
                token: true,
                body: { ...values, categoryId: 1, name: 'Technocorp', attachments: info.imgs }
            }).then(res => {
                if (res.success) {
                    message.success(res?.message);
                    navigate('/my-properties');
                } else {
                    console.log(res);
                }
            })
        }
    });
    return (
        <Layout centered={true}>
            <div className='container'>
                <Form onSubmit={formik.handleSubmit}>
                    <div className={styles.menu}>
                        <div className={styles['menu__row']}>
                            <div className={styles['menu__column']}>
                                <h3 className='main-text main-text__18 main-text__600 secondary'>Address</h3>
                                <div className={styles['column-body']}>
                                    {newHouseItems.address.map(item => <Input
                                        key={item.name}
                                        type={item.type}
                                        placeholder={item.placeholder}
                                        onChange={formik.handleChange}
                                        value={formik.values[item.name]}
                                        name={item.name}
                                        border='border-all'
                                    />
                                    )}
                                </div>
                            </div>
                            <div className={styles['menu__column']}>
                                <h3 className='main-text main-text__18 main-text__600 secondary'>Apartment info</h3>
                                <div className={styles['column-body']}>
                                    {newHouseItems.apartment.map(item => <Input
                                        key={item.name}
                                        type={item.type}
                                        placeholder={item.placeholder}
                                        onChange={formik.handleChange}
                                        name={item.name}
                                        value={formik.values[item.name]}
                                        border='border-all'
                                    />
                                    )}
                                </div>
                            </div>
                            <div className={styles['menu__column']}>
                                <h3 className='main-text main-text__18 main-text__600 secondary'>Price</h3>
                                <div className={styles['column-body']}>
                                    <Input border='border-all' onChange={formik.handleChange} type='number' placeholder='Min Price' value={formik.values.price} name='price' />
                                    <Input border='border-all' onChange={formik.handleChange} type='number' placeholder='Max Price' value={formik.values.salePrice} name='salePrice' />
                                </div>
                            </div>
                            <div className={styles['menu__column']}>
                                <h3 className='main-text main-text__18 main-text__600 secondary'>Description</h3>
                                <TextArea onChange={formik.handleChange} value={formik.values.description} placeholder='Description' name='description' />
                            </div>
                            <div className={`${styles['menu__column']} ${style['menu__column-flex']}`}>
                                <Input border='border-all' type='text' onChange={(e) => imgPathHandler(e)} value={info.path} placeholder='Add Image URL' />
                                <Button onClick={() => actionImgHandler('add')} size='size-medium' mode='mode-blue' className='main-text white'>Add</Button>
                                <div className={style['new-house__imgs']}>
                                    {info.imgs.map((img, index) => {
                                        return <div key={index || Date.now()}>
                                            <img src={img.imgPath} alt='house-pic' />
                                            <Button onClick={() => actionImgHandler('delete', index)}><SVG name='delete' width='20' height='20' mode='#f00' /></Button>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className={styles['menu__column']}>
                                <h3 className='main-text main-text__18 main-text__600 secondary'>Amenities</h3>
                                <div className={`${style['column-body__flex']}`}>
                                    {newHouseItems.amenities.map(item => <Checkbox
                                        key={item.name}
                                        onChange={formik.handleChange}
                                        name={item.name}
                                    >
                                        {item.title}
                                    </Checkbox>
                                    )}
                                </div>
                            </div>
                            <Button type='submit' size='size-medium' mode='mode-blue' className='main-text white'>
                                {id ? 'Updata' : 'Save'}
                            </Button>
                        </div>
                    </div>
                </Form>
            </div >
        </Layout>
    )
}

export default NewHouse;
