import React from "react";
import './BestOffer.css'
export default function BestOffer({data}) {
  return (
    <div className="col-md-6 col-lg-4   p-3 ">
    <div className="d-flex gap-3 best-offer-card p-3">
      <figure className="m-0">
        <img src={data.image} alt="" />
      </figure>
      <div >
        <h6 className="m-0">{data.name}</h6>
        <p className="m-0">{data.location}</p>
      </div>
    </div>
    </div>
    
  );
}
