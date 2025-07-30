import React from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/authThunks";
export default function Register() {
const {register,handleSubmit,watch,formState: { errors },} = useForm();
const dispatch =useDispatch();
const navigate=useNavigate();
const {loading ,error} =useSelector((state)=>state.auth)
const password = watch("password");
const onSubmit = async (data) => {
  const success =await dispatch(registerUser(data));
  if(success){
    navigate('/login')
  }
  console.log("Form Submitted:", data);
  };
  return (
    <section className="register">
      <div className="container-fluid">
        <div className="row  align-items-center">
          <div className="col-md-6 ">
            <div className="register-logo text-center">
              <img src="/assets/images/Vector.png" alt="" />
            </div>
            <h3 className="text-center fw-bolder ">Sign up</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-field w-75 m-auto">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  {...register("name", {
                    required: "User name is required",
                  })}
                />
                {errors.name && (
                  <small className="text-danger">{errors.name.message}</small>
                )}
              </div>
              <div className="form-field w-75 m-auto">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email.message}</small>
                )}
              </div>
              <div className="form-field w-75 m-auto">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  {...register("password", {
                    required: "password is required",
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                      message:
                        "Password must be at least 8 charachter (1 UpperCase, 1 Number, 1 Special character)",
                    },
                  })}
                />
                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
              </div>
              <div className="form-field w-75 m-auto">
                <label htmlFor="password"> Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  {...register("confirmPassword", {
                    required: "confirm-password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <small className="text-danger">
                    {errors.confirmPassword.message}
                  </small>
                )}
              </div>
              <div className="form-field w-75 m-auto">
                <label htmlFor="country">Country</label>
                <select 
                className="form-control"
                name="country"
                {...register("country",{
                  required:'Country is required'
                })}
                >
                  <option>Egypt</option>
                  <option>United State</option>
                  <option>Canada</option>
                  <option>France</option>
                  <option >Germany</option>
                </select>
              </div>
              <div className="form-field w-75 m-auto">
                <label htmlFor="phone"> Phone</label>
                <input
                  type="number"
                  name="phone"
                  className="form-control"
                  {...register("phone", {
                    required: "phone is required",
                    maxLength: {
                      value: 12,
                      message: "Phone number must not exceed 12 digit",
                    },
                  })}
                />
                {errors.phone && (
                  <small className="text-danger">{errors.phone.message}</small>
                )}
              </div>

              <div className="d-flex justify-content-center">
                <button type="submit" className="w-75 btn btn-primary mt-3 text-white " disabled={loading}>
                  {loading? "Registering..." : "Sign up"}
                </button>
              </div>
            </form>
            {error&&  <div className="alert alert-danger mt-3">{error}</div>}
            <div className="login-methods text-center">
              <div>
                <p className=" py-3">
                  Already have an account?{" "}
                  <NavLink to={"/login"}>Login</NavLink>{" "}
                </p>
              </div>
              <div className="other-method">
                <p>
                <span className="fw-bold">Signup</span> with Others
                </p>
              </div>
              <div className="border rounded-4 w-50 m-auto  py-2 mt-2">
                <p className="m-0">
                  <i className="fa-brands fa-google fa-lg text-info"></i> Login
                  with <span className="fw-bold">google</span>
                </p>
              </div>
              <div className="border rounded-4 w-50 m-auto  py-2 mt-3">
                <p className="m-0">
                  {" "}
                  <i className="fa-brands fa-square-facebook fa-lg text-primary"></i>{" "}
                  login with <span className="fw-bold">facebook</span>{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 register-img  rounded-3">
            <img src="/assets/images/Group 1752.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
