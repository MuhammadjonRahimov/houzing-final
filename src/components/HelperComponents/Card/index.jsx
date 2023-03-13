import styles from './index.module.scss';
import { Details, SVG } from '../../HelperComponents';
import { Button } from '../../Generics';

import homeImg from '../../../assets/img/no-home-img.png';
import noUser from '../../../assets/img/nouser.jpeg';

const Card = ({ data }) => {
    return (
        <div className={`shadow-relative ${styles.card}`}>
            <div className={styles['card__img']}>
                <img src={homeImg} alt="house-pic" />
                <img src={noUser} alt="user-pic" className={`${styles['card__user']}`} />
            </div>
            <div className={styles['card__body']}>
                <h3 className={`main-text main-text__16 main-text__600 secondary`}>Title</h3>
                <p className={`main-text main-text__14 thirdly`}>Desc</p>
                {/* <Details data={data} /> */}
                <div className={styles.footer}>
                    <div className={styles['footer__left']}>
                        <del className='main-text main-text__14 thirdly'>$ price</del>
                        <p className='main-text main-text__16 main-text__600 secondary'>$ Sale price</p>
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