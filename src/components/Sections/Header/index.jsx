import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';

import { RootContext } from '../../../context/index';
import { Button } from '../../Generics';
import { SVG } from '../../HelperComponents';
import MenuList from './MenuList';
import MediaList from './MediaList';

const Header = ({ scrollRef }) => {
    const { isAuth } = useContext(RootContext);
    const [hidden, setHidden] = useState(false);

    const handleHidden = () => {
        setHidden(!hidden);
    }

    return (
        <header ref={scrollRef} className={styles.header}>
            <div className={`container ${styles['header__row']}`}>
                <Button onClick={handleHidden} className={styles['header__menu-btn']} size='size-small'>
                    <SVG name='menu' />
                </Button>
                <Link to='/' className={styles['header__logo']}>
                    <SVG name='logo' width='30' height='36' mode='#fff' />
                    <p className='main-text white main-text__600 main-text__16'>Houzing</p>
                </Link>
                <nav className={`${styles['header__menu']} ${hidden ? styles['not-hidden'] : ''}`}>
                    <Button onClick={handleHidden} className={styles['header__close-btn']} size='size-small'>
                        <SVG name='close' />
                    </Button>
                    <MenuList />
                    <MediaList />
                </nav>
                {isAuth ?
                    <Button size='size-small' radius='circle'>
                        <SVG name='user' width='24' height='24' mode='#fff' />
                    </Button>
                    :
                    <Button
                        className='main-text main-text__14 white'
                        size='size-medium-small'
                        radius='r2'
                        border='border-white'
                    >
                        Login
                    </Button>
                }
            </div>
        </header>
    );
}

export default Header;