import React from "react";
import "./HotelCard.css";
import { NavLink } from "react-router-dom";
import {
  FaCar,
  FaBath,
  FaVideo,
  FaWifi,
  FaMapMarkerAlt,
} from "react-icons/fa";
export default function HotelCard({ data }) {
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
    <div className="col-lg-6 p-3">
      <div className=" hotel-card  bg-white rounded-3 p-2 ">
        <div className="row d-flex">
          <figure className="col-lg-5 align-self-center ">
            <img src={data.images.main} alt="" />
          </figure>
          <div className="col-lg-7 position-relative">
            <h5>{data.name}</h5>
            <small className="rate-icon bg-primary position-absolute ">
              {data.rating.score} <i className="fa-solid fa-star"></i>
            </small>
            <small>{data.address.street}</small>
            <div>
              <div className="d-flex flex-wrap text-muted small">
                    {data.amenities.map((service, i) => (
                      <div
                        key={i}
                        className="me-4 d-flex align-items-center mb-2">
                        {serviceIcons[service] || service}
                      </div>
                    ))}
                  </div>

              <div className="d-flex justify-content-between pt-3">
                <div className="d-flex align-items-center">
                  <small className="text-warning me-2">
                    {data.pricing[0].discount}
                  </small>
                  <small className="fs-3 fw-bold">
                    {" "}
                    ${data.pricing[0].discountedPrice}
                  </small>
                </div>
                <div className="d-flex gap-2">
                  <NavLink
                    to={`/hotel/${data.id}`}
                    className="border-0 rounded-3 px-1 btn bg-body-secondary ">
                    Details
                  </NavLink>
                  <NavLink
                    to={"/bookHotel"}
                    state={{ hotel: data }}
                    className="btn btn-primary">
                    Book
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
