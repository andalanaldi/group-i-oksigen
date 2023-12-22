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

  const isFormIncomplete = !organizationName || !organizationEmail || !firstName || !lastName || !password;

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
    if (!organizationEmail || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(organizationEmail)) setOrganizationEmailError(true);
    if (!firstName) setFirstNameError(true);
    if (!lastName) setLastNameError(true);
    if (!password) setPasswordError(true);
  
    // If any error is detected, stop form submission
    if (organizationNameError || organizationEmailError || firstNameError || lastNameError || passwordError) {
      return;
    }
  
    // Axios call to submit the form data
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/postTransaction`,
        {
          organization_name: organizationName,
          organization_email: organizationEmail,
          pic_firstname: firstName,
          pic_lastname: lastName,
          pic_role_institution: "user", // Automatically assign 'user' role
          password: password,
        }
      );
  
      if (response.data) {
        // Display the Snap payment page in a modal
        window.snap.pay(response.data.token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            alert("payment success!"); console.log(result);
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            alert("wating your payment!"); console.log(result);
          },
          onError: function (result) {
            /* You may add your own implementation here */
            alert("payment failed!"); console.log(result);
          },
          onClose: function () {
            /* You may add your own implementation here */
            alert('you closed the popup without finishing the payment');
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="w-[24rem]">
      <Image
        src={OksigenLogoPremium}
        alt="logo oksigen"
        className="shadow-none antialiased w-[4rem] mb-[1rem]src/components/RegistForm.jsx"
      />
      <Title className="!text-3xl font-medium pb-2 text-oksigen-brand-bluePremium">
        Buat Akun Oksigen Plus
      </Title>
      <Text className="text-oksigen-brand-secondary text-xs leading-5 mb-[1.5rem]">
        Masuk dengan akun Oksigen Anda untuk mulai menggunakan OksigenMap
        sekarang
      </Text>
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
          className={`w-full mb-4 opacity-100 !rounded-full h-[3rem] ${isFormIncomplete ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'}`}
          type="submit"
          disabled={isFormIncomplete}
          onClick={() => router.push("/subscribe-oksigenplus")}
        >
          Bayar
        </Button>
      </form>
      <Button
        className="w-full opacity-75"
        onClick={() => router.push("/login")}
        variant="light"
      >
        Sudah Punya Akun? Masuk di sini
      </Button>
    </div>
  );
};

export default RegistFormPremium;
