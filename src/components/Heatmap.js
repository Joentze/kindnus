import "chart.js/auto";
import { Chart as ChartJS } from "chart.js";
import "chartjs-adapter-date-fns";
import { Chart } from "react-chartjs-2";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import DashboardCard from "./DashboardCard";
ChartJS.register(MatrixController, MatrixElement);

/**
 * Generates an array of data objects for heatmap
 *
 * @returns {Array}
 * @example
 * >>> sampleData()
 * [
 *   {
 *      x: string,
 *      y: number,
 *      d: string,
 *      count: number,
 *      emotion: number,
 *   }
 * ]
 */
const sampleData = () => {
  const date = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const data = [];
  const end = today;
  let dt = new Date(new Date().setDate(end.getDate() - 365));
  while (dt <= end) {
    const iso = dt.toISOString().substring(0, 10);
    data.push({
      x: iso,
      y: ((dt) => `${((dt.getDay() + 6) % 7) + 1}`)(dt), //
      d: iso,
      count: Math.random() * 25,
      emotion: Math.floor(Math.random() * 4),
    });
    dt = new Date(dt.setDate(dt.getDate() + 1));
  }
  return data;
};
//
const data = {
  datasets: [
    {
      label: "Heatmap of Emotions",
      data: sampleData(),
      backgroundColor: (chart) => {
        const { count } = chart.dataset.data[chart.dataIndex];
        const alpha = (5 + count) / 35;
        return {
          0: `rgba(253, 224, 71, ${alpha})`,
          1: `rgba(125, 211, 252, ${alpha})`,
          2: `rgba(252, 165, 165, ${alpha})`,
          3: `rgba(249, 168, 212, ${alpha})`,
        }[chart.dataset.data[chart.dataIndex].emotion];
      },
      borderColor: (chart) => {
        return {
          0: `rgba(234, 179, 8)`,
          1: `rgba(14, 165, 233)`,
          2: `rgba(239, 68, 68)`,
          3: `rgba(236, 72, 153)`,
        }[chart.dataset.data[chart.dataIndex].emotion];
      },
      borderRadius: 1,
      borderWidth: 1,
      hoverBackgroundColor: "rgba(156, 163, 175, 0.2)",
      hoverBorderColor: "rgba(31, 44, 55, 0.1)",
      width: (chart) => {
        // 53 weeks of the year
        const area = chart.chart.chartArea || {};
        return (area.right - area.left) / 53 - 1;
      },
      height: (chart) => {
        // 7 days of the week
        const area = chart.chart.chartArea || {};
        return (area.bottom - area.top) / 7 - 1;
      },
    },
  ],
};

const scales = {
  y: {
    type: "time",
    display: false,
    offset: true,
    time: {
      unit: "day",
      round: "day",
      isoWeek: 1,
      parser: "i",
      displayFormats: {
        day: "iii",
      },
    },
    reverse: true,
    position: "right",
    ticks: {
      maxRotation: 0,
      autoSkip: true,
      font: {
        size: 9,
      },
    },
    grid: {
      display: false,
      drawBorder: false,
      tickLength: 0,
    },
  },
  x: {
    type: "time",
    position: "bottom",
    offset: true,
    time: {
      unit: "day",
      round: "week",
      isoWeekDay: 1,
      displayFormats: {
        week: "MMM dd",
      },
    },
    ticks: {
      maxRotation: 0,
      autoSkip: true,
      font: {
        size: 9,
      },
      grid: {
        display: false,
        drawBorder: false,
        tickLength: 0,
      },
    },
  },
};

const options = {
  scales,
  maintainAspectRatio: true,
  aspectRatio: 6,
  plugins: {
    legend: false,
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

const Heatmap = () => {
  return (
    <DashboardCard
      style={{
        margin: "0 auto",
        padding: "2em",
      }}
    >
      <Chart width="100%" type="matrix" data={data} options={options} />
    </DashboardCard>
  );
};

export default Heatmap;
