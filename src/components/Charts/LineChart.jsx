import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/slices/authUser/authUserSlice";

export const LineChart = ({ title, data, height = "240" }) => {
  const [chartState, setChartState] = useState({
    series: [],
    options: {},
  });
  const [chartKey, setChartKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    if (
      !data ||
      !Array.isArray(data.centers) ||
      !Array.isArray(data.positive) ||
      !Array.isArray(data.negative) ||
      !Array.isArray(data.neutral)
    ) {
      console.error("Invalid or missing data:", data);
      setIsLoading(false);
      return;
    }

    setIsLoading(true); // Start loading

    setTimeout(() => {
      let fullCategoryMap = {};
      let categoryValues = [];

      const truncatedCategories = data.centers.map((cat, index) => {
        if (!cat) return false;
        const shortLabel = cat.length > 10 ? cat.substring(0, 10) + "..." : cat;
        fullCategoryMap[index] = cat;

        // Combine labels with values for better readability
        const combinedValue = `${shortLabel} (${data.positive[index] || 0}, ${
          data.negative[index] || 0
        }, ${data.neutral[index] || 0})`;
        categoryValues.push(combinedValue);
        return shortLabel;
      });

      setChartState({
        series: [
          { name: "Positive", data: data.positive || [] },
          { name: "Negative", data: data.negative || [] },
          { name: "Neutral", data: data.neutral || [] },
        ],
        options: {
          chart: {
            animations: {
              enabled: false,
            },
            height: 350,
            type: "line",
            zoom: { enabled: false },
          },
          dataLabels: { enabled: false },
          stroke: { width: [2, 2, 2], curve: "straight" },
          legend: {
            tooltipHoverFormatter: (val, opts) =>
              `${val} - <strong>${
                opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] ||
                "N/A"
              }</strong>`,
          },
          markers: { size: 0, hover: { size: 5 } },
          xaxis: {
            marker: { show: false },
            categories: truncatedCategories,
          },
          tooltip: {
            x: {
              formatter: function (_, { dataPointIndex }) {
                return fullCategoryMap[dataPointIndex] || "Unknown";
              },
            },
          },
          grid: { borderColor: "#f1f1f1" },
          colors: ["#2C9A32", "#ED1D24", "#A5A5A5"],
        },
      });

      setChartKey((prevKey) => prevKey + 1);
      setIsLoading(false); // Stop loading after data processing
      dispatch(setLoading(false));
    }, 1000); // Simulated delay for better performance
  }, [data]);

  return (
    <div style={{ width: "100%", overflowX: "auto", textAlign: "center" }}>
      {isLoading ? (
        <div style={{ padding: "20px", fontSize: "16px", fontWeight: "bold" }}>
          Loading Chart...
        </div>
      ) : (
        <div
          style={{
            minWidth: `${chartState.series[0].data.length * 85}px`,
            overflow: "hidden",
          }}
        >
          {chartState.series.length > 0 && (
            <Chart
              key={chartKey}
              options={chartState.options}
              series={chartState.series}
              type="line"
              height={height}
            />
          )}
        </div>
      )}
    </div>
  );
};
