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
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";

const ProfileEditForm = () => {
  const [initialValues, setInitialValues] = useState({
    organization_name: "",
    organizatin_email: "",
  });
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwt.decode(token);
      const userId = decodedToken?.userId;
  
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const { organization_name, email: organization_email, premium_limit_date, isPremium } = response.data.data;
        setInitialValues({ organization_name, organization_email });
        setProfileData({ organization_name, organization_email, premium_limit_date, isPremium });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
  
    fetchProfile();
  }, []);

  const validationSchema = Yup.object({
    organization_name: Yup.string().required("Required"),
    organization_email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
  });

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt.decode(token);
    const userId = decodedToken?.userId;
  
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/updateprofile/${userId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response.data);
      window.alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
      window.alert('Failed to update profile');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ errors, touched }) => (
        <Form className="w-[24rem]">
          <Title className="!text-3xl font-medium pb-2 text-oksigen-brand-blackX">
            Ubah Detail Profil
          </Title>
          <Text className="text-oksigen-brand-secondary text-xs leading-5 mb-[1.5rem]">
            Ganti detail profil Anda dibawah ini. Klik simpan untuk menyimpan
            perubahan.
          </Text>
          <Field
            name="organization_name"
            as={TextInput}
            error={errors.organization_name && touched.organization_name}
            errorMessage={errors.organization_name}
            placeholder="Nama Organisasi"
            className="mb-4 h-12 !rounded-2xl"
          />
          <Field
            name="organization_email"
            as={TextInput}
            error={errors.organization_email && touched.organization_email}
            errorMessage={errors.organization_email}
            placeholder="Email Organisasi"
            className="mb-4 h-12 !rounded-2xl"
          />
          <Button
            type="submit"
            className="w-full mb-4 opacity-100 !rounded-full h-[3rem]"
          >
            Simpan
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileEditForm;
