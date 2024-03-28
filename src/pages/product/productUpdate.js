import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useEffect, useState } from "react";
import apiservice from "../apiservice/apiservice";
import { toast } from "react-toastify";

export default function ProductUpdate(){

const parms=useParams()
const id=parms.id
const [load,setload]=useState(false)
const [name,setname]=useState("")
const [protein,setprotein]=useState("")
const [fat,setfat]=useState("")
const [salt,setsalt]=useState("")
const [carbs,setcarbs]=useState("")
const [energy,setenergy]=useState("")
const [fiber,setfiber]=useState("")
const [ingredients,setingredients]=useState("")
const [cat,setcat]=useState("")
const [category,setcategory]=useState([])
const [supplier,setsupplier]=useState("")
const [supplierAll,setsupplerAll]=useState([])
useEffect(()=>{
    let data={
        _id:id
    }
    apiservice.singleproduct(data).then((res)=>{
        setname(res.data.data.name)
        setingredients(res.data.data.ingredients)
        setenergy(res.data.data.energy)
        setprotein(res.data.data.protien)
        setcarbs(res.data.data.carbohydrate)
        setsalt(res.data.data.salt)
        setfiber(res.data.data.fiber)
        setfat(res.data.data.fat)
    }).catch((err)=>{
        toast.error("error"+err)
    })
},[load])

useEffect(()=>{
    apiservice.allcategory().then((res)=>{
        console.log(res.data)
        setcategory(res.data.data)
    }).catch((err)=>{
        toast.error("error"+err)
    })
},[load])


useEffect(()=>{
    apiservice.allsupplier().then((res)=>{
        setsupplerAll(res.data.data)
    }).catch((err)=>{
        toast.error("error"+err)
    })
},[load])


function handleUpdate(e){
    setload(true)
    e.preventDefault()
    let data ={
        _id:id,
        name:name,
        supplier:supplier,
        category:cat,
        protein:protein,
        fat:fat,
        fiber:fiber,
        carbohydrate:carbs,
        energy:energy,
        ingredients:ingredients
    }

    apiservice.updateproduct(data).then((res)=>{
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
        <Sidebar/>
           <main  id="main" className="main ">
                <div className="pagetitle d-flex justify-content-center ">
                    <h1>Product</h1>
                    <nav>
                        <ol className="breadcrumb pt-1 mx-2">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                            <li className="breadcrumb-item">Product</li>
                            <li className="breadcrumb-item active">Update</li>
                        </ol>
                    </nav>
                    <div className="col-md d-flex justify-content-end">
                        <Link to={"/admin/product/all"} className="btn btn-dark" >Back</Link>
                    </div>
                </div>
                <section className="section ">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-10">
                            <div className="card">
                                <div className="card-body">
                                    <h1 className="card-title">Update</h1>
                                    <form>
                                    <div className="row mb-3">
                                            <label for="inputText" className="col-sm-2 col-form-label">ProductName</label>
                                            <div className="col-sm-10">
                                                <input value={name} onChange={(e)=>{setname(e.target.value)}} type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label for="inputText" className="col-sm-2 col-form-label">Ingredients</label>
                                            <div className="col-sm-10">
                                                <input value={ingredients} onChange={(e)=>{setingredients(e.target.value)}}  type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label for="inputEmail" className="col-sm-2 col-form-label">Energy</label>
                                            <div className="col-sm-10">
                                                <input  value={energy} onChange={(e)=>{setenergy(e.target.value)}} type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label for="inputEmail" className="col-sm-2 col-form-label">Protien</label>
                                            <div className="col-sm-10">
                                                <input  value={protein}  onChange={(e)=>{setprotein(e.target.value)}} type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label for="inputEmail" className="col-sm-2 col-form-label">Carbohydrate</label>
                                            <div className="col-sm-10">
                                                <input value={carbs} onChange={(e)=>{setcarbs(e.target.value)}} type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mb-3 ">
                                        <label for="inputEmail" className="col-sm-2 col-form-label">Fat</label>
                                            <div className="col-sm-10">
                                                <input className="form-control"  value={fat} onChange={(e)=>{setfat(e.target.value)}} type="text" /> 
                                            </div>
                                        </div>
                                        <div className="row mb-3 ">
                                        <label for="inputEmail" className="col-sm-2 col-form-label">Salt</label>
                                            <div className="col-sm-10 ">
                                                <input value={salt} onChange={(e)=>{setsalt(e.target.value)}} type="text" className="form-control "/> 
                                            </div>
                                        </div>
                                        <div className="row mb-3 ">              
                                        <label for="inputEmail" className="col-sm-2 col-form-label">Fiber</label>
                                            <div className="col-sm-10">
                                                <input value={fiber} onChange={(e)=>{setfiber(e.target.value)}}  type="text" className="form-control "/> 
                                            </div>
                                        </div>
                                        <div className="row mb-3 ">              
                                        <label  className="col-sm-2 col-form-label">Category</label>
                                            <div className="col-sm-10">
                                                <select onChange={(e)=>{setcat(e.target.value)}} className="form-select">
                                                    <option selected >Choose category</option>
                                                    {category.map((el,index)=>{
                                                        return(
                                                            <option value={el._id}  key={index} >{el.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mb-3 ">              
                                        <label  className="col-sm-2 col-form-label">Supplier</label>
                                            <div className="col-sm-10">
                                                <select onChange={(e)=>{setsupplier(e.target.value)}} className="form-select">
                                                    <option selected >Choose Supplier</option>
                                                    {supplierAll.map((el,index)=>{
                                                        return(
                                                            <option value={el._id} key={index} >{el.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <button  onClick={handleUpdate} className="btn btn-primary d-block mx-auto mb-3">update</button>
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