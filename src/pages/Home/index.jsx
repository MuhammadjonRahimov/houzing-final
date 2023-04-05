import Layout from '../../components/Layout';
import { Banner, Categories, Popular, Recent, Recomended, Testimonial, Why } from '../../components/Sections';
const Home = () => {
    return (
        <Layout>
            <Banner />
            <Recomended />
            <Why />
            <Categories />
            <Popular />
            <Recent />
            <Testimonial />
        </Layout>
    )
}

export default Home;