"use client";
import React, { useState } from 'react';

export default function NewSection() {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="bg-white rounded-lg shadow-md p-4 h-[58px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#A3AED0]">On-Time Data</span>
            <span className="flex items-center text-[#2B3674] font-bold text-sm ml-[22px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none" className="mr-2">
                <path d="M17.4167 9.49992C17.4167 13.8699 13.87 17.4166 9.50004 17.4166C5.13004 17.4166 1.58337 13.8699 1.58337 9.49992C1.58337 5.12992 5.13004 1.58325 9.50004 1.58325C13.87 1.58325 17.4167 5.12992 17.4167 9.49992Z" stroke="#2B3674" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.437 12.0174L9.98286 10.5528C9.55536 10.2995 9.20703 9.6899 9.20703 9.19115V5.94531" stroke="#2B3674" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              3 Hrs
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 w-[221px] h-[58px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#A3AED0]">Off-Time Data</span>
            <span className="flex items-center text-[#2B3674] font-bold text-sm ml-[20px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none" className="mr-2">
                <path d="M17.4167 9.49992C17.4167 13.8699 13.87 17.4166 9.50004 17.4166C5.13004 17.4166 1.58337 13.8699 1.58337 9.49992C1.58337 5.12992 5.13004 1.58325 9.50004 1.58325C13.87 1.58325 17.4167 5.12992 17.4167 9.49992Z" stroke="#2B3674" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.437 12.0174L9.98286 10.5528C9.55536 10.2995 9.20703 9.6899 9.20703 9.19115V5.94531" stroke="#2B3674" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              1 Hr
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center ">
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center w-[162px] h-[42px]">
          <div className="flex items-center">
            <span className={`text-sm font-medium ${isActive ? 'text-gray-400' : 'text-green-500'}`}>Active</span>
            <label className="relative inline-block w-10 h-5 mx-2">
              <input type="checkbox" className="opacity-0 w-0 h-0 peer" checked={isActive} onChange={handleToggle} />
              <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-green-400 rounded-full transition duration-400 peer-checked:bg-red-500"></span>
              <span className="absolute h-4 w-4 left-0.5 bottom-0.5 bg-white rounded-full transition duration-400 peer-checked:translate-x-5"></span>
            </label>
            <span className={`text-sm font-medium ${isActive ? 'text-red-500' : 'text-gray-400'}`}>Inactive</span>
          </div>
        </div>
      </div>
    </div>
  );
}
