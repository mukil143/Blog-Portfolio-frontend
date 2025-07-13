import React, { useState } from "react";
import Navbar from "./common/Navbar.jsx";
import BlogProfileImage from "../assets/Background-image.png";
import CSS from "../assets/css-3.png";
import HTML from "../assets/html.png";
import TAILWIND from "../assets/tailwind-css-icon.png";
import MONGODB from "../assets/mongodb-icon.png";
import DB from "../assets/data-server.png";
import FIREBASE from "../assets/google-firebase-icon.png";
import JS from "../assets/js.png";
import REACTICON from "../assets/physics.png";
import NODE from "../assets/node-js.png";
import P1 from "../assets/Bulkmail-projec1.png";
import P2 from "../assets/Appleclone-P2.png";
import P3 from "../assets/Nostra-Ecommerce.png";
import P4 from "../assets/TripAdvisor.png";
import resume from "../assets/resume/Karmukilan-A Resume.pdf";
import BlogImage from "../assets/blogImage.png";
import { useNavigate } from "react-router-dom";
import Footer from "./common/Footer.jsx";
import { useEffect } from "react";
import { auth } from "../config/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "./common/Loading.jsx";
import HireMeModal from "./HireModel.jsx";

function Home() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [model,setmodel]=useState(false)
         
   const adminid="rQYXcFBMhpMsORhjdx0prcUhSyq2"
  
  
  const checkuserlogin = () => {
     onAuthStateChanged(auth, (user) => {
      if (user) {
        if(user.uid===adminid){
            console.log("admin Logged In")
        }
        console.log("user Already logged in");
      } else {
        console.log("User logged out");
      }
    });
    setloading(false);
  };

  useEffect(() => {
    setloading(true);
    window.scrollTo(0, 0);
    setTimeout(() => {
      checkuserlogin();
        
    }, 300);
  },[]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <Navbar   />
          <div className="px-5 mt-5">
            <div className="flex items-center  justify-center">
              <div className="w-full sm:w-1/2 flex-col justify-center">
                <h2 className="text-3xl md:text-6xl font-bold pb-2">
                  Hy! I Am
                </h2>
                <h2 className="text-4xl md:text-7xl font-bold text-orange-400 py-2">
                  Karmukilan
                </h2>
                <img
                  src={BlogProfileImage}
                  className="w-60 p-2  block sm:hidden"
                  alt="Blog Profile Image"
                />
                <p className="py-2">
                  I can create stunning website for your company, Do check my
                  works. I won't disappoint you. Try me for 7 Days before you
                  decide anything.
                </p>
                <button onClick={()=>{setmodel(true)}} className="button-style mt-2">Hire Me</button>
              </div>
              <HireMeModal isOpen={model} onClose={()=>{setmodel(false)}} />
              <div className="justify-center hidden  sm:block">
                <img
                  src={BlogProfileImage}
                  className="w-60    md:w-96 "
                  alt="Blog Profile Image"
                />
              </div>
            </div>

            <div className="relative overflow-hidden   w-full py-6 bg-white">
  <div className="flex w-max animate-scroll ">
    {[
      { icon: HTML, label: "HTML" },
      { icon: CSS, label: "CSS" },
      { icon: JS, label: "JavaScript" },
      { icon: REACTICON, label: "React" },
      { icon: NODE, label: "Node.js" },
      { icon: FIREBASE, label: "Firebase" },
      { icon: TAILWIND, label: "Tailwind" },
      { icon: MONGODB, label: "MongoDB" },
      // Repeat again for seamless scroll
      { icon: HTML, label: "HTML" },
      { icon: CSS, label: "CSS" },
      { icon: JS, label: "JavaScript" },
      { icon: REACTICON, label: "React" },
      { icon: NODE, label: "Node.js" },
      { icon: FIREBASE, label: "Firebase" },
      { icon: TAILWIND, label: "Tailwind" },
      { icon: MONGODB, label: "MongoDB" },
    ].map((tech, idx) => (
      <div key={idx} className="flex flex-col  group items-center cursor-pointer mx-10">
        <img src={tech.icon} alt={tech.label} className="w-[50px] mb-2" />
        <span className="text-md font-medium text-gray-700 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {tech.label}
        </span>
      </div>
    ))}
  </div>
</div>
            
            {/* <div className="flex justify-evenly py-6">
              <img src={HTML}  style={{ width: "50px" }} />
              <img src={CSS} style={{ width: "50px" }} />
              <img src={JS} style={{ width: "50px" }} />
              <img src={REACTICON} style={{ width: "50px" }} />
              <img src={FIREBASE} style={{ width: "50px" }} />
              <img src={NODE} style={{ width: "50px" }} />
              <img src={TAILWIND} style={{ width: "50px" }} />
              <img src={MONGODB} style={{ width: "50px" }} />
            </div> */}

          <div className="flex flex-col mt-10 items-center justify-center  sm:flex-row   ">
              <div className="flex-col   ">
               <div className="mt-4 border-[6px] rounded-lg border-purple-500 p-5 border-t-0 w-60 flex flex-col items-center">
  <div className="rounded-full border-2 p-5 font-bold w-full text-white text-center bg-gradient-to-br from-purple-200 to-purple-600">
    19
  </div>
  <p className="text-center font-medium">Projects Completed</p>
</div>

<div className="mt-4 border-[6px] rounded-lg  border-green-500 p-5 border-t-0 w-60 flex flex-col items-center">
  <div className="rounded-full border-2 w-full p-5 font-bold text-white text-center bg-gradient-to-br from-green-200 to-green-600">
    3
  </div>
  <p className="text-center font-medium">Months of Experience</p>
</div>
              </div>

              <div className="ml-4 mt-4 sm:mt-0">
                <h2 className="text-3xl sm:text-7xl font-bold">My Awesome</h2>
                <h2 className="text-3xl sm:text-7xl font-bold text-orange-400">
                  Services
                </h2>
                <p className="my-2">
                  I have attahed my Resume here for your Reference
                </p>
                <a  download href={resume} ><button className="button-style mt-2">Download CV</button></a>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center" >
              <h2 className="text-center text-5xl my-14 font-bold">
                Checkout My Live{" "}
                <span className="text-orange-400">Projects</span> Here
              </h2>
              <div className="flex justify-around basis-2/6 my-5  gap-10  flex-col flex-wrap md:flex-row sm:flex-col">
              <div className="flex flex-col text-center gap-2 " >
                <span className="text-2xl font-bold" >BulkMail</span>
                <img
                  src={P1}
                  className="w-64 border rounded-md cursor-pointer"
                  alt="BulkMail Project"
                />  
                <a href="https://bulk-mail-mern-rouge.vercel.app/" target="_blank" ><button className="button-style" >🔗Live demo</button></a>
              </div>
              <div className="flex flex-col text-center gap-2 " >
                <span className="text-2xl font-bold" >Apple-UI/UX</span>

                <img
                  src={P2}
                  className="w-64 border rounded-md cursor-pointer"
                  alt="Apple UI/UX Project"
                />
                <a href="https://apple-clone-ui.vercel.app/" target="_blank" ><button className="button-style" >🔗Live demo</button></a>
              </div>
              <div className="flex flex-col text-center gap-2 " >
                <span className="text-2xl font-bold " >E-Commerce-MERN</span>
                <img
                  src={P3}
                  className="w-64 border rounded-md cursor-pointer"
                  alt="Nostra E-Commerce Project"
                />
                <a href="https://mukil143.github.io/Nostra-Ecommerce-UI/index.html" target="_blank" ><button className="button-style" >🔗Live demo</button></a>
              </div>
              <div className="flex flex-col text-center gap-2 " >
                <span className="text-2xl font-bold " >TripAdvisor-clone</span>
                <img
                  src={P4}
                  className="w-64 border rounded-md cursor-pointer"
                  alt="TripAdvisor Clone Project"
                />
                <a href="https://mukil143.github.io/Tripadvisor-clone/" target="_blank" ><button className="button-style" >🔗Live demo</button></a>
              </div>

              </div>
            </div>

            <div className="flex items-center justify-center my-14">
              <div className="justify-center hidden sm:block">
                <img
                  src={BlogImage}
                  className="w-60 md:w-96 "
                  alt="Blog Profile Image"
                />
              </div>
              <div className="w-full sm:w-1/2 flex-col justify-center ml-6">
                <h2 className="text-3xl md:text-6xl font-bold pb-2">
                  I like to Write
                </h2>
                <h2 className="text-4xl md:text-7xl font-bold text-orange-400 py-2">
                  Blogs about tech
                </h2>

                <p className="py-2">
                  You can know better about me by reading my blogs here. I share
                  my expertise here.
                </p>
                <button
                  className="button-style mt-2"
                  onClick={() => navigate("/blogs")}
                >
                  Read My Blogs
                </button>
              </div>
            </div>

            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default Home;
