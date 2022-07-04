import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/icon-left-font.png";
import "../../utils/style/responsive/Headerlogin.css";

const NavContainer = styled.nav`
display : flex;
justify-content : space-between;
align-items : center;
border-bottom : 1px solid black;
padding-top : 20px;
padding-bottom : 20px;
padding-left : 2em;
padding-right : 2em;
& div 
{
    & a
    {
        font-size : 1.1em;
        margin-left : 2em;
    }
}
`;

const LogoLink = styled(Link)`
width : 345px;
height : 70px;
overflow : hidden;
`;

const HeaderLogo = styled.img`
width : 430px;
height : 70px;
object-fit : cover;
margin-left : -55px;
`;

const StyledLink = styled(Link)`
text-transform : uppercase;
`;

function Headerlogin ()
{
    return (
        <NavContainer className="navContainer" >
            <LogoLink to="/"><HeaderLogo src={logo} alt="Logo de groupomania" /></LogoLink>
            <div>
            <StyledLink to="/">Connexion</StyledLink>
            <StyledLink to="/signup">S'inscrire</StyledLink>
            </div>
        </NavContainer>
    )
};

export default Headerlogin;