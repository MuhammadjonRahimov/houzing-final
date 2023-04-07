import navbar from '../../../utils/navbar';

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