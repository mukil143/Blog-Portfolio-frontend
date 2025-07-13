import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Footer from './common/Footer';
import Navbar from './common/Navbar';
import Loading from './common/Loading';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { HiTrash } from 'react-icons/hi2';

function Blogs() {

    const [blogs, setBlogs] = useState([]);
 const [loading, setloading] = useState(false);
 const[adminlog,setadminlog]=useState(false)
 const adminid="rQYXcFBMhpMsORhjdx0prcUhSyq2"

 const fetch=()=>{
 axios.get("https://blog-portfolio-backend.onrender.com/api/blogs").then((res) => {
            console.log(res.data)
            setBlogs(res.data)
            
        }).catch(() => {
            console.log("Error fetching data")
        })
        setloading(false)
 }

 const checkuserlogin =async () => {
    await onAuthStateChanged(auth, (user) => {
       if (user) {
        if(user.uid===adminid){
            setadminlog(true)
            console.log("admin Logged In")
        }
         console.log("user Already logged in",user.uid);
       } else {
         console.log("User logged out");
       }
     });
     
   };

    useEffect(() => {
        setloading(true)
        window.scrollTo(0, 0);
        checkuserlogin()
        setTimeout(() => {
            fetch()
        }, 500);
       
    }, [])



    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');


    const handleLike = async (blog_id) => {
        try {
            const response = await axios.patch(`https://blog-portfolio-backend.onrender.com/api/blogs/like/${blog_id}`);
            // After successfully updating the likes count in the backend, fetch the updated list of blogs
            if (response.status === 200) {
               fetch();
            }
        } catch (error) {
            console.error('Error liking the blog post:', error);
        }
    };

    const handleNewBlogSubmit = (event) => {
        event.preventDefault(); // Prevent form from refreshing the page
        const today = new Date();
        const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });


        const likes = 0
        axios.post("https://blog-portfolio-backend.onrender.com/api/blogs", { newTitle, date, newContent, likes }).then((res) => {
            console.log(res.data)

            fetch();

        }).catch((err) => {
            console.log("Error creating blog", err.message);
        })




        setNewTitle('');
        setNewContent('');
    };


    const handledelete= async(blog_id)=>{
        try {
    const response = await axios.delete(`https://blog-portfolio-backend.onrender.com/api/blogs/delete/${blog_id}`);
    console.log("Deleted successfully:", response.data);
    fetch();
  } catch (error) {
    console.error("Delete failed:", error.message);
  }
    }

    return (
        <>
        {loading?<Loading/>:(<><Navbar />
        <div className="blog-section flex flex-col bg-white py-14 h-screen">
            <h2 className="text-center text-5xl font-bold mb-14">Latest  <span className='text-orange-400'>Blogs</span> 📚</h2>

            {/* Blog creation form */}
            {adminlog?(<div className="blog-creation-form mb-8" style={{ width: "80%", margin: "auto" }}>
                <form onSubmit={handleNewBlogSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Blog Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="p-2 border rounded-sm"
                        required
                    />
                    <textarea
                        placeholder="Blog Content"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="p-2 border rounded-sm resize-none"
                        rows="4"
                        required
                    />
                    <button type="submit" className="bg-orange-400 text-white p-2 rounded-sm hover:bg-orange-600">
                        Add Blog
                    </button>
                </form>
            </div>):""}
            

            <div className="blogs-container my-2 grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto px-4">
                {blogs.map((blog) => (
                    <div key={blog._id} className="blog-post mb-8 p-6 relative bg-white shadow-lg rounded-lg">
                        <h3 className="blog-title font-semibold text-2xl text-gray-800 mb-3">{blog.newTitle}</h3>
                        <p className="blog-date text-gray-400 text-sm mb-4">{blog.date}</p>
                        <p className="blog-content text-gray-600 mb-4">{blog.newContent}</p>
                        <span className="text-blue-500 cursor-pointer" onClick={()  => handleLike(blog._id)}>Like</span>
                        <span className="ml-2">{blog.likes} Likes</span>
                        {adminlog?(<span className=' absolute hover:bg-gray-200 cursor-pointer p-2 rounded-full right-10 text-2xl' onClick={()=>{handledelete(blog._id)}} ><HiTrash/></span>):""}
                    </div>
                ))}
            </div>

            <Footer/>
        </div></>)}
       
         </>
    );
}

export default Blogs