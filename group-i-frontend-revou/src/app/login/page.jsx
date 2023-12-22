import React from "react";
import LoginForm from "../../components/LoginForm";
import Navbar from "../../components/Navbar";

const page = () => {
  return (
    <>
    <div className="bg-oksigen-backgroundColor-radial-gradient">
      <div className="flex items-center justify-center mt-[4rem]">
        <LoginForm />
      </div>
    </div>
    </>
  );
};

export default page;
