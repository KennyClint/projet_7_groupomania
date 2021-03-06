import { createGlobalStyle } from "styled-components";
import "./fonts.css";
import colors from "./colors.js";

const StyledGlobalStyle = createGlobalStyle`
#root {
    margin : auto;
}

* {
    font-family : latoregular, sans-serif;
}

h1 {
    color : ${colors.tertiary};
}

h2 {
    font-weight : normal;
}

a {
    text-decoration : none;
    color : black;
    &:visited {
        color : black;
    }
}
`;

export default StyledGlobalStyle;