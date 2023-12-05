import { React, useState } from "react";
import Layout from "@/components/layout/Index";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import EditProfile from "./editProfile";
import EditAkun from "./editAkun";

export default function HeaderEdit() {
  const [isActiveAkun, setActiveAkun] = useState(false);

  const handleAkunClick = () => {
    setActiveAkun(true);
  };

  const handleProfileClick = () => {
    setActiveAkun(false);
  };
  return (
    <Layout userRole="admin">
      <div className="mb-8">
        <Breadcrumb />
      </div>

      <div className="rounded-lg border border-black p-5">
        <h3 className="mb-12 text-3xl font-bold">Edit User</h3>

        <div className="rounded-lg border border-[#808080]">
          <div className="mb-3 flex w-full">
            <Button
              className={`w-full rounded-none rounded-tl-lg py-8 text-xl ${
                isActiveAkun ? "bg-[#A2D2FF] text-black" : "text-white"
              }`}
              onClick={handleProfileClick}
            >
              Edit Profile
            </Button>
            <Button
              className={`${
                !isActiveAkun ? "bg-[#A2D2FF] text-black" : "text-white"
              } w-full rounded-none rounded-tr-lg py-8 text-xl`}
              onClick={handleAkunClick}
            >
              Edit Akun
            </Button>
          </div>
          <div>{isActiveAkun ? <EditAkun /> : <EditProfile />}</div>
        </div>
      </div>
    </Layout>
  );
}
