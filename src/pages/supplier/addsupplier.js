import { Link } from "react-router-dom";
import { useState } from "react";
import apiservice from "../apiservice/apiservice";
import { toast } from "react-toastify";
export default function Addsupplier() {
    const [load,setload]=useState(false)
    const [name,setname]=useState("")
    const [address,setaddress]=useState("")
    const [contact,setcontact]=useState("")
    const handleSupplier=(e)=>{
        e.preventDefault()
        setload(true)
        let data={
            name:name,
            address:address,
            contact:contact
        }
        apiservice.addsupplier(data).then((res)=>{
            if(res.data.success===false){
                setload(false)
                toast.error(res.data.message)
            }else{
                setload(false)
                toast.success(res.data.message)
            }
        }).catch(()=>{
            toast.error("something went wrong")
        })
    }
    function handleReset(e){
        e.preventDefault()
        setname("")
        setcontact("")
        setaddress("")
    }
    const customStyle = {
        height: "81vh"
    }
    return (
        <>
            <main style={customStyle} id="main" className="main ">
                <div className="row ">
                    <div className="col-md-2">
                    <div className="pagetitle">
                    <h1>Supplier</h1>
                    <nav>
                        <ol className="breadcrumb ">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                            <li className="breadcrumb-item">Supplier</li>
                            <li className="breadcrumb-item active">Add</li>
                        </ol>
                    </nav>
                </div>
                    </div>
                    <div className="col-md text-end mt-3">
                        <Link to='/admin/supplier/all' className="btn btn-dark ">Back</Link>
                    </div>
                </div>
                <section className="section ">
                    <div className="row d-flex justify-content-center "  >
                        <div className="col-lg-10">
                            <div className="card pb-2">
                                <div className="card-body">
                                    <h5 className="card-title">Add Supplier </h5>
                                    <form className="row g-3">
                                        <div className="col-12">
                                            <label for="inputNanme4" className="form-label">Your Name</label>
                                            <input value={name} onChange={(e)=>{setname(e.target.value)}} type="text" className="form-control" id="inputNanme4" placeholder="john@doe" />
                                        </div>
                                        <div className="col-12">
                                            <label for="inputEmail4" className="form-label">Contact</label>
                                            <input value={contact} onChange={(e)=>{setcontact(e.target.value)}}  type="text" className="form-control"  />
                                        </div>
                                        <div className="col-12">
                                            <label for="inputAddress" className="form-label">Address</label>
                                            <input value={address} onChange={(e)=>{setaddress(e.target.value)}} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                                        </div>
                                        <div className="text-center">
                                            <button onClick={handleSupplier} type="submit" className="btn btn-primary">Submit</button>
                                            <button onClick={handleReset}  type="reset" className="btn btn-secondary mx-1">Reset</button>
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