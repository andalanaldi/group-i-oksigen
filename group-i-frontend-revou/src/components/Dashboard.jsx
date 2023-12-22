"use client";

import { Card, Select, SelectItem, Title, Metric, Text, TextInput, Divider, Button } from "@tremor/react";
import { useRouter } from 'next/navigation'

const LoginForm = () => {
    const router = useRouter()

  return (
    <Card
      className="max-w-lg mx-auto p-12"
      decoration="top"
      decorationColor="indigo"
    >
      <Title className="!text-3xl font-bold pb-2">Admin Dashboard</Title>
      <Text className="pb-4">Masukkan Data untuk kota:</Text>
      <Select>
          <SelectItem value="1">
          Jakarta
          </SelectItem>
          <SelectItem value="2">
          Bandung
          </SelectItem>
          <SelectItem value="3">
          Tel Aviv
          </SelectItem>
          <SelectItem value="4">
          Kyiv
          </SelectItem>
        </Select>
      <Text className="px-2"></Text>
      <Divider className="opacity-50" />
      {/* <TextInput error={false} errorMessage="Wrong username" placeholder="AQI US Hari ini" className="mb-4 h-12"/> */}
      <TextInput error={false} errorMessage="Wrong username" placeholder="Kasus ISPA" className="mb-4 h-12"/>
      <TextInput error={false} errorMessage="Wrong username" placeholder="Klaim ISPA" className="mb-4 h-12"/>
      <Button className="w-full mb-2 opacity-100" onClick={() => router.push('/premium-map')}>Submit</Button>
    </Card>
  );
};

export default LoginForm;
