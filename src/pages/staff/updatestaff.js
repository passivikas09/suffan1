import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiservice from "../apiservice/apiservice";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
export default function Updatestaff() {
  const param = useParams()
  const id = param.id
  const [load, setload] = useState(false)
  const [name, setname] = useState("")
  const [contact, setcontact] = useState("")
  const [address, setaddress] = useState("")

  useEffect(() => {
    let data = {
      _id: id
    }
    apiservice.singlestaff(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message)
      } else {
        setname(res.data.data.name)
        setcontact(res.data.data.contact)
        setaddress(res.data.data.address)
      }
    }).catch((err) => {
      toast.error("error" + err)
    })
  }, [load])

  function updatestaff(e) {
    e.preventDefault()
    setload(true)
    let data = {
      _id: id,
      name: name,
      contact: contact,
      address: address
    }
    apiservice.updatestaff(data).then((res) => {
      if (res.data.success === false) {
        setload(false)
        toast.error(res.data.message)
      } else {
        setTimeout(()=>{
        setload(false)
        toast.success(res.data.message)
        },3000)
      }
    }).catch((err) => {
      toast.error("error" + err)
    })
  }


  const customStyle = {
    height: "81vh"
  }

  const customLoader = {
    marginLeft: "45%",

  }
  return (
    <>
      <div className={load === true ? "disable-screen" : ""}>
        <main style={customStyle} id="main" className="main">
          <div className="row">
            <div className="col-md-2">
          <div className="pagetitle ">
            <h1> Staff</h1>
            <nav>
              <ol className="breadcrumb ">
                <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                <li className="breadcrumb-item">Staff</li>
                <li className="breadcrumb-item active">Update</li>
              </ol>
            </nav>
          </div>{/* End Page Title */}
            </div>
            <div className="col-md text-end mb-3 mt-3">
              <Link to={"/admin/staff/all"} className="btn btn-dark">Back</Link>
            </div>
          </div>
          <section className="section">
            <div className="row d-flex justify-content-center"  >
              <div className="col-lg-10">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Update Staff</h5>
                    {/* Vertical Form */}
                    <form className="row g-3">
                      <div className="col-12">
                        <label for="inputNanme4" className="form-label">Your Name</label>
                        <input value={name} onChange={(e) => { setname(e.target.value) }} type="text" className="form-control" id="inputNanme4" placeholder="john" />
                      </div>
                      <div className="col-12">
                        <label for="inputEmail4" className="form-label">Contact</label>
                        
                        <BeatLoader color="grey" size={20} loading={load} cssOverride={customLoader} />
                        <input value={contact} onChange={(e) => { setcontact(e.target.value) }} type="Number" className="form-control" />
                      </div>
                      <div className="col-12">
                        <label for="inputAddress" className="form-label">Address</label>
                        <input value={address} onChange={(e) => { setaddress(e.target.value) }} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                      </div>
                      <div className="text-center">
                        <button onClick={updatestaff} type="submit" className="btn btn-primary">Update</button>
                      </div>
                    </form>{/* Vertical Form */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}