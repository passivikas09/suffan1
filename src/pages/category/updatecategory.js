import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiservice from "../apiservice/apiservice";
import { toast } from "react-toastify";
export default function Updatecategory(){
const [load,setload]=useState(false)
const [category,setcategory]=useState("")
const param=useParams()
const id=param.id
useEffect(()=>{
    let data={
        _id:id
    }
    apiservice.singlecategory(data).then((res)=>{
        console.log(res.data)
        if(res.data.success===false){
            toast.error(res.data.message)
        }else{
            setcategory(res.data.data.name)
        }
    }).catch((err)=>{
        toast.error("error"+err)
    })
},[])

function updateCategory(e){
    e.preventDefault()
    setload(true)
    let data={
        _id:id,
        name:category
    }
    apiservice.updatecategory(data).then((res)=>{
        if(res.data.success===false){
            setload(false)
            toast.error(res.data.message)
        }else{
            setload(false)
            toast.success(res.data.message)
        }
    }).catch((err)=>{
        toast.error("error"+err)
    })
}

    const customStyle={
        height:"81vh"
    }
    return(
        <>
            <main style={customStyle} id="main" className="main">
                <div className="row">
                    <div className="col-md-2">
                    <div className="pagetitle">
                    <h1>Category</h1>
                    <nav>
                        <ol className="breadcrumb pt-1 mx-2">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                            <li className="breadcrumb-item">Category</li>
                            <li className="breadcrumb-item active">Update</li>
                        </ol>
                    </nav>
                </div>{/* End Page Title */}
                    </div>
                    <div className="col-md text-end mt-3 mb-3 ">
                        <Link  to={"/admin/category/all"} className="btn btn-dark">Back</Link>
                    </div>
                </div>
                <section className="section">
                    <div className="row d-flex justify-content-center"  >
                        <div className="col-lg-10">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Update Category</h5>
                                    {/* Vertical Form */}
                                    <form className="row g-3">
                                        <div className="col-12">
                                            <label for="inputNanme4" className="form-label">Category Name</label>
                                            <input  value={category} onChange={(e)=>{setcategory(e.target.value)}}  type="text" className="form-control" id="inputNanme4" placeholder="" />
                                        </div>
                                        <div>
                                            <button onClick={updateCategory} type="submit" className="btn btn-primary d-block mx-auto   ">Update</button>
                                        </div>
                                    </form>{/* Vertical Form */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}