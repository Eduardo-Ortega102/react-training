import "./Chart.css";
import ChartBar from "./ChartBar";

const Chart = (props) => {
  const totalMax = Math.max(...props.dataPoints.map((data) => data.value));

  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          maxValue={totalMax}
          key={dataPoint.label}
          value={dataPoint.value}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
