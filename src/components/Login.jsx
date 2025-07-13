import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
import Loading from './common/Loading';
import Navbar from './common/Navbar';
import GoogleLoginButton from './GoogleLoginButton';


function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading,setloading]=useState(false)

    const checkuserlogin = () => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log("user Already logged in");
            navigate("/");
          } else {
            console.log("User logged out");
          }
        });
      };
    
      

    useEffect(() => {
        window.scrollTo(0, 0);
        checkuserlogin()
    },[]);

    const handleLogin = async(e) => {
        setloading(true)
        e.preventDefault();
        try{
           const user= await signInWithEmailAndPassword(auth,email,password)
           
           navigate("/")
        }catch(err){
            console.log("Error failed to log in",err)
        }finally{
            setloading(false)
        }

        // Simulate login process
        

        // Redirect to homepage/dashboard after login
        // Replace '/home' with your homepage route
    };

    return (
        <>

        {loading?<Loading/>:(<section className='' ><Navbar/> <div className="flex justify-center px-5  py-5 items-center   md:p-10  bg-gray-100">
            <form onSubmit={handleLogin} className="p-5 md:p-10  w-full md:w-2/5   bg-white rounded-lg shadow-md" style={{  }}>
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded-sm"
                    />
                </div>
                <p className='text-blue-600 cursor-pointer my-2' onClick={() => navigate("/signup")}>New user? Register here</p>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-sm hover:bg-blue-600 transition duration-200 ease-in-out">
                    Login
                </button>
                <div className='mt-2'>
                   
                </div>
           <GoogleLoginButton onSuccess={(user)=>{console.log("User logged in:", user.displayName);navigate("/");}} setloading={setloading}  onFailure={(error)=>{ console.log("Login failed:", error.message); alert("Login failed. Please try again.");}} />
            </form>
                
        </div> 
        
         </section>)}
        
        </>
    );
}

export default Login;
