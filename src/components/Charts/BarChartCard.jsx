import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";

const BarChartCard = ({ title, data={}, height = "240" }) => {
  const [chartKey, setChartKey] = useState(0); // Unique key for reinitializing the chart
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  // Prepare sanitized data
  useEffect(() => {
    if (
      !data ||
      !data.categories ||
      !data.centers ||
      !data.savedReports ||
      !data.completedReports
    ) {
      return; // Avoid updates with invalid data
    }

    // Update chart options and series
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
      colors: [`#A5A5A5`, `var(--tblr-warning)`, `var(--tblr-success)`],
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
        show: false,
      },
    });

    setChartSeries([
      {
        name: "Expected Reports",
        data: data.centers || [],
      },
      {
        name: "Saved Reports",
        data: data.savedReports || [],
      },
      {
        name: "Submitted Reports",
        data: data.completedReports || [],
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

export default BarChartCard;
