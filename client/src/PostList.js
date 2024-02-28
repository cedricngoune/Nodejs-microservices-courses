import axios from "axios";
import { useEffect, useState } from "react";
import { CreateComment } from "./CreateComment";
import { CommentList } from "./CommentList";

export const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://posts.com/posts");

    setPosts(res.data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => (
    <div style={{ width: "80%", marginBottom: "20px" }} key={post.id}>
      <div className="card-body">
        <h3>{post.title} </h3>
        <CommentList comments={post.comments} />
        <CreateComment postId={post.id} />
      </div>
    </div>
  ));
  return (
    <div className="d-flex flex-column flew-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
