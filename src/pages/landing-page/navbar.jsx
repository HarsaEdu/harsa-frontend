import { Button } from "../../components/ui/button";
import HarsaLogo from "/assets/logos/HarsaLogo.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <div className="flex items-center justify-between bg-[#fff] pb-5 pe-5 ps-2 pt-5">
        <div>
          <img src={HarsaLogo} alt="HarsaLogo" />
        </div>
        <div className="flex items-center gap-16 text-xl font-semibold text-[#092c4c]">
          <a href="/">Home</a>
          <a href="#aboutUs">About Us</a>
          <a href="#ourFeature">Our Features</a>
          <a href="#testimoniCard">Testimoni</a>
          <a href="#faq">FAQ</a>
          <a href="#getApps">Get App</a>
          <Link to="/login">
            <Button className="h-10 w-36 bg-[#092C4C] font-bold text-white">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
