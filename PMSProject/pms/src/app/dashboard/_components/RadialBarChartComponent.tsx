"use client";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomInput from './CustomInput';
import CalendarIcon from '../../../../public/calendar.svg'; // Ensure correct path
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, RadialBarChart, PolarAngleAxis, RadialBar } from 'recharts';
import '../../../styles/Dashboard.css';
import { format } from 'date-fns';
import { LuCalendarDays } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const RadialBarChartComponent = () => {
  const [date, setDate] = React.useState<Date>();
  const total = 600;
  const rejected = 126;

  const data = [
    { name: 'Rejected', value: rejected, fill: 'url(#gradientRejected)' },
  ];

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="p-4 bg-[#FFF] shadow-lg h-auto rounded-[20px]">
      <h3 className="mb-[10px] text-[#1A1A3D] text-lg font-bold">Rejected Products</h3>
      <div className="flex mt-[10px] gap-[10px]">
        <span className="flex items-center gap-[5px]">
          <div className="w-[8px] h-[8px] rounded-full bg-[#4318FF]"></div>
          <span className="text-[#6E6E9F] text-sm">Rejected</span>
        </span>
        <span className="flex items-center gap-[5px]">
          <div className="w-2 h-2 rounded-full bg-[#1A1A3D]"></div>
          <span style={{ color: '#6E6E9F', fontSize: '14px' }}>Total</span>
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <RadialBarChart
          width={331} // Adjust width if necessary
          height={272}
          cx={331 / 2} // Center the chart horizontally
          cy={272 / 2} // Center the chart vertically
          innerRadius={100}
          outerRadius={130}
          barSize={15}
          data={data}
          startAngle={210}
          endAngle={-30}
        >
          <defs>
            <linearGradient id="gradientRejected" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4318FF" stopOpacity={1} />
              {/* <stop offset="50%" stopColor="#4318FF" stopOpacity={1} /> */}
              <stop offset="100%" stopColor="#FFF" stopOpacity={1} />
            </linearGradient>
          </defs>
          <PolarAngleAxis
            type="number"
            domain={[0, total]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: '#1A1A3D' }}
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
        <div className="absolute top-[77%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col rounded-xl p-4 shadow-lg w-full items-center justify-between bg-[#FFF]">
          <h2 className="m-0 text-[#2B3674] flex justify-center text-center font-dm-sans text-lg font-bold leading-[30px] w-[41px] h-[16px]">{rejected}</h2>
          <p className="m-0 text-[#A3AED0] flex justify-center text-center font-dm-sans text-xs font-semibold leading-[30px] w-[41px] h-[16px]">Rejected</p>
        </div>
        <div className="absolute top-[calc(84%-5px)] left-[33px] transform -translate-y-full text-[#6E6E9F] text-sm"> 0</div>
        <div className="absolute top-[calc(84%-5px)] right-[26px] transform -translate-y-full text-[#6E6E9F] text-sm">{total}</div>
      </div>
      <div className="flex gap-6">
        <div>
          <p className="font-plus-jakarta-sans text-[10px] text-[#6E6E9F] font-medium leading-[20px] tracking-[-0.02em] text-left">From</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            className="min-w-0 text-sm"
            endDate={endDate}
            customInput={<CustomInput value={undefined} onClick={undefined} />}
          />
        </div>
        <div>
          <p className="font-plus-jakarta-sans text-[10px] text-[#6E6E9F] font-medium leading-[20px] tracking-[-0.02em] text-left">To</p>
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
        </div>
      </div>
    </div>
  );
};

export default RadialBarChartComponent;
