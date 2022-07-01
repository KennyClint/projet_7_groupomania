import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/icon-left-font.png";

const HeaderLogo = styled.img`
width : 430px;
height : 70px;
object-fit : cover;
object-position : -55px;
`;

const NavContainer = styled.nav`
display : flex;
justify-content : space-between;
align-items : center;
border-bottom : 1px solid black;
padding-top : 20px;
padding-bottom : 20px;
padding-left : 2em;
padding-right : 2em;
font-size : 1.1em;
`;

const StyledLink = styled(Link)`
text-transform : uppercase;
`;

function Headerhome ()
{
    return (
        <NavContainer>
            <Link to="/home"><HeaderLogo src={logo} alt="Logo de groupomania" /></Link>
            <StyledLink to="/">Déconnexion</StyledLink>
        </NavContainer>
    )
};

export default Headerhome;