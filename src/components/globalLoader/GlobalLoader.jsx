import React from 'react'
import { useSelector } from 'react-redux'
import './GlobalLoader.css'

export default function GlobalLoader() {
    const loading =useSelector((state)=>state.ui.loading);
    if(!loading) return null;
  return (
     <div className="global-loader-overlay">
      <div className="spinner"></div>
    </div>
  )
}
