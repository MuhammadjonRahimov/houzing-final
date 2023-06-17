import styles from './index.module.scss';
import { Details, SVG } from '../../HelperComponents';
import { Button } from '../../Generics';

import homeImg from '../../../assets/img/no-home-img.png';
import noUser from '../../../assets/img/nouser.jpeg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { RootContext } from '../../../context/index';
import { useRequest } from '../../../hooks';
import { message } from 'antd';

const Card = ({ data, fn }) => {
    const { isAuth } = useContext(RootContext);
    const navigate = useNavigate();
    const request = useRequest();
    const { pathname } = useLocation();

    const option = pathname === '/favourite' ? !data?.favorite : 'true';

    const likeHandler = async (e) => {
        e.preventDefault();
        if (isAuth) {
            const response = await request({ url: `/houses/addFavourite/${data?.id}?favourite=${option}`, method: 'PUT', token: true });
            message.success(!option ? 'House removed from favourite list' : response?.message);
            pathname === '/favourite' && await fn();
        } else {
            navigate('/login');
        }
    }
    return (
        <Link to={`/properties/${data?.id}`} className={` ${styles.card}`}>
            <div className={styles['card__img']}>
                <img src={data?.attachments[0]?.imgPath || homeImg} alt="house-pic" />
                <img title={`${data?.user?.firstname} ${data?.user?.lastname}`} src={noUser} alt="user-pic" className={`${styles['card__user']}`} />
            </div>
            <div className={styles['card__body']}>
                <h3 className={`main-text main-text__16 main-text__600 secondary`}>{data?.description || 'Sth about the house'}</h3>
                <p className={`main-text main-text__14 thirdly`}>{`${data?.address} ${data?.city} ${data.country}`}</p>
                <Details data={data?.houseDetails} svgMode='#696969' textColor='secondary' />

                <div className={styles.footer}>
                    <div className={styles['footer__left']}>
                        <del className='main-text main-text__14 thirdly'>$ {data?.price.toLocaleString()}</del>
                        <p className='main-text main-text__16 main-text__600 secondary'>$ {data?.salePrice.toLocaleString()}</p>
                    </div>
                    <div className={styles['footer__right']}>
                        <Button radius='circle' size='size-small' mode={pathname === '/favourite' ? 'mode-red' : 'mode-smoke'} data-house-id={data?.id} onClick={likeHandler}>
                            <SVG name='love' mode={pathname === '/favourite' ? "#fff" : ''} />
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card;