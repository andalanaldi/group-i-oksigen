import React, { useState } from "react";
import { Card, Title } from "@tremor/react";

const ProfileCard = () => {
  const [isCardVisible, setIsCardVisible] = useState(true);

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  return (
    <div>
      <div className="flex items-start flex-col">
        <Title 
          className="!text-sm !font-semibold text-oksigen-brand-blackX mr-2"
          onClick={toggleCardVisibility}
          style={{cursor: 'pointer'}}
        >
          Kementrian Lingkungan Hidup
        </Title>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr bg-slate-700 p-0" />
      </div>
      {isCardVisible && (
        <div>
          <Card className="mt-10">Avutaro</Card>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;