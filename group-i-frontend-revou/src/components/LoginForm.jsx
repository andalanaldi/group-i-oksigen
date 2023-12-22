"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
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
import { useAtom } from 'jotai';
import OksigenLogoNoText from "../app/assets/oksigennocap.svg";
import Image from "next/image";
import { isPremiumAtom } from "../app/jotai-functions/dynamicatoms";
import jwt from 'jsonwebtoken';

const validationSchema = Yup.object({
  organization_email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Password should be at least 5 characters")
    .required("Required"),
});

const LoginForm = () => {
  const router = useRouter();
  const [isPremium] = useAtom(isPremiumAtom);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            organization_email: values.organization_email,
            password: values.password,
          }),
        }
      );
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error);
      }
  
      // Save the token, e.g. in local storage
      localStorage.setItem("token", data.token);
  
      // Fetch the user's profile to check if the user is premium
      const profileResponse = await fetch(
        `${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/profile`,
        {
          headers: {
            'Authorization': `Bearer ${data.token}`,
          },
        }
      );
      const profileData = await profileResponse.json();
  
      // Redirect to the appropriate page based on the user's premium status
      if (profileData.data.isPremium) {
        router.push("/premium-map");
      } else {
        router.push("/basic-map");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setErrors({ submit: 'User not found' });
      } else {
        setErrors({ submit: 'Username or Password is Incorrect' });
      }
    }
  
    setSubmitting(false);
  };

  return (
    <div className="w-[26rem] py-10 px-12 rounded-2xl shadow-xl border-blue-100 border-[1px] border-opacity-50 shadow-blue-100">
      <Formik
        initialValues={{ organization_email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
              <Image
                src={OksigenLogoNoText}
                alt="logo oksigen"
                className="shadow-none antialiased w-[4rem] mb-[1rem]"
              />
              <Title className="!text-3xl mb-4 font-medium pb-2 text-oksigen-brand-blackX">
                Masuk Oksigen
              </Title>
              <div>
                <Field
                  name="organization_email"
                  type="email"
                  placeholder="Email Organisasi"
                  className="mb-4 h-12 !rounded-2xl w-full border-oksigen-brand-fadeGrey border-[1px] px-2 py-2"
                />
                <ErrorMessage name="organization_email" component="div" />
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="mb-10 h-12 !rounded-2xl w-full border-oksigen-brand-fadeGrey border-[1px] px-2 py-2"
                />
                <ErrorMessage name="password" component="div" />
              </div>
              <Button
                className={`w-full mb-4 opacity-100 h-[3rem] !rounded-full ${
                  isSubmitting
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500"
                }`}
                type="submit"
                disabled={isSubmitting}
              >
                Masuk
              </Button>
              {errors.submit && <div>{errors.submit}</div>}
          </Form>
        )}
      </Formik>
      <Button
        className="w-full mb-10 opacity-100 text-oksigen-brand-secondary rounded-3xl"
        onClick={() => router.push("/forgot-password")}
        variant="light"
      >
        Lupa Password
      </Button>
      <Button
        className="w-full opacity-75"
        onClick={() => router.push("/register-basic")}
        variant="light"
      >
        Belum Punya Akun? Daftar disini
      </Button>
      </div>
  );
};

export default LoginForm;
