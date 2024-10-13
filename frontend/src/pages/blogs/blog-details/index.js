import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import "../../../stylesheets/BlogDetails.css"
import { showToast } from '../../../components/common/toaster';
import { deleteBlogData, singleBlogData } from '../../../actions';

const BlogDetails = () => {

    const {id} = useParams();
    const location = useLocation();
    const myuser = JSON.parse(localStorage.getItem('user'))
    const move = useNavigate();
    
    // states
    const [user, setUser] = useState(myuser) // Contains user's information
    const [blog, setBlog] = useState()
    const [pending, setPending] = useState(false)
    
    const handleDelete = async () => {
        if(user.role !== 'admin') return showToast('Only admins can delete', 'error')

        setPending(true)
        const response = await deleteBlogData(id)
        if(response.status === 200)
        {
            setPending(false)
            showToast("Blog Deleted", 'success')
            move('/home')
        }
        else{
            setPending(false)
            showToast("Error while deleting", 'error')
        }
    }

    const handleUpdateRedirection = async () => {
        if(user.role !== 'admin') return showToast('Only admins can update', 'error')

        move(`/update/${id}`)
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

    return (
        <div className='blogdetails'>
            {pending && <div>........Loading</div>}
            {/* {error && <div>{error}</div>} */}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written By: {blog.author}</p>
                    <div>{blog.content}</div>

                    <button onClick={handleDelete} className='b1'>Delete</button>

                    <button onClick={handleUpdateRedirection} className='b1 b2'>Update</button>
                </article>
            )}

        </div>
    )
}

export default BlogDetails