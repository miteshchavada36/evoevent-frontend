import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";

const TypeWiseCenterPer = ({ title, data = {}, height = "240" }) => {
  const [chartKey, setChartKey] = useState(0); // Unique key for reinitializing the chart
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  // Prepare sanitized data
  useEffect(() => {
    if (
      !data ||
      !data.types ||
      !data.positivePercentages ||
      !data.negativePercentages
    ) {
      return;
    }

    setChartOptions({
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
      colors: [`var(--tblr-success)`, `red`, `#c7b2b2`],
      xaxis: {
        categories: data.types || [],
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        show: false,
      },
    });

    setChartSeries([
      {
        name: "Positive Percentage ",
        data: data.positivePercentages || [],
      },
      {
        name: "Negative Percentage",
        data: data.negativePercentages || [],
      },
    ]);

    // Update key to force chart reinitialization
    setChartKey((prevKey) => prevKey + 1);
  }, [data]);

  return (
    <Chart
      key={chartKey} // Force reinitialization on data change
      options={chartOptions}
      series={chartSeries}
      type="bar"
      height={height}
    />
  );
};

export default TypeWiseCenterPer;
