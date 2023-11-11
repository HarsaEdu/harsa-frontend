import { Button } from "./button";

export default function Navbar() {
  return (
    <div>
      <div className="bg-gray-300 flex justify-between ps-28 pe-28 pt-5 pb-5 items-center">
        <div>
          <p className="text-2xl">LOGO</p>
        </div>
        <div className="flex text-2xl gap-10 items-center">
          <p>Home</p>
          <p>About Us</p>
          <p>Our Features</p>
          <p>Testimoni</p>
          <p>Get App</p>
          <p>FAQ</p>
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
