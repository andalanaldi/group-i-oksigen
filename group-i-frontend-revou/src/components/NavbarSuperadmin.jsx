"use client";
import React, { useState, useEffect } from "react";
import { useAtom } from 'jotai';
import { checkProfileAtom } from '../app/jotai-functions/dynamicatoms';
import LogoOksigen from "../app/assets/superadmin.svg";
import { Text, Title, Card } from "@tremor/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from 'axios';

const Navbar = () => {
  const router = useRouter();
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isPremium] = useAtom(checkProfileAtom);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setProfile(response.data.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/superadmin-login");
  };

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  return (
    <div className="bg-oksigen-brand-superadmin mb-0 h-[8vh] pl-8 pr-4 flex flex-row items-center justify-between relative z-1000">
      <div className="flex flex-row justify-center items-center">
        <Image src={LogoOksigen} alt="logo oksigen" className="mr-10" />
      </div>
      <div className="flex flex-row justify-center items-start">
        <div
          className="flex items-end flex-col"
          onClick={toggleCardVisibility}
          style={{ cursor: "pointer" }}
        >
          <Title
            className="!text-sm !font-semibold text-white mr-2
   hover:bg-oksigen-brand-blue hover:bg-opacity-5 
   hover:py-2 hover:px-4 px-4 py-2 hover:rounded-tremor-full transition-all duration-300 hover:text-oksigen-brand-blue"
          >
            <b className="font-normal">Hi,</b> {profile?.organization_name} {isPremium && '(premium)'}
          </Title>
        </div>
        {isCardVisible && (
          <div className="absolute top-full right-8 mt-2 items-">
            <Card className="!rounded-3xl flex items-end justify-end flex-col gap-">
              <span onClick={() => router.push("/superadmin-profile-edit")}>
              <Text className="!text-oksigen-brand-blackX !hover:text-oksigen-brand-blue cursor-pointer">
                Atur Profil
              </Text>
              </span>
              <div onClick={logout}>
                <Text className="mt-4 cursor-pointer">Keluar</Text>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;