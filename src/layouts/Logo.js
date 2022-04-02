import LogoDark from "../assets/images/logos/logo-header.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img src={LogoDark} alt="logo" height="46px"/>
    </Link>
  );
};

export default Logo;
