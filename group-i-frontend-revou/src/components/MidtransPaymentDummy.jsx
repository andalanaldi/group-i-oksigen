"use client";
import { useEffect, useState } from "react";
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
import MidtransCardDummy from "../components/MidtransCardDummy";

const RegistFormPremium = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationEmail, setOrganizationEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [organizationNameError, setOrganizationNameError] = useState(false);
  const [organizationEmailError, setOrganizationEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const checkout = async () => {
    const data = {
      id: 1,
      productName: OksigenPlusSubscribe,
      price: 69000,
      quantity: 1,
    };
  };

  return (
    <div className="w-[30rem]">
      <Button
        className="mb-4 font-semibold text-oksigen-brand-grey mt-[3rem] opacity-100 !rounded-full h-[3rem] antialiased hover:rounded-full transition-all duration-300 hover:text-oksigen-brand-blue !p-4 hover:bg-oksigen-brand-blue !hover:p-4 hover:bg-opacity-5"
        onClick={() => router.push("/login")}
        variant="light"
      >
        Batal Upgrade, Mulai Gunakan OksigenMap
      </Button>
      <Card>
        <MidtransCardDummy />
        <Button
          className={`w-full mb-4 opacity-100 !rounded-full h-[3rem] `}
          type="submit"
          onClick={() => router.push("/premium-map")}
        >
          Bayar
        </Button>
      </Card>
    </div>
  );
};

export default RegistFormPremium;
