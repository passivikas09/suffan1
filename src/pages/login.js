import { useState } from "react"
import apiservice from "./apiservice/apiservice"
import { ToastContainer, toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { BeatLoader } from "react-spinners"

export default function Login(){

 const [name,setname]=useState("")
 const [password,setpassword]=useState("")
 const [load,setload]=useState(false)
 const nav=useNavigate()
 const login=(e)=>{
    e.preventDefault()
    setload(true)
    let data={
      name:name,
      password:password
    }
    apiservice.login(data).then((res)=>{
      console.log(res.data.data)
      if(res.data.success===false){
          setload(false)
          toast.error(res.data.message)
      }else{
        sessionStorage.setItem("token",res.data.token)
        sessionStorage.setItem("data",res.data.data)
        setTimeout(() => {
          setload(false)
          nav("/admin/dashboard")
        }, 3000)
      }
      setTimeout(()=>{
        toast.success(res.data.message)
      },4000)
    }).catch((err)=>{
      toast.error("error"+err)
    })
 }

 const customStyle={
  position:"Absolute",
  top:"50%",
  left:"47%"
 }
//  245, 246, 252,117, 19, 93,
 const loginStyle={
  background:"  linear-gradient(to bottom, rgba(245, 246, 252, 0.8), rgba(117, 19, 93, 0.5)),Url('/assets/img/sufaanmeat.jpg')",
  backgroundRepeat:"no-repeat",
  backgroundAttachment:"fixed",
  backgroundPosition:"center",
  backgroundSize:"cover",
}
    return(
        <>
        <BeatLoader color="grey" size={20} cssOverride={customStyle} loading={load} />
        <div className={load===true?"disable-screen":""}>
        <main  >
    <div style={loginStyle}  className="container-fluid ">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div   className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

              <div className="d-flex justify-content-center py-4">
                <Link to="/" className="logo d-flex align-items-center w-auto">
                  <img   style={{zIndex:999}}  src="/assets/img/sufaan.png" alt="logo"/>
                </Link>
              </div>
          
              <div className="card mb-3 ">

                <div className="card-body pb-5">

                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                    <p className="text-center small">Enter your username & password to login</p>
                  </div>

                  <form className="row g-3 needs-validation d-flex  justify-content-center" novalidate>
                    <div className="col-12">
                      <label for="yourUsername" className="form-label">Username</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend"><i style={{color:"rgb(1, 32, 143)"}} class="bi bi-people-fill"></i></span>
                        <input value={name} onChange={(e)=>{setname(e.target.value)}}  type="text" name="username" className="form-control" id="yourUsername" required/>
                        <div className="invalid-feedback">Please enter your username.</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <label for="yourUsername" className="form-label">Username</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend"><i  style={{color:"rgb(1, 32, 143)"}} class="bi bi-key-fill"></i></span>
                        <input value={password} onChange={(e)=>{setpassword(e.target.value)}} type="text" name="username" className="form-control" id="yourUsername" required/>
                        <div className="invalid-feedback">Please enter your username.</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <button onClick={login} className="btn btn-primary w-100" type="submit">Login</button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
  </div>  
  <ToastContainer position="top-center" draggable />
        </>
    )
}