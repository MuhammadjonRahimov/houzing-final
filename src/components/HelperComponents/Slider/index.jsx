import styles from './index.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper';

import { useEffect, useState } from 'react';
import { useRequest } from '../../../hooks';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Details } from '../../HelperComponents';
import { Button } from '../../Generics';


const Slider = ({ path, type, perView = 1, navigate = true, auto = false }) => {
    const request = useRequest();
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await request({ url: path || '/houses/list' });
        response && setSlides(response?.data);
    }
    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={perView}
            navigation={navigate}
            autoplay={auto && {
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                delay: '5000',
            }}
        >
            {slides.map(slide => {
                return type === 'popular' ?
                    <SwiperSlide className={`shadow ${styles['swiper-container']}`} key={slide?.id}>
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
                    </SwiperSlide> :
                    <SwiperSlide className={`shadow ${styles['swiper-container']}`} key={slide?.id}>
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
                    </SwiperSlide>
            }
            )}
        </Swiper>
    )
}

export default Slider;