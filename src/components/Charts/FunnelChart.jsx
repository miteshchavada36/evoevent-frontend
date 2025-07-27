import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const FunnelChart = ({ data, height = '240' }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  const [chartKey, setChartKey] = useState(0); // Unique key for reinitializing the chart

  // Update chart options and series when data changes
  useEffect(() => {
    if (!data || !data.categories || !data.series) {
      return; // Avoid updates with invalid data
    }

    // Update chart options
    setChartOptions({
      chart: {
        type: 'bar',
        toolbar: { show: false },
        dropShadow: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: true,
          distributed: true,
          barHeight: '90%',
          columnWidth: '100%',
          isFunnel: true,
          isFunnel3d: false,
          borderRadius: 5,
        },
      },
      colors: data?.colors,
      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex];
        },
        dropShadow: {
          enabled: false,
        },
      },
      xaxis: {
        categories: data?.categories || [],
      },
      legend: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    });

    // Update chart series
    setChartSeries(data.series || []);

    // Force chart reinitialization
    setChartKey((prevKey) => prevKey + 1);
  }, [data]);

  // Fallback for invalid data
  if (!data || !data.categories || !data.series) {
    return <div>No data available</div>;
  }

  return (
    <Chart
      key={chartKey} // Force reinitialization on data change
      options={chartOptions}
      series={chartSeries}
      type='bar'
      height={height}
    />
  );
};

export default FunnelChart;
