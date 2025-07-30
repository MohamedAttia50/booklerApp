// store/authThunks.js
import { api } from "../interceptor/api";
import { loginSuccess, loginFailure, registerSuccess, registerFailure, setLoading, logout } from "./authSlice";

// Try these common endpoint patterns
const REGISTER_ENDPOINT = "/api/auth/register"; // or "/users", "/auth/signup"
const LOGIN_ENDPOINT = "/api/auth/login"; // or "/auth/signin", "/session"

export const registerUser = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Try multiple common endpoint patterns
    let response;
    try {
      response = await api.post(REGISTER_ENDPOINT, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        country: userData.country,
        phone: userData.phone
      });
    } catch (firstError) {
      // Fallback to alternative endpoint
      try {
        response = await api.post("/users", {
          user: {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            country: userData.country,
            phone: userData.phone
          }
        });
      } catch {
        throw firstError; // Throw the original error if both fail
      }
    }

    const newUser = {
      id: response.data.id || response.data.user.id,
      name: response.data.name || response.data.user.name,
      email: response.data.email || response.data.user.email,
      token: response.data.token // If using JWT
    };

    dispatch(registerSuccess(newUser));
    localStorage.setItem("authUser", JSON.stringify(newUser));
    return true;
  } catch (error) {
    const errorData = error.response?.data || {};
    const errorMessage = errorData.message || 
                        errorData.error || 
                        (errorData.errors ? errorData.errors.join(', ') : '') ||
                        error.message || 
                        "Registration failed";
    
    dispatch(registerFailure(errorMessage));
    return false;
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    let response;
    try {
      response = await api.post(LOGIN_ENDPOINT, {
        email: credentials.email,
        password: credentials.password
      });
    } catch (firstError) {
      // Fallback to alternative endpoint
      try {
        response = await api.post("/session", {
          session: {
            email: credentials.email,
            password: credentials.password
          }
        });
      } catch {
        throw firstError;
      }
    }

    const user = {
      id: response.data.id || response.data.user.id,
      name: response.data.name || response.data.user.name,
      email: response.data.email || response.data.user.email,
      token: response.data.token || response.data.auth_token
    };

    dispatch(loginSuccess(user));
    localStorage.setItem("authUser", JSON.stringify(user));
    
    // Set authorization header for future requests
    if (user.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    }
    
    return true;
  } catch (error) {
    const errorData = error.response?.data || {};
    const errorMessage = errorData.message || 
                        errorData.error || 
                        "Invalid email or password";
    
    dispatch(loginFailure(errorMessage));
    return false;
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("authUser");
  delete api.defaults.headers.common['Authorization'];
  dispatch(logout());
  
  // Optional: Call backend logout if available
  // api.delete("/session");
};