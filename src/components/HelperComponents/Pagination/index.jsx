import styles from './index.module.scss';

import { Button } from '../../Generics';
import { SVG } from '../../HelperComponents';
import { Link, useNavigate } from 'react-router-dom';
import { useSearch } from '../../../hooks';


const Pagination = ({ route, setCurrentPage, currentPage, pages, size }) => {
    const pageNumbers = Array.from({ length: pages - 1 });
    const navigate = useNavigate();

    const nextPage = () => {
        if (currentPage < pages) {
            setCurrentPage(currentPage + 1);
            navigate(`/${route}?page=${currentPage + 1}&size=${size}`)
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            navigate(`/${route}?page=${currentPage - 1}&size=${size}`)
        }
    }

    const goToCurrentPage = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className={styles.pagination}>
            <Button
                size='size-small'
                mode='mode-secondary'
                radius='r2'
                className={styles['pagination__button-prev']}
                onClick={prevPage}
                disabled={currentPage === 1}
            >
                <SVG name='arrow' />
            </Button>
            {
                pageNumbers.map((_, index) =>
                    <Link to={`/${route}?page=${index + 1}&size=${size}`} key={index}>
                        <Button
                            size='size-small'
                            mode={`${index + 1 === currentPage ? 'mode-active' : 'mode-blue'}`}
                            radius='r2'
                            className='main-text main-text__16 white'
                            onClick={() => goToCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </Button>
                    </Link>
                )
            }
            <Button
                size='size-small'
                mode='mode-secondary'
                radius='r2'
                className={styles['pagination__button-next']}
                onClick={nextPage}
                disabled={currentPage === pageNumbers.length}
            >
                <SVG name='arrow' />
            </Button>
        </div>
    )
}

export default Pagination;