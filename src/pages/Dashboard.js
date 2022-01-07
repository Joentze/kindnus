import { useState } from "react";
import { Button } from "@mui/material";
import Heatmap from "../components/Heatmap";
import MainBackground from "../components/MainBackground";
import RandomMessage from "../components/RandomMessage";
import LineChart from "../components/LineChart";

import styles from "./Dashboard.module.css";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
  const [messageKey, setMessageKey] = useState(false);

  return (
    <main>
      <MainBackground />
      <div className={styles.container}>
        <h1>Dashboard</h1>
        <h2>Singapore is feeling...</h2>

        <div className={styles.content}>
          <div className={styles.charts}>
            <LineChart selected={[0, 1, 2, 3]} />
            <Heatmap />
          </div>
          <DashboardCard>
            <Button
              variant="contained"
              size="large"
              className={"centerContent"}
              style={{
                background: "#5959FF",
                fontStyle: "Bold",
              }}
              onClick={() => setMessageKey(Math.random())}
            >
              Load a message
            </Button>
            {messageKey && <RandomMessage emotion={0} key={messageKey} />}
          </DashboardCard>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
