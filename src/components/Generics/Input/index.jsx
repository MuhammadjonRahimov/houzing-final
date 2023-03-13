import styles from './index.module.scss';

const Input = ({ type = 'input', border, space, ...rest }) => {
    let style = `
        ${styles.input}
        ${styles[`input__${border}`]}
        ${styles[`input__${space}`]}
    `;

    style = style.replaceAll('undefined', '');

    return (
        <input
            type={type}
            className={style}
            {...rest}
        />
    )
}

export default Input;