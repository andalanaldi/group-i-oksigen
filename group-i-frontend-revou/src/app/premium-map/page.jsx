"use client";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import PremiumSideBar from "../../components/PremiumSideBar";
import Navbar from "../../components/Navbar";
import { checkProfileAtom } from "../jotai-functions/dynamicatoms";
import { useRouter } from "next/navigation"; 

const DynamicMap = dynamic(
  () => import("../../components/PremiumMapComponent"),
  {
    ssr: false,
  }
);


const page = () => {

  return (
    <div className="h-[100vh]">
      <div className="h-[9vh] z-[9999] fixed w-full">
        <Navbar />
      </div>
      <div className="flex flex-row pt-[9vh]">
        <div className="w-1/2 mt-0 pt-0">
          <DynamicMap />
        </div>
        <div className="pr-10 pb-14 mr-0 w-1/2 pl-8 flex flex-col items-start justify-start pt-0 mt-0 h-[91vh] overflow-y-scroll overflow-x-hidden bg-oksigen-brand-softblue">
          <PremiumSideBar />
        </div>
      </div>
    </div>
  );
};

export default page;
