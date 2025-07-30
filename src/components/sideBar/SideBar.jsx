import React, { useState } from "react";
import "./SideBar.css";
import { NavLink } from "react-router-dom";
export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSideBar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <aside className={`side-bar ${collapsed ? "collapsed" : ""}`}>
      <div className=" d-flex justify-content-between w-100">
        {!collapsed && (
          <img src="/assets/images/Vector-white.svg" className="w-50" alt="" />
        )}
        <div className={collapsed?"m-auto":''} onClick={toggleSideBar}>
          <i className="fa-solid fa-bars text-white fa-lg "></i>
        </div>
      </div>

      <ul className="list-unstyled  mt-5">
        <NavLink to={'/'}>
        <li className="mb-4 d-flex align-items-center ">
            
          <i className="fa-solid fa-house me-2 fa-xl py-3"></i>
          {!collapsed && "Home"}
        </li></NavLink>
        <NavLink to={'/bookingList'} >
        <li className="mb-4 d-flex align-items-center">
          <i className="fa-solid fa-book me-2 fa-xl py-3"></i>
          {!collapsed && "My Bookings"}
        </li>
        </NavLink>
        <li className="mb-4 d-flex align-items-center">
          <i className="fa-solid fa-compass me-2 fa-xl py-3"></i>
          {!collapsed && "Explore"}
        </li>
        <li className="mb-4 d-flex align-items-center">
          <i className="fa-solid fa-life-ring me-2 fa-xl py-3"></i>
          {!collapsed && "Support"}
        </li>
      </ul>
      {!collapsed && (
        <div className="text-center mt-5">
          <NavLink to={'/register'} className="btn btn-light text-primary fw-bold rounded-pill px-4 ">
            Sign UP Now
          </NavLink>
        </div>
      )}
    </aside>
  );
}
