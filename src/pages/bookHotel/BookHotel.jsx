import React, { useEffect, useState } from "react";
import "./BookHotel.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sideBar/SideBar";
import { useForm } from "react-hook-form";
import HotelForm from "../../components/hotel-form/HotelForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BookHotel() {
  const location = useLocation();
  const hotel = location.state?.hotel;
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (start >= end) {
      alert("Check-out must be after check-in.");
      return;
    }

    const booking = {
      ...hotel,
      userData: data,
      checkIn,
      checkOut,
      totalPrice,
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, booking]));

    setShowModal(true);
  };

  const handleViewBookings = () => {
    setShowModal(false);
    navigate("/bookingList");
  };

  useEffect(() => {
    if (checkIn && checkOut && hotel) {
      if (!isAuthenticated) {
      navigate("/login");
    }
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const nights = (end - start) / (1000 * 60 * 60 * 24);
      const pricePerNight = hotel.pricing[0].discountedPrice;
      if (nights > 0) setTotalPrice(nights * pricePerNight);
    }
  }, [checkIn, checkOut, hotel,isAuthenticated, navigate]);

  return (
    <section className="book-hotel">
      <Header />
      <SideBar />
      <div className="container">
        <div className="row offset-1">
          <div className="col-12">
            <HotelForm />
          </div>
          <div className="col-12">
            <div className="py-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-8 bg-white p-4 rounded shadow-sm">
                    <h4 className="fw-bold">Your Details</h4>
                    <p className="text-muted small mb-4">{hotel.description}</p>

                    <div className="row mb-3">
                      <div className="col-md-3">
                        <label className="form-label">Title</label>
                        <select {...register("title", { required: "Required" })} className="form-select">
                          <option value="">Select</option>
                          <option>Mr</option>
                          <option>Mrs</option>
                          <option>Ms</option>
                        </select>
                        {errors.title && <small className="text-danger">{errors.title.message}</small>}
                      </div>
                      <div className="col-md-5">
                        <label className="form-label">First Name</label>
                        <input {...register("firstName", { required: "Required" })} type="text" className="form-control" />
                        {errors.firstName && <small className="text-danger">{errors.firstName.message}</small>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Last Name</label>
                        <input {...register("lastName", { required: "Required" })} type="text" className="form-control" />
                        {errors.lastName && <small className="text-danger">{errors.lastName.message}</small>}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
                        })}
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>

                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label className="form-label">Country</label>
                        <select {...register("country", { required: "Required" })} className="form-select">
                          <option value="">Select</option>
                          <option>Egypt</option>
                          <option>USA</option>
                          <option>UAE</option>
                        </select>
                        {errors.country && <small className="text-danger">{errors.country.message}</small>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Mobile</label>
                        <input {...register("mobile", { required: "Required" })} type="tel" className="form-control" />
                        {errors.mobile && <small className="text-danger">{errors.mobile.message}</small>}
                      </div>
                    </div>

                    <hr />
                    <h5 className="fw-bold mb-3">Payment Details</h5>

                    <div className="mb-3">
                      <label className="form-label">Card Number</label>
                      <input {...register("cardNumber", { required: "Required", pattern:{
                        value:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
                        message:'please enter a valid card number like (3530111333300000)'
                      } })} type="text" className="form-control" />
                      {errors.cardNumber && <small className="text-danger">{errors.cardNumber.message}</small>}
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">CVV</label>
                        <input {...register("cvv", { required: "Required" })} type="text" className="form-control" />
                        {errors.cvv && <small className="text-danger">{errors.cvv.message}</small>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Expiry Date</label>
                        <input {...register("expiry", { required: "Required" })} type="date" className="form-control" />
                        {errors.expiry && <small className="text-danger">{errors.expiry.message}</small>}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Card Holder</label>
                      <input {...register("cardHolder", { required: "Required" })} type="text" className="form-control" />
                      {errors.cardHolder && <small className="text-danger">{errors.cardHolder.message}</small>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">PAY NOW</button>
                  </div>

                  {showModal && (
                    <div className="modal show fade" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow">
                          <div className="modal-body m-auto">
                            <img src="/assets/images/check 1.svg" alt="success" />
                          </div>
                          <div className="modal-header m-auto">
                            <h5 className="modal-title text-success">Booking Successful</h5>
                          </div>
                          <div className="modal-footer m-auto">
                            <button className="btn btn-primary" onClick={handleViewBookings}>
                              View All Bookings
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="col-lg-4 mt-4 mt-lg-0">
                    <div className="bg-white p-3 rounded shadow-sm">
                      <h5 className="fw-bold">Summary</h5>
                      {hotel && (
                        <>
                          <img src={hotel.images.main} alt="hotel" className="img-fluid rounded mb-3" />
                          <p className="fw-bold m-0">
                            {hotel.name}
                            <span className="text-danger float-end">{hotel.pricing[0].discount}</span>
                          </p>
                          <p className="fw-bold fs-4">
                            ${hotel.pricing[0].discountedPrice}
                            <small className="text-muted fs-6"> Per night</small>
                          </p>
                          <p className="text-muted small">
                            <i className="fa fa-location-dot me-2 text-primary"></i>
                            {hotel.address.street}
                          </p>
                        </>
                      )}

                      <hr />
                      <div className="mb-2">
                        <label className="form-label fw-semibold">Check In</label>
                        <input onChange={(e) => setCheckIn(e.target.value)} type="date" className="form-control" />
                      </div>
                      <div className="mb-2">
                        <label className="form-label fw-semibold">Check Out</label>
                        <input onChange={(e) => setCheckOut(e.target.value)} type="date" className="form-control" />
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <span>Price Per Night</span>
                        <span>${hotel.pricing[0].discountedPrice}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Total Nights</span>
                        <span>{checkIn && checkOut ? (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24) : 0}</span>
                      </div>
                      <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-2 mt-2">
                        <span>Total Price</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
