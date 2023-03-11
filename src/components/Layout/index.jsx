import styles from './index.module.scss';
import { Header, Footer } from '../Sections';
import { useRef } from 'react';

const Layout = ({ children }) => {
    const headerRef = useRef();

    const scrollToTop = () => {
        headerRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <>
            <Header scrollRef={headerRef} />
            <main className={styles['layout__main']}>
                {children}
            </main>
            <Footer scrollHandler={scrollToTop} />
        </>
    );
}

export default Layout;