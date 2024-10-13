import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { showToast } from '../../../components/common/toaster';
import { singleBlogData, updateBlogData } from '../../../actions';


const BlogUpdate = () => {

    const {id} = useParams();
    const move = useNavigate();
    const location = useLocation();
    const [blog, setBlog] = useState()
    
    const myuser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(myuser); // Contains user's information
  
    // new data
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [author, setAuthor] = useState("")
    const [pending, setPending] = useState(false)

    const handleUpdate = async (e) =>{
        e.preventDefault();
        const updatedBlog = { title, content, author};
        setPending(true)

        const response = await updateBlogData(id, updatedBlog);
        // console.log("🚀 ~ handleUpdate ~ response:", response)
        if(response.status === 200)
        {
            setPending(false)
            showToast('Blog Updated', 'success')
            move("/home")
        }
        else{
            setPending(false)
            showToast('Error while updating', 'error')
        }
    }

    useEffect(() => {
        const fetchBlog = async () => {
            setPending(true)
            const response = await singleBlogData(id)
            setBlog(response)
            setPending(false)
        }
        fetchBlog()
    }, [])

    useEffect(() => {
        if (user.role !== 'admin') {
            // Redirect to "/home" and pass the previous location in state
            move('/home', { state: { from: location } });
        }
      }, [user, move, location]);

    return (
        <div className='create'>
            <h2>Update the Blog</h2>

            <form onSubmit={handleUpdate}>
                <label >Title: </label>
                <input
                    type='text'
                    required
                    placeholder= {blog?.title}
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                />
                
                <label >Type Your Blog: </label>
                <textarea 
                placeholder= {blog?.content}
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                >
                    
                </textarea>

                {/* <h3>Old Author: {data.author}</h3> */}
                <label >Update Author: </label>
                <input 
                    type='text'
                    required
                    placeholder={blog?.author}
                    value={author}
                    onChange={(e)=> setAuthor(e.target.value)}
                   
                />


                {!pending && <button >Update Blog</button>}
                {pending && <button disabled>Updating Blog.....</button>}
            
            </form>
        </div>

              
    )
}

export default BlogUpdate