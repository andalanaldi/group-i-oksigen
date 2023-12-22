"use client";

import {
  Card,
  Title,
  Metric,
  Text,
  TextInput,
  Divider,
  Button,
} from "@tremor/react";
import { useRouter } from "next/navigation";
import OksigenLogoPremium from "../app/assets/oksigenplus.svg";
import Image from "next/image";
import SubscribeButton from "../components/SubscribeButton"

const RegistFormPremium = () => {
  const router = useRouter();

  return (
    <div className="w-[24rem]">
      <Image
        src={OksigenLogoPremium}
        alt="logo oksigen"
        className="shadow-none antialiased w-[10rem] mb-[1rem]"
      />
      <Title className="!text-3xl font-medium pb-4 text-oksigen-brand-bluePremium">
        Mulai langganan Oksigen+ Sekarang dan nikmati keuntungannya
      </Title>
      <Text className="text-oksigen-brand-secondary !text-lg leading-10 mb-[1.5rem]">
        Saat ini Anda belum berlangganan Oksigen+, klik tombol dibawah ini untuk
        memulai langganan
      </Text>
      <SubscribeButton />
    </div>
  );
};

export default RegistFormPremium;
