"use client";
import React from "react";
import PasswordEditNotLoggedIn from "../../components/PasswordEditNotLoggedIn";
import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";

const page = () => {
  return (
    <div className="flex items-center flex-col justify-center mt-[10rem]">
        <PasswordEditNotLoggedIn />
    </div>
  );
};

export default page;
