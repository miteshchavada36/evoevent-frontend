import React, { useEffect, useMemo, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import {
  RIconCamera,
  RIconDocument,
  RIconPC,
  RIconPolice,
  RIconUser,
  RIconWarning,
  RIconWatch,
} from "../Icons";
import { RIconRRB } from "../Icons/RIconRRB";
import CustomModal from "../CustomModal/CustomModal";
import moment from "moment";
import DataTable from "../DataTable";
import { iconArray } from "../../pages/ExamReport/iconArray";
import { useSelector } from "react-redux";
const incidentCategories = [
  {
    Time: <RIconWatch className="icon icon-md" />,
    Center: <RIconPC className="icon icon-md" />,
    CCTV: <RIconCamera className="icon icon-md" />,
    RRB: <RIconRRB className="icon icon-md" />,
    ECA: <RIconUser className="icon icon-md" />,
    Documents: <RIconDocument className="icon icon-md" />,
    Police: <RIconPolice className="icon icon-md" />,
    Malpractice: <RIconWarning className="icon icon-md" />,
  },
];

const DEFAULT_INCIDENT_DETAILS_MODAL = {
  show: false,
  title: "Incident Details",
  category: "",
};

const IncidentCard = ({ title, data, lg = false, selectedExamDay = "" }) => {
  const [selectedDay, setSelectedDay] = useState("all");
  const [incidentModal, setIncidentModal] = useState(
    DEFAULT_INCIDENT_DETAILS_MODAL
  );

  useEffect(() => {
    if (
      selectedExamDay &&
      selectedExamDay !== undefined &&
      selectedExamDay !== null
    ) {
      setSelectedDay(selectedExamDay);
    }
  }, [selectedExamDay]);

  const sortedData = useMemo(() => {
    if (data) return [...data].sort((a, b) => a.exam_day_id - b.exam_day_id);
    return [];
  }, [data]);
  // Calculate total incidents based on selected day
  const totalIncidents = sortedData.reduce((total, dayData) => {
    if (
      selectedDay === "all" ||
      dayData.exam_day_id === parseInt(selectedDay)
    ) {
      return (
        total +
        Object.values(dayData.incidentCountsByType).reduce(
          (sum, count) => sum + count,
          0
        )
      );
    }
    return total;
  }, 0);
  // Calculate category-wise incidents
  const categoryCounts = Object.keys(incidentCategories[0]).reduce(
    (result, category) => {
      result[category] = sortedData.reduce((total, dayData) => {
        if (
          selectedDay === "all" ||
          dayData.exam_day_id === parseInt(selectedDay)
        ) {
          return total + (dayData.incidentCountsByType[category] || 0);
        }
        return total;
      }, 0);
      return result;
    },
    {}
  );

  const [incidentDetails, setIncidentDetails] = useState([]);

  const getIconById = (id) => {
    const iconObj = iconArray.find((item) => item.id === id);
    return iconObj ? iconObj.icon : null;
  };
  const handleIncidentClick = (category) => {
    const details = sortedData.flatMap((dayData) => {
      return dayData.incidentDetails.filter(
        (incident) =>
          incident.incident_name.toLowerCase() === category.toLowerCase() && // Match category directly
          (selectedDay === "all" ||
            incident.examdays_id === parseInt(selectedDay))
      );
    });

    setIncidentModal((prev) => ({ ...prev, show: true }));
    setIncidentDetails(details);
  };
  const authSelector = useSelector((state) => state.app.authUserReducer);
  const loggedInUserRole = authSelector.role.slug;

  const columns = useMemo(() => [
    ...(loggedInUserRole === "super-admin"
      ? [
          {
            Header: "RRB",
            accessor: "rrb_name",
            disableSortBy: true,
            Cell: ({ row }) => {
              return `${row.original.rrb_name} (${row.original.rrb_city})`;
            },
          },
        ]
      : []),

    {
      Header: "Exam",
      accessor: "exam",
      disableSortBy: true,
    },
    {
      Header: "Date/Time",
      accessor: "incident_timestamp",
      Cell: ({ value }) => {
        return moment(value).format("DD/MM/YYYY HH:mm");
      },
      disableSortBy: true,
    },
    {
      Header: "Center",
      accessor: "center_name",
      disableSortBy: true,
      Cell: ({ row }) => {
        return `${row.original.center_code} | ${row.original.center_name}`;
      },
    },
    {
      Header: "Question",
      accessor: "question",
      disableSortBy: true,
      Cell: ({ row }) => {
        const matchedIcon =
          iconArray.find(
            (iconObj) => iconObj.id === row.original.question_id
          ) || null;
        return (
          <span className="flex items-center gap-2">
            {" "}
            {matchedIcon
              ? matchedIcon.icon
              : row.original.header.id
              ? getIconById(row.original.header.id)
              : getIconById(row.original.question_id)}
            &nbsp;
            {matchedIcon ? (
              row.original.question
            ) : (
              <>
                {row.original.header.subcat} <br /> <br />-{" "}
                {row.original.question}
              </>
            )}
          </span>
        );
      },
    },
    {
      Header: "Incident",
      accessor: "value",
      disableSortBy: true,
      Cell: ({ value }) => {
        return <span className="text-danger ">{value}</span>;
      },
    },
  ]);

  return (
    <Card className="">
      <Card.Header className="bg-light-rrb">
        <h3 className="fs-16 mb-0 fw-medium">
          {title} ({totalIncidents})
        </h3>
        <select
          className="ms-auto select-header"
          value={selectedDay} // Ensures the selected value reflects state
          onChange={(e) => {
            setSelectedDay(e.target.value);
          }}
        >
          {!selectedExamDay && <option value="all">All Day</option>}{" "}
          {/* Only show if no selectedExamDay */}
          {sortedData?.map((item) => (
            <option key={item.exam_day_id} value={item.exam_day_id}>
              {item.date}
            </option>
          ))}
        </select>
      </Card.Header>
      <Card.Body className="p-3">
        <Row className="row-cards align-items-center justify-content-center text-center h-100">
          {Object.entries(incidentCategories[0]).map(([key, Icon]) => (
            <Col key={key} xs="4" md="3" lg={lg}>
              <div
                className={`${
                  categoryCounts[key] > 0
                    ? "text-danger cursor-pointer"
                    : "text-light-rrb cursor-pointer"
                }  mb-1`}
                onClick={() => handleIncidentClick(key)}
              >
                {Icon}
              </div>
              <p className="text-secondary mb-0 text-nowrap">
                {key}{" "}
                {categoryCounts[key] > 0 ? `${`(${categoryCounts[key]})`}` : ""}
              </p>
            </Col>
          ))}
        </Row>
      </Card.Body>
      {incidentModal.show && (
        <CustomModal
          show={incidentModal}
          onHide={setIncidentModal}
          hasSave={false}
          hasActions={false}
          size="lg"
          centered
          modalHeading={`Exam Incidents`}
          hadBodyPadding
          scrollable
        >
          <DataTable
            cardClass="border-0 shadow-none"
            columns={columns}
            data={incidentDetails.length > 0 ? incidentDetails : []}
            totalRecords={incidentDetails.length}
            tableHooks={() => {}}
            defaultPageLength={[25, 50, 100]}
            manual={true}
            align="table-vcenter"
            hidePagination
            hideSearch
          />
        </CustomModal>
      )}
    </Card>
  );
};

export default IncidentCard;
