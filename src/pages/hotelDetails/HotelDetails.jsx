import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotelById } from "../../store/hotelSlice";
import { Carousel, Button } from "react-bootstrap";
import {
  FaStar,
  FaMapMarkerAlt,
  FaWifi,
  FaVideo,
  FaCar,
  FaBath,
} from "react-icons/fa";
import Header from "../../components/header/Header";
import SideBar from "../../components/sideBar/SideBar";
import HotelForm from "../../components/hotel-form/HotelForm";
import "./HotelDetails.css";
import RecomendedCard from "../../components/recomendedCard/RecomendedCard";
import { api } from "../../interceptor/api";

export default function HotelDetails() {
  const [recomendedData, setRecomendedData] = useState([]);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedHotel: hotel, loading ,error } = useSelector(
    (state) => state.hotels
  );

  useEffect(() => {
    api
      .get("/db.json")
      .then((res) => {
        setRecomendedData(res.data.recommended_hotels);
        console.log("API response:", res.data.recommended_hotels);
      })
      .catch((err) => {
        console.error("Failed to fetch recommended hotels", err);
      })
      .finally(() => {});
    dispatch(fetchHotelById(id));
  }, [dispatch, id]);

 if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-danger">Error: {error}</p>;
  if (!hotel) return <p className="text-center mt-5">Hotel not found</p>;
  if (!hotel.images?.gallery) return <p className="text-center mt-5">No images available</p>;
  const serviceIcons = {
    "Valet Parking": (
      <>
        <FaCar className="me-1" />
        Valet Parking
      </>
    ),
    "Fitness Center": (
      <>
        <FaBath className="me-1" />
        Fitness Center
      </>
    ),
    "Room Service": (
      <>
        <FaVideo className="me-1" />
        Room Service
      </>
    ),
    Wifi: (
      <>
        <FaWifi className="me-1" />
        Wifi
      </>
    ),
    Concierge: (
      <>
        <FaMapMarkerAlt className="me-1" />
        Concierge
      </>
    ),
  };

  return (
    <section className="hotel-details">
      <Header />
      <SideBar />
      <div className="container">
        <div className="row offset-1">
          <div className="col-12">
            <HotelForm />
          </div>

          <div className="col-12 d-flex mt-3 bg-white rounded-4 align-items-center py-2 px-5">
            <h2 className="me-1">Hotels</h2>
            <span>
              |  {">"} <span className="text-primary">Hotel Details</span>
            </span>
          </div>

          <div className="col-12">
            <div className="container my-5 shadow rounded p-4 bg-white">
              <h3 className="fw-bold">{hotel.name}</h3>
              <div className="row">
                <div className="col-md-7">
                  <Carousel fade interval={null}>
                    {hotel.images.gallery.map((img, index) => (
                      <Carousel.Item key={index}>
                        <img
                          className="d-block w-100 rounded"
                          src={img}
                          alt={`Slide ${index}`}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>

                <div className="col-md-5 mt-3 mt-md-0">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="fw-bold mb-1">Hotel Review</h6>
                      <div className="d-flex align-items-center mb-2">
                        <div className="bg-primary text-white rounded px-2 me-2">
                          {hotel.rating.score}
                        </div>
                        <span className="fw-semibold text-muted">
                          {hotel.rating.status}
                        </span>
                      </div>
                      <div className="text-warning">
                        {Array.from({
                          length: Math.round(hotel.rating.score),
                        }).map((_, i) => (
                          <FaStar key={i} />
                        ))}
                        <span className="text-muted ms-2 small">
                          {hotel.rating.reviewCount} Reviews
                        </span>
                      </div>
                    </div>

                    <div className="text-end">
                      <span className="text-danger fw-bold">
                        {hotel.pricing[0].discount}
                      </span>
                      <h3 className="fw-bold mt-1">
                        {hotel.pricing[0].discountedPrice}{" "}
                        <small className="text-muted fs-6">
                          {hotel.pricing[0].currency}
                        </small>
                      </h3>
                      <small className="text-muted">
                        {hotel.pricing[0].priceUnit}
                      </small>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h6 className="fw-bold">About</h6>
                    <p className="text-muted small">
                      {hotel.description}
                      <span
                        className="text-primary ms-1"
                        style={{ cursor: "pointer" }}>
                        Show More
                      </span>
                    </p>
                  </div>

                  <div className="mb-3">
                    <FaMapMarkerAlt className="text-primary me-2" />
                    <span className="text-muted small">
                      {hotel.address.street}, {hotel.address.city},{" "}
                      {hotel.address.country}
                    </span>
                  </div>

                  <h6 className="fw-bold">Popular Services</h6>
                  <div className="d-flex flex-wrap text-muted small">
                    {hotel.amenities.map((service, i) => (
                      <div
                        key={i}
                        className="me-4 d-flex align-items-center mb-2">
                        {serviceIcons[service] || service}
                      </div>
                    ))}
                  </div>

                  <NavLink to={`/bookHotel`} state={{hotel}}  className="w-100 mt-5 btn btn-primary" >
                    PAY NOW
                  </NavLink>
                </div>
              </div>

              <div className="mt-4">
                <h6 className="fw-bold">Room Pricing</h6>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover small">
                    <thead className="table-light">
                      <tr>
                        <th>Room Type</th>
                        <th>Original Price</th>
                        <th>Discounted Price</th>
                        <th>Discount</th>
                        <th>Currency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hotel.pricing.map((room, i) => (
                        <tr key={i}>
                          <td>{room.roomType}</td>
                          <td>${room.originalPrice}</td>
                          <td>${room.discountedPrice}</td>
                          <td>{room.discount}</td>
                          <td>{room.currency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
             
            </div>
            <div className="container pb-4">
              <h2 className=" ">Recomended Hotels</h2>
              <div className="row  flex-nowrap card-container gap-3 ">
                {recomendedData.map((p) => (
                  <RecomendedCard data={p} key={p.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
