import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import CustomInput from './CustomInput';

const LineChart = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [totalProduced, setTotalProduced] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedMachine = localStorage.getItem('selectedMachine');
        if (selectedMachine) {
          const response = await axios.get('http://localhost:3001/api/data', {
            params: { machine: selectedMachine },
          });
          
          const { data: fetchedData } = response.data;
          
          if (fetchedData && fetchedData.length > 0) {
            console.log('Fetched Data:', fetchedData);

            // Calculate total produced products
            const totalProduced = fetchedData.length;
            setTotalProduced(totalProduced);

            // Prepare data for the chart
            const chartData = fetchedData.map((item) => ({
              date: item.timestamp.split('T')[1], // Assuming your data has a timestamp field
              value: item.digital,
            }));

            console.log('Chart Data:', chartData);
            setData(chartData);
          } else {
            console.warn('No data available for the selected machine.');
          }
        } else {
          console.warn('No machine selected.');
        }
      } catch (error) {
        console.error('Error fetching data for LineChart:', error);
      }
    };

    fetchData();
  }, []);
  console.log(data, "wweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

  return (
    <div className="rounded-[20px] shadow-lg flex flex-col bg-white">
      <div className="p-5 h-[423px]">
        <header>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p>Total Product Produced</p>
              <p className="text-3xl font-extrabold">
                {totalProduced}{' '}
                <span className="text-sm text-gray-400 font-normal">
                  {startDate.toLocaleDateString()}
                </span>
              </p>
            </div>
            <div>
              <div className="flex gap-6">
                <div>
                  <p>From</p>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    customInput={<CustomInput value={undefined} onClick={undefined} />}
                  />
                </div>
                <div>
                  <p>To</p>
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
        </header>
        <section>
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="gradientColorr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2CD9FF" stopOpacity={1} />
                    <stop offset="100%" stopColor="#2CD9FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#2CD9FF"
                  fill="url(#gradientColorr)"
                  strokeWidth={3}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p>No data available for the selected machine.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default LineChart;
