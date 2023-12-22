"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import LogoOksigen from "../app/assets/logo oksigen.svg";
import { Text, Title, Card, Badge } from "@tremor/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthPremium } from '../app/utils/useAuth'

const PremiumStatusComponent = () => {
  const router = useRouter();
  useAuthPremium();
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

  return (
    <div className="w-[24rem]">
      <Image
        src={LogoOksigen}
        alt="logo oksigen"
        className="shadow-none antialiased w-[10rem] mb-[1rem]"
      />
      <Title className="!text-3xl font-medium pb-4 text-oksigen-brand-bluePremium">
        Selamat Anda telah berlangganan OksigenPlus hingga {new Date(profile?.premium_limit_date).toLocaleDateString()}
      </Title>
      <Text className="text-oksigen-brand-secondary !text-lg leading-10 mb-[1.5rem]">
        Nikmati OksigenMap yang lebih lengkap dengan data historis semua metrik monitoring, akses ke OksigenAPI (Coming Soon) dan Oksigen (AI)
      </Text>
    </div>
  );
};

export default PremiumStatusComponent;