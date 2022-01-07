/* eslint-disable react/prop-types */
import styles from "./DashboardCard.module.css";

const DashboardCard = (props) => {
  return (
    <div className={styles.card} style={props.style}>
      {props.children}
    </div>
  );
};

export default DashboardCard;
