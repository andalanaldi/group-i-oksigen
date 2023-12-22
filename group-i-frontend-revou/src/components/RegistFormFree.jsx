"use client";

import { Callout } from "@tremor/react";
import { useField } from "formik";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
import OksigenLogoNoText from "../app/assets/oksigennocap.svg";
import Image from "next/image";
const RegisterForm = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationEmail, setOrganizationEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState(null);
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState(null);
  const [organizationNameError, setOrganizationNameError] = useState(false);
  const [organizationEmailError, setOrganizationEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const isFormIncomplete =
    !organizationName ||
    !organizationEmail ||
    !firstName ||
    !lastName ||
    !password;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error states
    setOrganizationNameError(false);
    setOrganizationEmailError(false);
    setFirstNameError(false);
    setLastNameError(false);
    setPasswordError(false);

    // Check for errors
    if (!organizationName) setOrganizationNameError(true);
    if (!organizationEmail || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(organizationEmail)) setOrganizationEmailError(true);    if (!firstName) setFirstNameError(true);
    if (!lastName) setLastNameError(true);
    if (!password) setPasswordError(true);

    // If any error is detected, stop form submission
    if (
      organizationNameError ||
      organizationEmailError ||
      firstNameError ||
      lastNameError ||
      passwordError
    ) {
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/auth/register`,
        {
          organization_name: organizationName,
          organization_email: organizationEmail,
          pic_firstname: firstName,
          pic_lastname: lastName,
          pic_role_institution: "user", // Automatically assign 'user' role
          password: password,
        }
      );

      console.log(response.data);
      setRegisterStatus("success");
      setToastMessage("Organization registered successfully");
      toast.success("Organization registered successfully");
      router.push("/login");
    } catch (err) {
      console.error(err);
      setRegisterStatus("error");
      setToastMessage("An error occurred while registering the organization");
      toast.error("An error occurred while registering the organization");
    }
  };

  useEffect(() => {
    if (registerStatus === "success") {
      toast.success("Organization registered successfully");
    } else if (registerStatus === "error") {
      toast.error("An error occurred while registering the organization");
    }
  }, [registerStatus]);

  return (
    <div className="w-[24rem]">
      <Image
        src={OksigenLogoNoText}
        alt="logo oksigen"
        className="shadow-none antialiased w-[4rem] mb-[1rem]"
      />
      <Title className="!text-3xl font-medium pb-2 text-oksigen-brand-blackX">
        Buat Akun Oksigen
      </Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          error={organizationNameError}
          errorMessage="Organization name is required"
          placeholder="Nama Organisasi"
          className="mb-4 h-12 !rounded-2xl"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
        />
        <TextInput
          error={organizationEmailError}
          errorMessage="Invalid email"
          placeholder="Email Organisasi"
          className="mb-4 h-12 !rounded-2xl"
          value={organizationEmail}
          onChange={(e) => setOrganizationEmail(e.target.value)}
        />
        <div className="flex flex-row gap-4">
          <TextInput
            error={firstNameError}
            errorMessage="First name is required"
            placeholder="Nama Depan"
            className="mb-4 h-12 !rounded-2xl"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextInput
            error={lastNameError}
            errorMessage="Last name is required"
            placeholder="Nama Belakang"
            className="mb-4 h-12 !rounded-2xl"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <TextInput
          error={passwordError}
          errorMessage="Password is required"
          placeholder="Password"
          type="password"
          className="mb-10 h-12 !rounded-2xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className={`w-full mb-4 opacity-100 !rounded-full h-[3rem] ${
            isFormIncomplete ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500"
          }`}
          type="submit"
          disabled={isFormIncomplete}
        >
          Buat Akun
        </Button>
      </form>
      <Button
        className="w-full opacity-75"
        onClick={() => router.push("/login")}
        variant="light"
      >
        Sudah Punya Akun? Masuk di sini
      </Button>
      {toastMessage && (
        <Callout
          className="mt-10"
          title={toastMessage}
          type={registerStatus === "success" ? "positive" : "negative"}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};

export default RegisterForm;
