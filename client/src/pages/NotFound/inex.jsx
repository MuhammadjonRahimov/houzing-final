import styles from './index.module.scss';
import Layout from '../../components/Layout';
import NOTFOUND from '../../assets/img/not-found.jpg';

const NotFound = () => {
    return (
        <Layout>
            <div className={styles['img-wrapper']}>
                <img src={NOTFOUND} alt="img-not-found" />
            </div>
        </Layout>
    )
}

export default NotFound;