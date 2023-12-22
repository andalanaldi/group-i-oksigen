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
import OksigenLogoNoText from "../../src/app/assets/oksigennocap.svg";
import Image from "next/image";

const RegistForm = () => {
  const router = useRouter();

  return (
    <div>
      <div
        className="w-[26rem] py-10 px-12 rounded-2xl shadow-xl border-blue-100 border-[1px] border-opacity-50 shadow-blue-100"
      >
        <Image src={OksigenLogoNoText} alt="logo oksigen" className="shadow-none antialiased w-[4rem] mb-[1rem]"/>
        <Title className="!text-3xl font-medium pb-2 text-oksigen-brand-blackX">Masuk Oksigen</Title>
        <Text className="text-oksigen-brand-secondary text-xs leading-5 mb-[1.5rem]">Masuk dengan akun Oksigen Anda untuk mulai menggunakan OksigenMap sekarang</Text>
        <TextInput error={false} errorMessage="Wrong email" placeholder="Email Organisasi" className="mb-4 h-12 !rounded-2xl"/>
        <TextInput error={false} errorMessage="Wrong username" placeholder="Password" type="password" className="mb-10 h-12 !rounded-2xl"/>
        <Button className="w-full mb-4 opacity-100 rounded-3xl h-[3rem]" onClick={() => router.push('/premium-map')}>Masuk</Button>
        <Button className="w-full mb-10 opacity-100 text-oksigen-brand-secondary !rounded-full" onClick={() => router.push('/premium-map')} variant="light">Lupa Password</Button>
        <Button className="w-full opacity-75" onClick={() => router.push('/register')} variant="light">Belum Punya Akun? Daftar disini</Button>
      </div>
          </div>
    );
  };

export default RegistForm;
