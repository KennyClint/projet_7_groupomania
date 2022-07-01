import styled from "styled-components";
import Headerlogin from "../../components/Headerlogin";
import { useState } from "react";
import { Loader } from "../../utils/style/Atoms";

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

function sendData(e, emailValue, passwordValue, setError, setResponse)
{
    e.preventDefault();
    e.stopPropagation();
    const dataAccount = 
    {
        email : emailValue,
        password : passwordValue
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, 
        {
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(dataAccount)
        })
        .then(function(res)
        {
            if(res.ok) 
            {
                return res.json();
            }; 
        })
        .then(function(data)
        {
            const userIdTokenStringify = JSON.stringify(data.userIdToken);
            localStorage.setItem("userIdToken", userIdTokenStringify);
            localStorage.setItem("email", data.email);
            document.location.href = "http://localhost:3000/home";
        })
        .catch(function(err)
        {
            console.log(err);
            console.log(err.message);
            console.log(err.error)
            setResponse(err)
            setError(true);    
        }
    );
};

function Login () 
{
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [response, setResponse] = useState("");

    if (error) {
        setError(false);
        alert("Email ou Mot de passe incorrect");
    };

    return (
        <div>
            <Headerlogin />
            <StyledBody>
                <h1>Connexion</h1>
                <StyledForm>
                    <PositionForm>
                        <label for="email">Email</label>
                        <input type="email" id="email" required onChange={(e) => setEmailValue(e.target.value)} />
                        <label for="password">Mot de passe</label>
                        <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)} />
                    </PositionForm>
                    <input type="submit" value="Connexion" onClick={(e) => sendData(e, emailValue, passwordValue, setError, setResponse)} />
                </StyledForm>
            </StyledBody>
        </div>
    )
};

export default Login;