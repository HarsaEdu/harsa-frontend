import LogoBrand from "../assets/react.svg";
import Home from "../assets/home.svg";
import Class from "../assets/opened-folder.svg";
import Schdule from "../assets/check-all.svg";

const Sidebar = () => {
  return (
    <div className="m-3 flex flex-col w-[231px] gap-[11px]">
      <div className="flex items-center text-lg font-bold">
        <img
          alt="logo"
          width={30}
          height={30}
          src={LogoBrand}
          className="mx-2 mb-4"
        />
        <span>Harsa</span>
      </div>
      <p className="mx-5 font-bold">Menu</p>
      <ul>
        <li className="flex flex-row items-center gap-1 px-4 py-2 font-semibold rounded-md hover:bg-zinc-200 hover:text-zinc-950">
          <img src={Home} alt="HomeIcon" width={30} height={30} />
          <a href={"#"}>Dashboard</a>
        </li>
        <li className="flex flex-row items-center gap-1 px-4 py-2 font-semibold rounded-md hover:bg-zinc-200 hover:text-zinc-950">
          <img src={Class} alt="HomeIcon" width={30} height={30} />
          <a href={"#"}>Kelas</a>
        </li>
        <li className="flex flex-row items-center gap-1 px-4 py-2 font-semibold rounded-md hover:bg-zinc-200 hover:text-zinc-950">
          <img src={Schdule} alt="HomeIcon" width={30} height={30} />
          <a href={"#"}>Penjadwalan</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
