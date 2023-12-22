import React from "react";
import Navbar from "../../components/Navbar";
import RegistFormFree from "../../components/RegistFormFree";
import BasicPackageInfo from "../../components/BasicPackageInfo";

const page = () => {
  return (
    <>
      <div className="w-full h-full flex flex-row">
        <div className="h-full w-1/2">
          <div className="flex items-center justify-center mt-[4rem]">
            <RegistFormFree />
          </div>
        </div>
        <div className="w-1/2 h-[100vh] bg-oksigen-brand-fadeGrey bg-opacity-20">
          <div className="flex items-center justify-center mt-[4rem]">
            <BasicPackageInfo />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
