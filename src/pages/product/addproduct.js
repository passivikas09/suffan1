import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import apiservice from "../apiservice/apiservice"
import { toast } from "react-toastify"
export default function Addproduct() {
  const [load, setload] = useState(false)
  const [name, setname] = useState("")
  const [ingredients, setingredients] = useState("")
  const [selectcat, setselectcat] = useState("")
  const [supplierid, setsupplierid] = useState("")
  const [category, setcategory] = useState([])
  const [supplier, setsupplier] = useState([])
  const [energy,setenergy]=useState(0)
  const [fat,setfat]=useState(0)
  const [salt,setsalt]=useState(0)
  const [fiber,setfiber]=useState(0)
  const [carbs,setcarbs]=useState(0)
  const [protien,setprotien]=useState(0)
  useEffect(() => {
    apiservice.allcategory().then((res) => {
      setcategory(res.data.data)
    }).catch((err) => {
      toast.error("error" + err)
    })
  }, [])
  useEffect(() => {
    apiservice.allsupplier().then((res) => {
      setsupplier(res.data.data)
    }).catch((err) => {
      toast.error("error" + err)
    })
  }, [])

  function handleproduct(e) {
    e.preventDefault()
    setload(true)
    let data = {
      name: name,
      ingredients: ingredients,
      category: selectcat,
      supplier: supplierid,
      energy:energy,
      carbohydrate:carbs,
      fat:fat,
      fiber:fiber,
      protien:protien,
      salt:salt
    }
    apiservice.addproduct(data).then((res) => {
      console.log(res.data  )
      if (res.data.success === false) {
        setload(false)
        toast.error(res.data.message)
      } else {
        setload(false)
        toast.success(res.data.message)
      }
    }).catch((errr) => {
      toast.error("errr" + errr)
    })
  }
  const customStyle = {
    height: "82vh"
  }

  return (
    <>
      <main style={customStyle} id="main" className="main ">
      <div className="row">
        <div className="col-md-2">
        <div className="pagetitle ">
          <h1>Product</h1>
          <nav>
            <ol className="breadcrumb ">
              <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
              <li className="breadcrumb-item">Product</li>
              <li className="breadcrumb-item active">Add</li>
            </ol>
          </nav>
        </div>
        </div>
        <div className="col-md mt-3 mb-3 text-end">
            <Link to={"/admin/product/all"} className="btn btn-dark" >Back</Link>
          </div>
        </div>
        <section className="section ">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10">
              <div className="card">
                <div className="card-body">
                  <h1 className="card-title">Add Product</h1>
                  {/* General Form Elements */}
                  <form>
                    <div className="row mb-3">
                      <label for="inputText" className="col-sm-2 col-form-label">Name</label>
                      <div className="col-sm-10">
                        <input value={name} onChange={(e) => { setname(e.target.value) }} type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label for="inputEmail" className="col-sm-2 col-form-label">Ingredients</label>
                      <div className="col-sm-10">
                        <input value={ingredients} onChange={(e) => { setingredients(e.target.value) }} type="email" className="form-control" />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Category</label>
                      <div className="col-sm-10">
                        <select onChange={(e) => { setselectcat((e.target.value)) }} className="form-select" >
                          <option selected >Choose one Category </option>
                          {category.map((el, index) => {
                            return (
                              <option key={index} value={el._id} >{el.name}</option>
                            )
                          })}
                        </select>
                        {/* {selectcat} */}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Supplier</label>
                      <div className="col-sm-10">
                        <select onChange={(e) => { setsupplierid(e.target.value) }} className="form-select"  >
                          <option selected >Select One Supplier</option>
                          {supplier.map((el, index) => {
                            return (
                              <option key={index} value={el._id} >{el.name}</option>
                            )
                          })}
                        </select>
                        {/* {supplierid} */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        Energy:<input value={energy} onChange={(e)=>{setenergy(e.target.value)}} className="form-control" />
                      </div>
                      <div className="col-4">
                        Protien:<input value={protien} onChange={(e)=>{setprotien(e.target.value)}} className="form-control" />
                      </div>
                      <div className="col-4">
                        Carbohydrate:<input value={carbs} onChange={(e)=>{setcarbs(e.target.value)}} className="form-control" />
                      </div>
                    </div>
                    <div className="row">
                    <div className="col-4">
                        Fat:<input value={fat} onChange={(e)=>{setfat(e.target.value)}} className="form-control" />
                      </div>
                      <div className="col-4">
                        Salt:<input value={salt} onChange={(e)=>{setsalt(e.target.value)}} className="form-control" />
                      </div>
                      <div className="col-4">
                        Fiber:<input value={fiber} onChange={(e)=>setfiber(e.target.value)} className="form-control" />
                      </div>
                    </div>
                    <div className="row mb-3 pt-3">
                      <div className="col-md">
                        <button onClick={handleproduct} type="submit" className="btn btn-primary  d-block mx-auto  "> Submit </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>{/* End #main */}
    </>
  )
}