import React from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import ProfileMenu from "../../components/ProfileMenu"; 

import {
  Card,
  Title,
  Metric,
  Text,
  TextInput,
  Divider,
  Button,
} from "@tremor/react";
import PasswordEditForm from "../../components/PasswordEditForm";

const page = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="w-full h-full flex flex-row">
        <div className="h-[75vh] w-1/3 to-bg-white border-r-[1px] border-oksigen-brand-fadeGrey mr-20 border-opacity-30">
          <div className="flex items-end justify-end mt-[4rem] mr-8">
          <ProfileMenu />
          </div>
        </div>
        <div className="w-2/3 h-[90vh]bg-opacity-10">
          <div className="flex items-start justify-start mt-[4rem]">
            <PasswordEditForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
