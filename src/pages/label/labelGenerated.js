import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiservice from "../apiservice/apiservice";
import { toast } from "react-toastify";
import Barcode from 'react-jsbarcode';
import moment from "moment"
import PrintModal from "../../components/printModal"
export default function Labelgenerated() {
    const [load, setload] = useState(false)
    const [data, setdata] = useState([])
    const [searchInput, setsearchInput] = useState("")
    useEffect(() => {
        apiservice.labelAll().then((res) => {
            console.log(res.data.data)
            setdata(res.data.data)
        }).catch((err) => {
            toast.error("error" + err)
        })
    }, [load])

    function deleteFunc(id) {
        setload(true)
        let data = {
            _id: id
        }
        apiservice.labelDelete(data).then((res) => {
            if (res.data.success === false) {
                setload(false)
                toast.error(res.data.message)
            } else {
                setload(false)
                toast.success(res.data.message)
            }
        }).catch((err) => {
            toast.error('error' + err)
        })
    }

    const handleKey = (e) => {
        if (e.key === "Enter") {
            let data = {
                key: searchInput
            }
            apiservice.labelSearch(data).then((res) => {
                if (res.data.success === false) {
                    toast.error("no such label")
                } else {
                    setdata(res.data.data)
                    toast.success(res.data.message)
                }
            }).catch((err) => {
                toast.error("error" + err)
            })
        }
    }
    return (
        <>
            <main id="main" className="main" >
                <div className="row">
                    <div className="col-md-2">
                    <div className="pagetitle ">
                    <h1  >Label</h1>
                    <nav>
                        <ol className="breadcrumb ">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                            <li className="breadcrumb-item">label</li>
                            <li className="breadcrumb-item active">Generated</li>
                        </ol>
                    </nav>
                </div>
                    </div>
                    <div className="  col-md-8 col-sm-6 mt-3">
                        <input value={searchInput} onKeyDown={(e) => { handleKey(e) }} onChange={(e) => { setsearchInput(e.target.value) }} className="form-control text-center" placeholder="Search Label Here &#128269;" />
                    </div>
                    <div className="col-md text-end mb-3 mt-3">
                    <Link to="/admin/label" className="btn btn-dark mx-1">Back</Link>
                    </div>
                </div>
                
                <section className="section">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 table-responsive">
                            <table className="table table-bordered text-center table-striped">
                                <thead>
                                    <tr  >
                                        <th>Sno.</th>
                                        <th>Code</th>
                                        <th>ProductName</th>
                                        <th>qty</th>
                                        <th>useBy</th>
                                        <th>No of Labels</th>
                                        <th>Barcode</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((el, index) => {
                                        return (
                                            <tr key={index}  >
                                                <td>{index + 1}</td>
                                                <td>{el.code}</td>
                                                <td>{el.productId.name}</td>
                                                <td>{el.quantity}</td>
                                                <td>{el.useBy}</td>
                                                <td>{el.noofLabels}</td>
                                                <td ><Barcode value={el.code === "" ? "label" : el.code + el.quantity + moment(el.createdAt).format("L")} options={{ format: 'code128' }} renderer="svg" /></td>
                                                <td className="d-flex justify-content-center" >
                                                    <Link to={`/admin/label/update/${el._id}`} className="btn btn-primary mt-5"><i className="bi bi-eye"></i></Link>
                                                    <button onClick={() => { deleteFunc(el._id) }} className="btn btn-danger mx-1 mt-5"><i className="bi bi-trash"></i></button>
                                                    <PrintModal id={el._id}  qty={el.quantity}  />
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