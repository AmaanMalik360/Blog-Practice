import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { showToast } from "../../../components/common/toaster";
import { createBlogData } from "../../../actions/blogsActions";

const Create = () => {
  
  const move = useNavigate();
  const location = useLocation();

  const myuser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(myuser); // Contains user's information

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [pending, setPending] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newblog = { title, content, author };

    setPending(true);
    const response = await createBlogData(newblog);

    if(response.status === 201){
      setPending(false);
      showToast("Blog Added", "success");
      move("/home");
    }
    else{
      setPending(false);
      showToast("Unable To Create Blog", "error");
    }
  };

  useEffect(() => {
    if (user.role !== 'admin') {
        // Redirect to "/home" and pass the previous location in state
        move('/home', { state: { from: location } });
    }
  }, [user, move, location]);

  return (
    <div className="create">
      <h2>Add a New Blog</h2>

      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          type="text"
          required
          placeholder="Type Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Type Your Blog: </label>
        <textarea
          placeholder="Start Typing Here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <label>Blog Author: </label>
        <input
          type="text"
          required
          placeholder="Type Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        {!pending && <button>Add Blog</button>}
        {pending && <button disabled>Adding Blog.....</button>}
      </form>
    </div>
  );
};

export default Create;
