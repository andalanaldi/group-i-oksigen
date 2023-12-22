"use client";
import React, { useEffect, useState } from "react";
import { Button, Callout, Text } from "@tremor/react";
import jwt from "jsonwebtoken";

const SubscribeButton = () => {
  const [loading, setLoading] = useState(false);
  const [snapUrl, setSnapUrl] = useState(null);
  const [snapToken, setSnapToken] = useState(null);

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_SECRET_KEY;
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-clientKey", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubscribe = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const decodedToken = jwt.decode(token);
      const userId = decodedToken?.userId;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/transaction/buy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ user_id: userId }), // Send userId in the request body
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Save the snapUrl in the state
      setSnapUrl(data.snapUrl);
      setSnapToken(data.token);
    } catch (error) {
      console.error("Error during subscription:", error);
      alert("An error occurred while subscribing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <Callout
        className="h-full w-full mt-0 mb-8 !font-normal"
        title="Panduan Simulasi Pembayaran! "
        color="blue"
      >
<span className="mb-2 block">1. Buka <a className="underline underline-offset-2 text-oksigen-brand-bluePremium" href="https://simulator.sandbox.midtrans.com/bca/va/index" target="_blank" rel="noopener noreferrer">Link Simulasi Pembayaran BCA</a>,</span>    <span className="mb-2 block">2. Klik Buat Link Pembayaran Dibawah, lalu Bayar Sekarang</span>
    <span className="mb-2 block">3. Klik BCA Virtual Account,</span>
    <span className="mb-2 block">4. Copy VA ke Link Simulasi Pembayaran BCA</span>
    <span className="mb-2 block">5. Selesaikan pembayaran,</span>
    <span className="mb-2 block">6. Tunggu hingga jendela pembayaran Midtrans menunjukkan berhasil.</span>
      </Callout>
      <Button
        onClick={handleSubscribe}
        disabled={loading || snapUrl}
        className="mb-2"
      >
        {loading ? "Loading..." : "Buat Link Pembayaran"}
      </Button>
      {snapUrl && (
        <Button onClick={() => window.snap.pay(snapToken)} variant="secondary">
          Bayar Sekarang
        </Button>
      )}
    </div>
  );
};

export default SubscribeButton;
