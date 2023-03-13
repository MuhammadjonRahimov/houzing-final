import { Card, SectionWrapper } from '../../components/HelperComponents';
import Layout from '../../components/Layout';
import { Banner, Popular } from '../../components/Sections';

const Home = () => {
    return (
        <Layout>
            <Banner />
            {/* <Popular /> */}
            <SectionWrapper title='Recomended'>
                <Card />
            </SectionWrapper>
        </Layout>
    )
}

export default Home;