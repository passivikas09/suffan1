import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useEffect, useState } from "react";
import apiservice from "../apiservice/apiservice";
import { toast } from "react-toastify";
import moment from 'moment';
export default function Allcategory(){
    const [load,setload]=useState(false)
    const [data,setdata]=useState([])
    const [searchCategory,setsearchCategory]=useState("")
    useEffect(()=>{
        apiservice.allcategory().then((res)=>{
            setdata(res.data.data)
        }).catch((err)=>{
            toast.error("error"+err)
        })
    },[load])

    function deleteFunc(id){
        setload(true)
        let data={
            _id:id
        }
        apiservice.deletecategory(data).then((res)=>{
            if(res.data.success===false){
                setload(false)
                toast.error(res.data.message)
            }else{
                setload(false)
                toast.success(res.data.message)
            }
        }).catch(()=>{
            toast.error("Something went wrong")
        })
    }

    const handleKey=(e)=>{
        if(e.key=="Enter"){
            let data={
                key:searchCategory
            }
            apiservice.searchCategory(data).then((res)=>{
                if(res.data.success===false){
                    toast.error(res.data.message)
                }else{
                    setdata(res.data.data)
                    toast.success(res.data.message)
                }
            }).catch((err)=>{
                toast.error("error"+err)
            })
        }
    }
    const customStyle={
        height:"81vh"
    }
    return(
        <>
        <Sidebar />
            <main style={customStyle} id="main" className="main" >           
                 <div className="pagetitle d-flex justify-content-center ">
                <h1 className="pt-3" >Category</h1>
                <nav>
                    <ol className="breadcrumb pt-4 mx-2">
                        <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                        <li className="breadcrumb-item">Category</li>
                        <li className="breadcrumb-item active">All</li>
                    </ol>
                </nav>
                <div className="col-md d-flex justify-content-end">
                    <input value={searchCategory} onChange={(e)=>{setsearchCategory(e.target.value)}} onKeyDown={(e)=>{handleKey(e)}} className="form-control" placeholder="Search &#128269;" />
                    <Link to={"/admin/category/add"} className="btn btn-success mx-1" >Add <i class="bi bi-plus-circle"></i></Link>
                    <Link to={"/admin/dashboard"} className="btn btn-dark mx-1">Back</Link>
                </div>
            </div>
            <section className="section">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12 table-responsive">
                        <table className="table table-bordered text-center table-striped">
                            <thead>
                                <tr>
                                    <th>Sno.</th>
                                    <th>Name</th>
                                    <th>createdAt</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((el,index)=>{
                                    return(
                                        <tr key={index} >
                                            <td>{index+1}</td>
                                            <td>{el.name}</td>
                                            <td>{moment(el.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                            <td>{el.isDeleted.toString()==='false'?<p className="badge text-bg-success mt-2">Active</p>:''}</td>
                                            <td className="d-flex  justify-content-center" >
                                                <Link to={`/admin/category/update/${el._id}`} className="btn btn-primary mt-1"><i className="bi bi-eye" ></i></Link>
                                                <button onClick={()=>{deleteFunc(el._id)}} className="btn btn-danger mx-1 mt-1"><i className="bi bi-trash"></i></button>
                                            </td>
                                        </tr>
                                    ) 
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            </main>
        </>
    )
}