// pms/pages/dashboard.page.tsx
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
import { Dashboard } from "./stats";
import axios from 'axios';

const DashboardPage = async () => {
  let data: any = [];

  try {
    const response = await axios.get('http://localhost:3001/api/data');
    data = response.data;
    const count = response.data.length;
    // console.log(count,"====count");
    console.log(data,"qqqqqqqqqqqqqqqqqqqqqq");
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return <Dashboard dashBoardData={data} />;
};

export default DashboardPage;
