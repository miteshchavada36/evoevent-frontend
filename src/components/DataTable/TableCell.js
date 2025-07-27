import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";
import { Badge } from "react-bootstrap";

export const BadgeCell = ({ value }) => {
  return value.map((item, index) => (
    <span
      key={index}
      className="bg-light-rrb border rounded px-2 py-1 me-2 d-inline-block"
    >
      {item.city}
    </span>
  ));
};
export const StatusBadgeCell = ({ value }) => {
  let badgeClass = ""; // Define a default badge class
  if (!value) return;
  switch (value) {
    case "Upcoming":
    case "upcoming":
      badgeClass = "purple"; // Blue for upcoming
      break;
    case "In Progress":
    case "in progress":
      badgeClass = "warning"; // Yellow for in-progress
      break;
    case "Completed":
    case "completed":
      badgeClass = "success"; // Green for completed
      break;
    default:
      badgeClass = "secondary"; // Default case
  }
  return (
    <Badge bg={`${badgeClass}-lt`} className="border">
      {value.charAt(0).toUpperCase() + value.slice(1)} {/* Capitalize */}
    </Badge>
  );
};
export const GeneralStatusBadgeCell = ({ value }) => {
  let badgeClass = ""; // Define a default badge class
  if (!value) return;
  switch (value) {
    case "Active":
      badgeClass = "success"; // Blue for upcoming
      break;
    case "Inactive":
      badgeClass = "danger"; // Yellow for in-progress
      break;
    default:
      badgeClass = "secondary"; // Default case
  }
  return (
    <Badge bg={`${badgeClass}-lt`} className="border">
      {value.charAt(0).toUpperCase() + value.slice(1)} {/* Capitalize */}
    </Badge>
  );
};
export const CentersCell = ({ value }) => {
  return value.map((item, index) => (
    <span
      key={index}
      className="bg-light-rrb border rounded px-2 py-1 me-2 mb-2 d-inline-block"
    >
      {`${item.center_code} | ${item.center_name}`}
    </span>
  ));
};
export const UserNameCell = ({ row }) => {
  const { first_name, last_name } = row.original;
  // Extract the first letter of the first_name and convert it to uppercase
  const avatarLetter = first_name ? first_name.charAt(0).toUpperCase() : "";
  return (
    <div className="d-flex align-items-center">
      <span className="avatar avatar-xs rounded-circle text-uppercase text-white bg-primary me-2 fw-bold fs-4">
        {avatarLetter}
      </span>
      {`${first_name} ${last_name}`}
    </div>
  );
};
export const ChairmanNameCell = ({ row }) => {
  const { Users } = row.original;
  // Extract the first letter of the first_name and convert it to uppercase
  if (Users.length) {
    const avatarLetter = Users[0]?.first_name?.charAt(0).toUpperCase();
    return (
      <div className="d-flex align-items-center">
        <span className="avatar avatar-xs rounded-circle text-uppercase text-white bg-primary me-1 fw-bold fs-4">
          {avatarLetter}
        </span>
        {`${Users[0]?.first_name} ${Users[0]?.last_name}`}
      </div>
    );
  }
};
export const PasswordCell = ({ value }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const toggleVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  return (
    <div className="d-flex justify-content-between">
      {/* Masked or Plain Password */}
      <span style={{ marginRight: "8px" }}>
        {isPasswordVisible ? value : "●●●●●●"}
      </span>

      {/* Toggle Icon */}
      <span
        style={{
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
        }}
        onClick={toggleVisibility}
      >
        {isPasswordVisible ? (
          <IconEyeOff className="icon text-muted" />
        ) : (
          <IconEye className="icon text-muted" />
        )}
      </span>
    </div>
  );
};
export const SetupDone = ({ row }) => {
  const statusText = row.original?.is_setup_done ? "Done" : "Pending";
  const statusColor = row.original?.is_setup_done
    ? "text-green fw-medium"
    : "text-red fw-medium";

  return <div className={statusColor}>{statusText}</div>;
};
export const HandleValueWithFallback = ({ value }) => {
  if (!value) {
    return "-";
  }
  return value;
};
export const RrbCell = ({ row }) => {
  const { city, name } = row.original.Rrb;
  const avatarLetter = city ? city.charAt(0).toUpperCase() : "";
  return (
    <div className="d-flex align-items-center">
      <span className="avatar avatar-xs rounded-circle text-uppercase text-white bg-primary me-1 fw-bold fs-4">
        {avatarLetter}
      </span>
      {`${name} : ${city}`}
    </div>
  );
};

export const UserNameWithRoleCell = ({ row }) => {
  const { sentBy } = row.original;
  // Extract the first letter of the first_name and convert it to uppercase
  const avatarLetter = sentBy.first_name ? sentBy.first_name.charAt(0).toUpperCase() : "";
  return (
    <div className="d-flex align-items-center">
      <span style={{
        width: "26px",
        height: "26px"
      }} className="avatar avatar-xs rounded-circle text-uppercase text-white bg-primary me-2 fw-bold fs-4">
        {avatarLetter}
      </span>
      {`${sentBy.first_name} ${sentBy.last_name} (${sentBy.Role.name})`}
    </div>
  );
};
