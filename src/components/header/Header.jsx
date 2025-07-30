import React, { useState } from "react";
import "./Header.css";
import HeaderIcons from '../headerIcons/HeaderIcons'
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authThunks";
export default function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch=useDispatch();
  const toggleDropdown = () => setOpen(!open);
  return (
    <>
      <nav className="main-header d-flex justify-content-between align-items-center">
        <div>
          <HeaderIcons />
        </div>
        <div className="user-dropdown-wrapper me-5 pe-5" onClick={toggleDropdown}>
          <div className="user-dropdown-toggle">
            <img
              src="https://i.imgur.com/0y0y0y0.jpg" 
              alt="User"
              className="user-avatar"
            />
            <span className="user-name">{user?.name}</span>
            <i className="fa-solid fa-chevron-down dropdown-icon"></i>
          </div>

          {open && (
            <div className="user-dropdown-menu">
              <button className="dropdown-item">Edit Profile</button>
              <button className="dropdown-item" onClick={ (e)=>{e.stopPropagation(); dispatch(logoutUser())} } >Logout</button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
