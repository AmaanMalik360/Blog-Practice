import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { BlogData } from '../../../actions/blogsActions';
// import "../../stylesheets/"

const BlogList = () => {
  const myuser = JSON.parse(localStorage.getItem('user'))

  const [user, setUser] = useState(myuser);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
      const fetchBlogs = async () =>{
        const response = await BlogData()
        if(response.status === 200)
        {
          const blogs = response.data
          setBlogs(blogs);
        }
      }
    
      if (user) fetchBlogs();
  }, [user]);

  return (
      <div className='bloglist'>
        {user && <h1>{user.username}</h1>}
        <h2>All Your Blogs</h2>
        {blogs && blogs?.map(blog => (
          <div key={blog.id} style={divStyle} >
            <Link to={`/blog/${blog._id}`}>
              <h2>{blog.title}</h2>
              <p>Written by {blog.author}</p>
            </Link>
          </div>
        ))}
      </div>
  );
};

  // Styles
  const divStyle = {
    backgroundColor: '',
    borderRadius: '10px',
    padding: '10px',
    border: '3px solid #f1356d',
    cursor: 'pointer',
    marginTop: '20px',
  };

export default BlogList;
