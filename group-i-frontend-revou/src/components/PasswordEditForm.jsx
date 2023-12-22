"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Title,
  Text,
  TextInput,
  Button,
} from "@tremor/react";

const PasswordEditForm = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetToken, setResetToken] = useState(null);
  const router = useRouter();

  const handleRequestReset = async () => {
    try {
      // Request password reset
      const { data: { resetToken } } = await axios.post(`${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/auth/request-reset-password`, {
        organization_email: email
      });

      setResetToken(resetToken);
    } catch (error) {
      console.error(error);
      alert('Failed to request password reset');
    }
  };

  const handlePasswordReset = async () => {
    try {
      // Reset password
      await axios.post(`${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/auth/resetpassword`, {
        organization_email: email,
        newPassword
      }, {
        headers: {
          Authorization: `Bearer ${resetToken}`
        }
      });

      alert('Password has been reset successfully. You need to log in again');

      // Clear JWT
      localStorage.removeItem('jwt'); // replace 'jwt' with the key you used to store the JWT

      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error(error);
      alert('Failed to reset password');
    }
  };

  return (
    <div className="w-[24rem]">
      <Title className="!text-3xl font-medium pb-2 text-oksigen-brand-blackX">
        Ubah Password
      </Title>
      <Text className="text-oksigen-brand-secondary text-xs leading-5 mb-[1.5rem]">
        Ganti password Anda melalui form dibawah ini. Klik simpan untuk menyimpan perubahan.
      </Text>
      <TextInput
        error={false}
        errorMessage="Wrong email"
        placeholder="Email"
        className="mb-4 h-12 !rounded-2xl"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {resetToken && (
        <TextInput
          error={false}
          errorMessage="Wrong password"
          placeholder="Password Baru"
          className="mb-4 h-12 !rounded-2xl"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      )}
      {!resetToken ? (
        <Button
          className="w-full mb-4 opacity-100 !rounded-full h-[3rem]"
          onClick={handleRequestReset}
        >
          Request Password Reset
        </Button>
      ) : (
        <Button
          className="w-full mb-4 opacity-100 !rounded-full h-[3rem]"
          onClick={handlePasswordReset}
        >
          Simpan
        </Button>
      )}
    </div>
  );
};

export default PasswordEditForm;