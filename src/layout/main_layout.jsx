import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer'

export default function MainLayout() {

  return (
    <div className="pb-32">
        <Outlet/>
        <Footer/>
    </div>
  )
}