import React from "react";
import { Col } from "react-bootstrap";
import DatamapsIndia from "react-datamaps-india";

const stateNameMapping = {
  "Jammu and Kashmir": "Jammu & Kashmir",
  "Andaman and Nicobar Island": "Andaman & Nicobar Island",
};

const IndiaMap = ({ data = {} }) => {
  const regionData =
    data.states && data.values && data.states.length === data.values.length
      ? data.states.reduce((acc, state, index) => {
          const formattedState = stateNameMapping[state] || state; // Fix mismatched names
          acc[formattedState] = { value: parseFloat(data.values[index]) || 0 };
          return acc;
        }, {})
      : {};

  return (
    <Col>
      <DatamapsIndia
        regionData={regionData}
        hoverComponent={({ value }) => (
          <div
            style={{
              position: "absolute",
              background: "rgba(0, 0, 0, 0.75)",
              color: "white",
              padding: "8px",
              width: "8rem",
              top:"1rem",
              textAlign: "center",
              borderRadius: "5px",
              pointerEvents: "none",
              transform: "translate(10px, -100%)",
              zIndex: 1000,
            }}
          >
            <div className="fs-16">{value.name}</div>
            <div className="fs-14">{value.value ?value.value : "No Data Found!" }</div>
          </div>
        )}
        mapLayout={{
          colors: ["#008000", "#FFFF00", "#0000FF"],
          hoverTitle: false, 
          noDataColor: "#f8f8fb",
          borderColor: "black",
          hoverColor: "#2F2F8F",
          height: 70,
          weight: 30,
          startColor: "rgba(237, 29, 36, 1)",
          endColor: "rgba(237, 29, 36, 0.2)",
          legend:false
        }}
      />
    </Col>
  );
};

export default IndiaMap;
