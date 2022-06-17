import { Link } from "react-router-dom";

function Headerlogin ()
{
    return (
        <nav>
            <Link to="/login">Connexion</Link>
            <Link to="/signup">S'inscrire</Link>
        </nav>
    )
}

export default Headerlogin;