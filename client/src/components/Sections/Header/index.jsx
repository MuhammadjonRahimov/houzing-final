import styles from './index.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import { RootContext } from '../../../context/index';
import { Button } from '../../Generics';
import { SVG } from '../../HelperComponents';
import MenuList from './MenuList';
import MediaList from './MediaList';
import { Dropdown } from 'antd';
import useMenu from './useMenu';
import navbar from '../../../utils/navbar';

const Header = ({ scrollRef }) => {
    useMenu()

    const { isAuth, user, logOut } = useContext(RootContext);
    const [hidden, setHidden] = useState(false);
    const navigate = useNavigate();

    const handleHidden = () => {
        setHidden(!hidden);
    }

    const goToLoginPage = () => {
        navigate('/login');
    }

    const items = navbar.map(route => route.forMenu && ({
        label: <Link
            to={route.path}
            className={`main-text main-text__14 secondary`}
            onClick={route.title === 'Login' && logOut}
        >
            {route.title === 'Login' ? 'Log out' : route.title}
        </Link >,
        id: route.id(),
    })).reverse();

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
                    <Dropdown menu={{ items }} trigger='onclick' placement='bottomRight'>
                        <Button size='size-small' radius='circle' title={user}>
                            <SVG name='user' width='24' height='24' mode='#fff' />
                        </Button>
                    </Dropdown>
                    :
                    <Button
                        className='main-text main-text__14 white'
                        size='size-medium-small'
                        radius='r2'
                        border='border-white'
                        onClick={goToLoginPage}
                    >
                        Login
                    </Button>
                }
            </div>
        </header>
    );
}

export default Header;