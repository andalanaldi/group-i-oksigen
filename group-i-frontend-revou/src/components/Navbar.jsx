"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import LogoOksigen from "../app/assets/logo oksigen.svg";
import { Text, Title, Card, Badge, Button } from "@tremor/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { isPremiumAtom } from "../app/jotai-functions/dynamicatoms";
import { useJWT } from "../app/utils/useAuth";

const Navbar = () => {
  const router = useRouter();
  const [isPremium] = useAtom(isPremiumAtom);
  const [isCardVisible, setIsCardVisible] = useState(false);
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
    // Clear the JWT token
    localStorage.removeItem("token"); // replace 'token' with the key you used to store the JWT token

    console.log("Before router.push");

    // Redirect to the login page
    router.push("/login");

    console.log("After router.push");
  };
  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  const handleSubscriptionClick = () => {
    if (profile?.premium_limit_date) {
      router.push("/oksigenplus-status");
    } else {
      router.push("/subscribe-oksigenplus");
    }
  };

  const handleOksigenMapClick = () => {
    if (profile?.premium_limit_date) {
      router.push("/premium-map");
    } else {
      router.push("/basic-map");
    }
  };

  return (
    <div className="bg-white  py-4 pl-8 pr-4 flex flex-row items-center justify-between relative z-1000">
      <div className="flex flex-row justify-center items-center">
        <Image src={LogoOksigen} alt="logo oksigen" className="mr-10" />
        <Button variant="light" onClick={handleOksigenMapClick} className="px-8 !text-sm font-medium text-oksigen-brand-blackX hover:text-oksigen-brand-blue !bg-none">
          OksigenMap
        </Button>
        <Button variant="light" onClick={handleSubscriptionClick} className="px-8 !text-sm font-medium text-oksigen-brand-blackX hover:text-oksigen-brand-blue !bg-none">
          Langganan OksigenPlus
        </Button>
      </div>
      <div className="flex flex-row justify-center items-start">
      <div
        className="flex items-end flex-col"
        onClick={toggleCardVisibility}
        style={{ cursor: "pointer" }}
      >
        <Title
          className="!text-sm !font-semibold text-oksigen-brand-blackX mr-2
 hover:bg-oksigen-brand-blue hover:bg-opacity-5 
 hover:py-2 hover:px-4 px-4 py-2 hover:rounded-tremor-full transition-all duration-300 hover:text-oksigen-brand-blue"
        >
         {profile?.isPremium && <Badge size="md" className="mr-4 font-normal">OksigenPlus</Badge>} <b className="font-semibold">Halo, {profile?.organization_name}!</b> 
        </Title>
      </div>
        {isCardVisible && (
          <div className="absolute top-full right-8 mt-2 items-">
            <Card className="!rounded-3xl flex items-end justify-end flex-col gap-">
    <div onClick={() => router.push('/profile-edit')}>
      <Text className="!text-oksigen-brand-blackX !hover:text-oksigen-brand-blue cursor-pointer">
        Atur Profil
      </Text>
    </div>
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