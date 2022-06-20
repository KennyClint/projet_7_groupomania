import { createGlobalStyle } from "styled-components";
import "./fonts.css";
import colors from "./colors.js";

const StyledGlobalStyle = createGlobalStyle`
#root {
    margin-right : 7em;
    margin-left : 7em;
}

* {
    font-family : latoregular, sans-serif;
}

h1 {
    color : ${colors.tertiary};
}

a {
    text-decoration : none;
    &:visited {
        color : black;
    }
}
`;

export default StyledGlobalStyle;