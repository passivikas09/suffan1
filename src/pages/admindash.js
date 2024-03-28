import Sidebar from "../components/sidebar"
import React from 'react';
import { Link } from "react-router-dom"

export default function Admindashboard() {
  const customStyle = {
    height: "81vh",
    background: "https://media.gettyimages.com/id/1031355620/photo/empty-studio-background.jpg?s=1024x1024&w=gi&k=20&c=6zEzFWGjRSbknvaCAgZmrO3XcNcoueYxv82LHSC9Myg=",
    backgroundPositon: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }

  

  return (
    <>
      <Sidebar />
      <main style={customStyle} id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="row">

            {/* Left side columns */}
            <div className="col-lg-12">
              <div className="row">

                {/* Sales Card */}
                
                <div className="col-xxl-4 col-lg-12 col-md-12">
                  <div className="card info-card sales-card">
                    <div className="card-body p-4">
                    <Link to='/admin/product/all'>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i class="bi bi-box-seam"></i>
                        </div>
                        <div className="ps-3">
                          <h6>Product Management</h6>
                        </div>
                      </div>
                      </Link>
                    </div>
                  </div>
                </div>{/* End Sales Card */}
             
                <div className="col-xxl-4 col-xl-12">
                  <div className="card info-card category-card ">
                    <div className="card-body p-4">
                    <Link to={"/admin/category/all"} >
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-list-task text-primary"></i>
                        </div>
                        <div className="ps-3">
                           <h6>Category</h6>
                        </div>
                      </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Revenue Card */}
                <div className="col-xxl-4 col-md-12">
                  <div className="card info-card revenue-card  ">
                    <div className="card-body p-4">
                    <Link to="/admin/staff/all">
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-people"></i>
                        </div>
                        <div className="ps-3">
                          <h6>Staff Management</h6>
                        </div>
                      </div>
                      </Link>
                    </div>

                  </div>
                </div>{/* End Revenue Card */}

                {/* Customers Card */}
                <div className="col-xxl-4 col-xl-12">

                  <div className="card info-card customers-card">
                    <div className="card-body p-4">
                    <Link to={"/admin/supplier/all"}>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i class="bi bi-truck"></i>
                        </div>
                        <div className="ps-3 ">
                          <h6>Supplier Management</h6>
                        </div>
                      </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-xl-12">
                  <div className="card info-card customers-card ">
                  <Link to={"/admin/label"} >
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-upc-scan text-dark"></i>
                        </div>
                        <div className="ps-3">
                          <h6>Label Generator</h6>
                        </div>
                      </div>
                    </div>
                    </Link>
                  </div>
                </div>
                <div className="col-xxl-4 col-xl-12">
                  <div   className="card info-card  ">
                  <Link to={"/admin/dispatch"} >
                    <div className="card-body p-4 dispatch ">
                      <div className="d-flex align-items-center ">
                        <div style={{background:" #cec6f3"}} className="card-icon rounded-circle d-flex align-items-center justify-content-center ">
                          <i style={{color:"purple"}} className="bi bi-truck-front"></i>
                        </div>
                        <div className="ps-3">
                          <h6>Dispatch</h6>
                        </div>
                      </div>
                    </div>
                    </Link>
                  </div>
                </div>
                
              </div>
            </div>{/* End Left side columns */}
          </div>
        </section>
      </main>{/* End #main */}
    </>
  )
}