import styles from './index.module.scss';

import { useEffect, useState } from 'react';
import { Card, SectionWrapper } from '../../components/HelperComponents';
import { useRequest } from '../../hooks';
import Layout from '../../components/Layout';
import { NoData } from '../../components/Sections';

const Favourite = () => {
    const request = useRequest();
    const [favourites, setFavourites] = useState([]);

    const getFavourites = async () => {
        const response = await request({ url: '/houses/getAll/favouriteList', token: true });
        response && setFavourites(response?.data);
    }

    useEffect(() => {
        getFavourites();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            {favourites?.length === 0 ? <NoData /> :
                <SectionWrapper title='Favourite'>
                    <div className={styles.favourite}>
                        {favourites.map(favourite => <Card key={favourite?.id} data={favourite} fn={getFavourites} />)}
                    </div>
                </SectionWrapper>
            }
        </Layout>
    )
}

export default Favourite;