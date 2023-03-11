import styles from './index.module.scss';
import { ListItem, UnList, Button } from "../../Generics";
import { SVG } from "../../HelperComponents";

const mediaArr = ['facebook', 'twitter', 'instagram', 'linkedIn'];

const MediaList = () => {
    return (
        <UnList className={styles['header__media']}>
            {mediaArr.map(media =>
                <ListItem key={media}>
                    <Button size='size-extra-small' radius='2r'>
                        <a href="#">
                            <SVG name={media} mode="#0d263b" />
                        </a>
                    </Button>
                </ListItem>
            )}
        </UnList>
    )
}

export default MediaList;