import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Sidenavbar = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const [login, setlogin] = useState(false);
  const [userdata, setuserdata] = useState({});

  const checkuserlogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user Already logged in");
        setuserdata(user);
        setlogin(true);

        console.log(user);
      } else {
        console.log("User logged out");
      }
    });
  };
  useEffect(() => {
    checkuserlogin();
  }, []);
  return (
    <div className="fixed top-0 right-0 h-screen w-1/2 bg-white shadow-lg z-50 animate-slideIn md:hidden">
      <div className="p-6 space-y-4">
        <button
          className="text-red-500 font-bold text-xl"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
        <div className=" flex flex-col items-center space-y-4 ">
          <div className="text-lg hover:underline  cursor-pointer" onClick={()=>{navigate("/")}}  to={"/"}>
            Home
          </div>
          <div className="text-lg  hover:underline  cursor-pointer" onClick={()=>{navigate("/blogs")}} >
            Blogs
          </div>
          <div className="text-lg hover:underline cursor-pointer  "  onClick={()=>{navigate("/about")}}  > About</div>
          {login ? (
            <div className="h-12 w-12 rounded-full flex items-center justify-center bg-orange-500 text-white font-bold text-sm">
              {userdata.displayName
                ? userdata.displayName.charAt(0).toUpperCase()
                : userdata.email?.charAt(0).toUpperCase()}
            </div>
          ) : (
            ""
          )}
          <div className="list-none hover:underline cursor-pointer ">
            {userdata.displayName || userdata.email}
          </div>
          {login ? (
            <button
              className="button-style  "
              onClick={() => {
                signOut(auth);
                setlogin(false);
                setuserdata({});
                setIsOpen(false);
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="button-style  "
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidenavbar;
