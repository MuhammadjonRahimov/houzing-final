import styles from './index.module.scss';

import { Button } from '../../Generics';
import { SVG } from '../../HelperComponents';

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
    const pageNumbers = Array.from({ length: pages });

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1);
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
                disabled={currentPage === 0}
            >
                <SVG name='arrow' />
            </Button>
            {
                pageNumbers.map((_, index) =>
                    <Button
                        key={index}
                        size='size-small'
                        mode={`${index === currentPage ? 'mode-active' : 'mode-blue'}`}
                        radius='r2'
                        className='main-text main-text__16 white'
                        onClick={() => goToCurrentPage(index)}
                    >
                        {index + 1}
                    </Button>
                )
            }
            <Button
                size='size-small'
                mode='mode-secondary'
                radius='r2'
                className={styles['pagination__button-next']}
                onClick={nextPage}
                disabled={currentPage === pageNumbers.length - 1}
            >
                <SVG name='arrow' />
            </Button>
        </div>
    )
}

export default Pagination;