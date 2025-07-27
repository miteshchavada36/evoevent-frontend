import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import useIsMobile from "../../hooks/useIsMobile";

const ReportingStackBar = ({
  title,
  data,
  height = "240",
  legend = false,
  scroll = false,
}) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  const [chartKey, setChartKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!data) return;

    setLoading(true); // Start loading

    let categories = [];
    let series = [];
    let fullCategoryMap = {};

    if (data.categories && data.centers && data.saved && data.submitted) {
      categories = data.categories;
      series = [
        { name: "Pending", data: data.centers || [], color: "#A5A5A5" },
        {
          name: "Started",
          data: data.saved || [],
          color: "var(--tblr-warning)",
        },
        {
          name: "Submitted",
          data: data.submitted || [],
          color: "var(--tblr-success)",
        },
      ];
    } else if (
      data.category &&
      data.exp &&
      data.met &&
      data.imp &&
      data.failed
    ) {
      const category = [
        "Venue Entry",
        "Lab Access",
        "Amenities",
        "Exam Desk",
        "Invigilators",
        "Staff Behavior",
        "Screen Navigation",
      ];
      categories = [...category];
      series = [
        {
          name: "Exceeded Expectations",
          data: data.exp || [],
          color: "#2C9A32",
        },
        { name: "Met Expectations", data: data.met || [], color: "#FF7F3F" },
        { name: "Improvement Needed", data: data.imp || [], color: "#F39C12" },
        {
          name: "Failed to Meet Expectations",
          data: data.failed || [],
          color: "#ED1D24",
        },
      ];
    } else if (
      data.centers &&
      data.rating_exp &&
      data.rating_met &&
      data.rating_imp &&
      data.rating_failed
    ) {
      categories = [...data.centers];
      series = [
        {
          name: "Exceeded Expectations",
          data: data.rating_exp || [],
          color: "#2C9A32",
        },
        {
          name: "Met Expectations",
          data: data.rating_met || [],
          color: "#FF7F3F",
        },
        {
          name: "Improvement Needed",
          data: data.rating_imp || [],
          color: "#F39C12",
        },
        {
          name: "Failed to Meet Expectations",
          data: data.rating_failed || [],
          color: "#ED1D24",
        },
      ];
    } else if (
      data.types &&
      data.rating_exp &&
      data.rating_met &&
      data.rating_imp &&
      data.rating_failed
    ) {
      categories = [...data.types];
      series = [
        {
          name: "Exceeded Expectations",
          data: data.rating_exp || [],
          color: "#2C9A32",
        },
        {
          name: "Met Expectations",
          data: data.rating_met || [],
          color: "#FF7F3F",
        },
        {
          name: "Improvement Needed",
          data: data.rating_imp || [],
          color: "#F39C12",
        },
        {
          name: "Failed to Meet Expectations",
          data: data.rating_failed || [],
          color: "#ED1D24",
        },
      ];
    } else if (data.types && data.values) {
      categories = [...data.types];
      series = [{ name: "Rating", data: data.values || [], color: "#2C9A32" }];
    } else {
      console.error("Invalid data format:", data);
      setLoading(false);
      return;
    }

    categories.forEach((cat) => {
      if (cat) {
        fullCategoryMap[cat.substring(0, 10) + (cat.length > 10 ? "..." : "")] =
          cat;
      }
    });

    setChartOptions({
      chart: {
        animations: {
          enabled: false,
        },
        type: "bar",
        stacked: true,
        toolbar: { show: false },
        zoom: {
          enabled: false,
          type: "xy",
        },
        height: isMobile ? 400 : "auto", // Increase height for mobile
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: isMobile ? "25px" : "30%",
          borderRadius: 5,
          borderRadiusApplication: "end",
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        x: {
          formatter: function (val) {
            return fullCategoryMap[val] || val; // Show full category name in tooltip
          },
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        labels: {
          style: {
            fontSize: isMobile ? "10px" : "14px", // Adjust font size
          },
        },
        categories: categories.map((cat) =>
          cat ? (cat.length > 10 ? cat.substring(0, 10) + "..." : cat) : "Null"
        ),
      },
      legend: { show: true },
    });

    setChartSeries(series);
    setChartKey((prevKey) => prevKey + 1);

    setTimeout(() => setLoading(false), 500); // Simulate loading delay
  }, [data]);

  if (loading) {
    return (
      <div style={{ padding: "20px", fontSize: "16px", fontWeight: "bold" }}>
        Loading Chart...
      </div>
    );
  }

  if (!data || !chartSeries.length) {
    return <div>No data available</div>;
  }

  return (
    <>
      {scroll ? (
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              minWidth: `${Math.max(chartSeries[0]?.data.length * 120, 800)}px`,
              position: "relative",
            }}
          >
            <Chart
              key={chartKey}
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={height}
            />
          </div>
        </div>
      ) : (
        <div className="w-100">
          <Chart
            key={chartKey}
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={height}
          />
        </div>
      )}
    </>
  );
};

export default ReportingStackBar;
