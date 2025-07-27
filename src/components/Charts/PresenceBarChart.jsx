import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";

const PresenceBarChart = ({ title, data, height = "240" }) => {
  const [chartKey, setChartKey] = useState(0); // Unique key for reinitializing the chart
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  // Prepare sanitized data
  useEffect(() => {
    if (!data || !data.categories || !data.present || !data.absent) {
      return; // Avoid updates with invalid data
    }

    // Update chart options
    setChartOptions({
      chart: {
        type: "bar",
        stacked: true,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
          borderRadius: 5,
          borderRadiusApplication: "end",
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
            },
          },
        },
      },
      xaxis: {
        categories: data.categories || [],
      },
      legend: {
        show: false,
      },
    });

    // Update chart series
    setChartSeries([
      {
        name: "Present",
        data: data.present || [],
        color: "var(--tblr-success)",
      },
      {
        name: "Absent",
        data: data.absent || [],
        color: "var(--tblr-danger)",
      },
    ]);

    // Update key to force chart reinitialization
    setChartKey((prevKey) => prevKey + 1);
  }, [data]);

  return (
    <Card>
      <Card.Header className="bg-light-rrb">
        <h3 className="fs-16 mb-0 fw-medium">{title}</h3>
      </Card.Header>
      <Card.Body>
        <Chart
          key={chartKey} // Force reinitialization on data change
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={height}
        />
      </Card.Body>
    </Card>
  );
};

export default PresenceBarChart;
