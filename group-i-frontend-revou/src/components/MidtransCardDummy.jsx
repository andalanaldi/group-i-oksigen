import React from "react";
import { Button } from "@tremor/react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  AccordionList,
} from "@tremor/react";

export default function MidtransCardDummy() {
  return (
    <div className="bg-white p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Total</h2>
          <p className="text-3xl font-bold">Rp248.000</p>
          <p className="text-sm text-gray-500">
            Order ID #sample-store-1703158080
          </p>
        </div>
        <div className="relative">
          <Button className="bg-yellow-300 text-yellow-800 px-4 py-1 rounded-md">
            Choose within 0:04:42
          </Button>
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full p-1 text-xs">
            TEST
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">All payment methods</h3>
        <div className="space-y-4">
          <Accordion className="flex flex-col justify-between items-center p-4 bg-gray-100 rounded-md">
            <AccordionHeader className="flex items-center">
              <CreativeCommonsIcon className="h-6 w-6 mr-2" />
              <span className="font-semibold">QRIS</span>
            </AccordionHeader>
            <AccordionBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              tempor lorem non est congue blandit. Praesent non lorem sodales,
              suscipit est sed, hendrerit dolor.
            </AccordionBody>
          </Accordion>
        </div>
        <div className="space-y-4 pt-4">
          <Accordion className="flex flex-col justify-between items-center p-4 bg-gray-100 rounded-md">
            <AccordionHeader className="flex items-center">
              <CreditCardIcon className="h-6 w-6 mr-2" />
              <span className="font-semibold">Transfer Bank</span>
            </AccordionHeader>
            <AccordionBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              tempor lorem non est congue blandit. Praesent non lorem sodales,
              suscipit est sed, hendrerit dolor.
            </AccordionBody>
          </Accordion>
        </div>
        <div className="space-y-4 pt-4">
          <Accordion className="flex flex-col justify-between items-center p-4 bg-gray-100 rounded-md">
            <AccordionHeader className="flex items-center">
              <DollarSignIcon className="h-6 w-6 mr-2" />
              <span className="font-semibold">OVO</span>
            </AccordionHeader>
            <AccordionBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              tempor lorem non est congue blandit. Praesent non lorem sodales,
              suscipit est sed, hendrerit dolor.
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

function CreativeCommonsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1" />
      <path d="M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1" />
    </svg>
  );
}

function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function FlagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
