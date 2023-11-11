import { Button } from "./button";

export default function Navbar() {
  return (
    <div>
      <div className="bg-gray-300 flex justify-between ps-28 pe-28 pt-5 pb-5 items-center">
        <div>
          <p className="text-2xl">LOGO</p>
        </div>
        <div className="flex text-2xl gap-10 items-center">
          <a href="">Home</a>
          <a href="">About Us</a>
          <a href="">Our Features</a>
          <a href="">Testimoni</a>
          <a href="">Get App</a>
          <a href="">FAQ</a>
          <Button
            variant="secondary"
            size="lg"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
