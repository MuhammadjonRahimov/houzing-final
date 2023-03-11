import styles from './index.module.scss';

const Button = ({ children, className, type = 'button', mode, size, border, radius, shadow = false, ...rest }) => {

    let style = `
    ${styles.button}
    ${styles[`button__${mode}`]}
    ${styles[`button__${size}`]}
    ${styles[`button__${border}`]}
    ${styles[`button__${radius}`]}
`;
    style = style.replaceAll('undefined', '');

    return (
        <button
            type={type}
            className={`${style} ${className}`}
            {...rest}
        >
            {children}
        </button>
    )
}
export default Button;