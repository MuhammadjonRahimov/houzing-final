import { SectionWrapper, Slider } from "../../HelperComponents"

const Categories = () => {
    return (
        <SectionWrapper title='Categories'>
            <Slider type='categories' perView={4} />
        </SectionWrapper>
    )
}

export default Categories;