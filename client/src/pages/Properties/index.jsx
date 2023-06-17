import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { Card, Pagination, SectionWrapper } from '../../components/HelperComponents';
import Layout from '../../components/Layout';
import { useRequest } from '../../hooks';
import { useLocation } from 'react-router-dom';
import { getPageCount } from '../../utils/pages';
import { NoData } from '../../components/Sections';

const Properties = () => {
    const request = useRequest();
    const [data, setData] = useState([]);

    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const { search } = useLocation();

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, search]);

    const getData = async () => {
        const response = await request({ url: `/houses/list${search}`, page: page, size: 6 });
        response && setData(response?.data);
        const totalCount = response?.map?.total_elements;
        setTotalPages(getPageCount(totalCount, 6))
    }
    return (
        <Layout>
            {data === null ? <NoData />
                :
                <SectionWrapper title='Properties'>
                    <div className={styles.properties}>
                        <div className={styles['properties__container']}>
                            {data?.map(item =>
                                <Card key={item?.id} data={item} />
                            )}
                        </div >
                    </div >
                    <Pagination
                        pages={totalPages}
                        currentPage={page}
                        setCurrentPage={setPage}
                    />
                </SectionWrapper>
            }
        </Layout>
    )
}

export default Properties;