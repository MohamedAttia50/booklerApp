import React, { useState } from "react";
import "./HotelForm.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../../store/searchSlice";
export default function HotelForm({ onSearch, onClear }) {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = { search, country };
    dispatch(setFilters(filters));
    if (onSearch) onSearch(filters);
    navigate("/hotels"); // go to filtered hotels page
  };

  const handleClear = (e) => {
    e.preventDefault();

    // Reset local inputs
    setSearch("");
    setCountry("");

    // Call the parent's onClear function
    if (onClear) onClear();
  };
  return (
    <div className="">
      <form
        className="d-flex bg-white px-5 py-2 rounded-4 hotel-form "
        onSubmit={handleSubmit}>
          <div className="col-2 flex-grow-1 pe-2">
            <label htmlFor="search">Search</label>
            <input
              type="search"
              name="search"
              className="form-control rounded-5 "
              placeholder="search.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-2 flex-grow-1 pe-2">
            <label htmlFor="countries">Country</label>
            <select name="countries" onChange={(e)=> setCountry(e.target.value)} id="" className="form-control rounded-5">
              <option value="">All Countries</option>
              <option value="EG">Egypt </option>
              <option value="US">United States</option>
              <option value="CR">Greece</option>
            </select>
          </div>
          <div className="col-2 flex-grow-1 pe-2">
            <label htmlFor="in-date">Check-In</label>
            <input
              type="date"
              name="in-date"
              className="form-control rounded-5"
            />
          </div>
          <div className="col-2 flex-grow-1 pe-2">
            <label htmlFor="out-date">Check-Out</label>
            <input
              type="date"
              name="out-date"
              className="form-control rounded-5"
            />
          </div>
          <div className="align-self-end col-1 ">
            <button
              className="btn btn-outline-info rounded-5 "
              onClick={handleClear}>
              Clear 
            </button>
          </div>
          <div className="align-self-end col-1">
            <button type="submit" className="btn btn-danger rounded-5 ">
              Search
            </button>
          </div>
      </form>
    </div>
  );
}
