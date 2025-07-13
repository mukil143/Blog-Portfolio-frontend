import React from "react";
import { auth } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { googleprovider } from "../config/firebase";
const GoogleLoginButton = ({ onSuccess, onFailure,setloading }) => {
  const handleLoginwithgoogle = async () => {
    setloading(true)
    try {
      const result = await signInWithPopup(auth, googleprovider);
      const user = result.user;
      console.log("Signed in user:", user);
      if (onSuccess) {
        onSuccess(user);
      }
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      if (onFailure){
          onFailure(err);
    }
        
    }
    setloading(false)
  };
  return (
    <button onClick={handleLoginwithgoogle} type="button" className="bg-white border border-gray-300 px-4 py-2 rounded-sm flex items-center space-x-2 hover:shadow-md transition">
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        className="h-5 w-5"
      />
      <span className="text-gray-700 font-medium">Sign in with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
