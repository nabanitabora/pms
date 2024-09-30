"use client";
import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line
} from 'recharts';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../../../../public/calendar.svg'; // Import your SVG icon
import '../../../styles/Dashboard.css';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomInput from './CustomInput';

const data = [
  { date: '01', value: 2000 },
  { date: '03', value: 3000 },
  { date: '05', value: 2500 },
  { date: '07', value: 4000 },
  { date: '09', value: 3500 },
  { date: '11', value: 3000 },
  { date: '13', value: 4500 },
  { date: '15', value: 5000 },
  { date: '17', value: 5500 },
  { date: '19', value: 6000 },
  { date: '21', value: 7000 },
  { date: '23', value: 6500 },
  { date: '25', value: 7500 },
  { date: '27', value: 8000 },
  { date: '29', value: 8978 },
  { date: '31', value: 8500 },
];

const PPMLineChart = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="chart-container-custom shadow-lg">
      <div className=" flex justify-between">
        <div className='flex flex-col'>
        <div className=" text-[#6D6D6D] font-dm-sans text-sm font-medium text-left"> PPM </div>
        <div className=" text-[#2B3674] font-dm-sans text-[34px] font-bold "> 8978 
             <span className=" text-[#A3AED0] font-dm-sans text-[12px] font-normal ">22 June, 2024</span>
        </div>
        </div>
        <div className="flex gap-6 ">
        <div>
          <p className="font-plus-jakarta-sans text-[10px] text-[#6E6E9F] font-medium leading-[20px] tracking-[-0.02em] text-left">From</p>
          <DatePicker
            selected={startDate}
            onChange={(date:any) => setStartDate(date)}
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
              onChange={(date:any) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              customInput={<CustomInput value={undefined} onClick={undefined} />}
            />
          </div>
        </div>
      </div>
      </div>
      <div style={{marginTop: "-19px"}}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
                <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F1EDFF" stopOpacity={1} />
                  <stop offset="100%" stopColor="#F3F0FF" stopOpacity={0} />
                </linearGradient>
              </defs>
          <XAxis
            dataKey="date"
            axisLine={{ stroke: '#E0E0E0' }}
            tickLine={false}
            tick={{ fill: '#92959E', fontSize: 10 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#92959E', fontSize: 10 }}
            domain={[0, 'dataMax + 1000']}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#4318FF"
            strokeWidth={2}
            fill="url(#gradientColor)"
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4318FF"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 8, fill: "white", stroke: "#4318FF", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PPMLineChart;
