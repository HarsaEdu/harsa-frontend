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
          <button className="bg-white w-32 h-12">Login</button>
        </div>
      </div>
    </div>
  );
}
