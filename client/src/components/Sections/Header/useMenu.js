import styles from './index.module.scss';
import navbar from '../../../utils/navbar';
import { Link } from 'react-router-dom';

const useMenu = () => {
    const items = navbar.map(route => ({
        label: <Link to='/my-profile' className={`main-text main-text__14 secondary ${styles['menu__link ']}`}>{route.title}</Link >,
        id: route.id(),
    }))
    return <ul>
        {items}
    </ul>;
}
export default useMenu;