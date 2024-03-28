import React, { createContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import apiservice from '../pages/apiservice/apiservice';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';

export default function ModalFunc(props) {
    const [load, setload] = useState(false)
    const [name, setname] = useState("")
    const [ingredients, setingredients] = useState("")
    const [qty,setqty]=useState("")
    const [category, setcategory] = useState([])
    const [supplier, setsupplier] = useState([])
    const [cat, setcat] = useState("")
    const [supplierId, setsupplierid] = useState("")

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    }

    const customLoader={
        position:"Absolute",
        left:"48%",
        top:'50%'
    }

    useEffect(() => {
        let data = {
            _id: props.id
        }
        apiservice.singleproduct(data).then((res) => {
            setname(res.data.data.name)
            setingredients(res.data.data.ingredients)
            setqty(res.data.data.quantity)
        }).catch((err) => {
            toast.error("error" + err)
        })
    }, [])

    useEffect(() => {
        apiservice.allcategory().then((res) => {
            setcategory(res.data.data)
        }).catch((err) => {
            toast.error("error" + err)
        })
    }, [])

    useEffect(() => {
        apiservice.allsupplier().then((res) => {
            setsupplier(res.data.data)
        }).catch((err) => {
            toast.error("error" + err)
        })
    },[])

    function handleupdate(e) {
        e.preventDefault()
        let data = {
            _id: props.id,
            name: name,
            ingredients: ingredients,
            quantity:qty,
            category: cat,
            supplier: supplierId
        }
        apiservice.updateproduct(data).then((res) => {
            if (res.data.sucess === false) {
                setload(true)
                toast.error(res.data.message)
            } else {
                setTimeout(() => {
                    window.location.reload()
                    toast.success(res.data.message)
                }, 2000);
            }
        }).catch(err => {
            toast.error("error" + err)
        })
    }
    return (
        <>
            <div>
                <button className='btn btn-primary' onClick={openModal}><i class="bi bi-eye"></i></button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <button className='float-end btn btn-dark-sm' onClick={closeModal}><i className='bi bi-x-lg'></i></button>
                    <h2 className='text-dark text-center' ref={(_subtitle) => (subtitle = _subtitle)}>Update Product</h2>
                    <form>
                        <form>
                            <div className="row mb-3">
                                <label for="inputText" className="col-sm-12 col-form-label">Name</label>
                                <div className="col-sm-12">
                                    <input value={name} onChange={(e) => { setname(e.target.value) }} type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="inputEmail" className="col-sm-12 col-form-label">Ingredients</label>
                                <div className="col-sm-12">
                                    <input value={ingredients} onChange={(e) => { setingredients(e.target.value) }} type="text" className="form-control" />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <label className='col-sm-12 col-form-label' >Quantity</label>
                                <div className='col-sm-12'>
                                    <input className='form-control' value={qty} onChange={(e)=>{setqty(e.target.value)}} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-12 col-form-label">Category</label>
                                <div className="col-sm-12">
                                    <select onChange={(e) => { setcat(e.target.value) }} className="form-select" >
                                        <option selected >Choose one Category </option>
                                        {category.map((el, index) => {
                                            return (
                                                <option value={el._id} key={index}>{el.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-12 col-form-label">Supplier</label>
                                <div className="col-sm-12">
                                    <select onChange={(e) => { setsupplierid(e.target.value) }} className="form-select"  >
                                        <option selected >Select One Supplier</option>
                                        {supplier.map((el, index) => {
                                            return (
                                                <option key={index} value={el._id} >{el.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md">
                                    <button onClick={handleupdate} type="submit" className="btn btn-primary  d-block mx-auto  "> Update </button>
                                </div>
                            </div>
                        </form>
                    </form>
                </Modal>
            </div>
        </>
    )
}