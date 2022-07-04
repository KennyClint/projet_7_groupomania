import styled from "styled-components";
import Headerlogin from "../../components/Headerlogin";
import { useState } from "react";
import "../../utils/style/responsive/Signup.css"

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

function sendData (e, emailValue, passwordValue, setError, setLoading, setResponse)
{
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    const dataAccount = 
    {
        email : emailValue,
        password : passwordValue
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, 
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
            setLoading(false);
            document.location.href = "http://localhost:3000/home";
        })
        .catch(function(err)
        {
            console.log(err);
            setResponse(err)
            setLoading(false);
            setError(true);    
        }
    );
};


function Signup () 
{
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [response, setResponse] = useState("");

    if (error) {
        setError(false);
        alert("Email ou Mot de passe incorrect");
    };

    return (
        <div id="bodyLogin">
            <Headerlogin />
            <StyledBody>
                <h1>Créer un compte</h1>
                <StyledForm id="styledForm">
                    <PositionForm>
                        <label for="email">Email</label>
                        <input type="email" id="email" required onChange={(e) => setEmailValue(e.target.value)} />
                        <label for="password">Mot de passe</label>
                        <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)} />
                    </PositionForm>
                    <input type="submit" value="S'inscrire" onClick={(e) => sendData(e, emailValue, passwordValue, setError, setLoading, setResponse)} />
                </StyledForm>
            </StyledBody>
        </div>
    )
};

export default Signup;