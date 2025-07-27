import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const RadialBarCircleChart = ({ data = {}, height = "240" }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  const [chartKey, setChartKey] = useState(0); // Unique key for reinitializing the chart

  useEffect(() => {
    if (!data?.series || data.series.length === 0) {
      return; // Avoid updates with invalid data
    }

    const capitalizedLabels =
      data?.labels?.map(
        (label) => label.replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter of each word
      ) || [];

    // Calculate chart series percentages
    const maxValue = data?.series?.[0] || 1; // Prevent division by zero
    const seriesData = data.series.map((value) =>
      ((value / maxValue) * 100).toFixed(1)
    );

    // Update chart series
    setChartSeries(seriesData);

    // Update chart options
    setChartOptions({
      chart: {
        animations: {
          enabled: false,
        },
        type: "radialBar",
        toolbar: { show: false },
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: true,
              formatter: (val) => `${Math.round(val)}%`,
            },
          },
          barLabels: {
            enabled: true,
            useSeriesColors: true,
            offsetX: -8,
            fontSize: "12px",
            formatter: function (seriesName, opts) {
              const value = data?.series?.[opts.seriesIndex] || 0;
              return `${seriesName}: ${value}`;
            },
          },
        },
      },
      colors: data?.colors,
      labels: capitalizedLabels,
    });

    // Force chart reinitialization
    setChartKey((prevKey) => prevKey + 1);
  }, [data]);

  // Fallback for invalid data
  if (!data?.series || data.series.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <Chart
      key={chartKey} // Force reinitialization on data change
      options={chartOptions}
      series={chartSeries}
      type="radialBar"
      height={height}
    />
  );
};

export default RadialBarCircleChart;
