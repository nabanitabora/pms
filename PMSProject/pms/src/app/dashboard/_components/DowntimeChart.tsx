"use client";
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import CalendarIcon from '../../../../public/calendar.svg'; // Make sure to provide the correct path to your calendar icon
import '../../../styles/Dashboard.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomInput from './CustomInput';

const DowntimeChart = () => {
  const data = [
    { name: 'Downtime', value: 2 },
    { name: 'Uptime', value: 22 },
  ];

  const COLORS = ['#FF4B6E', '#E6E6E6'];

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="downtime-container p-5 bg-white rounded-[20px] shadow-lg h-[410px]">
      <div className="mb-5">
        <h3 className="m-0 text-[#2B3674] text-base font-bold leading-7 tracking-[-0.32px] font-dm-sans">Downtime</h3>
        <div className="flex items-center justify-center mt-[-20px] gap-2.5 ml-[220px]">
          <span className="flex items-center gap-1.25">
            <div className="w-2 h-2 rounded-full bg-[#D0D2DA]"></div>
            <span style={{ color: '#6E6E9F', fontSize: '14px' }}>Total Hours</span>
          </span>
          <span className="flex items-center gap-1.25">
            <div className="w-2 h-2 rounded-full bg-[#FD2254]"></div>
            <span className="text-[#6E6E9F] text-sm">Downtime</span>
          </span>
        </div>
        <h2 className="text-[#2B3674] my-1 text-[34px] font-bold leading-[42px] tracking-[-0.68px] font-dm-sans">02 Hours</h2>
      </div>
      <div className="w-full h-[200px] relative">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] text-center">
          <div className="text-2xl font-bold text-[#333]">02 Hr</div>
        </div>
      </div>
      <div className="flex gap-6 pt-5 justify-center">
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

export default DowntimeChart;
