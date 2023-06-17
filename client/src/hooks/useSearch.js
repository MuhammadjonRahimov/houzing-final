import { useLocation } from "react-router";

const useSearch = () => {
    const { search } = useLocation();
    return new URLSearchParams(search);
}
export default useSearch;