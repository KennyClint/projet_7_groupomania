import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/icon-left-font.png";

const HeaderLogo = styled.img`
width : 430px;
height : 70px;
object-fit : cover
`;

const NavContainer = styled.nav`
display : flex;
justify-content : space-between;
align-items : center;
border-bottom : 1px solid black;
padding-top : 20px;
padding-bottom : 20px;
& div 
{
    margin-right : 4em;
    & a
    {
        margin-left : 2em; 
    }
}
`;

const StyledLink = styled(Link)`
text-transform : uppercase;
`;

function Headerlogin ()
{
    return (
        <NavContainer>
            <Link to="/"><HeaderLogo src={logo} alt="Logo de groupomania" /></Link>
            <div>
            <StyledLink to="/">Connexion</StyledLink>
            <StyledLink to="/signup">S'inscrire</StyledLink>
            </div>
        </NavContainer>
    )
};

export default Headerlogin;