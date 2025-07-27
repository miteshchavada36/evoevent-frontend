import React from "react";
import { ROLES } from "../../common/constants";
import CheckAll from "./CheckAll";
import Actions from "./Actions";
export const TableHooks =
  (hooks, isCheckAll = false) =>
  ({ EditAction, DeleteAction, isCustomAction, customAction }) => {
    hooks.visibleColumns.push((columns) => {
      return [
        ...columns,
        {
          Header: "",
          accessor: "Actions",
          className: "text-center py-0",
          width: "100",
          disableSortBy: true,
          Cell: ({ row }) =>
            isCustomAction ? (
              customAction(row)
            ) : (
              <Actions row={row} onEdit={EditAction} onDelete={DeleteAction} />
            ),
        },
      ];
      if (isCheckAll) {
        return [
          {
            id: "id",
            disableSortBy: true,
            className: "w-1",
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <CheckAll {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <CheckAll {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ];
      }
      return columns;
    });
  };
