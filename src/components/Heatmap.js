/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "chart.js/auto";
import { Chart as ChartJS } from "chart.js";
import "chartjs-adapter-date-fns";
import { Chart } from "react-chartjs-2";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
//import DashboardCard from "./DashboardCard";
import { useEffect, useState } from "react";
import { Emotions } from "./misc/content";
import db from "../config";
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
  let dt = new Date(
    new Date(new Date().setDate(end.getDate() - 2)).setHours(end.getHours())
  );
  let dt_count = 1;
  while (dt <= end) {
    const iso = dt.toISOString().substring(0, 10);
    data.push({
      x: Math.ceil(dt_count / 3),
      y: ((dt) => (dt.getHours() % 3) + 1)(dt),
      d: iso,
      count: Math.random() * 25,
      emotion: Math.floor(Math.random() * 4),
    });
    dt = new Date(dt.setHours(dt.getHours() + 1));
    dt_count++;
  }
  return data;
};

const parseEmotions = (emotions) => {
  // for (const [emotion, num] of Object.entries(Emotions)) {
  //   let data = []
  // }
  const getKey = (obj, val) => Object.keys(obj).find((key) => obj[key] === val);
  const roundTime = (date) => {
    date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
    date.setMinutes(0, 0, 0);
    return date;
  };
  let datasets = [
    {
      label: "Heatmap of Emotions",
      data: [],
      backgroundColor: (chart) => {
        const { count } = chart.dataset.data[chart.dataIndex];
        const alpha = (5 + count) / 10;
        return {
          0: `rgba(253, 224, 71, ${alpha})`,
          1: `rgba(125, 211, 252, ${alpha})`,
          2: `rgba(252, 165, 165, ${alpha})`,
          3: `rgba(249, 168, 212, ${alpha})`,
          4: `rgba(170, 170, 170, ${alpha})`,
        }[chart.dataset.data[chart.dataIndex].emotion];
      },
      borderColor: (chart) => {
        return {
          0: `rgba(234, 179, 8)`,
          1: `rgba(14, 165, 233)`,
          2: `rgba(239, 68, 68)`,
          3: `rgba(236, 72, 153)`,
          4: `rgba(100, 100, 100)`,
        }[chart.dataset.data[chart.dataIndex].emotion];
      },
      borderRadius: 1,
      borderWidth: 0,
      hoverBackgroundColor: "rgba(156, 163, 175, 0.2)",
      hoverBorderColor: "rgba(31, 44, 55, 0.1)",
      width: (chart) => {
        const area = chart.chart.chartArea || {};
        return (area.right - area.left) / 16 - 4;
      },
      height: (chart) => {
        const area = chart.chart.chartArea || {};
        return (area.bottom - area.top) / 3 - 4;
      },
    },
  ];

  const end = new Date();

  const start = new Date();
  start.setHours(start.getHours() - 48);

  let totalCounts = {};

  for (let emotion of emotions) {
    const emotionName = getKey(Emotions, emotion.emotion);
    emotion.hour = Math.floor(
      (emotion.timestamp.toDate() - start) / (1000 * 60 * 60)
    );

    if (!totalCounts[emotionName]) {
      totalCounts[emotionName] = { counts: [] };
    }
    if (!totalCounts[emotionName].counts[emotion.hour]) {
      totalCounts[emotionName].counts[emotion.hour] = 1;
    } else {
      totalCounts[emotionName].counts[emotion.hour] += 1;
    }
  }

  let data = [];
  for (let i = 0; i < 48; i++) {
    let maxEmotion = null;
    let maxCount = 0;
    for (let [emotion, counts] of Object.entries(totalCounts)) {
      if (counts.counts[i] > maxCount) {
        maxCount = counts.counts[i];
        maxEmotion = emotion;
      }
    }
    const datetime = new Date();
    datetime.setHours(start.getHours() + i);
    data.push({
      x: Math.ceil((i + 1) / 3),
      y: ((datetime) => (datetime.getHours() % 3) + 1)(datetime),
      d: roundTime(datetime).toLocaleDateString("en-US", {
        weekday: "short",
        hour: "numeric",
        hour12: true,
      }),
      count: maxCount,
      emotion: Emotions[maxEmotion] >= 0 ? Emotions[maxEmotion] : 4,
    });
  }

  datasets[0].data = data;
  return datasets;
};
const randomData = {
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
      borderWidth: 0,
      hoverBackgroundColor: "rgba(156, 163, 175, 0.2)",
      hoverBorderColor: "rgba(31, 44, 55, 0.1)",
      width: (chart) => {
        const area = chart.chart.chartArea || {};
        return (area.right - area.left) / 16 - 4;
      },
      height: (chart) => {
        const area = chart.chart.chartArea || {};
        return (area.bottom - area.top) / 3 - 4;
      },
    },
  ],
};

const scales = {
  y: {
    type: "time",
    display: false,
    offset: true,
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
    type: "timeseries",
    display: false,
    // position: "bottom",
    // offset: true,
    // unit: "hour",
    // round: "hour",
    // displayFormats: {
    //   week: "MMM dd",
    // },
    ticks: {
      callback: (val) => {
        return val;
      },

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
  aspectRatio: 4.5,
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
            4: "",
          }[chart.dataset.data[chart.dataIndex].emotion]),
      },
    },
  },
};

const Heatmap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [emotionsData, setEmotionsData] = useState([]);

  const getEmotions = async () => {
    setIsLoading(true);
    const emotionsRef = db.collection("emotions");
    const queryRef = emotionsRef.orderBy("timestamp", "asc");
    const data = await queryRef.get();

    const emotions = [];
    data.docs.forEach((emotion) => {
      emotions.push(emotion.data());
    });
    const emotionsData = parseEmotions(emotions);
    setEmotionsData(emotionsData);
    setIsLoading(false);
  };

  useEffect(async () => {
    getEmotions();
  }, []);
  return (
    <>
      {isLoading ? null : (
        <Chart
          width="100%"
          type="matrix"
          data={{ datasets: emotionsData }}
          options={options}
        />
      )}
    </>
  );
};

export default Heatmap;
