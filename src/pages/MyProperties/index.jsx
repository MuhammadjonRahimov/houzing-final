import styles from './index.module.scss';

import Layout from '../../components/Layout';
import { Table, message } from 'antd';
import { useRequest, useSearch } from '../../hooks';
import { Button } from '../../components/Generics';
import { SVG } from '../../components/HelperComponents';
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query';

const MyProperties = () => {
    const request = useRequest();
    const navigate = useNavigate();
    const search = useSearch();

    const goToNewHouse = () => {
        navigate('/my-profile');
    }

    const { data, refetch } = useQuery([search], () => {
        return request({ url: '/houses/me', token: true });
    });

    const deleteHandler = id => {
        request({ url: `/houses/${id}`, method: 'DELETE', token: true })
            .then(res => {
                if (res.success) {
                    message.success(res?.message);
                    refetch();
                }
            })
    }

    const columns = [
        {
            title: 'Listing title',
            key: 'attachments',
            render: data => <div className={styles['my-properties__details']}>
                <Link to={`/properties/${data?.id}`} className={styles['my-properties__img']}>
                    <img className={styles['my-properties__img']} src={data?.attachments && data?.attachments[0]?.imgPath} alt='home-pic' />
                    <span className={styles['my-properties__feat']}>featured</span>
                </Link>
                <div className={styles['my-properties__body']}>
                    <div className={styles.top}>
                        <h3 className={`main-text main-text__14 main-text__600 secondary ${styles['my-properties__subtitle']}`}>
                            {data?.description}
                        </h3>
                        <p className={`main-text thirdly ${styles['my-properties__subtitle']}`}>
                            {data?.address} {data?.region} {data?.city} {data?.country}
                        </p>
                    </div>
                    <div className={styles.bottom}>
                        <p className={`main-text main-text__12 thirdly`}><del>$ {data?.price}</del></p>
                        <p className={`secondary main-text__14 main-text__600 `}>$ {data?.salePrice}</p>
                    </div>
                </div>
                <span className={`${styles['my-properties__feat']} ${styles['my-properties__feat-dark']}`}>for sale</span>

            </div>
        },
        {
            title: 'Year Build',
            key: 'houseDetails?.yearBuilt',
            render: (data) => <p className={`main-text thirdly ${styles.center}`}>{data?.houseDetails?.yearBuilt}</p>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <p className={`main-text thirdly ${styles.center}`}>{status ? 'pending' : 'fullfilled'}</p>,
        },
        {
            title: 'ZipCode',
            dataIndex: 'zipCode',
            key: 'zipCode',
            render: (zipCode) => <p className={`main-text thirdly ${styles.center}`}>{zipCode || 'no code'}</p>,
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (id) =>
                <div className={styles['my-properties__action']}>
                    <Button size='size-extra-small' onClick={() => navigate(`/my-profile/edithouse/${id}`)}><SVG name='edit' /></Button>
                    <Button size='size-extra-small' onClick={() => deleteHandler(id)}><SVG name='delete' /></Button>
                </div>,
        },
    ]

    return (
        <Layout>
            <section className={styles['my-properties']}>
                <div className='container'>
                    <div className={styles['my-properties__top']}>
                        <h1 className={`subtitle`}>My Properties</h1>
                        <Button onClick={goToNewHouse} size='button-medium' mode='button-blue' className='main-text white'>
                            Add House
                        </Button>
                    </div>
                    <Table columns={columns} dataSource={data?.data} />
                </div>
            </section>
        </Layout>
    )
}

export default MyProperties;