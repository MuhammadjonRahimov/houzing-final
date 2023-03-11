import svgs from "./svg";

const SVG = ({ name, width, height, mode }) => {
    return svgs[name] && svgs[name].getIcon(width, height, mode);
}

export default SVG;