import {Navigate, Outlet } from "react-router-dom";
import Headers from "./headers";
import Footer from "./footer";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
export default function Master(){
    const token = sessionStorage.getItem("token") 
    if(!token){
        toast.error("Restricted")
        return <Navigate to={"/"} />
    }  
    
    return(
        <>
           <Headers/>
           <Outlet/> 
           <Footer/>
           <ToastContainer position="top-center" draggable />
        </>
    )
}