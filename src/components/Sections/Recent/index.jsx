import { SectionWrapper, Slider } from "../../HelperComponents";

const Recent = () => {
    return (
        <SectionWrapper title='Recent Properties for Rent'>
            <Slider type='three-cols' perView={3} space='20' />
        </SectionWrapper>
    )
}

export default Recent;