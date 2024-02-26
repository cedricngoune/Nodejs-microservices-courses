import { useState } from "react";
import axios from "axios";
export const CreatePost = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (title.length < 1) return;
    await axios.post("http://localhost:4000/posts", {
      title,
    });
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="inputPost">title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control w-25"
            id="inputPost"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
