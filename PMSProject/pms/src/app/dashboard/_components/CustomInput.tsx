"use client";
import React, { useState } from 'react';
import { format } from 'date-fns';
import CalendarIcon from '../../../../public/calendar.svg'; // Ensure this path is correct

export default function CustomInput({ value, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const formattedDate = value ? format(new Date(value), 'd MMMM, yyyy') : '';

  return (
    <div className="relative w-full max-w-xs" onClick={onClick}>
      <input
        className="px-4 py-2 w-full text-xs text-[#6D6D6D] bg-[#F4F7FE] h-10 rounded-md"
        value={formattedDate}
        readOnly
      />
      <div
        className="absolute inset-y-0 right-0 flex items-center pr-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CalendarIcon
          className="w-5 h-5"
          style={{ filter: isHovered ? 'invert(25%) sepia(90%) saturate(6000%) hue-rotate(220deg) brightness(90%) contrast(90%)' : '' }}
        />
      </div>
    </div>
  );
}
