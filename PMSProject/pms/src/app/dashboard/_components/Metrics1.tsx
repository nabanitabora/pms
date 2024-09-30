import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface MetricData {
  label: string;
  value?: number | string; // Made value optional
  color: string;
  text: string;
}

const Metrics = () => {
  const [metrics, setMetrics] = useState<MetricData[]>([
    { label: 'Product Produced', color: 'green', text: 'Today' },
    { label: 'Reject Products', color: 'red', text: 'Today' },
    { label: 'PPM', color: 'blue', text: 'Today' },
    { label: 'Efficiency %', color: 'purple', text: 'Live' },
    { label: 'Down Time', color: 'orange', text: 'Today' },
  ]);

  useEffect(() => {
    const fetchMetricsData = async () => {
      try {
        // Retrieve the selected machine from local storage
        const selectedMachine = localStorage.getItem('selectedMachine');
        if (selectedMachine) {
          const response = await axios.get('http://localhost:3001/api/data', {
            params: { machine: selectedMachine },
          });
  
          const data = response.data;
  
          // Calculate ProdTot
          const ProdTot = data.data.length;
          const RejProd = data.rejcted.length;
          const PPM = Math.round((RejProd / ProdTot) * 1000000); // Round to a whole number
          const Total = ProdTot + RejProd;
          const Efficiency = ((ProdTot / Total) * 100).toFixed(2); 
          console.log(ProdTot, "metricsssss fetched data");
          console.log(PPM, "PPM fetched data");
  
          // Update metrics with fetched data
          setMetrics(prevMetrics => [
            { ...prevMetrics[0], value: ProdTot }, // Update Product Produced
            { ...prevMetrics[1], value: RejProd },   // Update Reject Products
            { ...prevMetrics[2], value: PPM },               // Update PPM
            { ...prevMetrics[3], value: Efficiency },        // Update Efficiency
            { ...prevMetrics[4], value: data.downTime },          // Update Down Time
          ]);
        }
      } catch (error) {
        console.error('Error fetching metrics data:', error);
      }
    };
  
    fetchMetricsData();
  }, []);
  

  return (
    <div className="flex gap-10 justify-between lg:flex-row md:flex-col flex-col">
      {metrics.map((metric, index) => (
        <div key={index} className="flex-1">
          <div className="p-4 flex items-center gap-4 h-full text-wrap rounded-[20px] bg-white">
            {/* Render the icon based on index */}
            {index === 0 && <Image src="./Icon.svg" alt="Icon" style={{ color: metric.color }} width={56} height={56} />}
            {index === 1 && <Image src="./Icon1.svg" alt="Icon" style={{ marginRight: '8px', color: metric.color }} width={56} height={56} />}
            {index === 2 && <Image src="./Icon2.svg" alt="Icon" style={{ marginRight: '8px', color: metric.color }} width={56} height={56} />}
            {index === 3 && <Image src="./Icon3.svg" alt="Icon" style={{ marginRight: '8px', color: metric.color }} width={56} height={56} />}
            {index === 4 && <Image src="./Icon4.svg" alt="Icon" style={{ marginRight: '8px', color: metric.color }} width={56} height={56} />}

            <div>
              <p className="text-[12px] font-sans text-[#2B3674] font-bold">
                {metric.label}
              </p>
              <h4 className="text-[24px] text-wrap font-sans text-[#2B3674] leading-8 font-semibold">
                {metric.value}
              </h4>
              <p className="text-[12px] text-[#A3AED0] font-sans font-normal">
                {metric.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Metrics;
