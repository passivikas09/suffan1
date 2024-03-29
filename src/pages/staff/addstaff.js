import { Link } from "react-router-dom";
import { useState } from "react";
import apiservice from "../apiservice/apiservice";
import { toast } from "react-toastify";

export default function AddStaff() {
  const [load, setload] = useState(false)
  const [name, setname] = useState("")
  const [contact, setcontact] = useState("")
  const [password, setpassword] = useState("")
  const [address, setaddress] = useState("")
  function handleStaff(e) {
    e.preventDefault()
    setload(true)
    let data = {
      name: name,
      contact: contact,
      password: password,
      address: address
    }
    apiservice.addstaff(data).then((res) => {
      if (res.data.success === false) {
        setload(false)
        toast.error(res.data.message)
      } else {
        setload(false)
        toast.success(res.data.message)
      }
    }).catch((err) => {
      toast.error("error" + err)
    })
  }

  const handleReset = (e) => {
    e.preventDefault()
    setname("")
    setcontact("")
    setpassword("")
    setaddress("")
  }
  const customStyle = {
    height: "81vh"
  }
  return (
    <>
      <main style={customStyle} id="main" className="main">
        <div className="row">
          <div className="col-md-2">
          <div className="pagetitle ">
          <h1> Staff</h1>
          <nav>
            <ol className="breadcrumb pt-1 mx-2">
              <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
              <li className="breadcrumb-item">Staff</li>
              <li className="breadcrumb-item active">Add</li>
            </ol>
          </nav>
        </div>
          </div>
          <div className="col-lg mt-3 mb-3 text-end">
            <Link to={"/admin/staff/all"} className="btn btn-dark mx-1">Back</Link>
          </div>
        </div>
        <section className="section">
          <div className="row d-flex justify-content-center" >
            <div className="col-lg-11">
              <div className="card">
                <div className="card-body pb-2">
                  <h5 className="card-title">Add Staff</h5>
                  {/* Vertical Form */}
                  <form className="row g-3">
                    <div className="col-12">
                      <label for="inputNanme4" className="form-label">Your Name</label>
                      <input value={name} onChange={(e) => { setname(e.target.value) }} type="text" className="form-control" id="inputNanme4" placeholder="john" />
                    </div>
                    <div className="col-12">
                      <label for="inputEmail4" className="form-label">Contact</label>
                      <input value={contact} onChange={(e) => { setcontact(e.target.value) }} type="Number" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label for="inputPassword4" className="form-label">Password</label>
                      <input value={password} onChange={(e) => { setpassword(e.target.value) }} type="password" className="form-control" id="inputPassword4" />
                    </div>
                    <div className="col-12">
                      <label for="inputAddress" className="form-label">Address</label>
                      <input value={address} onChange={(e) => { setaddress(e.target.value) }} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                    </div>
                    <div className="text-center">
                      <button onClick={handleStaff} type="submit" className="btn btn-primary">Submit</button>
                      <button onClick={handleReset} type="reset" className="btn btn-secondary mx-1">Reset</button>
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