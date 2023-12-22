import React from "react";
import Navbar from "../../components/Navbar";
import PremiumEntryComponent from "../../components/PremiumEntryComponent";
import PremiumPackageInfo from "../../components/PremiumPackageInfoNoSwitch";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-full flex flex-row">
        <div className="h-91[vh] w-1/2 bg-gradient-to-b from-[#e6e4ff] to-bg-white !bg-gradient-opacity-5 !bg-opacity-10">
          <div className="overflow-y-scroll">
            <div className="flex items-center justify-center mt-[1rem]">
              <PremiumEntryComponent />
            </div>
          </div>
        </div>
        <div className="w-1/2 h-[92vh] bg-oksigen-brand-blue bg-opacity-10">
          <div className="flex items-center justify-center mt-[4rem]">
            <PremiumPackageInfo />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
