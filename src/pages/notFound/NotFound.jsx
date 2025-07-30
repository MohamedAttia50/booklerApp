import React from 'react'
import './NotFound.css'
import Header from '../../components/header/Header'
import SideBar from '../../components/sideBar/SideBar'
import HotelForm from '../../components/hotel-form/HotelForm'
export default function NotFound() {
  return (
    <section className='not-found '>
        <Header/>
        <SideBar/>
        <div className="container">
            <div className='row offset-1'>
            <HotelForm/>

            </div>
            <div className="row">
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <img className='w-25' src="/assets/images/47718920_9169204 1.svg" alt="" />
                    <h2>404</h2>
                    <h4>Page not Fount</h4>
                </div>
            </div>
        </div>
    </section>
  )
}
