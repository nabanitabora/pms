// _components/DateRangeSelector.js
"use client";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomInput from './CustomInput'; // Adjust the import path accordingly
import DropIcon from '../../../../public/frame.svg'; // Ensure this path is correct

export default function DateRangeSelector() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="flex items-center justify-center rounded-[20px] shadow-lg ">
      <div className="relative flex items-center space-x-4 p-4 bg-white rounded-xl flex-wrap shadow w-full min-w-0">
        <div className="flex items-center space-x-2 mr-auto">
          <span className="text-[#A3AED0] text-[14px]"> </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[#A3AED0] text-[10px]">From</span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            className="min-w-0"
            endDate={endDate}
            customInput={<CustomInput value={undefined} onClick={undefined} />}
          />
        </div>
        <div className="flex items-center space-x-2">
        <span className="text-[#A3AED0] text-[10px]">to</span>
        <div className="flex items-center space-x-2">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            customInput={<CustomInput value={undefined} onClick={undefined} />}
          />
          </div>
          <div className="relative">
            <DropIcon className="cursor-pointer text-gray-600" style={{ width: '37px', height: '37px' }} onClick={toggleDropdown} />
            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">PDF</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Excel</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">CSV</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
