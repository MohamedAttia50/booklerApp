import React, { useEffect, useState } from "react";
import "./BookingList.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sideBar/SideBar";
import { FaParking, FaWifi } from "react-icons/fa";
import HotelForm from "../../components/hotel-form/HotelForm";
import { useSelector } from "react-redux";

export default function Booking() {
  const { user } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);
  return (
    <section className="booking">
      <Header />
      <SideBar />
      <div className="container">
        <div className="row offset-1">
          <HotelForm />
          <div className="container py-4">
            <div className="row">
              {/* Hotel Cards Column */}
              <div className="col-md-9">
                {bookings.length === 0 ? (
                  <h2 className="text-center pt-5">No bookings yet.</h2>
                ) : (
                  bookings.map((hotel, index) => (
                    <div
                      key={index}
                      className="d-flex mb-3 p-3 shadow-sm bg-white rounded">
                      {/* Image Section */}
                      <div className="me-3" style={{ flex: "0 0 200px" }}>
                        <img
                          src={hotel.images?.main}
                          alt="Hotel"
                          className="img-fluid rounded"
                          style={{
                            width: "200px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      {/* Content Section */}
                      <div className="flex-grow-1 d-flex flex-column justify-content-between">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h5 className="mb-1">{hotel.name}</h5>
                            <p className="mb-1 fw-semibold text-secondary">
                              {hotel.address?.city}
                            </p>
                            <p
                              className="text-muted"
                              style={{ fontSize: "0.85rem" }}>
                              {hotel.address?.street}
                            </p>
                            <div className="d-flex text-muted gap-3 mb-2">
                              {hotel.amenities?.includes("Valet Parking") && (
                                <span>
                                  <FaParking /> Parking
                                </span>
                              )}
                              {hotel.amenities?.includes("Wifi") && (
                                <span>
                                  <FaWifi /> Wifi
                                </span>
                              )}
                            </div>
                            <div className="d-flex align-items-center gap-3">
                              <span className="text-warning fw-bold">
                                {hotel.pricing?.[0]?.discount}
                              </span>
                              <span className="fw-bold fs-5">
                                ${hotel.totalPrice}
                              </span>
                            </div>
                          </div>

                          {/* Rating Badge */}
                          <div>
                            <span className="badge bg-primary fs-6">
                              {hotel.rating?.score} ★
                            </span>
                          </div>
                        </div>

                        {/* Date Info */}
                        <div
                          className="text-muted mt-2"
                          style={{ fontSize: "0.85rem" }}>
                          From: 📅 {hotel.checkIn} &nbsp;&nbsp; To: 📅{" "}
                          {hotel.checkOut}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Profile Sidebar */}
              <div className="col-md-3">
                <div className="bg-white shadow-sm rounded text-center p-4">
                  <div
                    className="bg-light rounded-circle d-flex justify-content-center align-items-center mx-auto"
                    style={{ width: 100, height: 100 }}>
                    <span className="text-secondary fw-bold fs-4">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h5 className="mt-3 mb-0">{user?.name}</h5>
                  <p className="text-muted small mb-3">{user?.email}</p>
                  <p className="text-muted small mb-3">{user?.country}</p>
                  <p className="text-muted small mb-3">{user?.phone}</p>
                  <button className="btn btn-outline-secondary btn-sm">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
