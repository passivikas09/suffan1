import { Link } from "react-router-dom";
import { useState } from "react";
import apiservice from "../apiservice/apiservice";
import { toast } from "react-toastify";
export default function Addcategory() {
    const [category, setcategory] = useState("")
    const [load, setload] = useState(false)
    const handleCategory = (e) => {
        e.preventDefault()
        setload(true)
        let data = {
            name: category
        }
        apiservice.addcategory(data).then((res) => {
            console.log(res)
            if (res.data.success === false) {
                setload(false)
                toast.error(res.data.message)
            } else {
                setload(false)
                toast.success(res.data.message)
            }
        }).catch(() => {
            toast.error("something went wrong")
        })
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
                            <h1>Category</h1>
                            <nav>
                                <ol className="breadcrumb pt-1 mx-2">
                                    <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                                    <li className="breadcrumb-item">Category</li>
                                    <li className="breadcrumb-item active">Add</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="col-md  text-end mt-3 mb-3 text-end">
                        <Link to={"/admin/category/all"} className="btn btn-dark">Back</Link>
                    </div>
                </div>
                <section className="section">
                    <div className="row d-flex justify-content-center"  >
                        <div className="col-lg-10">
                            <div className="card pb-2">
                                <div className="card-body">
                                    <h5 className="card-title">Add Category</h5>
                                    {/* Vertical Form */}
                                    <form className="row g-3">
                                        <div className="col-12">
                                            <label for="inputNanme4" className="form-label">Category Name</label>
                                            <input value={category} onChange={(e) => { setcategory(e.target.value) }} type="text" className="form-control" id="inputNanme4" placeholder="" />
                                        </div>
                                        <div>
                                            <button onClick={handleCategory} type="submit" className="btn btn-primary d-block mx-auto ">Submit</button>
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