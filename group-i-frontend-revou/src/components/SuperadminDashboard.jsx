"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import {
  Card,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  TextInput,
  Title,
  Divider,
  Select,
  SelectItem,
  BarChart,
  Button,
} from "@tremor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMaskFace,
  faBriefcaseMedical,
  faMoneyBill,
  faSquarePen,
} from "@fortawesome/free-solid-svg-icons";
import {
  selectedCityDataAtom,
  selectedCityDataForDecemberAtom,
  selectedCityPolutionDataAtom,
} from "../app/jotai-functions/dynamicatoms";

export default function SuperadminSideBar() {
  const [selectedCityDataForDecember] = useAtom(
    selectedCityDataForDecemberAtom
  );
  const [selectedCityData] = useAtom(selectedCityDataAtom);
  const [cityDataForDecember] = useAtom(selectedCityDataForDecemberAtom);
  const [caseRespiratory, setCaseRespiratory] = useState("");
  const [costverifRespiratory, setCostverifRespiratory] = useState("");
  const [cityId, setCityId] = useState("");
  const [selectedCityPolutionData, setSelectedCityPolutionData] = useAtom(
    selectedCityPolutionDataAtom
  );

  const cities = {
    1: "DKI Jakarta",
    2: "Kota Bandung",
    3: "Kota Medan",
    4: "Kota Surabaya",
    5: "DIY Yogyakarta",
  };

  const VerticalSpacer = ({ size }) => <div style={{ paddingTop: size }}></div>;

  const formattedCost = selectedCityData
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(Number(selectedCityData.costverifRespiratory))
    : null;

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!selectedCityPolutionData || !selectedCityPolutionData.id) {
      alert("Please select a city first.");
      return;
    }

    // Log the values being sent in the request
    console.log("Updating polution data:");
    console.log("ID:", selectedCityPolutionData.id);
    console.log("Case Respiratory:", caseRespiratory);
    console.log("Cost verif Respiratory:", costverifRespiratory);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/superadmin/polution/${selectedCityPolutionData.id}`,
        {
          caseRespiratory: parseInt(caseRespiratory),
          costverifRespiratory: parseInt(costverifRespiratory),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Update successful!");
        window.location.reload();
      } else {
        alert("Update failed. Please try again.");
      }

      console.log(response.data);
    } catch (error) {
      console.error(error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        // The request was made but no response was received
        alert("Error: No response from the server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        alert("Error: Failed to send the request. Please try again.");
      }
    }
  };

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
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Get the JWT token from local storage
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/superadmin/polution`,
        {
          caseRespiratory: parseInt(caseRespiratory),
          costverifRespiratory: parseInt(costverifRespiratory),
          cityId: parseInt(cityId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        }
      );

      console.log(response.data);
      alert("Data has been posted. Refreshing page...");
      window.location.reload();
    } catch (error) {
      console.error(error);
      if ((error.response && error.response.status === 400, 500, 404)) {
        alert("Data is already in the database for today or the next day.");
      }
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

  useEffect(() => {
    if (selectedCityPolutionData) {
      setCaseRespiratory(selectedCityPolutionData.caseRespiratory);
      setCostverifRespiratory(selectedCityPolutionData.costverifRespiratory);
    }
  }, [selectedCityPolutionData]);

  return (
    <main className="w-full h-[100vh] flex items-start justify-start flex-col m-0 mt-4">
      <div className="flex flex-col w-full">
        <Text>Area yang dipilih:</Text>
        <Title className="text-white !text-3xl pb-4">
          {selectedCityData ? (
            <h1 className="text-5xl pt-2">{selectedCityData.cityName}</h1>
          ) : (
            "Silakan Pilih Kota"
          )}
        </Title>
      </div>
      <TabGroup className="pt-4">
        <TabList
          variant="solid"
          className="w-full !rounded-full flex justify-start px-2 bg-oksigen-brand-blackX"
        >
          <Tab className=" !text-base m-2 px-4 py-2 !rounded-full !font-medium">
            Input Data Baru
          </Tab>
          <Tab className=" !text-base m-2 px-4 py-2 !rounded-full !font-medium">
            Edit Data Kasus & Biaya ISPA
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="flex flex-row gap-8 pt-6 pb-10">
              <div className="w-full !font-medium !text-base">
              <div className="gap-10">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <TextInput
                        type="text"
                        value={caseRespiratory}
                        onChange={(e) => setCaseRespiratory(e.target.value)}
                        placeholder="Case Respiratory"
                        className="w-full  placeholder-gray-500 text-gray-900 focus:outline-none"
                      />
                      <TextInput
                        type="text"
                        value={costverifRespiratory}
                        onChange={(e) =>
                          setCostverifRespiratory(e.target.value)
                        }
                        placeholder="Cost verif Respiratory"
                        className="w-full placeholder-gray-500 text-gray-900 focus:outline-none"
                      />
                      <Select
                        value={cityId}
                        onValueChange={setCityId}
                        className="w-full"
                      >
                        <SelectItem value="" className="w-full !rounded-3xl">
                          Select a city
                        </SelectItem>
                        {Object.entries(cities).map(([id, name]) => (
                          <SelectItem key={id} value={id}>
                            {name}
                          </SelectItem>
                        ))}
                      </Select>
                      <Button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 focus:outline-none"
                      >
                        Submit
                      </Button>
                    </form>
                  </div>
                  <Divider />
                {" "}
                {selectedCityData ? (
                  <>
                    <FontAwesomeIcon
                      icon={faMaskFace}
                      className="text-oksigen-brand-red"
                    />{" "}
                    <span className="!text-oksigen-brand-fadeGrey">
                      Kualitas Udara di {selectedCityData.cityName}
                    </span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faMaskFace}
                      className="text-oksigen-brand-red"
                    />{" "}
                    <span className="!text-oksigen-brand-fadeGrey">
                      Kualitas Udara
                    </span>
                  </>
                )}
                <VerticalSpacer size="0.75rem" />
                {/* <----------------- AQI TODAY CARD ----------------> */}
                {/* <----------------- AQI TODAY CARD ----------------> */}
                {/* <----------------- AQI TODAY CARD ----------------> */}
                {/* <----------------- AQI TODAY CARD ----------------> */}
                <Card className=" h-[20rem] !rounded-3xl text-center">
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
                      <Title className="opacity-50 mt-[3.5rem] font-normal ">
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
                <VerticalSpacer size="2rem" />
                {/* <---------------- ADMIN DATA SUBMISSION -------------------> */}
                {/* <---------------- ADMIN DATA SUBMISSION -------------------> */}
                {/* <---------------- ADMIN DATA SUBMISSION -------------------> */}
                <div className="flex flex-col">
                  <div>
                    <FontAwesomeIcon
                      icon={faSquarePen}
                      className="text-oksigen-brand-red"
                    />{" "}
                    <span className="!text-oksigen-brand-fadeGrey">
                      Input Data - {new Date().toLocaleDateString("en-GB")}
                    </span>
                    <VerticalSpacer size="1rem" />
                  </div>
                  <Divider />
                  {" "}
              {selectedCityData ? (
                <>{" "}
                  <span className="text-oksigen-brand-fadeGrey">
                    Kualitas Udara di {selectedCityData.cityName} pada Bulan
                    Desember 2023
                  </span>
                </>
              ) : (
                <>{" "}
                  <span className="text-oksigen-brand-fadeGrey">
                    Kualitas Udara
                  </span>
                </>
              )}
              <Card className="w-full !rounded-3xl h-[24rem] mt-6 mb-4 overflow-y-scroll">
                {chartDataAQI.map((data, index, arr) => {
                  const date = datesInDecember[index];
                  const aqiValue = Number(data.tooltip.split(": ")[1]);

                  if (aqiValue < 1) {
                    return null;
                  }

                  return (
                    <Card
                      key={index}
                      className="w-full h-16 px-4 py-4 m-0 mt-4 !rounded-3xl flex items-center justify-between"
                    >
                      <div className="flex flex-row items-center">
                        <Card
                          className="w-20 h-10 p-0 m-0 !rounded-xl items-center flex justify-center mr-4"
                          style={{ backgroundColor: data.color }}
                        >
                          <p className="text-white">
                            {aqiValue} {/* AQI Value */}
                          </p>
                        </Card>
                        <p className="text-md text-oksigen-brand-secondary">
                          {getAQIText(aqiValue)} {/* AQI Rank */}
                        </p>
                      </div>
                      {date.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                      })}{" "}
                      {/* Date */}
                    </Card>
                  );
                })}
              </Card>
                </div>
              </div>
            </div>
          </TabPanel>
          {/* <-------------- Panel Kasus ISPA --------------> */}
          {/* <-------------- Panel Kasus ISPA --------------> */}
          {/* <-------------- Panel Kasus ISPA --------------> */}
          <TabPanel>
            <div className="w-full !font-medium !text-lg pt-6">
              {/* <--------------- update data ---------------------> */}
              {/* <--------------- update data ---------------------> */}
              {/* <--------------- update data ---------------------> */}
              <form onSubmit={handleUpdate}>
                <TextInput
                  type="text"
                  value={caseRespiratory}
                  onChange={(e) => setCaseRespiratory(e.target.value)}
                  placeholder="Case Respiratory"
                  className="w-full  placeholder-gray-500 text-gray-900 mb-4 focus:outline-none"
                />
                <TextInput
                  type="text"
                  value={costverifRespiratory}
                  onChange={(e) => setCostverifRespiratory(e.target.value)}
                  placeholder="Cost verif Respiratory"
                  className="w-full placeholder-gray-500 text-gray-900 mb-4 focus:outline-none"
                />
                <Button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 focus:outline-none"
                >
                  Update
                </Button>
              </form>
              {/* <--------------- update data ---------------------> */}
              {/* <--------------- update data ---------------------> */}
              {/* <--------------- update data ---------------------> */}
              <Divider />{" "}
              {selectedCityData ? (
                <>
                  <FontAwesomeIcon
                    icon={faBriefcaseMedical}
                    className="text-oksigen-brand-red"
                  />{" "}
                  <span className="text-oksigen-brand-fadeGrey">
                    Kasus ISPA di {selectedCityData.cityName}
                  </span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faBriefcaseMedical}
                    className="text-oksigen-brand-red"
                  />{" "}
                  <span className="text-oksigen-brand-fadeGrey">
                    Kasus ISPA
                  </span>
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
                  <span className="text-oksigen-brand-fadeGrey">
                    Kasus ISPA di {selectedCityData.cityName} dalam Bulan
                    Desember
                  </span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faBriefcaseMedical}
                    className="text-oksigen-brand-red"
                  />{" "}
                  <span className="text-oksigen-brand-fadeGrey">
                    Kasus ISPA
                  </span>
                </>
              )}
              <VerticalSpacer size="0.75rem" />
              <Card className="w-full !rounded-3xl mb-4">
                <BarChart
                  className="h-72 mt-4"
                  data={chartDataRespiratory}
                  index="date"
                  categories={["Kasus ISPA"]}
                  colors={["red"]}
                  yAxisWidth={30}
                />
              </Card>
            </div>
          {/* <-------------- PANEL BIAYA BPJS ----------> */}
          {/* <-------------- PANEL BIAYA BPJS ----------> */}
          {/* <-------------- PANEL BIAYA BPJS ----------> */}
            <div className="w-full !font-medium !text-lg pt-6">
              {" "}
              {selectedCityData ? (
                <>
                  <FontAwesomeIcon
                    icon={faMoneyBill}
                    className="text-oksigen-brand-red"
                  />{" "}
                  <span className="text-oksigen-brand-fadeGrey">
                    Biaya Klaim ISPA BPJS di {selectedCityData.cityName}
                  </span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faMoneyBill}
                    className="text-oksigen-brand-red"
                  />{" "}
                  <span className="text-oksigen-brand-fadeGrey">
                    Biaya Klaim ISPA BPJS
                  </span>
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
                    <Text className="!text-oksigen-brand-blackX !text-4xl font-semibold">
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
                    icon={faBriefcaseMedical}
                    className="text-oksigen-brand-red"
                  />{" "}
                  <span className="text-oksigen-brand-fadeGrey">
                    Biaya Klaim ISPA BPJS di {selectedCityData.cityName} dalam
                    Bulan Desember
                  </span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faBriefcaseMedical}
                    className="text-oksigen-brand-red"
                  />{" "}
                  <span className="text-oksigen-brand-fadeGrey">
                    Biaya Klaim ISPA BPJS di Bulan Desember
                  </span>
                </>
              )}
              <VerticalSpacer size="0.75rem" />
              <Card className="w-full !rounded-3xl mb-4">
                <BarChart
                  className="h-72 mt-4"
                  data={chartDataCost}
                  index="date"
                  categories={["Biaya BPJS"]}
                  colors={["red"]}
                  yAxisWidth={30}
                />
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
