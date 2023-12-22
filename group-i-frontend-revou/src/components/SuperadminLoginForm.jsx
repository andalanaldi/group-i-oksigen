"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
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
import SuperadminLogoNoText from "../app/assets/superadminnotext.svg";
import Image from "next/image";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Password should be at least 5 characters")
    .required("Required"),
});

const SuperadminLoginForm = () => {
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/auth/loginadmin`,
        {
          organization_email: values.email,
          password: values.password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        router.push("/admindash");
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "An error occurred while logging in";
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 400) {
          errorMessage = "Invalid request";
        } else if (error.response.status === 404) {
          errorMessage = "User not found";
        } else if (error.response.status === 401) {
          errorMessage = "You're not an Oksigen Admin. Please login as a User!";
        } else if (error.response.status === 500) {
          errorMessage = "Server error";
        }
      }
      setErrors({ submit: errorMessage });
    }

    setSubmitting(false);
  };

  return (
    <div className="w-[26rem] h- py-10 px-12 rounded-2xl shadow-xl border-oksigen-brand-grey border-[1px] border-opacity-25 shadow-oksigen-brand-superadmin">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div>
              <Image
                src={SuperadminLogoNoText}
                alt="logo oksigen"
                className="shadow-none antialiased w-[4rem] mb-[1rem]"
              />
              <Title className="!text-3xl font-medium pb-2 text-oksigen-brand-fadeGrey pt-4">
                Masuk OksigenAdmin
              </Title>
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email Organisasi"
                  className="mb-4 h-12 !rounded-2xl w-full px-2"
                />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="mb-10 h-12 !rounded-2xl w-full px-2"
                />
                <ErrorMessage name="password" component="div" />
              </div>
              <Button
                className="w-full mb-4 opacity-100 h-[3rem] !rounded-full"
                type="submit"
                disabled={isSubmitting}
              >
                Masuk
              </Button>
              {errors.submit && <div>{errors.submit}</div>}
            </div>
          </Form>
        )}
      </Formik>
      <Button
        className="w-full mb-10 opacity-100 text-oksigen-brand-fadeGrey rounded-3xl"
        onClick={() => router.push("/superadmin-profile-edit")}
        variant="light"
      >
        Lupa Password
      </Button>
    </div>
  );
};

export default SuperadminLoginForm;
