// pms/_components/Dashboard.tsx
"use client";
import Header from "./_components/Header";
import Metric from "./_components/Metric";
import NewSection from "./_components/NewSection";
import LineChart from "./_components/LineChart";
import RadialBarChartComponent from "./_components/RadialBarChartComponent";
import PieChartComponent from "./_components/PieChartComponent";
import DateRangeSelector from "./_components/DateRangeSelector";
import PPMLineChart from "./_components/PPMLineChart";
import DowntimeChart from "./_components/DowntimeChart";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import Metrics from './_components/Metrics1';

interface DashboardData {
  dashBoardData: any[];
}

export const Dashboard = (props: DashboardData) => {
  const { dashBoardData } = props;

  // Example: Process data for pie chart
  // Adjust the logic to fit your actual data structure
  // const pieChartData = dashBoardData.reduce((acc: any[], row: any) => {
  //   const { digitaldata } = row;
  //   const existing = acc.find((item) => item.name === digitaldata);
  //   if (existing) {
  //     existing.value += 1;
  //   } else {
  //     acc.push({ name: digitaldata, value: 1 });
  //   }
  //   return acc;
  // }, []);

  // Example: Prepare data for line chart or other components
  // Adjust based on the structure of your dashBoardData

  return (
    <div className="">
      <div className="space-y-6 bg-[#F4F7FE] py-4 px-10">
        <Header />
        <NewSection />
        <Metrics />
        <DateRangeSelector />
        <div className="flex gap-8 flex-wrap">
          <div className="flex-1 basis-72">
            <LineChart data={dashBoardData} />
          </div>
          <div className="flex-1">
            <RadialBarChartComponent data={dashBoardData} />
          </div>
          <div className="flex-1">
            <PieChartComponent />
          </div>
        </div>
        <div className="flex gap-8 lg:flex-row sm:flex-col">
          <div className="flex-1 basis-96">
            <PPMLineChart data={dashBoardData} />
          </div>
          <div className="flex-1">
            <DowntimeChart data={dashBoardData} />
          </div>
        </div>
      </div>
    </div>
  );
};
