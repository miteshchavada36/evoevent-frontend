import React, { useEffect } from 'react';
import {
  Card,
  Col,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from 'react-bootstrap';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from 'react-table';

import Loader from '../../components/Loader';
import GlobalFilter from '../../components/DataTable/GlobalFilter';
import TablePagination from '../../components/DataTable/TablePagination';
import AnimatedComponent from '../Animation/AnimatedComponent';

import { PAGE_LENGTH } from '../../common/constants';

import IconDocuments from '../../assets/images/svg/icon-documents.svg';

const DataTable = ({
  header,
  columns,
  data,
  initialState,
  setFilter = () => {},
  setSelectedRows,
  totalRecords,
  tableHooks,
  defaultPageLength = PAGE_LENGTH,
  manual,
  isLoading,
  align = '',
  headerInput = '',
  cardClass = '',
  animationClass = '',
  customClass = '',
  FilterDropdwon,
  highlightRow = false,
  hidePagination = false,
  hideSearch = false,
  enableRowSpan = false,
  extraSelectFilter = false,
  extraSelectOptions,
  setSelectState,
  scrollableBody,
  first_option,
  rowProps,
  placeholder,
  readTooltip = false,
  defaultOption,
  extraSelectFilter2,
  extraSelectOptions2,
  setSelectState2,
  first_option2,
  defaultOption2,
}) => {
  // const [roles, setRoles] = useState(["All", "Admin", "Customer"]);
  // const [status, setStatus] = useState(["All", "Active", "Inactive"]);

  const tableInstance = useTable(
    {
      columns: columns,
      data: data || [],
      manualGlobalFilter: manual,
      manualSortBy: manual,
      manualPagination: manual,
      disableMultiSort: manual,
      initialState: initialState,
      pageCount: Math.ceil(totalRecords / initialState?.pageSize),
    },
    tableHooks,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    columns: tableColumns,
    prepareRow,
    setGlobalFilter,
    page,
    pageCount,
    pageOptions,
    gotoPage,
    previousPage,
    canPreviousPage,
    nextPage,
    canNextPage,
    setPageSize,
    selectedFlatRows,
    rowSpanHeaders,
    state: { pageIndex, pageSize, sortBy, globalFilter, selectedRowIds },
  } = tableInstance;

  useEffect(() => {
    setFilter((prevState) => ({
      ...prevState,
      q: globalFilter || '',
      _sort: sortBy[0]?.id || '',
      _order: sortBy[0]?.id ? (sortBy[0].desc ? 'desc' : 'asc') : '',
      _limit: pageSize,
      _page: pageIndex + 1,
    }));
  }, [sortBy, globalFilter, pageIndex, pageSize]);

  useEffect(() => {
    if (hidePagination) {
      // setSelectedRows(selectedFlatRows?.map((row) => row.original.id));
    }
  }, [selectedRowIds]);

  let uniqueOptions = [];
  if (extraSelectFilter && extraSelectOptions) {
    uniqueOptions = [
      ...(defaultOption ? [defaultOption] : [{ key: '', label: first_option }]),
      ...extraSelectOptions.filter(
        (item, index, self) =>
          item.key !== defaultOption?.key && // Avoid duplicate of default option
          index === self.findIndex((opt) => opt.key === item.key) // Ensure unique entries
      ),
    ];
  }

  let uniqueOptions2 = [];
  if (extraSelectFilter2 && extraSelectOptions2) {
    uniqueOptions2 = [
      ...(defaultOption2
        ? [defaultOption2]
        : [{ key: '', label: first_option2 }]),
      ...extraSelectOptions2.filter(
        (item, index, self) =>
          item.key !== defaultOption2?.key && // Avoid duplicate of default option
          index === self.findIndex((opt) => opt.key === item.key) // Ensure unique entries
      ),
    ];
  }

  return (
    <AnimatedComponent as={Card} className={cardClass}>
      {header}
      {isLoading && <Loader />}
      <Card.Body
        className={`border-bottom px-3 ${hideSearch ? 'd-none' : ''} h-50`}
      >
        <div className={`d-flex justify-content-between`}>
          {defaultPageLength && (
            <div className='text-nowrap'>
              Show
              <div className='mx-2 d-inline-block'>
                <select
                  className='form-select form-select'
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {defaultPageLength.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <span className='d-none d-md-inline'>entries</span>
            </div>
          )}

          <div className='d-flex'>
            {extraSelectFilter && (
              <div className='ms-auto'>
                <select
                  className='form-select form-select'
                  onChange={(e) => {
                    setSelectState(e.target.value);
                  }}
                >
                  {!defaultOption && <option value=''>{first_option}</option>}
                  {uniqueOptions.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {extraSelectFilter2 && (
              <div className='ms-auto ps-3'>
                <select
                  className='form-select form-select'
                  onChange={(e) => {
                    setSelectState2(e.target.value);
                  }}
                >
                  {!defaultOption2 && <option value=''>{first_option2}</option>}
                  {uniqueOptions2.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className='ms-auto'>
              {FilterDropdwon && FilterDropdwon()}
              <div className='ms-3 d-inline-block'>
                <GlobalFilter
                  placeholder={placeholder ? placeholder : 'Search'}
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
      {/* <div className="card-table -table-responsive" style={{height:`${(window.innerHeight>500)?(window.innerHeight - 300)+"px":"auto"}`,overflow:"auto"}}> */}
      <div
        className={`card-table table-responsive ${totalRecords > 0 ? '' : ''} ${
          scrollableBody ? 'table-scroll-body' : ''
        } `}
      >
        <Table
          className={`mb-0 table-bordered ${align ? align : ''} ${
            customClass && customClass
          }`}
          {...getTableProps()}
        >
          <thead>
            {headerGroups?.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup?.headers?.map((column, j) => {
                  return (
                    <th
                      {...column.getHeaderProps([
                        column.getSortByToggleProps(),
                        {
                          className: column.className,
                        },
                        { width: column.width },
                      ])}
                      key={j}
                      // className={column.className || ""}
                    >
                      <span
                        className={`${
                          !column.disableSortBy ? 'table-sort' : ''
                        } ${
                          column.isSorted
                            ? column.isSortedDesc
                              ? 'asc'
                              : 'desc'
                            : ''
                        }`}
                      >
                        {column.render('Header')}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {/* Render the first row as a form */}
            {headerInput}
            {/* Render the remaining rows */}
            {enableRowSpan &&
              rows.map((row, i) => {
                prepareRow(row);

                for (let j = 0; j < row.allCells.length; j++) {
                  let cell = row.allCells[j];
                  let rowSpanHeader = rowSpanHeaders.find(
                    (x) => x.id === cell.column.id
                  );
                  if (rowSpanHeader) {
                    if (
                      rowSpanHeader.topCellValue === null ||
                      rowSpanHeader.topCellValue !== cell.value
                    ) {
                      cell.isRowSpanned = false;
                      rowSpanHeader.topCellValue = cell.value;
                      rowSpanHeader.topCellIndex = i;
                      cell.rowSpan = 1;
                    } else {
                      rows[rowSpanHeader.topCellIndex].allCells[j].rowSpan++;
                      cell.isRowSpanned = true;
                    }
                  }
                }
                return null;
              })}
            {enableRowSpan &&
              rows.map((row) => {
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      if (cell.isRowSpanned) return null;
                      else
                        return (
                          <td rowSpan={cell.rowSpan} {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
                        );
                    })}
                  </tr>
                );
              })}
            {/* {!enableRowSpan &&
              rows?.map((row, i) => {
                prepareRow(row);
                const { style, onClick } = rowProps ? rowProps(row) : {};
                return (
                  <tr
                    {...row.getRowProps()}
                    className={
                      highlightRow && highlightRow?.id === row.original.id
                        ? "bg-success-lt"
                        : ""
                    }
                    style={style}
                    key={i}
                    onClick={onClick}
                  >
                    {row.cells?.map((cell, j) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className={cell.column.className || ""}
                          key={j}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })} */}
            {!enableRowSpan &&
              rows?.map((row, i) => {
                prepareRow(row);
                const { style, onClick } = rowProps ? rowProps(row) : {};
                const isUnread = !row.original.is_read;

                return (
                  <OverlayTrigger
                    key={i}
                    placement='top'
                    overlay={
                      isUnread && readTooltip ? (
                        <Tooltip id={`tooltip-${row.original.id}`}>
                          Click to mark as read
                        </Tooltip>
                      ) : (
                        <></>
                      )
                    }
                  >
                    <tr
                      {...row.getRowProps()}
                      className={
                        highlightRow && highlightRow?.id === row.original.id
                          ? 'bg-success-lt'
                          : ''
                      }
                      style={style}
                      onClick={onClick}
                    >
                      {row.cells?.map((cell, j) => (
                        <td
                          {...cell.getCellProps()}
                          className={cell.column.className || ''}
                          key={j}
                        >
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  </OverlayTrigger>
                );
              })}
            {totalRecords === 0 && (
              <tr>
                <td colSpan={tableColumns.length + 1}>
                  <Row
                    className='align-items-center'
                    style={{ minHeight: '250px' }}
                  >
                    <Col className='text-center'>
                      <img src={IconDocuments} alt='' className='w-4' />
                      <p className='text-muted mt-2'>No data to display.</p>
                    </Col>
                  </Row>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {!hidePagination && (
        <TablePagination
          isLoading={isLoading}
          totalRecords={totalRecords}
          page={page}
          pageOptions={pageOptions}
          pageSize={pageSize}
          pageIndex={pageIndex}
          previousPage={previousPage}
          canPreviousPage={canPreviousPage}
          nextPage={nextPage}
          canNextPage={canNextPage}
          gotoPage={gotoPage}
        />
      )}
    </AnimatedComponent>
  );
};
export default DataTable;
