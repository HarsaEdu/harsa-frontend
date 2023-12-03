import React from "react";
import HarsaIcon from "../../assets/icons/harsaicon.svg";
import { Link } from "react-router-dom";

export default function EditProfileSidebar() {
  return (
    <>
      <div className="fixed flex min-h-screen w-80 justify-start">
        <div className="w-80 bg-[#092C4C]">
          <div className="px-6 pt-8">
            <div className="flex items-center justify-between">
              <Link to="/dashboard" className="flex items-center justify-center gap-3 rounded p-1.5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.1 11.25L12.5667 18.25L10.6667 20L0 10L10.6667 0L12.5667 1.75L5.1 8.75H21.3333V11.25H5.1Z"
                    fill="white"
                  />
                </svg>
                <span className="text-3xl font-semibold">Profile</span>
              </Link>
            </div>
          </div>
          <div className="px-6 pt-4">
            <p className="text-xl font-semibold">MENU</p>
          </div>
          <div className="px-6 pt-4">
            <ul className="flex flex-col space-y-4">
              <li className="group rounded-sm text-lg">
                <a
                  href={"/dashboard"}
                  className="flex items-center space-x-3 rounded-md p-2 hover:bg-[#A2D2FF] hover:text-black"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 27 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#A2D2FF] group-hover:fill-[#092C4C]"
                  >
                    <path d="M4.75281 24H22.2472C25.382 24 27 22.5618 27 19.8138V4.1862C27 1.4382 25.382 0 22.2472 0H4.75281C1.63242 0 0 1.42536 0 4.1862V19.8138C0 22.5618 1.63242 24 4.75281 24ZM13.5072 14.2536C10.748 14.2279 8.60995 12.1862 8.59551 9.48957C8.58106 6.93419 10.7624 4.80257 13.5072 4.80257C16.252 4.80257 18.4045 6.93419 18.4045 9.48957C18.4045 12.1862 16.252 14.2793 13.5072 14.2536ZM4.13162 21.5602C5.30177 18.504 9.02889 16.3339 13.5072 16.3339C17.9856 16.3339 21.7127 18.504 22.8684 21.5602H4.13162Z" />
                  </svg>
                  <span>Edit Profile</span>
                </a>
              </li>
              <li className="group rounded-sm text-lg">
                <a
                  href={"/User Management"}
                  className="flex items-center space-x-3 rounded-md p-2 hover:bg-[#A2D2FF] hover:text-black"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 25 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#A2D2FF] group-hover:fill-[#092C4C]"
                  >
                    <path d="M25.2146 2.3C23.7073 0.792683 21.6293 0.5 18.9659 0.5H7.99024C5.37073 0.5 3.27805 0.807317 1.78537 2.3C0.278049 3.80732 0 5.87073 0 8.50488V19.4659C0 22.1439 0.278049 24.2073 1.77073 25.7C3.29268 27.2073 5.37073 27.5 8.03415 27.5H18.9659C21.6293 27.5 23.7073 27.2073 25.2146 25.7C26.722 24.1927 27 22.1439 27 19.4659V8.53415C27 5.87073 26.722 3.79268 25.2146 2.3ZM13.1707 17.0512C12.2341 17.0512 11.7073 16.5976 11.7073 15.7341V15.5732C11.7073 14.1829 12.5122 13.4073 13.5805 12.6463C14.8683 11.7537 15.5122 11.2854 15.5122 10.3195C15.5122 9.29512 14.6927 8.57805 13.4634 8.57805C12.5561 8.57805 11.839 9.00244 11.3122 9.83659L11.0927 10.1585C10.7854 10.5537 10.4049 10.7878 9.84878 10.7878C9.21951 10.7878 8.63415 10.3341 8.63415 9.60244C8.63415 9.30976 8.70732 9.06098 8.79512 8.79756C9.27805 7.37805 11.0341 6.19268 13.6537 6.19268C16.361 6.19268 18.6439 7.62683 18.6439 10.1732C18.6439 11.9439 17.6634 12.822 16.1561 13.7878C15.1756 14.4317 14.6341 14.9585 14.5902 15.7488C14.5902 15.8073 14.5902 15.8659 14.5902 15.9244C14.5463 16.5537 14.0049 17.0512 13.1707 17.0512ZM13.1415 21.7049C12.161 21.7049 11.3415 20.9878 11.3415 20.0366C11.3415 19.0854 12.161 18.3537 13.1415 18.3537C14.1366 18.3537 14.9268 19.0707 14.9268 20.0366C14.9268 21.0024 14.122 21.7049 13.1415 21.7049Z" />
                  </svg>
                  <span>FAQ</span>
                </a>
              </li>
              <li className="group rounded-sm text-lg">
                <a
                  href={"/User Management"}
                  className="flex items-center space-x-3 rounded-md p-2 hover:bg-[#A2D2FF] hover:text-black"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 25 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#A2D2FF] group-hover:fill-[#092C4C]"
                  >
                    <path d="M3.66541 24H15.6767C18.0902 24 19.3421 22.7579 19.3421 20.3623V13.2643H11.1429C10.4436 13.2643 9.85714 12.6876 9.85714 11.9889C9.85714 11.2902 10.4436 10.7024 11.1429 10.7024H19.3421V3.62662C19.3421 1.24214 18.0902 0 15.6767 0H3.66541C1.25188 0 0 1.24214 0 3.62662V20.3623C0 22.7579 1.25188 24 3.66541 24ZM18.1917 11.9889C18.1917 12.5545 18.6541 13.0092 19.2068 13.0092H22.5789L24.2594 12.9316L23.4248 13.6192L21.7444 15.1719C21.5414 15.3494 21.4398 15.6044 21.4398 15.8595C21.4398 16.3586 21.812 16.78 22.3308 16.78C22.6128 16.78 22.8045 16.6691 22.9962 16.4806L26.6504 12.7652C26.9098 12.4991 27 12.2551 27 11.9889C27 11.7227 26.9098 11.4787 26.6504 11.2126L22.9962 7.48614C22.8045 7.2976 22.6128 7.19778 22.3308 7.19778C21.812 7.19778 21.4398 7.59704 21.4398 8.10721C21.4398 8.3512 21.5414 8.61738 21.7444 8.79482L23.4248 10.3586L24.2594 11.0462L22.5789 10.9575H19.2068C18.6541 10.9575 18.1917 11.4233 18.1917 11.9889Z" />
                  </svg>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
