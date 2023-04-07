import styles from './index.module.scss';
import USER from '../../assets/img/nouser.jpeg'

import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import { useRequest } from '../../hooks';
import { Details, SectionWrapper, SVG, Slider } from '../../components/HelperComponents';
import { Button, Form } from '../../components/Generics';
import { Yandex } from '../../components/Sections';
import { mockDescription } from '../../mock';
import Layout from '../../components/Layout';
import { RootContext } from '../../context';
import { useNavigate } from 'react-router-dom/dist';
import { message } from 'antd';

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

const HouseItem = () => {

    const params = useParams();
    const request = useRequest();
    const navigate = useNavigate();
    const { isAuth } = useContext(RootContext);

    const [house, setHouse] = useState({});
    const [blur, setBlur] = useState(true);

    useEffect(() => {
        let lightbox = new PhotoSwipeLightbox({
            gallery: '#' + 'my-test-gallery',
            children: 'a',
            pswpModule: () => import('photoswipe'),
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
        };
    }, []);



    useEffect(() => {
        getDataList();
        getData();
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDataList = async () => {
        const res = await request({ url: `/houses/list` });
    }

    const getData = async () => {
        const response = await request({ url: `/houses/id/${params?.id}` });
        setHouse(response?.data);
        response?.data?.attachments.length > 5 && changeBlur();
    }

    const changeBlur = () => {
        setBlur(prev => !prev);
    }

    const likeHandler = async () => {
        if (!isAuth) {
            navigate('/login');
        } else {
            const response = await request({ url: `/houses/addFavourite/${params?.id}?favourite=true`, method: 'PUT', token: true });
            message.success(response?.message);
        }
    }

    return (
        <Layout>
            <div className={styles.house}>
                <div className={`container`}>
                    <div className={`pswp-gallery  ${styles.gallery}`} id='my-test-gallery'>
                        {(house?.attachments?.length > 5 && blur) ?
                            house.attachments?.slice(0, 5).map((image, index) => {
                                return index !== 4 ? <a
                                    href={image.imgPath}
                                    data-pswp-width='700'
                                    data-pswp-height='700'
                                    key={image.imgPath + '-' + index}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src={image.imgPath}
                                        alt=""
                                    />
                                </a> :
                                    <div
                                        key={image.imgPath + '-' + index}
                                        rel="noreferrer"
                                        onClick={changeBlur}
                                    >
                                        {index === 4 && blur && <p className={styles['house__stats']}>+{house?.attachments.length - 5}</p>}
                                        <img
                                            src={image.imgPath}
                                            alt=""
                                        />
                                    </div>
                            }) :
                            house.attachments?.map((image, index) => {
                                return <a
                                    href={image.imgPath}
                                    data-pswp-width='700'
                                    data-pswp-height='700'
                                    key={image.imgPath + '-' + index}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src={image.imgPath}
                                        alt=""
                                    />
                                </a>
                            })
                        }
                        {!blur && <Button
                            mode='mode-blue'
                            className='main-text main-text__14'
                            size='size-medium'
                            onClick={() => changeBlur()}
                        >
                            Show Less
                        </Button>
                        }

                    </div>
                    <div className={`${styles['house__info']} ${styles.info}`}>
                        <div className={`${styles['info__top']}`}>
                            <div className={`${styles['info__left']}`}>
                                <div className={`${styles['info__header']}`}>
                                    <div className={`${styles['info__address']}`}>
                                        <div className={`${styles['info__text']}`}>
                                            <h1 className={`main-text main-text__medium main-text__medium-bold main-text__dark ${styles['info__title']}`}>
                                                {house.name}
                                            </h1>
                                            <p className={`main-text main-text__medium main-text__gray`}>
                                                {`${house.address} ${house.city} ${house.region}`}
                                            </p>
                                        </div>
                                        <div className={`${styles['info__actions']}`}>
                                            <div>
                                                <Button onClick={likeHandler} size='button-circle' className={styles['card__btn']}>
                                                    <SVG name='love' width='15' height='15' />
                                                </Button>
                                                <p className='main-text main-text__small main-text__gray'>Save</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles['info__intro']}`}>
                                        <div className={`${styles['info__icons']}`}>
                                            <Details data={house?.houseDetails} svgMode='#696969' textColor='#696969' />
                                        </div>
                                        <div className={`${styles['info__price']}`}>
                                            <div className={`${styles['info__sale']}`}>
                                                <del className={`main-text main-text__gray main-text__gray`}>
                                                    {`$${house.price}/mo`}
                                                </del>
                                                <h3 className={`main-text main-text__medium main-text__medium-bold main-text__dark ${styles['info__title']}`}>
                                                    {`$${house.salePrice}/mo`}
                                                </h3>
                                            </div>
                                            <p className={`main-text main-text__medium main-text__gray`}>{house?.category?.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles['info__description']} ${styles.description}`}>
                                    <h4 className={`${styles['description__title']} ${styles['label']}`}>
                                        Description
                                    </h4>
                                    <p className={`main-text main-text__small main-text__gray ${styles['description__desc']}`}>
                                        <span>{mockDescription.part1}</span>
                                        <span>{mockDescription.part2}</span>
                                    </p>
                                </div>
                            </div>
                            <div className={`${styles['info__right']}`}>
                                <Form>
                                    <div className={`${styles['user-info']}`}>
                                        <div className={`${styles['user-info__img']}`}>
                                            <img src={USER} alt='user-pic' />
                                        </div>
                                        <div className={`${styles['user-info__body']}`}>
                                            <h4 className={`main-text main-text__bold main-text__medium-bold main-text__dark ${styles['user-info__title']}`}>
                                                {`${house?.user?.firstname} ${house?.user?.lastname}`}
                                            </h4>
                                            <a href={`mailto:${house?.user?.email}`} className={`main-text main-tex__16 thirdly ${styles['user-info__mail']}`}>
                                                <SVG name='email' mode='#696969' />
                                                <span>
                                                    Mail
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className={`${styles['container__body']}`}>
                            <div className={`${styles['info__location']} ${styles.location}`}>
                                <h4 className={`${styles['location__title']} ${styles['label']}`}>
                                    location
                                </h4>
                                <ul className={`${styles['location__list']}`}>
                                    <li className={`${styles['location__item']}`}>
                                        <span className={`main-text main-text__small main-text__medium-bold main-text__dark`}>Addres:</span>
                                        <span className={`main-text main-text__small main-text__gray`}>{house?.address}</span>
                                    </li>
                                    <li className={`${styles['location__item']}`}>
                                        <span className={`main-text main-text__small main-text__medium-bold main-text__dark`}>City:</span>
                                        <span className={`main-text main-text__small main-text__gray`}>{house?.city}</span>
                                    </li>
                                    <li className={`${styles['location__item']}`}>
                                        <span className={`main-text main-text__small main-text__medium-bold main-text__dark`}>Region:</span>
                                        <span className={`main-text main-text__small main-text__gray`}>{house?.region}</span>
                                    </li>
                                    <li className={`${styles['location__item']}`}>
                                        <span className={`main-text main-text__small main-text__medium-bold main-text__dark`}>State/Country:</span>
                                        <span className={`main-text main-text__small main-text__gray`}>{house?.country}</span>
                                    </li>
                                    <li className={`${styles['location__item']}`}>
                                        <span className={`main-text main-text__small main-text__medium-bold main-text__dark`}>Zip:</span>
                                        <span className={`main-text main-text__small main-text__gray`}>{house?.zipCode}</span>
                                    </li>
                                    <li className={`${styles['location__item']}`}>
                                        <span className={`main-text main-text__small main-text__medium-bold main-text__dark`}>Country:</span>
                                        <span className={`main-text main-text__small main-text__gray`}>{house?.country}</span>
                                    </li>
                                </ul>
                                <Yandex />
                            </div>
                        </div>
                    </div>
                </div>
                <SectionWrapper title='Similar Listings'>
                    <Slider type='three-cols' perView={3} />
                </SectionWrapper>
            </div>
        </Layout >
    )
}

export default HouseItem;