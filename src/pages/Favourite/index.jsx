import styles from './index.module.scss';

import { useEffect, useState } from 'react';
import { Card, SectionWrapper } from '../../components/HelperComponents';
import { useRequest } from '../../hooks';
import { useQuery } from 'react-query';
import Layout from '../../components/Layout';

const Favourite = () => {
    const request = useRequest();
    const [favourites, setFavourites] = useState([]);

    const getFavourites = async () => {
        const response = await request({ url: '/houses/getAll/favouriteList', token: true });
        response && setFavourites(response?.data);
    }

    // const {refetch, data} = useQuery(
    //     [search],
    //     () => {
    //     },
    //     {
    //         onSuccess: res => {

    //         }
    //     }
    //     )

    useEffect(() => {
        getFavourites();
    }, []);

    return (
        <Layout>
            <SectionWrapper title='Favourite'>
                <div className={styles.favourite}>
                    {favourites.map(favourite => <Card key={favourite?.id} data={favourite} fn={getFavourites} />)}
                </div>
            </SectionWrapper>
        </Layout>
    )
}

export default Favourite;