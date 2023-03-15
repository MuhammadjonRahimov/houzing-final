import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { Card, Pagination, SectionWrapper } from '../../components/HelperComponents';
import Layout from '../../components/Layout';
import { useRequest, useSearch } from '../../hooks';
import { useLocation } from 'react-router-dom';

const Properties = () => {
    const request = useRequest();
    const [data, setData] = useState([]);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const { search } = useLocation();

    useEffect(() => {
        getData();
    }, [search, currentPage])

    const getData = async () => {
        const response = await request({ url: '/houses/list', size: 6, page: currentPage });
        response && setData(response?.data);
        response && setPages(response?.map.total_pages);
    }
    return (
        <Layout>
            <SectionWrapper title='Properties'>
                <div className={styles.properties}>
                    <div className={styles['properties__container']}>
                        {data?.map(item =>
                            <Card key={item?.id} data={item} />
                        )}
                    </div >
                </div >
                <Pagination
                    route='properties'
                    size='6'
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pages={pages}
                />
            </SectionWrapper>
        </Layout>
    )
}

export default Properties;