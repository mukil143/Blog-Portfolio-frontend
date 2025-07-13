import React, { useEffect, useState } from 'react'
import profile from "../assets/profile.JPEG"
import resume from "../assets/resume/Karmukilan-A Resume.pdf";

import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import Navbar from './common/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

function About() {

    const [loading, setloading] = useState(false);



    const checkuserlogin = () => {
         onAuthStateChanged(auth, (user) => {
          if (user) {
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
    <section>
      <Navbar/>
      <section className="py-16 px-4 bg-gray-50" id="about">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
    <div className="flex-1 flex justify-center">
      <img
        src={profile}
        alt="Karmukilan"
        className="w-60 md:w-80 rounded-full"
      />
    </div>

    <div className="flex-1">
      <div className="text-left">
      <h2 className="text-4xl font-bold mb-4">About Me</h2>
      <p className="text-lg text-gray-700 mb-4">
    I'm <strong>Karmukilan</strong>, a passionate full-stack developer with a knack for creating stunning, responsive, and efficient websites.
    With experience in React, Node.js, Firebase, and MongoDB, I help brands grow their digital presence.
     </p>
     <p className="text-lg text-gray-700 mb-4">
    I specialize in building full-stack web applications, solving problems with clean code, and delivering a great user experience.
     </p>

    <ul className="text-md text-gray-600 list-disc pl-5 space-y-1 mb-4">
       <li>👨‍💻 Full Stack Developer</li>
       <li>⚙️ Tech Stack: React, Node.js, MongoDB, Firebase</li>
       <li>📍 Based in Tamil Nadu, India</li>
      <li>📧 Email: karmukilan.dev@gmail.com</li>
     </ul>

     <a
    href={resume}
    download
    className="inline-block bg-orange-500 text-white px-6 py-2 rounded-sm hover:bg-orange-600"
     >
    Download Resume
     </a>
     <div className="mt-6 flex space-x-4">
  <a
    href="https://www.linkedin.com/in/karmukilan-a-5217b72a3/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-700 hover:text-blue-800 text-2xl"
  >
    <FaLinkedin />
   
  </a>
  <a
    href="https://github.com/mukil143"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-800 hover:text-black text-2xl"
  >
    <FaGithub />
  </a>

  <a
    href="mailto:karmukilan.dev@gmail.com"
    className="text-red-600 hover:text-red-700 text-2xl"
  >
    <FaEnvelope />
  </a>
</div>

</div>
</div>
</div>
</section>

    </section>
  )
}

export default About