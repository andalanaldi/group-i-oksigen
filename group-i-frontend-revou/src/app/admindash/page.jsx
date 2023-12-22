import React from "react";
import Dashboard from "../../components/Dashboard";
import dynamic from "next/dynamic";
import NavbarSuperadmin from "../../components/NavbarSuperadmin";
import SuperadminDashboard from "../../components/SuperadminDashboard"

const DynamicMap = dynamic(
  () => import("../../components/AdminMapComponent"),
  {
    ssr: false,
  }
);

const page = () => {

  return (
    <div className="h-[100vh]">
      <div className="z-[9999] fixed w-full">
        <NavbarSuperadmin />
      </div>
      <div className="flex flex-row pt-[8vh]">
        <div className="w-1/2 mt-0 pt-0 h-full">
          <DynamicMap />
        </div>
        <div className="pr-10 pb-14 mr-0 w-1/2 pl-8 flex flex-col items-start justify-start pt-0 mt-0 h-[92vh] overflow-y-scroll overflow-x-hidden bg-oksigen-brand-superadmin">
          <SuperadminDashboard />
        </div>
        </div>
      </div>
  );
};


export default page;
