const uzeReplace = (query, value) => {
    const url = new URL(window.location.href);
    url.searchParams.set(query, value);

    if (!value && value.length < 1) {
        url.searchParams.delete(query);
    }
    return url;
}

export default uzeReplace;