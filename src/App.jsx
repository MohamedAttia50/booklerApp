import { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import GlobalLoader from "./components/globalLoader/GlobalLoader";

const Login = lazy(() => import("./pages/login/Login"));
const Home = lazy(() => import("./pages/home/Home"));
const Register = lazy(() => import("./pages/register/Register"));
const Hotels = lazy(() => import("./pages/hotels/Hotels"));
const HotelDetails = lazy(() => import("./pages/hotelDetails/HotelDetails"));
const BookHotel = lazy(() => import("./pages/bookHotel/BookHotel"));
const BookingList = lazy(() => import("./pages/booking/BookingList"));
const NotFound = lazy(() => import("./pages/notFound/NotFound"));
const ProtectedRoute = lazy(() =>
  import("./components/protectedRoute/ProtectedRoute")
    .then((module) => {
      console.log("ProtectedRoute loaded successfully");
      return module;
    })
    .catch(() => ({ default: () => <div>Error loading component</div> }))
);
function App() {
  return (
    <>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/bookHotel" element={<BookHotel />} />
            <Route path="/bookingList" element={<BookingList />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
