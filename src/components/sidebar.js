import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
 const [isSidebarOpen,setIsSidebarOpen]=useState(false)
 const trigger=()=>{
   setIsSidebarOpen(!isSidebarOpen)
    
 }
  
  return (
    <>
      <aside  style={{width:isSidebarOpen?"10px":""}}   id="sidebar" className="sidebar p-2" >
        <div className="d-flex justify-content-end mb-2 ">
      <button  style={{display:"none"}} ref={props.reference} onClick={trigger} className="btn btn-light "> <i class="bi bi-list "></i></button>
      </div>
        <ul className="sidebar-nav" id="sidebar-nav">
       
          <li className="nav-item">
            <Link className="nav-link " to="/admin/dashboard">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/admin/product/all"} className="nav-link collapsed"  >
              <i style={{color:" #4154f1"}} className="bi bi-box"></i><span>Products</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/admin/staff/all"} className="nav-link collapsed" >
              <i  style={{color:" #4154f1"}}   className="bi bi-people"></i><span>Staff</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/category/all" className="nav-link collapsed" >
              <i  style={{color:" #4154f1"}}   className="bi bi-list"></i><span>Category</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/label" className="nav-link collapsed" >
              <i  style={{color:" #4154f1"}}   className="bi bi-upc-scan"></i><span>Label</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/admin/supplier/all"} className="nav-link collapsed">
              <i style={{color:" #4154f1"}}   className="bi bi-truck"></i><span>Supplier</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link   className="nav-link collapsed" to="/admin/dispatch">
            <i style={{color:" #4154f1"}}   class="bi bi-truck-front"></i>
              <span>Dispatch</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  )
}