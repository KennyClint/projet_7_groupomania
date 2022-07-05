import styled from "styled-components"

const NotFoundWrapper = styled.div`

`;

const NotFoundTitle = styled.h1`

`;

const NotFoundText = styled.p`

`;

function NotFound()
{
    return (
        <NotFoundWrapper>
            <NotFoundTitle>Page introuvable</NotFoundTitle>
            <NotFoundText>Il semblerait que la page que vous cherchez n'existe pas</NotFoundText>
        </NotFoundWrapper>
    )
};

export default NotFound