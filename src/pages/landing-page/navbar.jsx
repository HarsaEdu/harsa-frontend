import { Button } from "../../components/ui/button";
import HarsaLogo from "/assets/logos/HarsaLogo.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <div className="bg-[#fff] flex justify-between ps-2 pe-5 pt-5 pb-5 items-center">
        <div>
          <img
            src={HarsaLogo}
            alt="HarsaLogo"
          />
        </div>
        <div className="flex text-xl gap-16 items-center font-semibold text-[#092c4c]">
          <a href="">Home</a>
          <a href="">About Us</a>
          <a href="">Our Features</a>
          <a href="">Testimoni</a>
          <a href="">FAQ</a>
          <a href="">Get App</a>
          <Link to='/login'>
            <Button className="bg-[#092C4C] w-36 h-10 font-bold text-white">Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
