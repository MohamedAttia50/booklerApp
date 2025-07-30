import "./HeaderIcons.css";
import { NavLink } from "react-router-dom";
import Hotels from "../../pages/hotels/Hotels";

export default function HeaderIcons() {


  return (
      <div className="col-8 d-flex gap-3 header-icons">
        <div>
          <NavLink to={"/hotels"}>
            <i className="fa-solid fa-bed fa-xl"></i> <br />
            <span className="text-white ">HOTEL</span>
          </NavLink>
        </div>
        <div>
          <NavLink to={"/hotels"}>
            <i className="fa-solid fa-house-chimney fa-xl"></i> <br />
            <span className="text-white ">VILLA</span>
          </NavLink>
        </div>
        <div>
          <i className="fa-solid fa-taxi fa-xl"></i> <br />
          <span className="text-white ">TAXI</span>
        </div>
        <div>
          <i className="fa-solid fa-plane-departure fa-xl"></i>
          <br />
          <span className="text-white ">FLIGHT</span>
        </div>
      </div>
     
  );
}
