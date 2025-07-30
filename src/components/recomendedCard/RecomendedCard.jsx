import React from "react";
import "./RecomendedCard.css";
import { getStarIcons } from "../../store/hotelSliceUtility";
import { NavLink } from "react-router-dom";
export default function RecomendedCard({ data }) {
  return (
    <div className="col-sm-11 col-md-9 col-lg-7 col-xl-5 d-flex bg-white rounded-4 p-3 card border-0 ">
      <div className="row m-0">
        <figure className="col-sm-4 align-self-center ">
          <img src={data.images.main} alt="" className="rounded-3" />
        </figure>
        <div className="col-sm-8">
          <span>hotel</span>
          <h4 className="fs-6">{data.name}</h4>
          <p>{data.description}</p>
          <div className="d-flex justify-content-between w-100">
            <div>
              {getStarIcons(data.rating.score).map((type, index) => {
                if (type === "full")
                  return (
                    <i
                      key={index}
                      className="fa-solid fa-star text-warning"></i>
                  );
                if (type === "half")
                  return (
                    <i
                      key={index}
                      className="fa-solid fa-star-half-stroke text-warning"></i>
                  );
                return (
                  <i
                    key={index}
                    className="fa-regular fa-star text-warning"></i>
                );
              })}
            </div>

            <NavLink
              to={"/bookHotel"}
              state={{hotel:data}}
              className="btn btn-outline-danger  rounded-4">
              Book Now
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
