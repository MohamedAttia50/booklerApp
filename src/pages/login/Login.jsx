import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authThunks";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(loginUser(data));
      // loginUser returns true on success, false on failure
      if (loginUser.fulfilled.match(resultAction) && resultAction.payload) {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <section className="login">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="login-logo text-center">
              <img src="/assets/images/Vector.png" alt="" />
            </div>
            <h3 className="text-center fw-bolder pt-5">Login</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-field w-75 m-auto">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  {...register("email", {
                    required: "Email is required",
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
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <small className="text-danger">{errors.password.message}</small>
                )}
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="w-75 btn btn-primary mt-3"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <div className="login-methods text-center">
              <div>
                <p className="py-3">
                  Don't have an account? <NavLink to="/register">Register</NavLink>
                </p>
              </div>
              <div className="other-method">
                <p>
                  <span className="fw-bold">Signup</span> with Others
                </p>
              </div>
              <div className="border rounded-4 w-50 m-auto py-3 mt-3">
                <p className="m-0">
                  <i className="fa-brands fa-google fa-lg text-info"></i> Login with{" "}
                  <span className="fw-bold">google</span>
                </p>
              </div>
              <div className="border rounded-4 w-50 m-auto py-3 mt-3">
                <p className="m-0">
                  {" "}
                  <i className="fa-brands fa-square-facebook fa-lg text-primary"></i> login
                  with <span className="fw-bold">facebook</span>{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 login-img rounded-3">
            <img src="/assets/images/Group 1752.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}