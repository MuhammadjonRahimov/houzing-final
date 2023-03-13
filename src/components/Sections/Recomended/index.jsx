import { SectionWrapper, Slider } from "../../HelperComponents";

const Recomended = () => {
    return (
        <SectionWrapper title='Recomended'>
            <Slider type='three-cols' perView={3} space='20' />
        </SectionWrapper>
    )
}

export default Recomended;