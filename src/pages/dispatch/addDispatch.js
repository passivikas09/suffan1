import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiservice from "../apiservice/apiservice";
import { toast } from "react-toastify";
export default function AddDispatch() {
  const [load, setload] = useState(false)
  const [qty, setqty] = useState("")
  const [status, setStatus] = useState(0)
  const [cat, setcat] = useState("")
  const [product, setproduct] = useState([])
  const [prodata, setprodata] = useState("")

  useEffect(() => {
    apiservice.allproduct().then((res) => {
      console.log(res.data.data)
      setproduct(res.data.data)
    }).catch((err) => {
      toast.error("error" + err)
    })
  }, [])

  

  function handleDispatch(e) {
    e.preventDefault()
    setload(true)
    let data = {
      name: cat,
      productId:prodata,
      noofLabels: qty,
      status: status
    }
    apiservice.dispatchAdd(data).then((res) => {
      if (res.data.success === false) {
        setload(false)
        toast.error(res.data.message)
      } else {
        setload(false)
        toast.success(res.data.message)
      }
    }).catch((err) => {
      toast.error("Error" + err)
    })
  }

  const handleReset = (e) => {
    e.preventDefault()
    setqty("")
    setStatus("")
    setcat("")
    setprodata("")
  }
  const customStyle = {
    height: "81vh"
  }

  return (
    <>
      <main style={customStyle} id="main" className="main">
        <div className="row">
          <div className="col-md-2">
            
        <div className="pagetitle">
          <h1> Dispatch</h1>
          <nav>
            <ol className="breadcrumb ">
              <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
              <li className="breadcrumb-item">Dispatch</li>
              <li className="breadcrumb-item active">Add</li>
            </ol>
          </nav>
        </div>{/* End Page Title */}
          </div>
          <div className="col-md text-end mt-3 mb-3">
            <Link to={"/admin/dispatch"} className="btn btn-dark mx-1">Back</Link>
          </div>
        </div>
        <section className="section">
          <div className="row d-flex justify-content-center" >
            <div className="col-lg-11">
              <div className="card">
                <div className="card-body pb-2">
                  <h5 className="card-title">Dispatch</h5>
                  {/* Vertical Form */}
                  <form className="row g-3">
                    <div className="col-12">
                      <label for="inputNanme4" className="form-label">Order</label>
                      <select className="form-select" onChange={(e) => {setprodata(e.target.value) }} >
                        <option selected >Choose Product</option>
                        {product.map((el, index) => {
                          return (
                            <option value={el._id} key={index}> {el.name} </option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="col-12">
                      <label  className="form-label">Vendor</label>
                        <input value={cat} onChange={(e)=>{setcat(e.target.value)}} type="text" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label for="inputPassword4" className="form-label">Quantity</label>
                      <input value={qty} onChange={(e) => { setqty(e.target.value) }} type="text" className="form-control" id="inputPassword4" />
                    </div>
                    <div className="col-12">
                      <label for="inputAddress" className="form-label">Status</label>
                      <input value={status} onChange={(e) => { setStatus(e.target.value) }} type="Number" className="form-control" id="inputAddress" placeholder="0" />
                    </div>
                    <div className="text-center">
                      <button onClick={handleDispatch} type="submit" className="btn btn-primary">Dipatch</button>
                      <button onClick={handleReset} type="reset" className="btn btn-secondary mx-1">Reset</button>
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