import React, { Fragment, useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { RIconEmpty } from "../Icons";

const AttendanceBarChart = ({ data, height = "240" }) => {
  const chartSeries = useMemo(() => data?.series, [data?.series]);
  const [chartKey, setChartKey] = useState(0); // Unique key for reinitializing the chart
  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          distributed: false,
          borderRadius: 5,
          borderRadiusApplication: "end",
        },
      },
      colors: [
        `#A5A5A5`,
        `var(--tblr-success)`,
        `var(--tblr-warning)`,
        `var(--tblr-primary)`,
      ], // Set colors for the chart
      stroke: {
        show: true,
        width: 2,
        colors: ['#fff']
      },
      xaxis: {
        categories: data.categories || [],
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        show: false, // Disable the legend
      },
    }),
    [data]
  );
  useEffect(()=>{
    setChartKey((prevKey) => prevKey + 1);
  },[data])
  const hasData =
    data?.categories.length > 0 && data?.series.some((s) => s.data.length > 0);
  return (
    <Fragment>
      {hasData ? (
        <Chart
          key={chartKey} // Force reinitialization on data change
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={height}
        />
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <p>No data available to display the chart.</p>
        </div>
      )}
    </Fragment>
  );
};

export default AttendanceBarChart;
