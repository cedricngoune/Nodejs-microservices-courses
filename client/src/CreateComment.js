import { useState } from "react";
import axios from "axios";

export const CreateComment = ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://posts.com/posts/${postId}/comments`, {
        content,
      });
    } catch (e) {
      console.log(e.name);
    }

    setContent("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
