import Headerhome from "../../components/Headerhome";
import styled from "styled-components";
import { useFetchGet } from "../../utils/hooks";
import { Loader } from "../../utils/style/Atoms";
import CreatePost from "../../components/CreatePost"
import Card from "../../components/Card"
import "../../utils/style/responsive/Home.css"
import { useState } from "react";

const StyledBody = styled.div`
display : flex;
flex-direction : column;
align-items : center;
margin-top : 1em;
`;

const StyledRecentPosts = styled.div`
margin : auto;
margin-top : 1.5em;
`;

const LoadedWrapper = styled.div`
display : flex;
justify-content : center;
`;

const PostsContainer = styled.div`
display : flex;
flex-direction : column;
`;

function Home() 
{
  const [newModification, setNewModification] = useState(0);
  const { isLoading, data, error } = useFetchGet("http://localhost:4200/api/posts", newModification);
  const descendingPostsList = data;
  descendingPostsList?.sort((a, b) => b.dateTime - a.dateTime);

  if(error) 
  {
    return <span>Il y a un problème réception des posts. Voir index de Home</span>
  };

  return (
    <div id="pageHome">
      <Headerhome />
      <StyledBody>
        <h1>File d'actualité de Groupomania</h1>
        <CreatePost 
        newModification={newModification}
        setNewModification={setNewModification}
        />
        <StyledRecentPosts id="recentPostsHome">
          {isLoading ?
          (
            <LoadedWrapper>
              <Loader />
            </LoadedWrapper>
          ) : (
            <PostsContainer id="postContainerHome">
              {descendingPostsList?.map((post) =>(
                <Card key={post._id}
                  id = {post._id}
                  email={post.email}
                  userId={post.userId}
                  text={post.text}
                  dateTime={post.dateTime}
                  imageUrl={post.imageUrl}
                  likes={post.likes}
                  usersLiked={post.usersLiked}
                  newModification={newModification}
                  setNewModification={setNewModification}
                  />
              ))}
            </PostsContainer>
          )}
        </StyledRecentPosts>
      </StyledBody>
    </div>
  )
};

export default Home;
