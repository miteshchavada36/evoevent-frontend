import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Col, Row } from "react-bootstrap";

const RadialBarChart = ({ title, data = {}, height = "240", count = {} }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  const [chartKey, setChartKey] = useState(0); // Unique key for reinitialization
  // Update chart options and series when props change
  useEffect(() => {
    if (data === "") return; // Avoid updates with empty data

    // Update chart options
    setChartOptions({
      chart: {
        animations: {
          enabled: false,
        },
        type: "radialBar",
        offsetY: -10,
        toolbar: { show: false },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              fontWeight: "400",
              color: "var(--tblr-dark)",
              offsetY: 120,
            },
            value: {
              offsetY: 76,
              fontSize: "22px",
              fontWeight: "600",
              color: "var(--tblr-success)",
              formatter: function (val) {
                return val + "%";
              },
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          gradientToColors: ["var(--tblr-success)"],
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
        colors: ["var(--tblr-success)"],
      },
      stroke: {
        dashArray: 4,
      },
      labels: [title],
    });

    // Update chart series
    setChartSeries([data]);

    // Force chart reinitialization
    setChartKey((prevKey) => prevKey + 1);
  }, [title, data]);

  // Fallback for invalid data
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div>
        <Chart
          key={chartKey} // Force reinitialization on data change
          options={chartOptions}
          series={chartSeries}
          type="radialBar"
          height={height}
        />
        {isSuperAdminFeedback && (
          <Row className="gap-3">
            <Col
              col="6"
              className="p-3 rounded justify-content-center align-items-center d-flex flex-column"
              style={{
                background: "rgba(243, 156, 18, 0.05)",
                height: "60px",
                marginLeft: "8px",
                border: "1px solid #E0E0E0",
              }}
            >
              <div className="fw-bold fs-14">{count?.appearedCandidates} </div>
              <div
                style={{
                  color: "rgba(108, 108, 108, 1)",
                  fontSize: "12px",
                  lineHeight: "14px",
                }}
                className="text-center"
              >
                Appeared Candidates
              </div>{" "}
            </Col>
            <Col
              col="6 bg-primary"
              className="p-3 rounded  justify-content-center align-items-center d-flex flex-column"
              style={{
                background: "rgba(44, 154, 50, 0.05)",
                height: "60px",
                marginRight: "8px",
                border: "1px solid #E0E0E0",
              }}
            >
              <div className="fw-bold fs-14">{count?.feedbackRecCount} </div>
              <div
                className="text-center fs-12"
                style={{
                  color: "rgba(108, 108, 108, 1)",
                  fontSize: "12px",
                  lineHeight: "14px",
                }}
              >
                Feedbacks Received
              </div>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default RadialBarChart;
