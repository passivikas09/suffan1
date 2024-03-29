import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiservice from "../apiservice/apiservice";
import { toast } from "react-toastify";
import moment from "moment";
import { BeatLoader } from "react-spinners";
export default function AllStaff() {
    const [load, setload] = useState(false)
    const [data, setdata] = useState([])
    const [searchStaff, setsearchStaff] = useState("")
    useEffect(() => {
        setTimeout(() => {
            apiservice.allstaff().then((res) => {
                setload(false)
                setdata(res.data.data)
            }).catch((err) => {
                toast.error("error" + err)
            })
        }, 3000)
    }, [load])

    function deletestaff(id) {
        setload(true)
        let data = {
            _id: id
        }
        apiservice.deletestaff(data).then((res) => {
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

    const handleKey = (e) => {
        if (e.key == "Enter") {
            let data = {
                key: searchStaff
            }
            apiservice.searchStaff(data).then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message)
                } else {
                    setdata(res.data.data)
                    toast.success(res.data.message)
                }
            }).catch((err) => {
                toast.error("error" + err)
            })
        }
    }
    const customLoader = {
        position: "Absolute",
        top: "50%",
        left: "48%",
        zIndex: 1
    }
    return (
        <>
            <BeatLoader size={20} loading={load} cssOverride={customLoader} />
            <div className={load === true ? "disable-screen" : ""}>
                <main id="main" className="main" >
                    <div className="row">
                        <div className="col-md-2">
                            <div className="pagetitle">
                                <h1>Staff</h1>
                                <nav>
                                    <ol className="breadcrumb ">
                                        <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                                        <li className="breadcrumb-item">Staff</li>
                                        <li className="breadcrumb-item active">All</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="col-md-8 mt-3"><input onKeyDown={(e) => { handleKey(e) }} value={searchStaff} onChange={(e) => { setsearchStaff(e.target.value) }} className="form-control" placeholder="search &#128269;" />
                        </div>
                        <div className=" col-md text-end mb-3 mt-3">
                            <Link to="/admin/staff/add" className="btn btn-success mx-1">Add <i class="bi bi-plus-circle"></i></Link>
                            <Link to="/admin/dashboard" className="btn btn-dark mx-1 ">Back</Link>
                        </div>
                    </div>
                    <section className="section">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-12 table-responsive">
                                <table className="table table-bordered text-center table-striped">
                                    <thead>
                                        <tr  >
                                            <th>Sno.</th>
                                            <th>Name</th>
                                            <th>Contact</th>
                                            <th>Address</th>
                                            <th>CreatedAt</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((el, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{el.name}</td>
                                                    <td>{el.contact}</td>
                                                    <td>{el.address}</td>
                                                    <td> {moment(el.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</td>
                                                    <td className="d-flex justify-content-center">
                                                        <Link to={`/admin/staff/update/${el._id}`} className="btn btn-primary mt-1"><i className="bi bi-eye"></i></Link>
                                                        <button onClick={() => { deletestaff(el._id) }} className="btn btn-danger mt-1 mx-1"><i className="bi bi-trash mt-1 "></i></button>
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
            </div>
        </>
    )
}