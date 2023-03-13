import styles from './index.module.scss';
import { Details, SVG } from '../../HelperComponents';
import { Button } from '../../Generics';

import homeImg from '../../../assets/img/no-home-img.png';
import noUser from '../../../assets/img/nouser.jpeg';

const Card = ({ data }) => {
    return (
        <div className={` ${styles.card}`}>
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
                        <del className='main-text main-text__14 thirdly'>$ {data?.price}</del>
                        <p className='main-text main-text__16 main-text__600 secondary'>$ {data?.salePrice}</p>
                    </div>
                    <div className={styles['footer__right']}>
                        <Button radius='circle' size='size-small'>
                            <SVG name='resize' />
                        </Button>
                        <Button radius='circle' size='size-small' mode='mode-smoke'>
                            <SVG name='love' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;