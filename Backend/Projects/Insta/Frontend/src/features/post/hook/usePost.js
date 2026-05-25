import { useContext, useEffect } from "react";
import { getFeed, createPost,likePost,dislikePost} from "../services/post.api";
import { PostContext } from "../post.context";

export const usePost = () => {
  const context = useContext(PostContext);

  const {
    loading,
    setLoading,

    post,
    setPost,

    feed,
    setFeed,
  } = context;

  const handleGetFeed = async () => {
    try {
      setLoading(true);

      const data = await getFeed();

      setFeed(data.posts);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (imageFile, caption) => {
    try {
      setLoading(true);
      const data = await createPost(imageFile, caption);
      setFeed([data.post, ...feed]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async (post) => {
    try {
      // setLoading(true);
      const data = await likePost(post);
      await handleGetFeed();
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDislike = async (post) => {
    try {
      setLoading(true);
      const data = await dislikePost(post);
      await handleGetFeed();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetFeed();
  }, []);

  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleCreatePost,
    handleLike,
    handleDislike,
  };
};
