// src/components/Charts.js

"use client";

import React from 'react';
import { Grid } from 'lucide-react';
import LineChart from './LineChart';
import RadialBarChartComponent from './RadialBarChartComponent';

const Charts = () => {
  const lineChartData: never[] = [
    // Line chart data...
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <LineChart  />
      </div>
      <div>
        <RadialBarChartComponent />
      </div>
    </div>
  );
};

export default Charts;
