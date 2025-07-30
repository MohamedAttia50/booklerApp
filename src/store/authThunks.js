// store/authThunks.js
import { api } from "../interceptor/api";
import { loginSuccess, loginFailure, registerSuccess, registerFailure, setLoading, logout } from "./authSlice";

export const registerUser = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // 1. Get current data
    const response = await api.get("/db.json");
    const currentData = response.data || { users: [] };
    
    // 2. Check for existing email
    if (currentData.users.some(user => user.email === userData.email)) {
      throw new Error("Email already exists");
    }
    
    // 3. Create new user
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      isAuthenticated: false
    };
    
    // 4. Update the entire db.json structure
    const updatedData = {
      ...currentData,
      users: [...currentData.users, newUser]
    };
    
    // 5. Save back to db.json
    await api.put("/db.json", updatedData);
    
    dispatch(registerSuccess(newUser));
    localStorage.setItem("authUser", JSON.stringify(newUser));
    return true;
  } catch (error) {
    dispatch(registerFailure(error.message));
    return false;
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
 try {
    const response = await api.get("/db.json");
    const users = response.data?.users || [];
    
    const user = users.find(u => 
      u.email === credentials.email && 
      u.password === credentials.password
    );
    
    if (!user) {
      throw new Error("Invalid email or password");
    }
    
    const authenticatedUser = { ...user, isAuthenticated: true };
    dispatch(loginSuccess(authenticatedUser));
    localStorage.setItem("authUser", JSON.stringify(authenticatedUser));
    return true;
  } catch (error) {
    dispatch(loginFailure(error.message));
    return false;
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("authUser");
  dispatch(logout());
};