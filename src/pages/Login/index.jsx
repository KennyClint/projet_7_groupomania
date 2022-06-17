import Headerlogin from "../../components/Headerlogin";

function Login () 
{
    return (
        <div>
            <Headerlogin />
            <h1>Connexion</h1>
            <form action="http://localhost:4200/" method="get">
            <label for="email">Email</label><br/>
            <input type="email" id="email" required /><br/>
            <label for="password">Mot de passe</label><br/>
            <input type="password" id="password" required /><br/>
            <input type="submit" value="Connexion"/>
            </form>
        </div>
    )
};

export default Login;