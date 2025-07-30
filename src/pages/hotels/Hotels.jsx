import React, { useEffect } from "react";
import SideBar from "../../components/sideBar/SideBar";
import Header from "../../components/header/Header";
import HotelForm from "../../components/hotel-form/HotelForm";
import "./Hotels.css";
import HotelCard from "../../components/hotelCard/HotelCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "../../store/hotelSlice";
import { clearFilters, setFilters } from "../../store/searchSlice";


export default function Hotels() {
 const dispatch = useDispatch();
  const { search, country } = useSelector((state) => state.search.filters);
  const { list: hotels, loading, error } = useSelector((state) => state.hotels);

  useEffect(() => {
      console.log('Current filters:', { search, country });
    const filters = {};
    if (search) filters.search = search;
    if (country) filters.country = country;
    dispatch(fetchHotels(filters));
  }, [search, country, dispatch]);

  const handleSearch = (filters) => {
    dispatch(setFilters(filters));
  };

  const handleClear = () => {
    dispatch(clearFilters());
    dispatch(fetchHotels()); // Fetch all without filters
  };
  return (
    <section className="hotels">
      <Header />
      <SideBar />
      <div className="container">
        <div className="row offset-1">
          <div className="col-12">
            <HotelForm onSearch={handleSearch} onClear={handleClear} />
          </div>
          <div className="col-12 d-flex mt-3 bg-white rounded-4 align-items-center py-2 px-5">
            <h2 className="me-1">Hotels </h2>
            <span>
              |Total{" "}
              <span className="text-primary">{hotels.length} result</span>
            </span>
          </div>
        </div>
        <div className="row offset-1 pt-4 p-3 ">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-danger">Error: {error}</p>
          ) : hotels.length === 0 ? (
            <div className="d-flex flex-column justify-content-center align-items-center w-50 m-auto no-result">
              <img src="/assets/images/Group 1754.svg" alt="" />
              <p className="text-black fw-bold fs-3">No result found</p>
            </div>
          ) : (
            hotels.map((hotel) => <HotelCard data={hotel} key={hotel.id} />)
          )}
        </div>
      </div>
    </section>
  );
}
