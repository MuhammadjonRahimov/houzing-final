import styles from './index.module.scss';
import { Header, Footer, Filter } from '../Sections';
import { useRef } from 'react';


const Layout = ({ children, centered = false }) => {
    const pathname = window.location.pathname;
    const isFilterHidden = pathname !== '/properties';

    const headerRef = useRef();
    const scrollToTop = () => {
        headerRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className={styles.layout}>
            <Header scrollRef={headerRef} />
            {!isFilterHidden && <Filter />}
            <main className={`${styles['layout__main']} ${centered ? styles['layout__centered'] : ''}`}>
                {children}
            </main>
            <Footer scrollHandler={scrollToTop} />
        </div>
    );
}

export default Layout;