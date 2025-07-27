export const useRowSpan = (instance) => {
  instance.getCellId = (cell) => `${cell.row.id}-${cell.column.id}`;

  const { allColumns } = instance;
  let rowSpanHeaders = [];

  allColumns.forEach((column) => {
    const { id, enableRowSpan } = column;

    if (enableRowSpan) {
      rowSpanHeaders = [
        ...rowSpanHeaders,
        { id, topCellValue: null, topCellIndex: 0 },
      ];
    }

    Object.assign(instance, { rowSpanHeaders });
  });
};
