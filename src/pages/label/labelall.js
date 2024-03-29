import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiservice from "../apiservice/apiservice";
import { toast } from "react-toastify";
import LabelModal from "../../components/LabelModal";


export default function Labelgenerate() {
    const [load, setload] = useState(false)
    const [data, setdata] = useState([])
    const [name, setname] = useState("")
    const [codeward, setcodeward] = useState("")
    const [qty, setqty] = useState(0)
    const [nooflabels, setnooflabels] = useState(0)
    const [useBy, setuseBy] = useState("")
    const [id, setid] = useState("")

    useEffect(() => {
        apiservice.allproduct().then((res) => {
            setdata(res.data.data)
        }).catch((err) => {
            toast.error("error" + err)
        })
    }, [load])


    const setvalues = (id) => {
        let data = {
            _id: id
        }
        apiservice.singleproduct(data).then((res) => {
            console.log(res.data.data)
            setname(res.data.data.name)
            setid(res.data.data._id)
        }).catch((err) => {
            toast.error("error" + err)
        })
    }
    return (
        <>
            <main id="main" className="main" >
                <div className="row">
                    <div className="col-md-2">
                        <div className="pagetitle">
                            <h1>Label </h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                                    <li className="breadcrumb-item">Label</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="col-md text-end mt-3 mb-3">
                        <Link to={"/admin/label/generated"} className="btn btn-success">All <i className="bi bi-upc-scan"></i> </Link>
                        <Link to={"/admin/dashboard"} className="btn btn-dark mx-1">Back</Link>
                    </div>
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-md-8 colsm-12">
                            <div className="card top-selling ">
                                <div className="card-body pb-3">
                                    <h5 className="card-title">List of Product</h5>
                                    {data.map((el, index) => {
                                        return (
                                            <button onClick={() => { setvalues(el._id) }} key={index} className="button-34 mt-2 mx-1" >{el.name}</button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div class="card pb-2 p-1">
                                <div class="card-body">
                                    <h5 class="card-title ">Generate Label</h5>
                                    <div class="activity pb-2">
                                        <div className=" row">
                                            <div className="col">
                                                <label>Product Name</label>
                                                <input value={name} onChange={(e) => { setname(e.target.value) }} type="text" className="form-control mt-2" />
                                                <label>Code</label>
                                                <input value={codeward} onChange={(e) => { setcodeward(e.target.value) }} className="form-control mt-2" type="text" />
                                                <label>Quantity</label>
                                                <input value={qty} onChange={(e) => { setqty(e.target.value) }} type="Number" className="form-control mt-2" />
                                                <label>No. of Labels</label>
                                                <input value={nooflabels} onChange={(e) => { setnooflabels(e.target.value.toUpperCase()) }} type="text" className="form-control mt-2" />
                                                <label>useBy</label>
                                                <input value={useBy} onChange={(e) => { setuseBy(e.target.value) }} type="text" className="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-12 ">
                                                <LabelModal id={id} nooflabels={nooflabels} useBy={useBy} quantity={qty} codeward={codeward} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}