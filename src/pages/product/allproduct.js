import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiservice from "../apiservice/apiservice";
import { toast } from "react-toastify";

export default function Allproduct() {
    const [load, setload] = useState(false)
    const [data, setdata] = useState([])
    const [searchProduct, setsearchProduct] = useState("")

    useEffect(() => {
        apiservice.allproduct().then((res) => {
            setload(false)
            setdata(res.data.data)
        }).catch((err) => {
            toast.error("error" + err)
        })
    }, [load])

    function deleteproduct(id) {
        setload(id)
        let data = {
            _id: id
        }
        apiservice.deleteproduct(data).then((res) => {
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


    function handleKey(e) {
        if (e.key == "Enter") {
            let data = {
                key: searchProduct
            }
            apiservice.searchProduct(data).then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.em)
                } else {
                    setdata(res.data.data)
                    toast.success(res.data.message)
                }
            }).catch((Err) => {
                toast.error("error" + Err)
            })
        }
    }
    return (
        <>
            <main id="main" className="main" >
                <div className="row ">
                    <div className="col-md-2">
                        <div className="pagetitle ">
                            <h1>Product</h1>
                            <nav>
                                <ol className="breadcrumb ">
                                    <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                                    <li className="breadcrumb-item">Product</li>
                                    <li className="breadcrumb-item active">All</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="col-md-8 mt-3">
                    <input className="form-control" value={searchProduct} onKeyDown={(e) => { handleKey(e) }} onChange={(e) => { setsearchProduct(e.target.value) }} placeholder="Search product here &#128269;" />
                    </div>
                    <div className="col-md  mt-3 mb-3 text-end">
                    <Link to={"/admin/product/add"} className="btn btn-success mx-1 ">Add<i class="bi bi-plus-circle"></i></Link>
                    <Link to={"/admin/dashboard"} className="btn btn-dark mx-1">Back</Link>
                    </div>
                </div>
                <section className="section">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 table-responsive">
                            <table className="table table-bordered table-hover table-striped ">
                                <thead>
                                    <tr className="text-center">
                                        <th>Sno.</th>
                                        <th>Name</th>
                                        <th>Ingredients</th>
                                        <th>energy</th>
                                        <th>protien</th>
                                        <th>carbohydrate</th>
                                        <th>fat</th>
                                        <th>fiber</th>
                                        <th>salt</th>
                                        <th>Category</th>
                                        <th>Supplier</th>
                                        <th>quantity</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((el, index) => {
                                        console.log("ers" + el.isDeleted)
                                        return (
                                            <tr key={index} className="text-center">
                                                <td>{index + 1}</td>
                                                <td>{el.name}</td>
                                                <td>{el.ingredients}</td>
                                                <td>{el.energy}</td>
                                                <td>{el.protien}</td>
                                                <td>{el.carbohydrate}</td>
                                                <td>{el.fat}</td>
                                                <td>{el.salt}</td>
                                                <td>{el.fiber}</td>
                                                <td>{el.categoryId.name}</td>
                                                <td>{el.supplierId.name}</td>
                                                <td>{el.quantity}</td>
                                                <td>{el.isDeleted.toString() === "false" ? <p className=" badge text-bg-success mt-2">Active</p> : ""}</td>
                                                <td className="d-flex justify-content-center">
                                                    {/* <ModalFunc id={el._id} /> */}
                                                    <Link className="btn btn-primary " to={`/admin/product/update/${el._id}`} ><i className="bi bi-pencil"></i></Link>
                                                    <button onClick={() => { deleteproduct(el._id) }} className="btn btn-danger  mx-1"><i className="bi bi-trash"></i></button>
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