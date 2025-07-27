import React from "react";
import { Card, Col, Pagination, Row } from "react-bootstrap";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import IconDocuments from "../../assets/images/svg/icon-documents.svg";
const TablePagination = ({
  isLoading,
  totalRecords,
  page,
  pageOptions,
  pageSize,
  pageIndex,
  previousPage,
  canPreviousPage,
  nextPage,
  canNextPage,
  gotoPage,
}) => {
  const arrayPageIndex =
    pageIndex - 2 < 0
      ? pageOptions.slice(0, pageIndex + 3)
      : pageOptions.slice(pageIndex - 2, pageIndex + 3);
  // if(isLoading){
  //     return "";
  // }
  if (totalRecords === 0) {
    return "";
  }
  return (
    <Card.Footer
      className={`d-md-flex justify-content-center align-items-center ${
        totalRecords === 0 && "bg-white"
      }`}
    >
      {totalRecords > 0 ? (
        <>
          <p className="mb-md-0 text-center">
            {" "}
            Showing{" "}
            {pageSize * pageIndex + 1 <= totalRecords
              ? pageSize * pageIndex + 1
              : totalRecords}{" "}
            to{" "}
            {pageSize * pageIndex + page.length <= totalRecords
              ? pageSize * pageIndex + page.length
              : totalRecords}{" "}
            of {totalRecords} entries
          </p>
          <Pagination className="m-0 justify-content-center ms-md-auto gap-1">
            <Pagination.Prev onClick={previousPage} disabled={!canPreviousPage}>
              <span className="d-flex justify-content-center">
                <IconChevronLeft size={20} stroke={1.5} /> Prev{" "}
              </span>
            </Pagination.Prev>
            {/* <Pagination.Ellipsis /> */}
            {arrayPageIndex.map((i) => (
              <Pagination.Item
                key={i}
                onClick={() => gotoPage(i)}
                active={pageIndex === i}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            {/* <Pagination.Ellipsis /> */}
            <Pagination.Next onClick={nextPage} disabled={!canNextPage}>
              <span className="d-flex justify-content-center">
                {" "}
                Next <IconChevronRight size={20} stroke={1.5} />
              </span>
            </Pagination.Next>
          </Pagination>
        </>
      ) : (
        !isLoading && (
          <Row className="align-items-center" style={{ minHeight: "200px" }}>
            <Col className="text-center">
              <img src={IconDocuments} alt="" className="w-4" />
              <p className="text-muted mt-2">No data to display.</p>
            </Col>
          </Row>
        )
      )}
    </Card.Footer>
  );
};
export default TablePagination;
