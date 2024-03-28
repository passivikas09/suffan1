import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useEffect, useState } from "react";
import apiservice from "../apiservice/apiservice";
import { toast } from "react-toastify";
import { BeatLoader, RingLoader } from "react-spinners";
export default function Updatesupplier() {
    const [load, setload] = useState(false)
    const [name, setname] = useState("")
    const [contact, setcontact] = useState("")
    const [address, setaddress] = useState("")
    const params = useParams()
    const id = params.id
    useEffect(() => {
        let data = {
            _id: id
        }
        apiservice.singlesupplier(data).then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message)
            } else {
                setname(res.data.data.name)
                setaddress(res.data.data.address)
                setcontact(res.data.data.contact)
            }
        }).catch((Err) => {
            toast.error("error" + Err)
        })
    }, [load])

    function handleUpdate(e) {
        e.preventDefault()
        setload(true)
        let data = {
            _id: id,
            name: name,
            contact: contact,
            address: address
        }
        apiservice.updatedsupplier(data).then((res) => {
            if (res.data.success === false) {
                setload(false)
                toast.error(res.data.message)
            } else {
                setTimeout(() => {
                    setload(false)
                    toast.success(res.data.message)
                }, 3000)
            }
        }).catch((Err) => {
            toast.error("error" + Err)
        })
    }
    const customStyle = {
        height: "81vh"
    }
    const customLoader = {
        marginLeft:"48%",
        zIndex:1
    }
    return (
        <>
            <div className={load === true ? "disable-screen" : ""}>
                <Sidebar />
                <main style={customStyle} id="main" className="main ">
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
                            <Link to={"/admin/supplier/all"} className="btn btn-dark">Back</Link>
                        </div>
                    </div>{/* End Page Title */}
                    <section className="section ">
                        <div className="row d-flex justify-content-center "  >
                            <div className="col-lg-10">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Update</h5>
                                        <form className="row g-3">
                                            <div className="col-12">
                                                <label for="inputNanme4" className="form-label">Your Name</label>
                                                <input value={name} onChange={(e) => { setname(e.target.value) }} type="text" className="form-control" id="inputNanme4" placeholder="john@doe" />
                                            </div>
                                            <div className="col-12">
                                                <label for="inputEmail4" className="form-label">Contact</label>
                                                <BeatLoader color="aqua" size={20} loading={load} cssOverride={customLoader} />
                                                <input value={contact} onChange={(e) => { setcontact(e.target.value) }} type="text" className="form-control" />
                                            </div>
                                            <div className="col-12">
                                                <label for="inputAddress" className="form-label">Address</label>
                                                <input value={address} type="text" onChange={(e) => { setaddress(e.target.value) }} className="form-control" id="inputAddress" placeholder="1234 Main St" />
                                            </div>
                                            <div className="text-center">
                                                <button onClick={handleUpdate} type="submit" className="btn btn-primary">Update</button>
                                            </div>
                                        </form>
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