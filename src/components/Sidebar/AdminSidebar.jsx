import HarsaIcon from "../../assets/icons/harsaicon.svg";
import DropdownConfig from "./DropdownConfig";
import { Link } from "react-router-dom";

function AdminSidebar() {
  const username = localStorage.getItem("username");
  return (
    <>
      <div className="fixed flex min-h-screen w-80 justify-start font-poppins">
        <div className="w-80 bg-[#092C4C]">
          <div className="px-6 pt-8">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="flex items-center justify-center rounded p-1.5"
              >
                <img src={HarsaIcon} alt="HarsaIcon" width={40} height={40} />
                <span className="ml-4 text-3xl font-semibold">Harsa</span>
              </Link>
            </div>
          </div>
          <div className="px-6 pt-4">
            <p className="text-xl font-semibold">Menu</p>
          </div>
          <div className="px-6 pt-4">
            <ul className="flex flex-col space-y-4">
              <li className="group rounded-sm text-base">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-3 rounded-md p-2 hover:bg-[#A2D2FF] hover:text-black"
                >
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#A2D2FF] group-hover:fill-[#092C4C]"
                  >
                    <path
                      d="M4.74344 27.0205H22.2566C25.3803 27.0205 27 25.4008 27 22.3205V4.72056C27 1.62576 25.3803 0.0205078 22.2566 0.0205078H4.74344C1.61971 0.0205078 0 1.62576 0 4.72056V22.3205C0 25.4153 1.61971 27.0205 4.74344 27.0205ZM4.91698 24.186C3.57204 24.186 2.83449 23.4774 2.83449 22.0746V4.95195C2.83449 3.54916 3.57204 2.855 4.91698 2.855H22.083C23.4135 2.855 24.1655 3.54916 24.1655 4.95195V22.0746C24.1655 23.4774 23.4135 24.186 22.083 24.186H4.91698ZM4.96036 8.35045C4.96036 8.9723 5.36529 9.37723 6.00161 9.37723H8.32994C8.96626 9.37723 9.37118 8.9723 9.37118 8.35045V5.99319C9.37118 5.37134 8.96626 4.98087 8.32994 4.98087H6.00161C5.36529 4.98087 4.96036 5.37134 4.96036 5.99319V8.35045ZM11.3091 8.35045C11.3091 8.9723 11.714 9.37723 12.3503 9.37723H14.6786C15.3149 9.37723 15.7199 8.9723 15.7199 8.35045V5.99319C15.7199 5.37134 15.3149 4.98087 14.6786 4.98087H12.3503C11.714 4.98087 11.3091 5.37134 11.3091 5.99319V8.35045ZM17.6433 8.35045C17.6433 8.9723 18.0482 9.37723 18.6845 9.37723H21.0129C21.6492 9.37723 22.0541 8.9723 22.0541 8.35045V5.99319C22.0541 5.37134 21.6492 4.98087 21.0129 4.98087H18.6845C18.0482 4.98087 17.6433 5.37134 17.6433 5.99319V8.35045ZM4.96036 14.6847C4.96036 15.321 5.36529 15.7115 6.00161 15.7115H8.32994C8.96626 15.7115 9.37118 15.321 9.37118 14.6847V12.3274C9.37118 11.7056 8.96626 11.3151 8.32994 11.3151H6.00161C5.36529 11.3151 4.96036 11.7056 4.96036 12.3274V14.6847ZM11.3091 14.6847C11.3091 15.321 11.714 15.7115 12.3503 15.7115H14.6786C15.3149 15.7115 15.7199 15.321 15.7199 14.6847V12.3274C15.7199 11.7056 15.3149 11.3151 14.6786 11.3151H12.3503C11.714 11.3151 11.3091 11.7056 11.3091 12.3274V14.6847ZM17.6433 14.6847C17.6433 15.321 18.0482 15.7115 18.6845 15.7115H21.0129C21.6492 15.7115 22.0541 15.321 22.0541 14.6847V12.3274C22.0541 11.7056 21.6492 11.3151 21.0129 11.3151H18.6845C18.0482 11.3151 17.6433 11.7056 17.6433 12.3274V14.6847ZM4.96036 21.0189C4.96036 21.6408 5.36529 22.0457 6.00161 22.0457H8.32994C8.96626 22.0457 9.37118 21.6408 9.37118 21.0189V18.6616C9.37118 18.0398 8.96626 17.6493 8.32994 17.6493H6.00161C5.36529 17.6493 4.96036 18.0398 4.96036 18.6616V21.0189ZM11.3091 21.0189C11.3091 21.6408 11.714 22.0457 12.3503 22.0457H14.6786C15.3149 22.0457 15.7199 21.6408 15.7199 21.0189V18.6616C15.7199 18.0398 15.3149 17.6493 14.6786 17.6493H12.3503C11.714 17.6493 11.3091 18.0398 11.3091 18.6616V21.0189ZM17.6433 21.0189C17.6433 21.6408 18.0482 22.0457 18.6845 22.0457H21.0129C21.6492 22.0457 22.0541 21.6408 22.0541 21.0189V18.6616C22.0541 18.0398 21.6492 17.6493 21.0129 17.6493H18.6845C18.0482 17.6493 17.6433 18.0398 17.6433 18.6616V21.0189Z"
                      id="icon-project"
                    />
                  </svg>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="group rounded-sm text-base">
                <Link to="/user-management"
                  className="flex items-center space-x-3 rounded-md p-2 hover:bg-[#A2D2FF] hover:text-black"
                >
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 25 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#A2D2FF] group-hover:fill-[#092C4C]"
                  >
                    <path
                      d="M5.25398 1.98879H21.7591C21.6678 1.03873 20.9899 0.520508 19.7383 0.520508H7.26171C6.02318 0.520508 5.33221 1.03873 5.25398 1.98879ZM2.5944 5.1089H24.4186C24.2361 4.08326 23.6103 3.50026 22.2284 3.50026H4.78465C3.4027 3.50026 2.77692 4.08326 2.5944 5.1089ZM4.13279 24.5205H22.8672C25.5789 24.5205 27 23.3545 27 21.1305V10.2587C27 8.03468 25.5789 6.86869 22.8672 6.86869H4.13279C1.40802 6.86869 0 8.02388 0 10.2587V21.1305C0 23.3545 1.40802 24.5205 4.13279 24.5205ZM13.5196 17.287C11.3423 17.2654 9.63448 15.7648 9.62144 13.7567C9.62144 11.8565 11.3423 10.2911 13.5196 10.2911C15.7098 10.2911 17.4307 11.8565 17.4307 13.7567C17.4307 15.7648 15.7228 17.3086 13.5196 17.287ZM6.11444 22.48C7.14437 20.31 10.0517 18.7877 13.5196 18.7877C17.0005 18.7877 19.9078 20.31 20.9377 22.48H6.11444Z"
                      id="icon-project"
                    />
                  </svg>
                  <span>User Management</span>
                </Link>
              </li>
              <li className="relative text-gray-500 focus-within:text-white hover:text-white">
                <DropdownConfig />
              </li>
            </ul>
          </div>
          <div className="fixed bottom-0 left-0 flex w-80 items-center justify-between bg-[#A2D2FF] py-4">
            <Link to="/edit-profile" className="mx-4 flex items-center">
              <div className="relative h-8 w-8 rounded-full before:absolute before:bottom-0 before:right-0 before:h-2 before:w-2 before:rounded-full before:bg-green-500 before:ring-1 before:ring-white">
                <img
                  className="rounded-full"
                  src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                  alt=""
                />
              </div>
              <div className="flex flex-col pl-3">
                <div className="text-lg font-semibold text-black">
                  {username}
                </div>
                <span className="text-xs font-semibold tracking-tight text-gray-600">
                  Online
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
