import React, { useEffect, useState } from "react";
import "./Home.css";
import HotelForm from "../../components/hotel-form/HotelForm";
import { NavLink } from "react-router-dom";
import RecomendedCard from "../../components/recomendedCard/RecomendedCard";
import BestOffer from "../../components/bestOffer/BestOffer";
import SideBar from "../../components/sideBar/SideBar";
import { api } from "../../interceptor/api";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/authThunks";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [recomendedData, setRecomendedData] = useState([]);
  const [bestOfferData, setBestOfferData] = useState([]);

  const handleSearch = (filters) => {
    const params = createSearchParams(filters).toString();
    navigate(`/hotels?${params}`);
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };

  useEffect(() => {
    api
      .get("/db.json")
      .then((res) => {
        setRecomendedData(res.data.recommended_hotels);
        setBestOfferData(res.data.best_offer);
      })
      .catch((err) => {
        console.error("Failed to load data", err);
      });
  }, []);

  return (
    <>
      <section className="w-100 header-content">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex justify-content-end gap-3 pt-3 mb-5">
              {isAuthenticated ? (
                <div className="user-dropdown-wrapper me-5 pe-5" onClick={toggleDropdown}>
                  <div className="user-dropdown-toggle">
                    <img
                      src={user?.photo || "https://i.imgur.com/0y0y0y0.jpg"}
                      alt="User"
                      className="user-avatar"
                    />
                    <span className="user-name">{user?.name}</span>
                    <i className={`fa-solid fa-chevron-down dropdown-icon ${open ? 'rotate' : ''}`}></i>
                  </div>

                  {open && (
                    <div className="user-dropdown-menu">
                      <button className="dropdown-item">Edit Profile</button>
                      <button 
                        className="dropdown-item" 
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(logoutUser());
                          setOpen(false);
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <NavLink to="/login" className="text-decoration-none text-white">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="text-decoration-none text-white">
                    Sign up
                  </NavLink>
                </>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <SideBar />
            </div>
            <div className="col-8 d-flex gap-3 home-header-icons">
              <div>
                <NavLink to="/hotels">
                  <i className="fa-solid fa-bed fa-xl"></i> <br />
                  <span className="text-white">HOTEL</span>
                </NavLink>
              </div>
              <div>
                <i className="fa-solid fa-house-chimney fa-xl"></i> <br />
                <span className="text-white">VILLA</span>
              </div>
              <div>
                <i className="fa-solid fa-taxi fa-xl"></i> <br />
                <span className="text-white">TAXI</span>
              </div>
              <div>
                <i className="fa-solid fa-plane-departure fa-xl"></i>
                <br />
                <span className="text-white">FLIGHT</span>
              </div>
            </div>
          </div>
          <div className="row offset-2">
            <div className="hotel-form-co col-9">
              <HotelForm onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>
      <section className="home-content pt-3">
        <div className="container">
          <h2 className="pt-5 offset-md-2 offset-lg-1">Recomended Hotels</h2>
          <div className="row offset-md-2 offset-lg-1 flex-nowrap card-container gap-3">
            {recomendedData.map((p) => (
              <RecomendedCard data={p} key={p.id} />
            ))}
          </div>
        </div>
      </section>
      <section className="best-offer py-5">
        <div className="container">
          <div className="row offset-md-2 offset-lg-1 bg-white rounded-3 p-3">
            <h2>Best Offer</h2>
            {bestOfferData.map((p) => (
              <BestOffer data={p} key={p.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}