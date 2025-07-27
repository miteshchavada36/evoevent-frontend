import { Badge } from "react-bootstrap";

export const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#2F2F8F";
  return color;
};

const getInitials = (name) => {
  let initials;
  const nameSplit = name.split(" ");
  const nameLength = nameSplit.length;
  if (nameLength > 1) {
    initials =
      nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1);
  } else if (nameLength === 1) {
    initials = nameSplit[0].substring(0, 1);
  } else return;

  return initials.toUpperCase();
};

export const createImageFromInitials = (size, name, color) => {
  if (name == null) return;
  name = getInitials(name);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = canvas.height = size;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, size, size);

  context.fillStyle = `${color}`;
  context.fillRect(0, 0, size, size);

  context.fillStyle = "white";
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.font = `${size / 2}px Kanit, sans-serif`;
  context.fillText(name, size / 2, size / 2);

  return canvas.toDataURL();
};

export const calculateDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return null; // If either time is null, duration cannot be calculated.
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationMinutes = Math.round((end - start) / (1000 * 60)); // Difference in minutes
  return {
    value: durationMinutes,
    label: durationMinutes.toString(),
  };
};

export const getStatusCell = (status) => {
  const value = status.toLowerCase();
  if (value.length === 0) return <></>;
  let badgeClass = "secondary"; // Define a default badge class

  switch (value) {
    case "upcoming":
      badgeClass = "purple"; // Blue for upcoming
      break;
    case "in progress":
      badgeClass = "warning"; // Yellow for in-progress
      break;
    case "completed":
      badgeClass = "success"; // Green for completed
      break;
    default:
      break; // Default case
  }
  return(
    <Badge bg={`${badgeClass}`}>
      {value.charAt(0).toUpperCase() + value.slice(1)} {/* Capitalize */}
    </Badge>
  )
  return (
    <span
      className={`badge ${badgeClass} px-2 py-1`}
      style={{ borderRadius: "0.5rem" }} // Optional rounded styling
    >
      {value.charAt(0).toUpperCase() + value.slice(1)} {/* Capitalize */}
    </span>
  );
};

export const isPastDate = (date) => {
  const targetDate = new Date(date); // Convert input to Date object
  const today = new Date(); // Get current date

  // Normalize both dates to midnight
  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (targetDate < today) {
    return true;
  } else if (targetDate.getTime() === today.getTime()) {
    return false;
  } else {
    return false;
  }
};

export const isPastDateOrToday = (date) => {
  const targetDate = new Date(date); // Convert input to Date object
  const today = new Date(); // Get current date

  // Normalize both dates to midnight
  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (targetDate < today) {
    return true;
  } else if (targetDate.getTime() === today.getTime()) {
    return true;
  } else {
    return false;
  }
};

export const isSameDay = (d1, d2) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();
