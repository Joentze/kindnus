import "chart.js/auto";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
//import DashboardCard from "./DashboardCard";

/**
 * Generates an array of data objects for line chart
 *
 * @param {number} emotion
 * @returns {Array}
 * @example
 * >>> sampleData()
 * [
 *   {
 *      x: string,
 *      y: number,
 *      d: string,
 *      emotion: number,
 *   }
 * ]
 */
const sampleData = (emotion) => {
  const date = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const data = [];
  const end = today;
  let dt = new Date(new Date().setDate(end.getDate() - 7));

  while (dt <= end) {
    const iso = dt.toISOString().substring(0, 10);
    data.push({
      x: iso,
      y: Math.round(Math.random() * 50), //
      d: iso,
      emotion,
    });
    dt = new Date(dt.setDate(dt.getDate() + 1));
  }
  return data;
};

const data = {
  datasets: [
    {
      label: "Happiness",
      data: sampleData(0),
      fill: false,
      borderColor: "#eab308",
      tension: 0.1,
    },
    {
      label: "Sadness",
      data: sampleData(1),
      fill: false,
      borderColor: "#3b82f6",
      tension: 0.1,
    },
    {
      label: "Anger",
      data: sampleData(2),
      fill: false,
      borderColor: "#ef4444",
      tension: 0.1,
    },
    {
      label: "Love",
      data: sampleData(3),
      fill: false,
      borderColor: "#ec4899",
      tension: 0.1,
    },
  ],
};

const scales = {
  y: {
    beginAtZero: true,
    grid: {
      display: false,
    },
    ticks: {
      callback: (value) => `${value}%`,
    },
  },
  x: {
    type: "time",
    grid: {
      display: false,
    },
    ticks: {
      maxRotation: 0,
      autoSkip: true,
      font: {
        size: 15,
      },
    },
  },
};

const options = {
  scales,
  plugins: {
    tooltip: {
      callbacks: {
        title: ([chart]) => chart.dataset.data[chart.dataIndex].d,
        label: (chart) =>
          ({
            0: "Happy",
            1: "Sad",
            2: "Angry",
            3: "Love",
          }[chart.dataset.data[chart.dataIndex].emotion]),
      },
    },
  },
};

const LineChart = () => {
  return (
    <div className={"centerContent moodDescriptionContainer"}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
