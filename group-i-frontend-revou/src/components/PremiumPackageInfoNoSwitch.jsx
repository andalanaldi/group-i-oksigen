"use client";

import {
  Card,
  Title,
  Metric,
  Text,
  TextInput,
  Divider,
  Button,
  Icon,
} from "@tremor/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const PremiumPackageInfo = () => {
  const router = useRouter();

  return (
    <div className="w-[24rem] mt-[3.5rem]">
      <Title className="!text-2xl font-semibold text-oksigen-brand-bluePremium">
        Fitur OksigenPlus
      </Title>
      <Title className="!text-xl font-medium pb-4 text-oksigen-brand-bluePremium">
        Rp69.000,-/bln
      </Title>
      <Text className="text-oksigen-brand-secondary text-md leading-5 mb-[1.5rem]">
        Akses untuk OksigenMap mencakup:
      </Text>
      <div className="flex flex-row">
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="pr-2  pt-0 mt-0 mb-0 pb-0 h-5 antialiased text-oksigen-brand-blue"
        />
        <Text className="text-oksigen-brand-secondary text-md leading-5 mb-[1.25rem] font-medium antialiased">
          Data harian Kualitas Udara, Kasus ISPA, dan Klaim ISPA BPJS untuk 7
          kota.
        </Text>
      </div>
      <div className="flex flex-row">
      <FontAwesomeIcon
          icon={faCircleCheck}
          className="pr-2  pt-0 mt-0 mb-0 pb-0 h-5 antialiased text-oksigen-brand-blue"
        />
        <Text className="text-oksigen-brand-secondary text-md leading-5 mb-[1.25rem] font-medium antialiased">
          Data bulanan Kualitas Udara, Kasus ISPA, dan Klaim ISPA BPJS Kota
          dalam periode 30 hari
        </Text>
      </div>
      <div className="flex flex-row">
      <FontAwesomeIcon
          icon={faCircleCheck}
          className="pr-2  pt-0 mt-0 mb-0 pb-0 h-5 antialiased text-oksigen-brand-blue"
        />
        <Text className="text-oksigen-brand-secondary text-md leading-5 mb-[1.25rem] font-medium antialiased">
          Akses untuk API OksigenMap (Coming Soon)
        </Text>
      </div>
      <div className="flex flex-row">
      <FontAwesomeIcon
          icon={faCircleCheck}
          className="pr-2  pt-0 mt-0 mb-0 pb-0 h-5 antialiased text-oksigen-brand-blue"
        />
        <Text className="text-oksigen-brand-secondary text-md leading-5 mb-[1.25rem] font-medium antialiased">
          Akses untuk OksigenAI - Analisis Tren Data ISPA dan AQI berbasis GPT-4
          (Coming Soon)
        </Text>
      </div>
    </div>
  );
};

export default PremiumPackageInfo;
