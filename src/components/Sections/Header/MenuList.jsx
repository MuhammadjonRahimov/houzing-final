import styles from './index.module.scss';
import { UnList, ListItem } from '../../Generics';
import { NavLink } from 'react-router-dom';
import navbar from '../../../utils/navbar';

const MenuList = () => {
    return (
        <UnList className={styles['header__list']}>
            {navbar.map(({ path, title, id }) =>
                <ListItem className={styles['header__item']} key={id()}>
                    <NavLink
                        className={`main-text white main-text__16
                        ${styles['header__link']}`}
                        to={path}
                    >
                        {title}
                    </NavLink>
                </ListItem>)}
        </UnList>
    )
}

export default MenuList;