import type { Table } from '@tanstack/react-table';
import { Button } from '../button';

export function DataTablePagination<TRow>({ table }: { table: Table<TRow> }) {
  return (
    <div className="eui-datatable__pagination">
      <span className="eui-datatable__page-info">
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
      </span>
      <div className="eui-datatable__page-controls">
        <Button
          label="Previous"
          variant="secondary"
          size="sm"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        />
        <Button
          label="Next"
          variant="secondary"
          size="sm"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        />
      </div>
    </div>
  );
}
