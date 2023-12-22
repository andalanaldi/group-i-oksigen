"use client";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import {
  Card,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Title,
  Divider,
  BarChart,
  customTooltip,
  Button,
} from "@tremor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMaskFace,
  faBriefcaseMedical,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import {
  selectedCityDataAtom,
  selectedCityDataForDecemberAtom,
} from "../app/jotai-functions/dynamicatoms";
import OksigenLogoPremium from "../app/assets/oksigenplus.svg";
import Image from "next/image";

export default function PremiumSideBar() {
  const router = useRouter();
  const [selectedCityDataForDecember] = useAtom(
    selectedCityDataForDecemberAtom
  );
  const [selectedCityData] = useAtom(selectedCityDataAtom);
  const [cityDataForDecember] = useAtom(selectedCityDataForDecemberAtom);

  const VerticalSpacer = ({ size }) => <div style={{ paddingTop: size }}></div>;

  const formattedCost = selectedCityData
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(Number(selectedCityData.costverifRespiratory))
    : null;

  const getAQIColor = (aqi) => {
    if (aqi <= 50) {
      return "#CAE3AB"; // color for AQI 0-50
    } else if (aqi <= 100) {
      return "#ECC84A"; // color for AQI 51-100
    } else if (aqi <= 150) {
      return "#E8823D"; // color for AQI 101-150
    } else if (aqi <= 200) {
      return "#B73C3F"; // color for AQI 151-200
    } else if (aqi <= 300) {
      return "#7C6089"; // color for AQI 201-300
    } else {
      return "#603945"; // color for AQI >300
    }
  };

  const getAQIText = (aqi) => {
    if (aqi <= 50) {
      return "Baik";
    } else if (aqi <= 100) {
      return "Sedang";
    } else if (aqi <= 150) {
      return "Tidak Sehat bagi Kelompok Sensitif";
    } else if (aqi <= 200) {
      return "Tidak Sehat";
    } else if (aqi <= 300) {
      return "Sangat Tidak Sehat";
    } else {
      return "Berbahaya";
    }
  };
  // Create an array for all the dates in December
  const datesInDecember = Array.from(
    { length: 31 },
    (_, i) => new Date(2023, 11, i + 1)
  );

  // Map over the dates and fill in the missing data
  const chartDataAQI = cityDataForDecember
    ? datesInDecember.map((date) => {
        // Find the data for this date
        const dataForThisDate = cityDataForDecember.find(
          (data) => new Date(data.time).getDate() === date.getDate()
        );

        // Determine the color based on the AQI value
        let color;
        if (dataForThisDate) {
          const aqi = dataForThisDate.polution;
          color = getAQIColor(aqi);
        }

        return {
          color: color,
          tooltip: `AQI on ${date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}: ${dataForThisDate ? dataForThisDate.polution : 0}`,
        };
      })
    : [];

  const chartDataRespiratory = cityDataForDecember
    ? cityDataForDecember.map((data) => ({
        date: new Date(data.time).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        "Kasus ISPA": data.caseRespiratory,
      }))
    : [];

  const chartDataCost = cityDataForDecember
    ? cityDataForDecember.map((data) => ({
        date: new Date(data.time).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        "Biaya BPJS": data.costverifRespiratory,
      }))
    : [];

  return (
    <main className="w-full h-[100vh] flex items-start justify-start flex-col m-0 mt-4">
      <div className="flex flex-col w-full">
        <Text>Area yang dipilih:</Text>
        <Title className="text-oksigen-brand-blackX !text-3xl pb-4">
          {selectedCityData ? (
            <h1 className="text-5xl pt-2">{selectedCityData.cityName}</h1>
          ) : (
            "Silakan Pilih Kota"
          )}
        </Title>
      </div>
      <Divider className="w-[200%] ml-[-4rem]" />
      <TabGroup className="pt-4">
        <TabList
          variant="solid"
          className="w-full !rounded-full flex justify-between px-2"
        >
          <Tab className=" !text-base m-2 px-4 py-2 !rounded-full !font-medium">
            Rangkuman
          </Tab>
          <Tab className=" !text-base m-2 px-4 py-2 !rounded-full !font-medium">
            Kualitas Udara
          </Tab>
          <Tab className=" !text-base m-2 px-4 py-2 !rounded-full !font-medium">
            Kasus ISPA
          </Tab>
          <Tab className=" !text-base m-2 px-4 py-2 !rounded-full !font-medium">
            Biaya Klaim ISPA
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="flex flex-row gap-8 pt-6 pb-10">
              <div className="w-1/2 !font-medium !text-base">
                {" "}
                {selectedCityData ? (
                  <>
                    <FontAwesomeIcon
                      icon={faMaskFace}
                      className="text-oksigen-brand-red"
                    />{" "}
                    Kualitas Udara di {selectedCityData.cityName}
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faMaskFace}
                      className="text-oksigen-brand-red"
                    />{" "}
                    Kualitas Udara
                  </>
                )}
                <VerticalSpacer size="0.75rem" />
                <Card className=" h-[22rem] !rounded-3xl text-center">
                  <Card
                    className={`h-[15rem] !rounded-3xl text-center !text-white ${
                      selectedCityData ? "!text-7xl font-semibold" : "!text-xl"
                    }`}
                    style={{
                      backgroundColor: selectedCityData
                        ? getAQIColor(Number(selectedCityData.polution))
                        : undefined,
                    }}
                  >
                    <VerticalSpacer size="1.25rem" />{" "}
                    {selectedCityData ? (
                      selectedCityData.polution
                    ) : (
                      <Title className="opacity-50 mt-[3.5rem] font-normal">
                        Belum Memilih Kota
                      </Title>
                    )}
                    <VerticalSpacer size="3.5rem" />
                    {selectedCityData ? (
                      <Text className="!text-xl font-normal text-[#fafafa]">
                        US AQI
                      </Text>
                    ) : null}
                  </Card>
                  <VerticalSpacer size="1rem" />
                  <p
                    className="font-normal !text-lg"
                    style={{
                      color: selectedCityData
                        ? getAQIColor(Number(selectedCityData.polution))
                        : undefined,
                    }}
                  >
                    {selectedCityData
                      ? getAQIText(Number(selectedCityData.polution))
                      : ""}
                  </p>
                </Card>
              </div>
              {/* Card Kasus ISPA */}
              <div className="w-1/2 !font-medium !text-base">
                {" "}
                {selectedCityData ? (
                  <>
                    <FontAwesomeIcon
                      icon={faBriefcaseMedical}
                      className="text-oksigen-brand-red"
                    />{" "}
                    Kasus ISPA di {selectedCityData.cityName}
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faBriefcaseMedical}
                      className="text-oksigen-brand-red"
                    />{" "}
                    Kasus ISPA
                  </>
                )}
                <VerticalSpacer size="0.75rem" />
                <Card className="h-[22rem] !text-oksigen-brand-blackX !rounded-3xl text-center">
                  <Card
                    className={`h-[15rem] bg-oksigen-brand-softred !rounded-3xl text-center ${
                      selectedCityData ? "!text-6xl !font-semibold" : "!text-xl"
                    }`}
                  >
                    <VerticalSpacer size="3.25rem" />
                    {selectedCityData ? (
                      selectedCityData.caseRespiratory
                    ) : (
                      <Title className="opacity-50 mt-6 font-normal">
                        Belum Memilih Kota
                      </Title>
                    )}
                  </Card>
                  <VerticalSpacer size="1rem" />
                  {selectedCityData ? (
                    <Text className="!text-oksigen-brand-secondary font-normal !text-lg">
                      Total Kasus Hari Ini
                    </Text>
                  ) : (
                    ""
                  )}
                </Card>
              </div>
            </div>
            {/* Card Klaim ISPA BPJS */}
            <div className="w-full !font-medium !text-lg">
              {" "}
              {selectedCityData ? (
                <>
                  <FontAwesomeIcon
                    icon={faMoneyBill}
                    className="text-oksigen-brand-red"
                  />{" "}
                  Biaya Klaim ISPA BPJS di {selectedCityData.cityName}
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faMoneyBill}
                    className="text-oksigen-brand-red"
                  />{" "}
                  Biaya Klaim ISPA BPJS
                </>
              )}
              <VerticalSpacer size="0.75rem" />
              <Card className=" h-[20rem] !rounded-3xl text-center">
                <Card
                  className={`h-[15rem] text-center  bg-oksigen-brand-softred !rounded-3xl ${
                    selectedCityData ? "!text-5xl" : "!text-xl"
                  }`}
                >
                  <VerticalSpacer size="3.5rem" />
                  {selectedCityData ? (
                    <Text className="!text-oksigen-brand-blackX !text-5xl font-semibold">
                      {formattedCost}
                    </Text>
                  ) : (
                    <Title className="opacity-50 mt-6 font-normal">
                      Belum Memilih Kota
                    </Title>
                  )}
                </Card>{" "}
                <VerticalSpacer size="1rem" />
                <Text className="!text-oksigen-brand-secondary font-normal !text-lg">
                  {selectedCityData
                    ? "Total Biaya Klaim ISPA BPJS Hari Ini"
                    : ""}
                </Text>
              </Card>
            </div>
          </TabPanel>
          {/* <--------------- Panel Kualitas Udara -----------------> */}
          <TabPanel>
            <div className="w-full !font-medium !text-lg pt-6">
              {" "}
              {selectedCityData ? (
                <>
                  <FontAwesomeIcon
                    icon={faMaskFace}
                    className="text-oksigen-brand-red"
                  />{" "}
                  Kualitas Udara di {selectedCityData.cityName}
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faMaskFace}
                    className="text-oksigen-brand-red"
                  />{" "}
                  Kualitas Udara
                </>
              )}
              <VerticalSpacer size="0.75rem" />
              <Card className=" h-[21rem] !rounded-3xl text-center">
                <Card
                  className={`h-[15rem] !rounded-3xl text-center !text-white ${
                    selectedCityData ? "!text-8xl font-semibold" : "!text-xl"
                  }`}
                  style={{
                    backgroundColor: selectedCityData
                      ? getAQIColor(Number(selectedCityData.polution))
                      : undefined,
                  }}
                >
                  <VerticalSpacer size="1.25rem" />{" "}
                  {selectedCityData ? (
                    selectedCityData.polution
                  ) : (
                    <Title className="opacity-50 mt-[3.5rem] font-normal">
                      Belum Memilih Kota
                    </Title>
                  )}
                  <VerticalSpacer size="3.5rem" />
                  {selectedCityData ? (
                    <Text className="!text-xl font-normal text-[#fafafa]">
                      US AQI
                    </Text>
                  ) : null}
                </Card>
                <VerticalSpacer size="1rem" />
                <p
                  className="font-normal !text-lg"
                  style={{
                    color: selectedCityData
                      ? getAQIColor(Number(selectedCityData.polution))
                      : undefined,
                  }}
                >
                  {selectedCityData
                    ? getAQIText(Number(selectedCityData.polution))
                    : ""}
                </p>
              </Card>
              <VerticalSpacer size="0.75rem" />
              <Divider />{" "}
              {selectedCityData ? (
                <>
                  <FontAwesomeIcon
                    icon={faMaskFace}
                    className="text-oksigen-brand-red"
                  />{" "}
                  Kualitas Udara di {selectedCityData.cityName} pada Bulan
                  Desember 2023
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faMaskFace}
                    className="text-oksigen-brand-red"
                  />{" "}
                  Kualitas Udara
                </>
              )}
              <Card className="w-full h-[25rem] mt-4 px-20 mb-4 !rounded-3xl from-[#e6e4ff] to-bg-white !bg-gradient-opacity-5 !bg-opacity-10 !items-center !justify-center !flex !flex-col">
                <Image
                  src={OksigenLogoPremium}
                  alt="logo oksigen"
                  className="shadow-none antialiased w-[10rem] ml-2 mb-[1rem]src/components/RegistForm.jsx"
                />
                <Text className="items-center text-center !text-lg !text-oksigen-brand-blackX font-normal mt-4">
                  Upgrade ke Oksigen+ sekarang untuk mendapatkan detail Kualitas
                  Udara di Area yang Anda pilih dalam periode 1 bulan
                </Text>
                <Button
                  className="w-[50%] mt-4 mb-4 opacity-100 !rounded-full h-[3rem]"
                  onClick={() => router.push("/subscribe-oksigenplus")}
                >
                  Upgrade Sekarang
                </Button>
              </Card>
            </div>
          </TabPanel>
          {/* <-------------- Panel Kasus ISPA --------------> */}
          <TabPanel>
            <div className="w-full !font-medium !text-lg pt-6">
              {" "}
              {selectedCityData ? (
                <>
                  <FontAwesomeIcon
                    icon={faBriefcaseMedical}
                    className="text-oksigen-brand-red"
                  />{" "}
                  Kasus ISPA di {selectedCityData.cityName}
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faBriefcaseMedical}
                    className="text-oksigen-brand-red"
                  />{" "}
                  Kasus ISPA
                </>
              )}
              <VerticalSpacer size="0.75rem" />
              <Card className="h-[21rem] !text-oksigen-brand-blackX !rounded-3xl text-center">
                <Card
                  className={`h-[15rem] bg-oksigen-brand-softred !rounded-3xl text-center ${
                    selectedCityData ? "!text-7xl !font-semibold" : "!text-xl"
                  }`}
                >
                  <VerticalSpacer size="3.25rem" />
                  {selectedCityData ? (
                    selectedCityData.caseRespiratory
                  ) : (
                    <Title className="opacity-50 mt-6 font-normal">
                      Belum Memilih Kota
                    </Title>
                  )}
                </Card>
                <VerticalSpacer size="1rem" />
                {selectedCityData ? (
                  <Text className="!text-oksigen-brand-secondary font-normal !text-lg">
                    Total Kasus ISPA Hari Ini
                  </Text>
                ) : (
                  ""
                )}
              </Card>
              <VerticalSpacer size="1rem" />
              <Divider />{" "}
              {selectedCityData ? (
                <>
                  <FontAwesomeIcon
                    icon={faBriefcaseMedical}
                    className="text-oksigen-brand-red"
                  />{" "}
                  Kasus ISPA di {selectedCityData.cityName} dalam Bulan Desember
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faBriefcaseMedical}
                    className="text-oksigen-brand-red"
                  />{" "}
                  Kasus ISPA
                </>
              )}
              <VerticalSpacer size="0.75rem" />
              <Card className="w-full h-[25rem] mt-4 px-20 mb-4 !rounded-3xl from-[#e6e4ff] to-bg-white !bg-gradient-opacity-5 !bg-opacity-10 !items-center !justify-center !flex !flex-col">
                <Image
                  src={OksigenLogoPremium}
                  alt="logo oksigen"
                  className="shadow-none antialiased w-[10rem] ml-2 mb-[1rem]src/components/RegistForm.jsx"
                />
                <Text className="items-center text-center !text-lg !text-oksigen-brand-blackX font-normal mt-4">
                  Upgrade ke Oksigen+ sekarang untuk mendapatkan detail Kualitas
                  Udara di Area yang Anda pilih dalam periode 1 bulan
                </Text>
                <Button
                  className="w-[50%] mt-4 mb-4 opacity-100 !rounded-full h-[3rem]"
                  onClick={() => router.push("/subscribe-oksigenplus")}
                >
                  Upgrade Sekarang
                </Button>
              </Card>
            </div>
          </TabPanel>
          {/* <-------------- PANEL BIAYA BPJS ----------> */}
          <TabPanel>
            <div className="w-full !font-medium !text-lg pt-6">
              {" "}
              {selectedCityData ? (
                <>
                  <FontAwesomeIcon
                    icon={faMoneyBill}
                    className="text-oksigen-brand-red"
                  />{" "}
                  Biaya Klaim ISPA BPJS di {selectedCityData.cityName}
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faMoneyBill}
                    className="text-oksigen-brand-red"
                  />{" "}
                  Biaya Klaim ISPA BPJS
                </>
              )}
              <VerticalSpacer size="0.75rem" />
              <Card className=" h-[21rem] !rounded-3xl text-center">
                <Card
                  className={`h-[15rem] text-center  bg-oksigen-brand-softred !rounded-3xl ${
                    selectedCityData ? "!text-5xl" : "!text-xl"
                  }`}
                >
                  <VerticalSpacer size="3.5rem" />
                  {selectedCityData ? (
                    <Text className="!text-oksigen-brand-blackX !text-6xl font-semibold">
                      {formattedCost}
                    </Text>
                  ) : (
                    <Title className="opacity-50 mt-6 font-normal">
                      Belum Memilih Kota
                    </Title>
                  )}
                </Card>{" "}
                <VerticalSpacer size="1rem" />
                <Text className="!text-oksigen-brand-secondary font-normal !text-lg">
                  {selectedCityData
                    ? "Total Biaya Klaim ISPA BPJS Hari Ini"
                    : ""}
                </Text>
              </Card>
              <Divider />{" "}
              {selectedCityData ? (
                <>
                  <FontAwesomeIcon
                    icon={faMoneyBill}
                    className="text-oksigen-brand-red"
                  />{" "}
                  Biaya Klaim ISPA BPJS di {selectedCityData.cityName}
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faMoneyBill}
                    className="text-oksigen-brand-red"
                  />{" "}
                  Biaya Klaim ISPA BPJS
                </>
              )}
              <Card className="w-full h-[25rem] mt-4 px-20 mb-4 !rounded-3xl from-[#e6e4ff] to-bg-white !bg-gradient-opacity-5 !bg-opacity-10 !items-center !justify-center !flex !flex-col">
                <Image
                  src={OksigenLogoPremium}
                  alt="logo oksigen"
                  className="shadow-none antialiased w-[10rem] ml-2 mb-[1rem]src/components/RegistForm.jsx"
                />
                <Text className="items-center text-center !text-lg !text-oksigen-brand-blackX font-normal mt-4">
                  Upgrade ke Oksigen+ sekarang untuk mendapatkan detail Kualitas
                  Udara di Area yang Anda pilih dalam periode 1 bulan
                </Text>
                <Button
                  className="w-[50%] mt-4 mb-4 opacity-100 !rounded-full h-[3rem]"
                  onClick={() => router.push("/subscribe-oksigenplus")}
                >
                  Upgrade Sekarang
                </Button>
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
