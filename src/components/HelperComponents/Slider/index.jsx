import styles from './index.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper';

import { useEffect, useState } from 'react';
import { useRequest } from '../../../hooks';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, Details, SVG } from '../../HelperComponents';
import { Button } from '../../Generics';
import { Link } from 'react-router-dom';

import noUser from '../../../assets/img/nouser.jpeg';

const icons = [
    { name: 'dom', path: '/img/dom.jpg' },
    { name: 'office', path: '/img/office.jpg' },
    { name: 'flat', path: '/img/house1.png' },
    { name: 'villa', path: '/img/villa.jpg' },
    { name: 'cottage', path: '/img/house2.png' },
    { name: 'roommate', path: '/img/apartment.jpg' },
    { name: 'dom', path: '/img/dom.jpg' },
    { name: 'office', path: '/img/office.jpg' },
    { name: 'flat', path: '/img/house1.png' },
]


const Slider = ({ type = 'single', perView = 1, navigate = true, auto = false }) => {
    const request = useRequest();
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await request({ url: type === 'categories' ? '/categories/list' : '/houses/list' });
        response && setSlides(response?.data);
    }

    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            navigation={navigate}
            spaceBetween={20}
            breakpoints={perView > 1 && {
                767: {
                    slidesPerView: 2,
                },
                1440: {
                    slidesPerView: perView || 3,
                }
            }}
            autoplay={auto && {
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                delay: '5000',
            }}
        >
            {slides.map((slide, index) => {
                return type === 'single' ?
                    <SwiperSlide className={`shadow ${styles['swiper-center']}`} key={slide?.id}>
                        <div className={styles.swiper}>
                            <div className={styles['swiper__body']}>
                                <h2 className={`title white ${styles['swiper__title']}`}>
                                    {slide?.description?.slice(0, 30) || 'Something about the House'}
                                </h2>
                                <p className={`main-text main-text__16 white ${styles['swiper__desc']}`}>
                                    {`${slide?.address} ${slide?.city} ${slide?.country}`}
                                </p>
                                <Details data={slide?.houseDetails} />
                                <h3 className={`subtitle white ${styles['swiper__subtitle']}`}>$ {slide?.price.toLocaleString()}</h3>
                                <Button
                                    className={`main-text main-text__14 white ${styles['swiper__btn']}`}
                                    radius='r2'
                                    border='border-white'
                                    size='size-big'
                                >
                                    Read more
                                </Button>
                            </div>
                        </div >
                        <img className={styles['swiper__img']} src={slide.attachments[0]?.imgPath} />
                    </SwiperSlide> :
                    type === 'three-cols' ?
                        <SwiperSlide key={slide?.id}>
                            <Card data={slide} />
                        </SwiperSlide>
                        :
                        type === 'categories' ?
                            <SwiperSlide key={slide?.id}>
                                <Link to={`/properties/${slide?.id}`} className={`${styles['categories__column']}`}>
                                    <div className={`${styles['categories__icon']}`}><SVG name={icons[index]?.name} /></div >
                                    <img className={`${styles['categories__img']}`} src={icons[index]?.path} alt={icons[index]?.name} />
                                    <div className='shadow'></div>
                                </Link>
                            </SwiperSlide> :
                            type === 'testimonial' ?
                                <SwiperSlide key={slide?.id}>
                                    <div className={`${styles.testimonial}`}>
                                        <div className={`${styles['testimonial__description']}`}>
                                            <p className='main-text main-text__16 thirdly'>
                                                {slide?.description ||
                                                    "I believe in lifelong learning and Skola is a great place to learn from experts. I've learned a lot and recommend it to all my friends "}
                                            </p>
                                            <img className='shadow' src={noUser} alt='user-pic' />
                                        </div>
                                        <div className={`${styles['testimonial__user']}`}>
                                            <h4 className={`main-text main-text__16 main-text__600 secondary`}>{`${slide?.user?.firstname} ${slide?.user?.lastname}`}</h4>
                                        </div>
                                    </div>
                                </SwiperSlide> :
                                <SwiperSlide className={`shadow ${styles['swiper-center']}`} key={slide?.id}>
                                    <div className={styles.swiper}>
                                        <div className={styles['swiper__body']}>
                                            <h2 className={`title white ${styles['swiper__title']}`}>
                                                {slide?.description?.slice(0, 30) || 'Something about the House'}
                                            </h2>
                                            <Button
                                                className={`main-text main-text__14 white ${styles['swiper__btn']}`}
                                                radius='r2'
                                                border='border-blue'
                                                size='size-big'
                                                mode='mode-blue'
                                            >
                                                Read more
                                            </Button>
                                        </div>
                                    </div >
                                    <img className={styles['swiper__img']} src={slide.attachments[0]?.imgPath} />
                                </SwiperSlide>
            }
            )}
        </Swiper>
    )
}

export default Slider;