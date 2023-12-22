"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import L from "leaflet";
import {
  Text,
} from "@tremor/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import BeracunIcon from "../app/assets/Berbahaya.svg";
import NoDataIcon from "../app/assets/Empty.svg";
import BerbahayaIcon from "../app/assets/Berbahaya.svg";
import TidakSehatIcon from "../app/assets/TidakSehat.svg";
import TidakSehatSensitifIcon from "../app/assets/TidakSehatBagiKelompokSensitif.svg";
import SangatTidakSehatIcon from "../app/assets/SangatTidakSehat.svg";
import SedangIcon from "../app/assets/Sedang.svg";
import BaikIcon from "../app/assets/Baik.svg";
import "leaflet/dist/leaflet.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  apiDataAtom,
  selectedDateAtom,
  selectedCityDataAtom,
  selectedDateChangeAtom,
  selectedCityDataForDecemberAtom,
} from "../app/jotai-functions/dynamicatoms";
import { useJWT } from "../app/utils/useAuth";

const MapComponent = () => {
  useJWT();
  const [apiDataResponse] = useAtom(apiDataAtom);
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const [, setSelectedCityData] = useAtom(selectedCityDataAtom);
  const [, setSelectedCityDataForDecember] = useAtom(
    selectedCityDataForDecemberAtom
  );
  const [selectedDateChange, setSelectedDateChange] = useAtom(
    selectedDateChangeAtom
  );

  if (apiDataResponse instanceof Promise) {
    return <div>Loading...</div>; // Loading state
  }

  if (apiDataResponse instanceof Error) {
    return <div>Error: {apiDataResponse.message}</div>; // Error state
  }

  const apiData = apiDataResponse; // The actual data

  // Define the coordinates for each city
  const cities = {
    1: { name: "DKI Jakarta", coordinates: [-6.2088, 106.8456] },
    2: { name: "Kota Bandung", coordinates: [-6.9175, 107.6191] },
    3: { name: "Kota Medan", coordinates: [3.5952, 98.6722] },
    4: { name: "Kota Surabaya", coordinates: [-7.2800904, 112.7946058] },
    5: { name: "DIY Yogyakarta", coordinates: [-7.71556, 110.35556] },
  };

  const filteredData = apiData
    ? apiData.filter((item) => {
        const itemDate = new Date(item.time);
        return (
          itemDate.getUTCFullYear() === selectedDate.getUTCFullYear() &&
          itemDate.getUTCMonth() === selectedDate.getUTCMonth() &&
          itemDate.getUTCDate() === selectedDate.getUTCDate()
        );
      })
    : [];

    const getIcon = (polution) => {
      if (polution < 1) {
        return NoDataIcon.src;
      } else if (polution <= 50) {
        return BaikIcon.src; // Icon for AQI 0-50
      } else if (polution <= 100) {
        return SedangIcon.src; // Icon for AQI 51-100
      } else if (polution <= 150) {
        return TidakSehatSensitifIcon.src; // Icon for AQI 101-150
      } else if (polution <= 200) {
        return TidakSehatIcon.src; // Icon for AQI 151-200
      } else if (polution <= 300) {
        return SangatTidakSehatIcon.src; // Icon for AQI 201-300
      } else {
        return BerbahayaIcon.src; // Icon for AQI >300
      }
    };

  return (
    <div className="">
      <MapContainer
        style={{
          height: "91vh",
          width: "100%",
        }}
        center={cities[1].coordinates} // Initial center position
        zoom={8}
        scrollWheelZoom={true}
      >
        <div className=" mx-auto absolute top-4 left-20 z-[1000]">
          <div className=" mx-auto space-y-6">
            <DatePicker
              selected={selectedDateChange}
              onChange={(date) => {
                setSelectedDateChange(date);
                setSelectedDate(date); // Update the selectedDate atom when the date is changed
                setSelectedCityData(null); // Reset the selected city data when the date is changed
              }}
              className="py-2 px-4 font-medium w-[10rem] text-center rounded-full bg-oksigen-brand-blue text-white shadow-md border-[1px] text-lg border-oksigen-brand-bluePremium"
            disabled
            />
          </div>
        </div>
        <TileLayer
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          minZoom={6}
          maxZoom={8}
        />
        {Object.entries(cities).map(([cityId, city]) => {
          const cityData = filteredData.filter(
            (item) => Number(item.cityId) === Number(cityId)
          );
          const polution = cityData.length > 0 ? cityData[0].polution : 0;
          const icon = getIcon(polution);
          return (
            <Marker
              key={cityId}
              icon={
                new L.Icon({
                  iconUrl: icon,
                  iconRetinaUrl: icon,
                  iconSize: [100, 100],
                  iconAnchor: [50, 50],
                  popupAnchor: [0, 0],
                })
              }
              position={city.coordinates}
              eventHandlers={{
                click: async () => {
                  if (cityData.length > 0) {
                    const cityDataWithCityName = cityData.map((item) => ({
                      ...item,
                      cityName: city.name,
                    }));
                    setSelectedCityData(cityDataWithCityName[0]); // Update the selected city data when the marker is clicked
                
                    // Get the token from local storage
                    const token = localStorage.getItem('token');
                
                    // Fetch data for the selected city for the whole month of December
                    const response = await axios.get(
                      `${process.env.NEXT_PUBLIC_OKSIGEN_API_BASE_URL}/polution/${cityDataWithCityName[0].cityId}`,
                      {
                        headers: {
                          'Authorization': `Bearer ${token}`,
                        },
                      }
                    );
                    setSelectedCityDataForDecember(response.data.data); // Update the selected city data for December when the marker is clicked
                  }
                },
              }}
            >
              <Popup className="rounded-full">
                {cityData.length === 0 ? (
                  <Text>{city.name}: Tidak ada data untuk hari ini</Text>
                ) : (
                  cityData.map((item) => (
                    <div key={item.id}>
                      <Text>
                        {city.name}
                      </Text>
                    </div>
                  ))
                )}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
