import styles from './index.module.scss';

import { SectionWrapper, SVG } from "../../HelperComponents"
const whyArr = [
    { title: 'Trusted By Thousands', svg: 'trust' },
    { title: 'Wide Renge Of Properties', svg: 'renge' },
    { title: 'Financing Made Easy', svg: 'calculator' },
    { title: 'See Neighborhoods', svg: 'maps' },
]

const Why = () => {
    return (
        <SectionWrapper title='Why Choose Us' blue={true}>
            <div className={styles.why}>
                {whyArr.map(item =>
                    <div key={item.svg} className={styles['why__column']}>
                        <div className={styles['why__icon']}>
                            <SVG name={item.svg} />
                        </div>
                        <div className={styles['why__body']}>
                            <h3 className={`main-text main-text__600 main-text__18 secondary ${styles['why__title']}`}>{item.title}</h3>
                            <p className={`main-text main-text__16 thirdly`}>
                                With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </SectionWrapper>
    )
}

export default Why;