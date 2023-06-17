import { SectionWrapper, Slider } from "../../HelperComponents"

const Testimonial = () => {
    return (
        <SectionWrapper title='Testimonial' blue={true}>
            <Slider type='testimonial' perView={3} />
        </SectionWrapper>
    )
}

export default Testimonial;