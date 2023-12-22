"use client";
import React from "react";
import { UserCircleIcon } from "@heroicons/react/solid";
import LogoOksigen from "../../app/assets/logo oksigen.svg";
import Avatar from "../../app/assets/avatar.png";
import ProfileCard from "../../components/ProfileCard";
import { Text, Title, Card } from "@tremor/react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="py-4 px-8 flex flex-row items-center justify-between">
      <div className="flex flex-row justify-center items-center">
      <Image src={LogoOksigen} alt="logo oksigen" className="mr-10" />
      <Text className="px-8 !text-sm font-medium text-oksigen-brand-blackX hover:text-oksigen-brand-blue cursor-pointer">
        OksigenMap
      </Text>
      <Text className="px-8 text-sm font-medium text-oksigen-brand-blackX hover:text-oksigen-brand-blue cursor-pointer">
        Layanan
      </Text>
      <Text className="px-8 text-sm font-medium text-oksigen-brand-blackX hover:text-oksigen-brand-blue cursor-pointer">
        Dokumentasi
      </Text>
      <Text className="px-8 text-sm font-medium text-oksigen-brand-blackX hover:text-oksigen-brand-blue cursor-pointer">
        API
      </Text>
      <Text className="px-8 text-sm font-medium text-oksigen-brand-blackX hover:text-oksigen-brand-blue cursor-pointer">
        Bantuan
      </Text>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="flex items-end flex-col">
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
