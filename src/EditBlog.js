import { useState } from "react";
import { useHistory } from "react-router-dom";

const EditBlog = ({blog}) => {

  console.log(blog.title);

  const [title, setTitle] = useState(blog.title);
  const [body, setBody] = useState(blog.body);
  const [author, setAuthor] = useState(blog.author);
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogToEdit = { title, body, author};

    setIsPending(true);

    fetch('http://localhost:8000/blogs/'+blog.id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogToEdit)
    }).then(() => {
      console.log('the blog is edited');
      setIsPending(false);
      history.push("/");
    })
  }

  return (  
    <div className="create">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value = {title}
          onChange={(e) => setTitle(e.target.value)} 
        />
        <label>Blog body:</label>
        <textarea 
          required
          value = {body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        { !isPending && <button>Submit blog changes</button> }
        { isPending && <button disabled>Changes applying ...</button> }
      </form>
    </div>
  );
}
 
export default EditBlog;