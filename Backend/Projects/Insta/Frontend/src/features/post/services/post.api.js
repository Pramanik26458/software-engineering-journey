import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function getFeed() {

  try {

    const response = await api.get(
      "/api/posts/feed"
    );

    return response.data;

  } catch (err) {

    console.log(err);

    throw err;
  }
}


export async function createPost(imageFile,caption){
  const formData=new FormData();
  formData.append("media",imageFile);
  formData.append("caption",caption);
  const response=await api.post("/api/posts",formData)

  return response.data;
  }

export async function likePost(postId){
  try{
    const response=await api.post(`/api/posts/like/${postId}`)
    return response.data;
  }catch(err){
    console.log(err);
    throw err;
  }
}

export async function dislikePost(postId){
  try{
    const response=await api.post(`/api/posts/dislike/${postId}`)
    return response.data;
  }catch(err){
    console.log(err);
    throw err;
  }
}