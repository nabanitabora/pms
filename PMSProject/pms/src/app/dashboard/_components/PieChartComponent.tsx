"use client";
import React, { useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomInput from './CustomInput';

const COLORS = ['#4318FF', '#E0E0E0'];

export default function PieChartComponent({pieChartData} :any) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const data = [
    { name: 'Efficiency', value: 72 },
    { name: 'Remaining', value: 28 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg h-[422px] flex flex-col p-4">
      <div className="flex justify-between items-center mb-5">
        <span className="mb-[10px] text-[#1A1A3D] text-lg font-bold">Efficiency</span>
        <span className="text-[#1A1A3D] text-2xl font-bold font-dm-sans">72%</span>
      </div>
      <div className="flex justify-center items-center flex-1">
        <PieChart width={260} height={260}>
          <Pie
            data={data}
            cx={130}
            cy={130}
            startAngle={90}
            endAngle={-270}
            innerRadius={0}
            outerRadius={110}
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
            ))}
          </Pie>
        </PieChart>
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
}
