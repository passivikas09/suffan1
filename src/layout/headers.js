import "react-toggle/style.css" // for ES6 modules
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import apiservice from "../pages/apiservice/apiservice"
import Sidebar from "../components/sidebar";
export default function Headers() {
  const [pending, setpending] = useState("")
  const [values, setvalues] = useState([])
  const nav = useNavigate()
  function logout() {
    sessionStorage.clear()
    if (window.confirm("do you want to logout")) {
      nav("/")
      setTimeout(() => {
        toast.success("logout successfully")
      }, 1000)
    }
  }


  useEffect(() => {
    apiservice.dispatchAll().then((res) => {
      setpending(res.data.data.length)
      setvalues(res.data.data)
    }).catch((err) => {
      toast.error("error" + err)
    })
  })

  function handlekeydown(e) {
    console.log(e.key)
    if (e.key === 'Enter') {
      alert(e.target.value)
      e.preventDefault()
    }
  }
  return (
    <>
      <header id="header" className="header fixed-top d-flex align-items-center ">
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/admin/dashboard" className="logo d-flex align-items-center">
            <img src="/assets/img/sufaan.png" alt="logo" />
          </Link>
        </div>
        <div className="search-bar">
          <form className="search-form d-flex  justify-content-center align-items-center">
            <input onKeyDown={handlekeydown} type="text" placeholder="Search" title="Enter search keyword" />
            <button type="submit" title="Search"><i className="bi bi-search"></i></button>
          </form>
        </div>
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle toggle " href="#">
                <i className="bi bi-search"></i>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-bell"><sup><span className=" position-absolute top-0 translate-middle badge text-bg-danger  rounded-pill">{pending}</span> </sup>  </i>
                <span className="badge bg-primary badge-number"></span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  You have {pending} notifications
                  <Link to="/admin/dispatch"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {values.map((el, index) => {
                  return (
                    <>
                      <li key={index} className="notification-item ">
                        {el.status == 0 ? <i class="bi bi-clock-history"></i> : el.status == 1 ? <i class="bi bi-truck"></i> : el.status == 2 ? <i class="bi bi-check2-all"></i> : el.status == 3 ? <i class="bi bi-x-circle"></i> : ""}
                        <div>
                          <h4>{el.name}</h4>
                          <p>{el.productId.name}</p>
                          <p className="mt-2" >{el.status == 0 ? <p className="badge text-bg-warning" >pending</p> : el.status == 1 ? <p className="badge text-bg-primary" >shipped</p> : el.status == 2 ? <p className="badge text-bg-success" >delivered</p> : el.status == 3 ? <p className="badge text-bg-danger" >cancelled</p> : ""}</p>
                        </div>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                    </>
                  )
                })}
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  <Link to="/admin/dispatch">Show all notifications</Link>
                </li>
              </ul>
            </li>
       
            <li className="nav-item dropdown ">
              <a className="nav-link nav-profile d-flex align-items-center " href="#" data-bs-toggle="dropdown">
                <i style={{ fontSize: "30px" }} className="bi bi-person-fill"></i>
                <span className="d-none d-md-block dropdown-toggle me-3">Admin</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>Sufaan Admin</h6>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center" href="#">
                    <i className="bi bi-box-arrow-right"></i>
                    <span><button onClick={logout} className="btn"> Sign Out</button></span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
      <Sidebar/>
    </>
  )
}