import { Link, useParams } from "react-router-dom";
import Barcode from 'react-jsbarcode';
import { useEffect, useState } from "react";
import apiservice from "../apiservice/apiservice";
import { toast } from "react-toastify";
import moment from "moment"
export default function UpdateLabel() {
  const parm=useParams()
  const id=parm.id
  const [load,setload]=useState(false)
  const [productName,setproductName]=useState("")
  const [useBy,setuseby]=useState("")
  const [codeward,setcodeward]=useState("")
  const [qty,setqty]=useState(0)
  const [labels,setlabels]=useState("")  
  const [barcodetime,setbarcodetme]=useState("")
  useEffect(()=>{
    let data={
        _id:id
    }
    apiservice.labelSingle(data).then((res)=>{
        setproductName(res.data.data.productId.name)
        setuseby(res.data.data.useBy)
        setbarcodetme( moment(res.data.data.createdAt).format("L"))
        setlabels(res.data.data.noofLabels)
        setqty(res.data.data.quantity)
        setcodeward(res.data.data.code)
    }).catch((err)=>{
        toast.error("error"+err)
    })
  },[load])

 const handleUpdate=(e)=>{
    e.preventDefault()
    setload(true)
    let data={
        _id:id,
        quantity:qty,
        useBy:useBy,
        productName:productName,
        noofLabels:labels,
        codeward:codeward
    }
    apiservice.labelUpdate(data).then((res)=>{
        console.log(res)
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

 const customStyles={
    height:'81vh'
 }

    return (
        <>
            <main  style={customStyles} id="main" className="main ">
                <div className="row">
                    <div className="col-md-2">
                    <div className="pagetitle">
                    <h1>Label</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                            <li className="breadcrumb-item">Label</li>
                            <li className="breadcrumb-item active">Update</li>
                        </ol>
                    </nav>
                </div>
                    </div>
                    <div className="col-md text-end mb-3 mt-3">
                        <Link to={"/admin/label/generated"} className="btn btn-dark" >Back</Link>
                    </div>
                </div>
               
                <section className="section ">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <h1 className="card-title">Update</h1>
                                    <form>
                                    <div className="row mb-3">
                                            <label for="inputText" className="col-sm-2 col-form-label">Code</label>
                                            <div className="col-sm-10">
                                                <input  value={codeward} onChange={(e)=>{setcodeward(e.target.value)}} type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label for="inputText" className="col-sm-2 col-form-label">Product Name</label>
                                            <div className="col-sm-10">
                                                <input  disabled value={productName} onChange={(e)=>{setproductName(e.target.value)}} type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label for="inputEmail" className="col-sm-2 col-form-label">Quantity</label>
                                            <div className="col-sm-10">
                                                <input value={qty} onChange={(e)=>{setqty(e.target.value)}} type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label for="inputEmail" className="col-sm-2 col-form-label">useBy</label>
                                            <div className="col-sm-10">
                                                <input value={useBy} onChange={(e)=>{setuseby(e.target.value)}}  type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label for="inputEmail" className="col-sm-2 col-form-label">No of Labels</label>
                                            <div className="col-sm-10">
                                                <input value={labels} onChange={(e)=>{setlabels(e.target.value)}} type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mb-3 ">
                                            <div className="col-md-12 d-flex justify-content-center">
                                                <button onClick={handleUpdate} type="submit" className="btn btn-primary "> update </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div  className="col-lg-4 card ">
                            <div  className="d-flex justify-content-center ">
                                <div  style={{marginTop:"30%"}} > <Barcode value={ codeward===""?"label":codeward+qty +barcodetime} options={{ format: 'code128' }} renderer="svg" /></div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}