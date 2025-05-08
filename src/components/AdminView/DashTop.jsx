import React from 'react';
import { BsList } from 'react-icons/bs';


export default function DashTop() {
    return (
        <>
            <div className='mx-4 d-flex justify-content-between my-4 px-4 rounded-5 align-items-center' style={{ height: "fit-content", backgroundColor: "#212121" }}>
                <BsList size={32} style={{ cursor: 'pointer', color: "white" }} />
                <p className='pt-1 fs-5' style={{marginTop:"5px",color:"#3DD2CC",letterSpacing:"2px"}}><em>Dashboard</em></p>
                <div className='icon' >
                    <i className="bi bi-bell me-3"></i>
                    <i className="bi bi-people"></i>
                </div>
            </div>
        </>
    )
}
