const UnList = ({ children, ...rest }) => {
    return (
        <ul {...rest}>
            {children}
        </ul>
    )
}

export default UnList;