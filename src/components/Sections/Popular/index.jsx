import { Slider } from '../../HelperComponents';

const Popular = () => {
    return (
        <section >
            <Slider type='popular' navigate={false} auto={true} center={true} />
        </section>
    )
}

export default Popular;