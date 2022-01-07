import "chart.js/auto";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

const sampleData = () => {
  const date = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const data = [];
  const end = today;
  let dt = new Date(new Date().setDate(end.getDate() - 7));
  while (dt <= end) {
    const iso = dt.toISOString().substring(0, 10);
    data.push({
      x: iso,
      y: Math.random() * 50, //
      d: iso,
    });
    dt = new Date(dt.setDate(dt.getDate() + 1));
  }
  console.log(data);
  return data;
};
const data = {
  datasets: [
    {
      label: "Happiness",
      data: sampleData(),
      fill: false,
      borderColor: "#eab308",
      tension: 0.1,
    },
    {
      label: "Sadness",
      data: sampleData(),
      fill: false,
      borderColor: "#3b82f6",
      tension: 0.1,
    },
    {
      label: "Anger",
      data: sampleData(),
      fill: false,
      borderColor: "#ef4444",
      tension: 0.1,
    },
    {
      label: "Love",
      data: sampleData(),
      fill: false,
      borderColor: "#ec4899",
      tension: 0.1,
    },
  ],
};
const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
    x: {
      type: "time",
    },
  },
};

const LineChart = () => {
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
