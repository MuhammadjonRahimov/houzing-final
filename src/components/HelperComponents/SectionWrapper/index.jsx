import styles from './index.module.scss';

const SectionWrapper = ({ children, title, blue = false }) => {
    return (
        <section className={`${styles.section} ${blue ? styles['section__blue'] : ''}`}>
            <div className='container'>
                <div className={styles['section__top']}>
                    <h2 className={`subtitle secondary ${styles['section__title']}`}>{title}</h2>
                    <p className={`main-text thirdly main-text__16 ${styles['section__desc']}`}>Nulla quis curabitur velit volutpat auctor bibendum consectetur sit.</p>
                </div>
                {children}
            </div >
        </section>
    )
}

export default SectionWrapper;