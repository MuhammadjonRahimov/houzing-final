const ListItem = ({ children, ...rest }) => {
    return (
        <li {...rest}>
            {children}
        </li>
    )
}

export default ListItem;