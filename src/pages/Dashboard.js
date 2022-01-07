import { useState } from "react";
import { Button } from "@mui/material";
import Heatmap from "../components/Heatmap";
import MainBackground from "../components/MainBackground";
import RandomMessage from "../components/RandomMessage";
import LineChart from "../components/LineChart";

const Dashboard = () => {
  const [messageKey, setMessageKey] = useState(false);

  return (
    <main>
      <MainBackground />
      <Heatmap />
      {messageKey && <RandomMessage emotion={0} key={messageKey} />}
      <LineChart />
      <div className={"centerContent"}>
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
      </div>
    </main>
  );
};

export default Dashboard;
