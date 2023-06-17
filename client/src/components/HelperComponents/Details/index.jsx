import styles from './index.module.scss';

import { ListItem, UnList } from "../../Generics"
import { SVG } from '../../HelperComponents';

const Details = ({ data = {}, svgMode = '#fff', textColor = 'white' }) => {

    let details = [];
    for (let elem of Object.entries(data)) {
        details.push({ name: elem[0], value: elem[1] });
    }
    details = details.filter(detail => {
        return detail.name !== 'yearBuilt' &&
            detail.name !== 'room' &&
            detail.name !== "createdAt" &&
            detail.name !== "updateAt" &&
            detail.name !== "createdBy" &&
            detail.name !== "updateBy" &&
            detail.name !== "id";
    });

    return (
        <UnList className={styles.details}>
            {details?.map(detail =>
                <ListItem className={styles.detail} key={detail.name}>
                    <SVG name={detail?.name} mode={svgMode} />
                    <p className={`main-text main-text__16 ${textColor}`}>
                        {detail?.value} {detail?.name}
                    </p>
                </ListItem >
            )}
        </UnList >
    )
}

export default Details;