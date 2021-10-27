import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import EditBlog from "./EditBlog";
import useFetch from "./useFetch";
import React from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
  const history = useHistory();
  const [editableBlog, setEditableBlog] = useState(null);

  const handleClick = () => {
    fetch('http://localhost:8000/blogs/' + id, {
      method: 'DELETE'
    }).then(() => {
      history.push("/");
    })
  }

  const handleEdit = () => {
    setEditableBlog(blog);
    //console.log(id, editableBlog);
  }
  
  return (
    <div className="blog-details">
      { isPending && <div>Loading ...</div> }
      { error && <div>{ error }</div>}
      { !editableBlog && blog && (
        <article>
          <h2>{ blog.title} </h2>
          <p>Written by {blog.author}</p>
          <div>{ blog.body }</div>
          <button onClick={handleClick}>delete</button>
          <button onClick={handleEdit}>edit</button>
        </article>

      )}
      { editableBlog && (
        <article>
          <EditBlog blog={editableBlog} />
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;