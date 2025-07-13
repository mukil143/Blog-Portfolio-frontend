import Home from "./components/Home";
import Blogs from "./components/Blogs";
import Navbar from "./components/common/Navbar";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import About from "./components/About";
function App() {
 const[adminlog,setadminlog]=useState(false)

  return (
   <div className="px-10  flex flex-col min-h-screen  py-1  bg-white border rounded-md">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home adminlog={adminlog} setadminlog={setadminlog}  />}></Route>
      <Route path="/blogs" element={<Blogs adminlog={adminlog} setadminlog={setadminlog} />}></Route>
      <Route path="/login" element={<Login  />}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/about" element={<About/>}></Route>
    </Routes>

    </BrowserRouter>
   </div>
  );
}

export default App;
