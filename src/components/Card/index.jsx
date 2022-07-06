import { useState } from "react";
import styled from "styled-components";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import colors from "../../utils/style/colors"
import "../../utils/style/responsive/Card.css";

const CardWrapper = styled.div`
border : 1px solid grey;
`;

const Header = styled.div`
display : flex;
justify-content : space-between;
margin : 0.4em 0.4em 0 0.4em;
border-bottom : 1px solid lightgray;
`;

const Email = styled.span`
font-weight : bold;
color : ${colors.primary};
`;

const Date = styled.span`

`;

const ImageWrapper = styled.div`
display : flex;
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
border-top : 1px solid lightgray;
`;

const LikesContainer = styled.div`
display : flex;
`;

const IconContainer = styled.a`
cursor : pointer;
margin-right : 0.4em;
`;

const ButtonWrapper = styled.div`
margin-top : 0.4em;
`;

const ModifyButton = styled.input`

`;

const DeleteButton = styled.input`
margin-left : 0.4em;
`;

const StyledForm = styled.div`
display : none;
flex-direction : column;
margin-bottom : 1em;
padding : 0.4em 0 0.4em 0;
border : 2px solid ${colors.primary};
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
& input[value="Annuler fichier"]
{
  width : 8em;
}
`;

const CheckboxWrapper = styled.div`
display : flex;
& label
{
  margin-right : 0.4em;
}
`;

const StyledImgWrapper = styled.div`
display : flex;
justify-content : center;
`;

const StyledImg = styled.img`
  display : none;
  margin-top : 0.4em;
  margin-left : 0.4em;
`;

const FooterForm = styled.div`
& input[value="Annuler"]
{
  margin-left : 0.4em;
}
& input[value="Valider"]
{
  margin-left : 0.4em;
}
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

/*Fonction : Modifie le texte de l'aria-label suivant si la personne à liker ou non un post*/
function ariaLabelTextUserLikedPost(userLikedPost)
{
  let ariaLabelText = "Retirer le j'aime au post";

  if(!userLikedPost)
  {
    ariaLabelText = "Ajouter un j'aime au post";
  };

  return ariaLabelText;
};

/*Fonction : Liker le post*/
function postLikes(e, id, userLikedPost, newModification, setNewModification)
{
  e.preventDefault();
  e.stopPropagation();

  const localUserId = getUserIdToken().userId;
  const token = getUserIdToken().token;

  let newModificationValue = 1;
  if(newModification === 1)
  {
    newModificationValue = 0;
  };

  let likeValue = 1;
  if(userLikedPost)
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
      "Authorization" : `Bearer ${token} ${localUserId}`
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
  })
  .finally(function()
  {
    setNewModification(newModificationValue);
  }) 
};

/*Fonction : Suppression d'un post*/
function deletePost(e, id, newModification, setNewModification)
{
    e.preventDefault();
    e.stopPropagation();

    const confirmDelete = confirm("Souhaitez-vous vraiment supprimer ce post ?");

    let newModificationValue = 1;
    if(newModification === 1)
    {
      newModificationValue = 0;
    };

    if (confirmDelete)
    {
        const userId = getUserIdToken().userId;
        const token = getUserIdToken().token;
        const localUserId = getUserIdToken().userId;
        
        fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}`,
        {
        method : "DELETE",
        headers : {
            "Authorization" : `Bearer ${token} ${localUserId}`
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
        })
        .finally(function()
        {
          setNewModification(newModificationValue);
        })
    } else {
        return;
    }
};

/*Fonction : Décoche automatiquement une checkbox*/
function uncheckCheckbox (id)
{
  const checkbox =  document.getElementById(`withoutImage${id}`);
  checkbox.checked = false;
};

/*Fonction : Masque une checkbox et son label*/
function hideCheckboxWrapper(id)
{
  uncheckCheckbox(id);
  const checkboxWrapper = document.getElementById(`checkboxWrapper${id}`);
  checkboxWrapper.style.display = "none";
};

/*Fonction : Affiche une checkbox et son label*/
function displayCheckboxWrapper(id)
{
  const checkboxWrapper = document.getElementById(`checkboxWrapper${id}`);
  checkboxWrapper.style.display = "flex";
};

/*Fonction : Prévisualisation de l'image de modification du post*/
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

/*Fonction : Annule l'importation de l'image et masque le bloc de prévisualisation*/
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
function fetchDeleteImage (e, id, textContent, setError, newModification, setNewModification)
{
  const userIdToken = getUserIdToken();
  const token = userIdToken.token;
  const localUserId = userIdToken.userId;

  let newModificationValue = 1;
  if(newModification === 1)
  {
    newModificationValue = 0;
  };

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
          "Authorization" : `Bearer ${token} ${localUserId}`
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
    })
    .finally(function()
    {
      hideModifyForm(e, id);
      setNewModification(newModificationValue);
    })
};

/*Fonction : Requête put de modification du texte et d'intégration d'une image */
function fetchWithImage(e, id, textContent, imageContent, setError, newModification, setNewModification)
{
  const userIdToken = getUserIdToken();
  const token = userIdToken.token;
  const localUserId = userIdToken.userId;

  let newModificationValue = 1;
  if(newModification === 1)
  {
    newModificationValue = 0;
  };

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
        "Authorization" : `Bearer ${token} ${localUserId}`
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
    })
    .finally(function()
    {
      hideModifyForm(e, id);
      setNewModification(newModificationValue);
    })
};

/*Fonction : Requête put de modification du texte*/
function fetchWithoutImage (e, id, textContent, setError, newModification, setNewModification)
{
  const userIdToken = getUserIdToken();
  const token = userIdToken.token;
  const localUserId = userIdToken.userId;

  let newModificationValue = 1;
    if(newModification === 1)
    {
      newModificationValue = 0;
    };

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
          "Authorization" : `Bearer ${token} ${localUserId}`
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
    })
    .finally(function()
    {
      hideModifyForm(e, id);
      setNewModification(newModificationValue);
    })
};

/*Fonction : Envoi les différentes données, générées ou récupérés pour enregistrer le post dans la BDD*/
function sendPost (e, id, textContent, imageContent, text, imageUrl, setError, newModification, setNewModification)
{
  e.preventDefault();
  e.stopPropagation();
  
  const withoutImage = document.getElementById(`withoutImage${id}`);
  if((text === "" || text === undefined) && withoutImage.checked && textContent === "")
  {
    alert("Erreur : post vide. Veuillez indiquer un texte ou une image.");
  } else {
    if((imageUrl === "" || imageUrl === undefined) && textContent === "" && imageContent === "")
    {
      alert("Erreur : post vide. Veuillez indiquer un texte ou une image.");
    } else {
      if (withoutImage.checked && imageUrl !== "")
      {
        fetchDeleteImage(e, id, textContent, setError, newModification, setNewModification);
      } else { 
        if (imageContent !== "") 
        {
          fetchWithImage(e, id, textContent, imageContent, setError, newModification, setNewModification);
        } else {
          fetchWithoutImage(e, id, textContent, setError, newModification, setNewModification)
        }
      }
    }
  }
};

function Card({ id, email, userId, text, dateTime, imageUrl, likes, usersLiked, newModification, setNewModification })
{
  const [textContent, setText] = useState(text);
  const [imageContent, setImage] = useState("");
  const [error, setError] = useState(false);

  const postCreationDate = dateFormate(dateTime);
  const localUserIdToken = getUserIdToken();
  const localUserId = localUserIdToken.userId;

  const userLikedPost = verificationUserLikedPost(localUserId, usersLiked);

  const ariaLabelLikePostText = ariaLabelTextUserLikedPost(userLikedPost);

  if (error) {
    setError(false);
    alert("Une erreur est survenue");
  };

  return (
      <div className="bodyCard">
          <CardWrapper>
            <Header>
              <Email>{email}</Email>
              <Date>{postCreationDate}</Date>
            </Header>
            {(imageUrl !== "" && imageUrl !== undefined) && (
              <ImageWrapper>
                <Image src={imageUrl} />
              </ImageWrapper>
            )}
            <TextWrapper>
              <Text>{text}</Text>
            </TextWrapper>
            <Footer>
              <LikesContainer>
                <IconContainer aria-label={ariaLabelLikePostText} href="#" onClick={(e) => postLikes(e, id, userLikedPost, newModification, setNewModification)}>
                {userLikedPost ? (
                  <FontAwesomeIcon icon={faHeart} aria-label={ariaLabelLikePostText} />
                ) : (
                  <FontAwesomeIcon icon={faHeartRegular} aria-label={ariaLabelLikePostText} />
                )}
                </IconContainer>
                <span>{likes}</span>
              </LikesContainer>
              {(userId === localUserId || localUserIdToken.admin) && (
                <ButtonWrapper>
                  <ModifyButton type="button" value="Modifier" onClick={(e) => displayModifyForm(e, id)} />
                  <DeleteButton type="button" value="Supprimer" onClick={(e) => deletePost(e, id, newModification, setNewModification)}/>
                </ButtonWrapper>
              )} 
            </Footer>
          </CardWrapper>
          <StyledForm id={id}>
            <HeaderForm className="headerFormCard">
              <ImageOptionWrapper className="imageOptionWrapperCard">
                <input type="file" id={`inputImageModify${id}`} accept=".jpg, .jpeg, .png" aria-label="Intégrer une image à votre post" onChange={(e) => previewImage(e.target.files[0], setImage, id)} />
                <input type="button" value="Annuler fichier" onClick={(e) => cancelImage(e, setImage, id)} />
              </ImageOptionWrapper>
              <CheckboxWrapper id={`checkboxWrapper${id}`}>
                <input type="checkbox" id={`withoutImage${id}`} />
                <label htmlFor={`withoutImage${id}`}>Post sans image</label>
              </CheckboxWrapper>
            </HeaderForm>
            <StyledImgWrapper>
              <StyledImg src="" alt="Preview post image" id={`previewImageModify${id}`} width ="200px" />
            </StyledImgWrapper>
            <textarea name="addpost" aria-label="Indiquer le texte du post" defaultValue={text} rows="3" placeholder="Plaît-il ?" required onChange={(e) => setText(e.target.value)}></textarea>
            <FooterForm>
              <CancelButton type ="button" value="Annuler" onClick={(e) => cancelModif(e, id, text, textContent)} />
              <input type="submit" value="Valider" onClick={(e) => sendPost(e, id, textContent, imageContent, text, imageUrl, setError, newModification, setNewModification)} />
            </FooterForm>
          </StyledForm>
      </div>
    );
};

export default Card;