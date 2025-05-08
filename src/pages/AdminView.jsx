import React from 'react'
import { DashboardSidebar, DashTop, Statistics } from '../components'
import SharedList from '../sharedComponent.jsx/SharedList'

export default function AdminView() {
    return (
        <section className="row p-0 m-0 min-vh-100" style={{ backgroundColor: "#191919" }}>
            <div className='d-flex w-100 p-0'>
                <DashboardSidebar />
                <div className='d-flex flex-column w-100'>
                    <DashTop />
                    <Statistics />
                    <div className='d-flex justify-content-between container mt-5 mb-3 g-4'>
                        <div className="col-12 col-lg-6">
                            <SharedList category={"Movies"} />
                        </div>
                        <div className="col-12 col-lg-6">
                            <SharedList category={"TV Shows"} />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
