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

/*Fonction : Envoi des données pour la création d'un compte*/
function sendData (e, emailValue, passwordValue, setError, regexEmail, setResponse)
{
    e.preventDefault();
    e.stopPropagation();

    const verificationEmail = regexEmail.test(emailValue);

    if(!verificationEmail)
    {
        alert("Format de l'adresse email incorrect")
    } else {
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
                return res.json();
            })
            .then(function(data)
            {
                if(data.error)
                {
                    setResponse(data.error.message)
                    setError(true); 
                    return;
                } else if(data.userIdToken)
                {
                    const userIdTokenStringify = JSON.stringify(data.userIdToken);
                    localStorage.setItem("userIdToken", userIdTokenStringify);
                    localStorage.setItem("email", data.email);
                    document.location.href = "http://localhost:3000/home";
                }   
            }
        );
    };
};


function Signup () 
{
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [response, setResponse] = useState("");

    const regexEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;

    if (error) {
        setError(false);
        alert(response);
    };

    return (
        <div id="bodyLogin">
            <Headerlogin />
            <StyledBody>
                <h1>Créer un compte</h1>
                <StyledForm id="styledForm">
                    <PositionForm>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required onChange={(e) => setEmailValue(e.target.value)} />
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)} />
                    </PositionForm>
                    <input type="submit" value="S'inscrire" onClick={(e) => sendData(e, emailValue, passwordValue, setError, regexEmail, setResponse)} />
                </StyledForm>
            </StyledBody>
        </div>
    )
};

export default Signup;