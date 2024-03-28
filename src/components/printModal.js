import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Barcode from 'react-jsbarcode';
import apiservice from '../pages/apiservice/apiservice';
import { toast } from 'react-toastify';
import moment from 'moment';
import { DotLoader } from 'react-spinners';
export default function PrintModal(props) {
    const [data, setdata] = useState([])
    const [prodetail,setprodetail]=useState("")
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true)
        let data = {
            _id: props.id
        }
        apiservice.labelSingle(data).then((res) => {
            setprodetail(res.data.data.productId)
            setdata(res.data.data.products)
        }).catch((err) => {
            toast.error('error' + err)
        })
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
        setTimeout(() => {
            handlePrint()
        }, 500)
    }

    useEffect(() => {
        closeModal()
    }, 1000)
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


    const printRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    return (
        <>
            <div>
                <button className='btn btn-info mt-5 text-light' onClick={() => { openModal() }}><i className="bi bi-printer"></i></button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <DotLoader color='#4154f1' />
                    <button className='float-end btn btn-dark-sm' onClick={closeModal}><i className='bi bi-x-lg'></i></button>
                    <div style={{ display: "none" }}>
                        <h2 className='text-center text-dark' ref={(_subtitle) => (subtitle = _subtitle)}>Print Label</h2>
                        <div ref={printRef} className="barcode-container">
                            {data.map((el, index) => {
                                return (
                                    <div key={index} className="row barcode-page p-5">
                                        <div className="container ">
                                            <div className="row">
                                                <div className="fs-1 ">{prodetail.name}</div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12">
                                                    <p>Ingredients</p>
                                                    <small className=''>{prodetail.ingredients} </small>
                                                </div>
                                            </div>
                                            <div className="row pt-2">
                                                <div className="col-sm-6">
                                                    <p> Use By:{prodetail.useBy}
                                                        Weight: 400 g</p>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p>Nutritional Information</p>
                                                    <p className='text-center '>per 100g</p>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <p>Energy</p>
                                                            <p>Fat</p>
                                                            <p>Carbohydrate</p>
                                                            <p>Protien</p>
                                                            <p>Salt</p>
                                                            <p>Fiber</p>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <p>{prodetail.energy}</p>
                                                            <p>{prodetail.fat}</p>
                                                            <p>{prodetail.carbohydrate}</p>
                                                            <p>{prodetail.protien}</p>
                                                            <p>{prodetail.salt}</p>
                                                            <p>{prodetail.fiber}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row ">
                                                <div className="col-sm-12 d-flex justify-content-center">
                                                    <Barcode width={1} height={40} value={el.codeward === "" ? "label" : el.codeward + props.qty + moment(el.createdAt).format("L") + index} options={{ format: 'code128' }} renderer="svg" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="row mb-3">
                            <div className="col-md">
                                <button onClick={handlePrint} className='btn btn-info d-block mx-auto text-light'><i className='bi bi-printer'></i></button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}



{/* <div>
                <button className='btn btn-info mt-5 text-light' onClick={() => { openModal() }}><i className="bi bi-printer"></i></button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <DotLoader color='#4154f1' />
                    <button className='float-end btn btn-dark-sm' onClick={closeModal}><i className='bi bi-x-lg'></i></button>
                    <div style={{ display: "none" }}>
                        <h2 className='text-center text-dark' ref={(_subtitle) => (subtitle = _subtitle)}>Print Label</h2>
                        <div ref={printRef} className="barcode-container">
                            {data.map((el, index) => (
                                <div key={index} className="barcode-page">
                                    <Barcode width={1} height={40} value={el.codeward === "" ? "label" : el.codeward + props.qty + productionDate + index} options={{ format: 'code128' }} renderer="svg" />
                                </div>
                            ))}
                        </div>
                        <div className="row mb-3">
                            <div className="col-md">
                                <button onClick={handlePrint} className='btn btn-info d-block mx-auto text-light'><i className='bi bi-printer'></i></button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div> */}