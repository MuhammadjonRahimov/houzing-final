import Layout from '../../components/Layout';
import { Banner, Popular, Recent, Recomended } from '../../components/Sections';

const Home = () => {
    return (
        <Layout>
            <Banner />
            <Recomended />
            <Popular />
            <Recent />
        </Layout>
    )
}

export default Home;