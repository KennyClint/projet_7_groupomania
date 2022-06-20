import styled from "styled-components";
import Headerlogin from "../../components/Headerlogin";

const StyledBody = styled.div`
display : flex;
flex-direction : column;
align-items : center;
margin-top : 1em;
`;

const StyledForm = styled.form`
width : 30em;
margin : auto;
& input
{
    height : 2.2em;
}
`;

const PositionForm = styled.div`
display : flex;
flex-direction : column;
& label
{
    width : 7em;
}
& input
{
    margin-bottom : 0.5em;
}
`;

function Login () 
{
    return (
        <div>
            <Headerlogin />
                <StyledBody>
                <h1>Connexion</h1>
                <StyledForm action="http://localhost:4200/" method="get">
                    <PositionForm>
                        <label for="email">Email</label>
                        <input type="email" id="email" required />
                        <label for="password">Mot de passe</label>
                        <input type="password" id="password" required />
                    </PositionForm>
                    <input type="submit" value="Connexion"/>
                </StyledForm>
            </StyledBody>
        </div>
    )
};

export default Login;