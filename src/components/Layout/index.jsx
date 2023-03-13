import styles from './index.module.scss';
import { Header, Footer } from '../Sections';
import { useRef } from 'react';
import { useRequest } from '../../hooks';

const Layout = ({ children }) => {
    const headerRef = useRef();

    const scrollToTop = () => {
        headerRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className={styles.layout}>
            <Header scrollRef={headerRef} />
            <main className={styles['layout__main']}>
                {children}
            </main>
            <Footer scrollHandler={scrollToTop} />
        </div>
    );
}

export default Layout;