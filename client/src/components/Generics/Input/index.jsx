import { forwardRef } from 'react';
import styles from './index.module.scss';

const Input = forwardRef(({ type = "input", border, space, className, ...rest }, ref) => {

    let style = `
            ${styles.input}
            ${styles[`input__${border}`]}
            ${styles[`input__${space}`]}
    `;

    style = style.replaceAll('undefined', '');

    return (
        <input
            ref={ref}
            type={type || 'input'}
            className={`${style} ${className}`}
            {...rest}
        />
    )
})

export default Input;