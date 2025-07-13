import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import{HiBars3BottomRight}from 'react-icons/hi2'
import Sidenavbar from './Sidenavbar'
function Navbar() {
    const navigate = useNavigate()
    const [login,setlogin]=useState(false)
    const [userdata,setuserdata]=useState({})
    const [isOpen,setIsOpen]=useState(false)

       const handleLogout=()=>{
        signOut(auth);
        setuserdata({});
        setlogin(false);
       }
    
    
   
    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setuserdata(user);
      setlogin(true);
    } else {
      setuserdata({});
      setlogin(false);
    }
  });

  return () => unsubscribe();
    },[])
    
  return (
    <div className='py-5 sticky px-5 bg-white/60 shadow-lg backdrop-blur-md z-50 top-0 flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Personal</h2>
        <div className='text-3xl md:hidden cursor-pointer' onClick={() => setIsOpen(true)}>
        <HiBars3BottomRight />
      </div>

      {/* Sidebar */}
      {isOpen && (
        <Sidenavbar  setIsOpen={setIsOpen} />
      )}
        <div className=' items-center space-x-4 hidden md:flex'>
            <div className='cursor-pointer  ' onClick={()=>{navigate("/")}} >Home</div>
            <div className='cursor-pointer ' onClick={()=>{navigate("/blogs")}}>  Blogs</div>
            <div className=' cursor-pointer' onClick={()=>{navigate("/about")}} >About</div>
            {login?( <div className="h-10 w-10 hover:cursor-pointer rounded-full flex items-center justify-center bg-orange-500 text-white font-bold text-sm">
    {userdata.displayName
      ? userdata.displayName.charAt(0).toUpperCase()
      : userdata.email?.charAt(0).toUpperCase()}
   </div>):""}
   {/* <span>{admin && (<div>Admin: </div>)}</span> */}
            <div className='cursor-pointer flex space-x-2' >   <span>{userdata.displayName || userdata.email }</span></div>
            {login?<button className='button-style hidden md:block' onClick={handleLogout} >Logout</button>:<button className='button-style hidden md:block' onClick={()=>navigate("/login")}>Login</button>}
        </div>
    </div>  
  )
}

export default Navbar