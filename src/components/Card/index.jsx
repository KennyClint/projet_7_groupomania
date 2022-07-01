import { useState } from "react";
import styled from "styled-components";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardWrapper = styled.div`
border : 1px solid grey;
`;

const Header = styled.div`
display : flex;
justify-content : space-between;
margin : 0.4em 0.4em 0 0.4em;
`;

const Email = styled.span`
font-weight : bold;
color : #FD2D01;
`;

const Date = styled.span`

`;

const ImageWrapper = styled.div`
display : display;
justify-content : center;
margin : 0.4em 0.4em 0 0.4em;
`;

const Image = styled.img`
width : 200px;
`;

const TextWrapper = styled.div`
margin : 0.4em 0.4em 0 0.4em;
`;

const Text = styled.p`

`;

const Footer = styled.div`
display : flex;
justify-content : space-between;
margin : 0.4em;
`;

const LikesContainer = styled.div`
display : flex;
`;

const IconContainer = styled.div`
cursor : pointer;
`;

const ButtonWrapper = styled.div`

`;

const ModifyButton = styled.input`

`;

const DeleteButton = styled.input`
margin-left : 0.4em;
`;

const StyledForm = styled.div`
display : none;
flex-direction : column;
width : 40em;
margin-bottom : 1em;
border : 1px solid grey;
padding : 0.4em 0 0.4em 0;
& input[type="file"]
{
  margin-left : 0.4em;
}
& textarea
{
  margin : 0.4em;
}
& input[type="submit"] 
{
  cursor : pointer;
  width : 5em;
  align-self : flex-end;
  margin-right : 0.4em;
}
`;

const HeaderForm = styled.div`
display : flex;
justify-content : space-between;
`;

const ImageOptionWrapper = styled.div`
display : flex;
justify-content : space-between;
`;

const CheckboxWrapper = styled.div`
display : flex;
`;

const StyledImg = styled.img`
  display : none;
  margin-top : 0.4em;
  margin-left : 0.4em;
`;

const FooterForm = styled.div`

`;

const CancelButton = styled.input`

`;

/*Fonction : Formater la date de création du poste sous la forme 'jj/mm/aaaa'*/
function dateFormate(dateTime)
{
    const dateTimeString = String(dateTime);
    const cutDate = dateTimeString.slice(0, 8);
    const year = cutDate.slice(0, 4);
    const month = cutDate.slice(4, 6);
    const day = cutDate.slice(6, 8);
    return (day + "/" + month + "/" + year);
};

/*Fonction : Affiche le formulaire de modification de post*/
function displayModifyForm(e, id)
{
    e.preventDefault();
    e.stopPropagation();
    const modifyPostWrapper = document.getElementById(id);
    modifyPostWrapper.style.display = "flex";
};

/*Fonction : Masque le formulaire de modification de post*/
function hideModifyForm(e, id)
{
    e.preventDefault();
    e.stopPropagation();
    const modifyPostWrapper = document.getElementById(id);
    modifyPostWrapper.style.display = "none";
};

/*Fonction : Demande de confirmation de suppression d'un post*/
function confirm(message)
{
    const confirmDeleteResult = window.confirm(message);
    return confirmDeleteResult;
};

/*Fonction : Récupérer et formater les données stringifiées provenant du localStorage*/
function getUserIdToken()
{
  const userIdTokenStringify = localStorage.getItem("userIdToken");
  const userIdToken = JSON.parse(userIdTokenStringify);
 
  return userIdToken;
};

/*Fonction : Vérifie si l'utilisateur à liker le post*/
function verificationUserLikedPost(localUserId, usersLiked)
{
  let userLikedPost = false;

  for (let userId of usersLiked)
  {
    if(userId === localUserId)
    {
      userLikedPost = true;
      break;
    };
  }

  return userLikedPost;
};

/*Fonction : Liker le post*/
function postLikes(e, id, userLikedPost)
{
  e.preventDefault();
  e.stopPropagation();

  const localUserId = getUserIdToken().userId;
  const token = getUserIdToken().token;
  debugger
  let likeValue = 1;
  if (userLikedPost)
  { 
    likeValue = 0;
  };

  const dataLikedPost = 
  {
    like : likeValue,
    userId : localUserId
  };

  fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}/like`,
  {
    method : "POST",
    headers : {
      "Accept" : "application/json",
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    },
    body : JSON.stringify(dataLikedPost)
  })
  .then(function(res)
    {
        if(res.ok) 
        {
          return res.json();
        }; 
    })
  .catch(function(error)
  {
    console.log(error);
  });
};

/*Fonction : Suppression d'un post*/
function deletePost(e, id)
{
    e.preventDefault();
    e.stopPropagation();

    const confirmDelete = confirm("Souhaitez-vous vraiment supprimer ce post ?");

    if (confirmDelete)
    {
        const userId = getUserIdToken().userId;
        const token = getUserIdToken().token;
        
        fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}`,
        {
        method : "DELETE",
        headers : {
            "Authorization" : `Bearer ${token}`
        },
        body : userId
        })
        .then(function(res)
        {
            if(res.ok)
            {
                return res.json();
            }
        })
        .catch(function(error)
        {
            alert(`Une erreur c'est produite, le post n'a pu être supprimé. err : ${error}`)
        });
    } else {
        return;
    }
};

function uncheckCheckbox (id)
{
  const checkbox =  document.getElementById(`withoutImage${id}`);
  checkbox.checked = false;
};

function hideCheckboxWrapper(id)
{
  uncheckCheckbox(id);
  const checkboxWrapper = document.getElementById(`checkboxWrapper${id}`);
  checkboxWrapper.style.display = "none";
};

function displayCheckboxWrapper(id)
{
  const checkboxWrapper = document.getElementById(`checkboxWrapper${id}`);
  checkboxWrapper.style.display = "flex";
};

function previewImage(file, setImage, id)
{
  setImage(file);
  const preview = document.getElementById("previewImageModify" + id);
  preview.style.display = "inline";
  const reader = new FileReader();
  reader.onload = function()
  {
    preview.src = reader.result;
  }
  reader.readAsDataURL(file);

  hideCheckboxWrapper(id);
};

function cancelImage(e, setImage, id)
{
  e.preventDefault();
  e.stopPropagation();

  setImage("");
  document.getElementById("inputImageModify" + id).value = "";
  const previewImage = document.getElementById("previewImageModify" + id);
  previewImage.src = "";
  previewImage.style.display = "none";
  displayCheckboxWrapper(id);
};

/*Fonction : Annulation de la modification en cours*/
function cancelModif(e, id)
{
    e.preventDefault();
    e.stopPropagation();

    const confirmCancel = confirm("Souhaitez-vous vraiment annuler la modification ?");

    if (confirmCancel)
    {
      hideModifyForm(e, id);
    };
};

/*Fonction : Requête put de modification du texte et suppression de l'image existante*/
function fetchDeleteImage (e, id, textContent, setError)
{
  const userIdToken = getUserIdToken();
  const token = userIdToken.token;

  const dataPostNoImageUrl =
    {
      text : textContent,
      imageUrl : ""
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}`,
    {
      method : "PUT",
      headers : {
          "Accept" : "application/json",
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
      },
      body : JSON.stringify(dataPostNoImageUrl)
    })
    .then(function(res)
    {
        if(res.ok) 
        {
          return res.json();
        }; 
    })
    .catch(function(error)
    {
      setError(true);
    });
};

/*Fonction : Requête put de modification du texte et d'intégration d'une image */
function fetchWithImage(e, id, textContent, imageContent, setError)
{
  const userIdToken = getUserIdToken();
  const token = userIdToken.token;

  const dataPost = 
  {
    text : textContent,
  };

  const formDataPost = new FormData();
  formDataPost.append("post", JSON.stringify(dataPost));
  formDataPost.append("file", imageContent, imageContent.name);

    fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}`,
    {
      method : "PUT",
      headers : {
        "Authorization" : `Bearer ${token}`
      },
      body : formDataPost
    })
    .then(function(res)
    {
        if(res.ok) 
        {
          console.log("res.ok");
          return res.json();
        }; 
    })
    .catch(function(error)
    {
      setError(true);
    });
};

/*Fonction : Requête put de modification du texte*/
function fetchWithoutImage (e, id, textContent, setError)
{
  const userIdToken = getUserIdToken();
  const token = userIdToken.token;

  const dataPostNoImageUrl =
    {
      text : textContent
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}`,
    {
      method : "PUT",
      headers : {
          "Accept" : "application/json",
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
      },
      body : JSON.stringify(dataPostNoImageUrl)
    })
    .then(function(res)
    {
        if(res.ok) 
        {
          return res.json();
        }; 
    })
    .catch(function(error)
    {
      setError(true);
    });
};

/*Fonction : Envoi les différentes données, générées ou récupérés pour enregistrer le post dans la BDD*/
function sendPost (e, id, textContent, imageContent, imageUrl, setError)
{
  e.preventDefault();
  e.stopPropagation();

  const withoutImage = document.getElementById("withoutImage");
  
  if (withoutImage.checked && imageUrl !== "")
  {
    fetchDeleteImage(e, id, textContent, setError);
  } else { 
    if (imageContent !== "") 
    {
      fetchWithImage(e, id, textContent, imageContent, setError);
    } else {
      fetchWithoutImage(e, id, textContent, setError)
    }
  }
};

function Card({ id, email, userId, text, dateTime, imageUrl, likes, usersLiked })
{
  const [textContent, setText] = useState(text);
  const [imageContent, setImage] = useState("");
  const [error, setError] = useState(false);

  const postCreationDate = dateFormate(dateTime);
  const localUserIdToken = getUserIdToken();
  const localUserId = localUserIdToken.userId;

  const userLikedPost = verificationUserLikedPost(localUserId, usersLiked)

  if (error) {
    setError(false);
    alert("Une erreur est survenue");
  };

  return (
      <div>
          <CardWrapper>
            <Header>
              <Email>{email}</Email>
              <Date>{postCreationDate}</Date>
            </Header>
            {imageUrl !== "" && (
              <ImageWrapper>
                <Image src={imageUrl} id="imgBalise" />
              </ImageWrapper>
            )}
            <TextWrapper>
              <Text>{text}</Text>
            </TextWrapper>
            <Footer>
              <LikesContainer>
                <IconContainer onClick={(e) => postLikes(e, id, userLikedPost)}>
                {userLikedPost ? (
                  <FontAwesomeIcon icon={faHeart} />
                ) : (
                  <FontAwesomeIcon icon={faHeartRegular} />
                )}
                </IconContainer>
                <span>{likes}</span>
              </LikesContainer>
              {userId === localUserId && (
                <ButtonWrapper>
                  <ModifyButton type="button" value="Modifier" onClick={(e) => displayModifyForm(e, id)} />
                  <DeleteButton type="button" value="Supprimer" onClick={(e) => deletePost(e, id)}/>
                </ButtonWrapper>
              )} 
            </Footer>
          </CardWrapper>
          <StyledForm id={id}>
            <HeaderForm>
              <ImageOptionWrapper>
                <input type="file" id={`inputImageModify${id}`} accept=".jpg, .jpeg, .png" onChange={(e) => previewImage(e.target.files[0], setImage, id)} />
                <input type="button" value="Annuler fichier" onClick={(e) => cancelImage(e, setImage, id)} />
              </ImageOptionWrapper>
              <CheckboxWrapper id={`checkboxWrapper${id}`}>
                <input type="checkbox" id={`withoutImage${id}`} />
                <label for={`withoutImage${id}`}>Post sans image</label>
              </CheckboxWrapper>
            </HeaderForm>
            <StyledImg src="" alt="Preview post image" id={`previewImageModify${id}`} width ="200px" />
            <textarea name="addpost" defaultValue={text} rows="3" placeholder="Plaît-il ?" required onChange={(e) => setText(e.target.value)}></textarea>
            <FooterForm>
              <CancelButton type ="button" value="Annuler" onClick={(e) => cancelModif(e, id, text, textContent)} />
              <input type="submit" value="Valider" onClick={(e) => sendPost(e, id, textContent, imageContent, imageUrl, setError)} />
            </FooterForm>
          </StyledForm>
      </div>
    );
};

export default Card;