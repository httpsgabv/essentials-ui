import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { Check } from '@phosphor-icons/react';

export function DataTableCheckbox({
  checked,
  indeterminate,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <BaseCheckbox.Root
      className="eui-datatable__checkbox"
      checked={checked}
      indeterminate={indeterminate}
      onCheckedChange={onCheckedChange}
      aria-label={label}
    >
      <BaseCheckbox.Indicator className="eui-datatable__checkbox-indicator">
        <Check weight="bold" />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
