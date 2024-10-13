import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { signout } from '../../../actions';
import { showToast } from '../toaster';

const Navbar = () => {

    const [user, setUser] = useState()
    const location = useLocation();  // Get the current location object

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        setUser(storedUser)
    }, [location.pathname])
    

    const signOut = () =>{
        signout()
        showToast('Signed out Successfully', "success")
        // window.location.reload();
    }
    
    const renderPrivateLinks = () => {  
        return (
        <>
            <Link to="/home">Home</Link>
            <Link onClick={signOut} to="/">Signout</Link>
        </>
        );
    };

    const renderPublicLinks = () =>{
        return (
        <>
            <Link to="/">Signup</Link>
            <Link to="/signin">Signin</Link>    
        </>
        ) 
    }
    const renderAdminLinks = () =>{
        return (
        <>
            <Link to="/home">Home</Link>    
            <Link to="/create">New Blog</Link>    
            <Link onClick={signOut} to="/">Signout</Link> 
        </> 
        ) 
    }

    return (
        <nav className='navbar'>
            <h1>The Blog Post</h1>
            <div className="links">
            {user && Object.keys(user)?.length !== 0?  
            user?.role === "admin"? 
                renderAdminLinks() : 
                renderPrivateLinks() : 
            renderPublicLinks()}
            </div>        
        </nav>
    )
}

export default Navbar