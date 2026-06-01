import type { Row } from '@tanstack/react-table';
import { cn } from '@/core';
import type { DataTableAction } from './data-table.contract';

export function DataTableActionCell<TRow>({
  row,
  actions,
}: {
  row: Row<TRow>;
  actions: DataTableAction<TRow>[];
}) {
  return (
    <div className="eui-datatable__actions">
      {actions.map((action) => {
        const isDisabled = action.disabled?.(row.original) ?? false;
        const iconOnly = action.icon && !action.label;
        const Icon = action.icon;
        return (
          <button
            key={action.key}
            type="button"
            className={cn(
              'eui-datatable__action-btn',
              iconOnly && 'eui-datatable__action-btn--icon',
            )}
            disabled={isDisabled}
            onClick={() => action.onClick(row.original)}
            aria-label={iconOnly ? action.key : undefined}
          >
            {Icon && (
              <span className="eui-datatable__action-icon" aria-hidden>
                <Icon size={16} weight="regular" />
              </span>
            )}
            {action.label && (
              <span className="eui-datatable__action-label">{action.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
