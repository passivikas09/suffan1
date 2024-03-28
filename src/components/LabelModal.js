import Modal from 'react-modal'
import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import React, { useState } from "react";
import Barcode from 'react-jsbarcode';
import apiservice from '../pages/apiservice/apiservice';
import { toast } from 'react-toastify';
import moment from 'moment';
export default function LabelModal(props) {
    const [data,setdata]=useState([])
    const [prodata,setprodata]=useState("")
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        let data = {
            productId: props.id,
            quantity: props.quantity,
            noofLabels: props.nooflabels,
            codeward:props.codeward,
            useBy:props.useBy
        }
        apiservice.labelAdd(data).then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message)
            } else {
                toast.success(res.data.message)
                sessionStorage.setItem("generatedLabel",res.data.data._id)
                setTimeout(() => {
                    setIsOpen(true)
                }, 2000)
            }
        }).catch((err) => {
            toast.error("error" + err)
        })
         
        setTimeout(() => {
         handleApi() 
        }, 3000)
    }

    function handleApi(){
         let data={
            _id:sessionStorage.getItem("generatedLabel")
         }
         apiservice.labelSingle(data).then((res)=>{
                console.log("data==>"+res.data.data.products)
                setprodata(res.data.data.productId)
                setdata(res.data.data.products)
         }).catch((err)=>{
            toast.error("error"+err)
         })
    }
   

    function afterOpenModal() {
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
    const printRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    })  
    return (
        <>
            <div>
                <button className='btn btn-secondary d-block mx-auto w-50' onClick={openModal}>Generate <i class="bi bi-upc-scan"></i></button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <button className='float-end btn btn-dark-sm' onClick={closeModal}><i className='bi bi-x-lg'></i></button>
                    <div style={{ display: "none" }}>
                        <h2 className='text-center text-dark' ref={(_subtitle) => (subtitle = _subtitle)}>Print Label</h2>
                        <div ref={printRef} className="barcode-container">
                            {data.map((el, index) => {
                                return (
                                    <div key={index} className="row barcode-page p-5">
                                        <div className="container ">
                                            <div className="row">
                                                <div className="fs-1 ">{prodata.name}</div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-sm-12">
                                                    <p>Ingredients</p>
                                                    <small className=''>{prodata.ingredients}</small>
                                                </div>
                                            </div>
                                            <div className="row pt-2">
                                                <div className="col-sm-6">
                                                    <p> Use By:{props.useBy}</p>
                                                    <p>Weight: {props.quantity} kg</p>
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
                                                        <p>{prodata.energy}</p> 
                                                        <p>{prodata.fat}</p>  
                                                        <p>{prodata.carbohydrate}</p>  
                                                        <p>{prodata.protien}</p>  
                                                        <p>{prodata.salt}</p>  
                                                         <p>{prodata.fiber}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row ">
                                                <div className="col-sm-12 d-flex justify-content-center">
                                                <Barcode width={1} height={40} value={el.codeward === "" ? "label" : el.codeward + props.quantity + moment(el.createdAt).format("L") + index} options={{ format: 'code128' }} renderer="svg" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                       </div> 
                    <div className="row mb-3">
                        <div className="col-md">
                            <button onClick={handlePrint} className="btn btn-primary  d-block mx-auto mx-1">Print <i class="bi bi-printer"></i></button>
                        </div>
                    </div>
                </Modal>
            </div>

        </>
    )
}   
// import Modal from 'react-modal'
// import { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import React, { useState } from "react";
// import Barcode from 'react-jsbarcode';
// import apiservice from '../pages/apiservice/apiservice';
// import { toast } from 'react-toastify';
// import moment from 'moment';
// export default function LabelModal(props) {
//     let subtitle;
//     const [modalIsOpen, setIsOpen] = React.useState(false);
//     const date =Date.now()
//     let momentTime= moment(date).format("L")
//     function openModal() {
//         let data = {
//             productId: props.id,
//             quantity: props.quantity,
//             noofLabels: props.nooflabels,
//             codeward:props.codeward,
//             useBy:props.useBy
//         }
//         apiservice.labelAdd(data).then((res) => {
//             if (res.data.success === false) {
//                 toast.error(res.data.message)
//             } else {
//                 toast.success(res.data.message)
//                 setTimeout(() => {
//                     setIsOpen(true)
//                 }, 3000)
//             }
//         }).catch((err) => {
//             toast.error("error" + err)
//         })

//     }

//     function afterOpenModal() {
//         subtitle.style.color = '#f00';
//     }

//     function closeModal() {
//         setIsOpen(false);
//     }
//     const customStyles = {
//         content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//         }
//     }
//     const printRef = useRef();
//     const handlePrint = useReactToPrint({
//         content: () => printRef.current,
//     })  
//     return (
//         <>
//             <div>
//                 <button className='btn btn-secondary d-block mx-auto w-50' onClick={openModal}>Generate <i class="bi bi-upc-scan"></i></button>
//                 <Modal
//                     isOpen={modalIsOpen}
//                     onAfterOpen={afterOpenModal}
//                     onRequestClose={closeModal}
//                     style={customStyles}
//                     contentLabel="Example Modal"
//                 >
//                     <button className='float-end btn btn-dark-sm' onClick={closeModal}><i className='bi bi-x-lg'></i></button>
//                     <h2 className='text-center text-dark' ref={(_subtitle) => (subtitle = _subtitle)}>Product Label</h2>
//                     <div className='text-center'  ref={printRef} >
//                         <Barcode width={1} height={40} value={props.codeward === "" ? "label" : props.codeward + props.quantity+momentTime} options={{ format: 'code128' }} renderer="svg" />
//                         <p>{props.quantity}</p>
//                     </div>
//                     <div className="row mb-3">
//                         <div className="col-md">
//                             <button onClick={handlePrint} className="btn btn-primary  d-block mx-auto mx-1">Print <i class="bi bi-printer"></i></button>
//                         </div>
//                     </div>
//                 </Modal>
//             </div>

//         </>
//     )
// }