"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import MarkerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png";
import BeracunIcon from "../app/assets/Berbahaya.svg";
import BerbahayaIcon from "../app/assets/Tidak Sehat.svg";
import MarkerShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import "leaflet.tilelayer.colorfilter";
import { Select, SelectItem } from "@tremor/react";
import {
  jakartaCasesOn30thDecAtom,
  jakartaCasesOn31stDecAtom,
  jakartaCostOn30thDecAtom,
  jakartaCostOn31stDecAtom,
  selectedAQIAtom,
  selectedCasesAtom,
  selectedCostAtom,
  selectedCityAtom,
  jakartaAQIOn30thDecAtom,
  jakartaAQIOn31stDecAtom,
  baliAQIOn30thDecAtom,
  baliAQIOn31stDecAtom,
  baliCasesOn30thDecAtom,
  baliCasesOn31stDecAtom,
  baliCostOn30thDecAtom,
  baliCostOn31stDecAtom,
  selectedDateAtom,
} from "../app/jotai-functions/atoms";

const MapComponent = () => {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const [, setSelectedAQI] = useAtom(selectedAQIAtom);
  const [, setSelectedCases] = useAtom(selectedCasesAtom);
  const [, setSelectedCost] = useAtom(selectedCostAtom);
  const [, setSelectedCity] = useAtom(selectedCityAtom);
  const [jakartaAQIOn30thDec] = useAtom(jakartaAQIOn30thDecAtom);
  const [jakartaAQIOn31stDec] = useAtom(jakartaAQIOn31stDecAtom);
  const [baliAQIOn30thDec] = useAtom(baliAQIOn30thDecAtom);
  const [baliAQIOn31stDec] = useAtom(baliAQIOn31stDecAtom);
  const [jakartaCasesOn30thDec] = useAtom(jakartaCasesOn30thDecAtom);
  const [jakartaCasesOn31stDec] = useAtom(jakartaCasesOn31stDecAtom);
  const [jakartaCostOn30thDec] = useAtom(jakartaCostOn30thDecAtom);
  const [jakartaCostOn31stDec] = useAtom(jakartaCostOn31stDecAtom);
  const [baliCasesOn30thDec] = useAtom(baliCasesOn30thDecAtom);
  const [baliCasesOn31stDec] = useAtom(baliCasesOn31stDecAtom);
  const [baliCostOn30thDec] = useAtom(baliCostOn30thDecAtom);
  const [baliCostOn31stDec] = useAtom(baliCostOn31stDecAtom);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const iconWidth = screenWidth / 10;
  const iconHeight = screenHeight / 30;

  return (
    <div className="">
      <MapContainer
        style={{
          height: "91vh",
          width: "100%",
        }}
        center={[-6.2088, 106.8456]} // Coordinates for Jakarta
        zoom={13}
        scrollWheelZoom={true}
      >
        <div className=" mx-auto absolute top-4 left-20 z-[1000]">
          <div className=" mx-auto space-y-6">
            <Select
              defaultValue="1"
              onValueChange={(value) => {
                setSelectedAQI(null);
                setSelectedCases(null);
                setSelectedCost(null);
                setSelectedCity(null);
                if (value === "1") {
                  setSelectedDate("30th December");
                } else if (value === "2") {
                  setSelectedDate("31st December");
                }
              }}
              className="w-[12rem] no-clear-selection"
            >
              <SelectItem value="1">30 December 2023</SelectItem>
              <SelectItem value="2">31 December 2023</SelectItem>
            </Select>
          </div>
        </div>

        <TileLayer
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          minZoom={0}
          maxZoom={20}
        />
        {selectedDate === "30th December" && (
          <>
            <Marker
              icon={
                new L.Icon({
                  iconUrl:
                    jakartaAQIOn30thDec > 200
                      ? BeracunIcon.src
                      : BerbahayaIcon.src,
                  iconRetinaUrl:
                    jakartaAQIOn30thDec > 200
                      ? BeracunIcon.src
                      : BerbahayaIcon.src,
                  iconSize: [iconWidth, iconHeight],
                  iconAnchor: [iconWidth / 2, iconHeight],
                  popupAnchor: [0, -iconHeight],
                  // shadowUrl: MarkerShadow.src,
                  // shadowSize: [iconWidth, iconHeight],
                })
              }
              position={[-6.2088, 106.8456]}
              eventHandlers={{
                click: () => {
                  setSelectedAQI(jakartaAQIOn30thDec);
                  setSelectedCases(jakartaCasesOn30thDec);
                  setSelectedCost(jakartaCostOn30thDec);
                  setSelectedCity("Jakarta");
                },
              }} // Coordinates for Jakarta
            >
              <Popup>{`Jakarta - 30th December: ${jakartaAQIOn30thDec}`}</Popup>
            </Marker>
            <Marker
              icon={
                new L.Icon({
                  iconUrl:
                    baliAQIOn30thDec > 200
                      ? BeracunIcon.src
                      : BerbahayaIcon.src,
                  iconRetinaUrl:
                    baliAQIOn30thDec > 200
                      ? BeracunIcon.src
                      : BerbahayaIcon.src,
                  iconSize: [iconWidth, iconHeight],
                  iconAnchor: [iconWidth / 2, iconHeight],
                  popupAnchor: [0, -iconHeight],
                  // shadowUrl: MarkerShadow.src,
                  // shadowSize: [iconWidth, iconHeight],
                })
              }
              position={[-8.6705, 115.2126]} // Coordinates for Bali - mending dari response
              eventHandlers={{
                click: () => {
                  setSelectedAQI(baliAQIOn30thDec);
                  setSelectedCases(baliCasesOn30thDec);
                  setSelectedCost(baliCostOn30thDec);
                  setSelectedCity("Bali");
                },
              }}
            >
              <Popup>{`Bali - 30th December: ${baliAQIOn30thDec}`}</Popup>
            </Marker>
          </>
        )}
        {selectedDate === "31st December" && (
          <>
            <Marker
              icon={
                new L.Icon({
                  iconUrl:
                    jakartaAQIOn31stDec > 200
                      ? BeracunIcon.src
                      : BerbahayaIcon.src,
                  iconRetinaUrl:
                    jakartaAQIOn31stDec > 200
                      ? BeracunIcon.src
                      : BerbahayaIcon.src,
                  iconSize: [iconWidth, iconHeight],
                  iconAnchor: [iconWidth / 2, iconHeight],
                  popupAnchor: [0, -iconHeight],
                })
              }
              position={[-6.2088, 106.8456]}
              eventHandlers={{
                click: () => {
                  setSelectedAQI(jakartaAQIOn31stDec);
                  setSelectedCases(jakartaCasesOn31stDec);
                  setSelectedCost(jakartaCostOn31stDec);
                  setSelectedCity("Jakarta");
                },
              }} // Coordinates for Jakarta
            >
              <Popup>{`Jakarta - 31st December: ${jakartaAQIOn31stDec}`}</Popup>
            </Marker>
            <Marker
              icon={
                new L.Icon({
                  iconUrl:
                    baliAQIOn31stDec > 200
                      ? BeracunIcon.src
                      : BerbahayaIcon.src,
                  iconRetinaUrl:
                    baliAQIOn31stDec > 200
                      ? BeracunIcon.src
                      : BerbahayaIcon.src,
                  iconSize: [iconWidth, iconHeight],
                  iconAnchor: [iconWidth / 2, iconHeight],
                  popupAnchor: [0, -iconHeight],
                })
              }
              position={[-8.6705, 115.2126]} // Coordinates for Bali
              eventHandlers={{
                click: () => {
                  setSelectedAQI(baliAQIOn31stDec);
                  setSelectedCases(baliCasesOn31stDec);
                  setSelectedCost(baliCostOn31stDec);
                  setSelectedCity("Bali");
                },
              }}
            >
              <Popup>{`Bali - 31st December: ${baliAQIOn31stDec}`}</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
