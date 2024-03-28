import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useEffect, useState } from "react";
import apiservice from "../apiservice/apiservice";
import { toast } from "react-toastify";
import moment from "moment"
export default function Dispatch() {
    const [load, setload] = useState(false)
    const [data, setdata] = useState([])
    const [searchInput, setsearchInput] = useState('')
    useEffect(() => {
        apiservice.dispatchAll().then((res) => {
            setdata(res.data.data)
        }).catch((err) => {
            toast.error("error" + err)
        })
    }, [load])
    const deleteFunc = (id) => {
        setload(true)
        let data = {
            _id: id
        }
        apiservice.dispatchDelete(data).then((res) => {
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
                key: searchInput
            }
            apiservice.vendorSearch(data).then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message)
                }else{
                    toast.success(res.data.message)
                    setdata(res.data.data)
                }
            }).catch((err) => {
                toast.error("error" + err)
            })
        }
    }

    return (
        <>
            <Sidebar />
            <main id="main" className="main" >
                <div className="pagetitle d-flex justify-content-center ">
                    <h1>Dispatch</h1>
                    <nav>
                        <ol className="breadcrumb pt-1 mx-2">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                            <li className="breadcrumb-item">Dispatch</li>
                        </ol>
                    </nav>
                    <input value={searchInput} onChange={(e) => { setsearchInput(e.target.value) }} onKeyDown={(e) => { handleKey(e) }} className="form-control mx-2" placeholder="Search Vendor &#128269;" />
                    <div className="col-md d-flex justify-content-end ">
                        <Link to={"/admin/dispatch/add"} className="btn btn-success">Add <span> <i className="bi bi-plus-circle mx-1 float-left"></i></span></Link>
                        <Link to={"/admin/dashboard"} className="btn btn-dark mx-1">Back</Link>
                    </div>
                </div>
                <section className="section">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 table-responsive">
                            <table className="table table-bordered table-hover table-striped">
                                <thead>
                                    <tr className="text-center">
                                        <th>Sno.</th>
                                        <th>Vendor</th>
                                        <th>Product </th>
                                        <th>No of Labels</th>
                                        <th>createdAt</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((el, index) => {
                                        return (
                                            <tr key={index + 1} className="text-center" >
                                                <td>{index + 1}</td>
                                                <td>{el.name}</td>
                                                <td>{el.productId.name}</td>
                                                <td>{el.noofLabels}</td>
                                                <td>{moment(el.createdAt).format("L")}</td>
                                                <td >{el.status === 0 ? <h1 className="badge text-bg-warning mt-2">Pending</h1> : el.status === 1 ? <h1 className="badge text-bg-primary mt-2">Shipped</h1> : el.status === 2 ? <h1 className="badge text-bg-success mt-2 ">Delivered</h1> : el.status === 3 ? <h1 className="badge text-bg-danger">cancelled</h1> : ""}</td>
                                                <td>
                                                    <Link to={`/admin/dispatch/update/${el._id}`} className="btn btn-primary mt-1" ><i className="bi bi-pencil-square " ></i></Link>
                                                    <button onClick={() => { deleteFunc(el._id) }} className="btn btn-danger mx-1 mt-1" ><i className="bi bi-trash"></i></button>
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