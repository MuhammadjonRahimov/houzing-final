import styles from './index.module.scss';

const NoData = () => {
    return (
        <h3 className={`subtitle secondary ${styles['data-title']}`}>No Data Found</h3>
    )
}

export default NoData;