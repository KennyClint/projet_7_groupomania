import { useState } from "react";
import styled from "styled-components";
import "../../utils/style/responsive/CreatePost.css"

const StyledForm = styled.div`
display : flex;
flex-direction : column;
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

const ImageOptionWrapper = styled.div`
display : flex;
justify-content : space-between;
& input[value="Annuler fichier"]
{
  margin-right : 0.4em;
  width : 8em;
}
`;

const StyledImageWrapper = styled.div`
display : flex;
justify-content : center;
`;

const StyledImg = styled.img`
  display : none;
  margin-top : 0.4em;
  margin-left : 0.4em;
`;

/*Fonction : Concaténer, en une string, la date et l'heure de création du post créé*/
function concatenateDateTime ()
{
    const d = new Date();
    let day = d.getDate();
    let month = d.getMonth()+1;
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();

    if (day < 10) {day = "0" + day};
    if (month < 10) {month = "0" + month};
    if (hour < 10) {hour = "0" + hour};
    if (minute < 10) {minute = "0" + minute};
    if (second < 10) {second = "0" + second};

    const resultDateTime = "".concat(year, month, day, hour, minute, second);

    return resultDateTime;
};

/*Fonction : Récupérer et formater les données stringifiées provenant du localStorage*/
function getUserIdToken()
{
  const userIdTokenStringify = localStorage.getItem("userIdToken");
  const userIdToken = JSON.parse(userIdTokenStringify);
 
  return userIdToken;
};

function cancelText(setText)
{
  setText("");
  document.getElementById("testAreaAddPost").value = "";
};

/*Fonction : Permet de re-render la page home avec les nouvelles données*/
function setterNewModification (newModification, setNewModification)
{
  let newModificationValue = 1;
  if(newModification === 1)
  {
    newModificationValue = 0;
  };
  setNewModification(newModificationValue);
};

/*Fonction : Requête Post avec image*/
function fetchWithImage (e, setText, setImage, dateTimeValue, userIdValue, emailValue, textContent, imageContent, setError, newModification, setNewModification)
{
  const userIdToken = getUserIdToken();
  const token = userIdToken.token;
  const localUserId = userIdToken.userId;
  
  const dataPost = 
  {
    text : textContent,
    userId : userIdValue,
    email : emailValue,
    dateTime : dateTimeValue
  };

  const formDataPost = new FormData();
  formDataPost.append("post", JSON.stringify(dataPost));
  formDataPost.append("file", imageContent, imageContent.name);

    fetch(`${process.env.REACT_APP_API_URL}/api/posts/`,
    {
      method : "POST",
      headers : {
        "Authorization" : `Bearer ${token} ${localUserId}`
      },
      body : formDataPost
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
      cancelImage(e, setImage)
      cancelText(setText)
      setterNewModification(newModification, setNewModification);
    })
};

/*Fonction : Requête Post sans image*/
function fetchWithoutImage (e, setText, dateTimeValue, userIdValue, emailValue, textContent, setError, newModification, setNewModification)
{
  const userIdToken = getUserIdToken();
  const token = userIdToken.token;
  const localUserId = userIdToken.userId;

  const dataPostNoImageUrl =
    {
      text : textContent,
      userId : userIdValue,
      email : emailValue,
      dateTime : dateTimeValue
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/posts/`,
    {
      method : "POST",
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
      cancelText(setText)
      setterNewModification(newModification, setNewModification);
    })
};

/*Fonction : Envoi les différentes données, générées ou récupérés pour enregistrer le post dans la BDD*/
function sendPost (e, textContent, imageContent, setError, newModification, setNewModification, setText, setImage)
{
  e.preventDefault();
  e.stopPropagation();

  if(textContent === "" && imageContent ==="")
  {
    alert("Erreur : post vide. Veuillez indiquer un texte ou une image.");
  } else {
    const dateTimeValue = concatenateDateTime();
    const userIdValue = getUserIdToken().userId;
    const emailValue = localStorage.getItem("email");

    if (imageContent !== "")
    {
      fetchWithImage(e, setText, setImage, dateTimeValue, userIdValue, emailValue, textContent, imageContent, setError, newModification, setNewModification);
    } else {
      fetchWithoutImage (e, setText, dateTimeValue, userIdValue, emailValue, textContent, setError, newModification, setNewModification);
    }
  }  
};

function previewImage(file, setImage)
{
  setImage(file);
  const preview = document.getElementById("previewImage");
  preview.style.display = "inline";
  const reader = new FileReader();
  reader.onload = function()
  {
    preview.src = reader.result;
  }
  reader.readAsDataURL(file);
};

function cancelImage(e, setImage)
{
  e.preventDefault();
  e.stopPropagation();

  setImage("");
  document.getElementById("inputImage").value = "";
  const previewImage = document.getElementById("previewImage");
  previewImage.src = "";
  previewImage.style.display = "none";
};

function Createpost ({ newModification, setNewModification })
{
    const [textContent, setText] = useState("");
    const [imageContent, setImage] = useState("");
    const [error, setError] = useState(false);

    if (error) {
      setError(false);
      alert("Une erreur est survenue");
    };

    return (
        <StyledForm id="formCreatePost">
          <ImageOptionWrapper id="imageOptionWrapperCreatePost">
            <input type="file" id="inputImage" accept=".jpg, .jpeg, .png" aria-label="Intégrer une image à votre post" onChange={(e) => previewImage(e.target.files[0], setImage)} />
            <input type="button" id="imageOptionWrapperCreatePostInput" value="Annuler fichier" onClick={(e) => cancelImage(e, setImage)} />
          </ImageOptionWrapper>
          <StyledImageWrapper>
            <StyledImg src="" alt="Preview post image" id="previewImage" width ="200px" />
          </StyledImageWrapper>
          <textarea name="addpost" aria-label="Indiquer le texte du post" id="testAreaAddPost" rows="3" placeholder="Plaît-il ?" onChange={(e) => setText(e.target.value)}></textarea>
          <input type="submit" value="Publier" onClick={(e) => sendPost(e, textContent, imageContent, setError, newModification, setNewModification, setText, setImage)} />
        </StyledForm>
    )
};

export default Createpost;