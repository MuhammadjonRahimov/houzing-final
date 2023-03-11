import { Button } from '../../Generics';
import { SVG } from '../../HelperComponents';
import styles from './index.module.scss';

const Footer = ({ scrollHandler }) => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles['footer__row']}`}>
                <p className={`main-text white main-text__14 ${styles['footer__desc']}`}>
                    Copyright © 2023 CreativeLayers. All Right Reserved.
                </p>
                <Button onClick={scrollHandler} className={styles['footer__btn']} mode='mode-blue' radius='r2' size='size-small'>
                    <SVG name='arrow' />
                </Button>
            </div>
        </footer>
    );
}

export default Footer;