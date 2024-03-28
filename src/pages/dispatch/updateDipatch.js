import { Link,  useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useEffect, useState } from "react";
import apiservice from "../apiservice/apiservice";
import { toast } from "react-toastify";

export default function UpdateDispatch(){
const [load,setload]=useState(false)
const [name,setname]=useState("")
const [product,setproduct]=useState([])
const [cat,setcat]=useState("")
const [qty,setqty]=useState(0)
const [status,setstatus]=useState()
const parms =useParams()
const id=parms.id
useEffect(()=>{
    let data={
        _id:id
    }
    apiservice.dispatchSingle(data).then((res)=>{
        console.log(res.data.data.productId.name)
        setname(res.data.data.name)
        setqty(res.data.data.noofLabels)
        setstatus(res.data.data.status)
    }).catch((err)=>{
        toast.error("error"+err)
    })
},[])

useEffect(()=>{
    apiservice.allproduct().then((res)=>{
        setproduct(res.data.data)
    }).catch((err)=>{
        toast.error("error"+err)
    })
},[])

function updateHandle(e){
    e.preventDefault()
    setload(true)
    let data={
        _id:id,
        name:name,
        categoryId:cat,
        quantity:qty,
        status:status
    }

    apiservice.dispatchUpdate(data).then((res)=>{
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

    return(
        <>
            <Sidebar />
                <main  id="main" className="main ">
                    <div className="pagetitle d-flex justify-content-start ">
                        <h1> Supplier</h1>
                        <nav>
                            <ol className="breadcrumb pt-1 mx-2">
                                <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                                <li className="breadcrumb-item">Supplier</li>
                                <li className="breadcrumb-item active">Update</li>
                            </ol>
                        </nav>
                        <div className="col-md d-flex justify-content-end">
                            <Link to={"/admin/dispatch"} className="btn btn-dark">Back</Link>
                        </div>
                    </div>{/* End Page Title */}
                    <section className="section ">
                        <div className="row d-flex justify-content-center " >
                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Update 
                                        </h5>
                                        <form className="row g-3">
                                            <div className="col-12 text-center">
                                                <p className=" badge  text-bg-warning" >0 Pending</p> <p className=" badge  text-bg-primary" >1 Shipped</p><p  className="badge text-bg-success mx-1"> 2   Delivered</p>
                                                <p className="badge text-bg-danger">3 Cancelled</p>
                                            </div>
                                            <div className="col-12">
                                                <label for="inputNanme4" className="form-label">Vendor</label>
                                                <input  value={name}  onChange={(e)=>{setname(e.target.value)}} type="text" className="form-control" id="inputNanme4" placeholder="john@doe" />
                                            </div>
                                            <div className="col-12">
                                                <label for="inputEmail4" className="form-label">Product</label>
                                                <select className="form-select" onChange={(e)=>{setcat(e.target.value)}} >
                                                <option selected>Choose product</option>
                                                {product.map((el,index)=>{
                                                    return(
                                                        <option value={el._id} key={index}>{el.name}</option>
                                                    )
                                                })}
                                                </select>
                                            </div>
                                            <div className="col-12">
                                                <label for="inputAddress" className="form-label">No of Label</label>
                                                <input value={qty} onChange={(e)=>{setqty(e.target.value)}}  type="number"  className="form-control" id="inputAddress" placeholder="" />
                                            </div>
                                            <div className="col-12">
                                                <label for="inputAddress" className="form-label">Status <span>{status==0?<p className="badge text-bg-warning">Pending</p>:
                                                status==1?<h1 className="badge text-bg-primary">Shipped</h1>:status==2?<h1 className="badge text-bg-success" >Delivered</h1>:status==3?<h1 className="badge text-bg-danger">cancelled</h1>:""}</span> </label>
                                                <input  value={status} onChange={(e)=>{setstatus(e.target.value)}} type="text"  className="form-control" id="inputAddress" placeholder="" />
                                            </div>
                                            <div className="text-center pb-1    ">
                                                <button onClick={updateHandle}  type="submit" className="btn btn-primary">Update</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
        </>
    )
}