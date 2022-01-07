/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "chart.js/auto";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import DashboardCard from "./DashboardCard";
import { Divider } from "@mui/material";
import db from "../config";
import { useEffect, useState } from "react";
import { Emotions, emotionsNumMap, emotionsRootWord } from "./misc/content";
import Heatmap from "./Heatmap";

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

const parseEmotions = (emotions, selected) => {
  // for (const [emotion, num] of Object.entries(Emotions)) {
  //   let data = []
  // }
  const getKey = (obj, val) => Object.keys(obj).find((key) => obj[key] === val);

  const roundTime = (date) => {
    date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
    date.setMinutes(0, 0, 0);
    return date;
  };
  let possibleDatasets = [
    {
      label: "Happiness",
      data: [],
      fill: false,
      borderColor: "#eab308",
      tension: 0.1,
    },
    {
      label: "Sadness",
      data: [],
      fill: false,
      borderColor: "#3b82f6",
      tension: 0.1,
    },
    {
      label: "Anger",
      data: [],
      fill: false,
      borderColor: "#ef4444",
      tension: 0.1,
    },
    {
      label: "Love",
      data: [],
      fill: false,
      borderColor: "#ec4899",
      tension: 0.1,
    },
  ];

  let datasets = [];
  for (let i = 0; i < 4; i++) {
    if (selected.includes(i)) {
      datasets.push(possibleDatasets[i]);
    }
  }

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
  for (let dataset of datasets) {
    let counts = totalCounts[dataset.label]?.counts;
    let data = [];
    if (counts) {
      for (let [hour, count] of counts.entries()) {
        const datetime = new Date();
        datetime.setHours(start.getHours() + hour);
        data.push({
          x: datetime,
          y: count ? count : 0,
          d: roundTime(datetime).toLocaleDateString("en-US", {
            weekday: "short",
            hour: "numeric",
            hour12: true,
          }),
        });
      }
    }
    dataset.data = data;
  }
  return datasets;
};

const randomData = (mood) => {
  const allEmoData = [
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
  ];
  return {
    datasets: [allEmoData[emotionsNumMap[mood]]],
  };
};

const scales = {
  y: {
    beginAtZero: true,
    grid: {
      display: false,
    },
    ticks: {
      callback: (value) => `${value}`,
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

const LineChart = ({ selected, mood }) => {
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
    const emotionsData = parseEmotions(emotions, selected);
    setEmotionsData(emotionsData);
    setIsLoading(false);
  };

  useEffect(async () => {
    getEmotions();
  }, []);

  return (
    <div className={"centerContent moodDescriptionContainer"}>
      {isLoading ? (
        <>
          <p>Loading Chart...</p>
        </>
      ) : (
        <>
          <h1>{emotionsRootWord[mood]} Today</h1>
          <p>Number of {mood}-feeling people today!</p>
          <br></br>
          <Line data={{ datasets: emotionsData }} options={options} />
          <br></br>
          <Divider />
          <h1>Emotions Today</h1>
          <p>Top emotions per hour 🏆</p>
          <Heatmap />
        </>
      )}
    </div>
  );
};

export default LineChart;
