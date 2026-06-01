import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { CaretDown, Check, X } from '@phosphor-icons/react';
import { cn } from '@/core';
import { comboboxVariants } from './combobox.variants';
import type { ComboboxOption } from './combobox.contract';
import type { ComboboxProps, MultipleComboboxProps, SingleComboboxProps } from './combobox.types';

/**
 * The portaled options popup. Items are pulled from the Root's `items`, so this
 * is identical for both selection modes.
 */
function OptionList({ options }: { options: ComboboxOption[] }) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner className="eui-combobox__positioner" sideOffset={4}>
        <BaseCombobox.Popup className="eui-combobox__popup">
          {options.length === 0 ? (
            <BaseCombobox.Empty className="eui-combobox__empty">No results.</BaseCombobox.Empty>
          ) : (
            <BaseCombobox.List className="eui-combobox__list">
              {(option: ComboboxOption) => (
                <BaseCombobox.Item
                  key={option.value}
                  value={option}
                  disabled={option.disabled}
                  className="eui-combobox__item"
                >
                  <span className="eui-combobox__item-indicator" aria-hidden>
                    <BaseCombobox.ItemIndicator>
                      <Check weight="bold" />
                    </BaseCombobox.ItemIndicator>
                  </span>
                  {option.label}
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
          )}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

function SingleCombobox({
  options,
  value,
  placeholder,
  disabled,
  size,
  className,
  onValueChange,
}: SingleComboboxProps) {
  const selected =
    value != null ? (options.find((option) => option.value === value) ?? null) : null;

  return (
    <BaseCombobox.Root
      items={options}
      value={selected}
      disabled={disabled}
      onValueChange={(option) => onValueChange?.(option ? option.value : null)}
    >
      <BaseCombobox.InputGroup className={cn(comboboxVariants({ size }), className)}>
        <BaseCombobox.Input placeholder={placeholder} className="eui-combobox__input" />
        <BaseCombobox.Trigger className="eui-combobox__trigger" aria-label="Toggle options">
          <CaretDown />
        </BaseCombobox.Trigger>
      </BaseCombobox.InputGroup>
      <OptionList options={options} />
    </BaseCombobox.Root>
  );
}

function MultipleCombobox({
  options,
  value,
  placeholder,
  disabled,
  size,
  className,
  onValueChange,
}: MultipleComboboxProps) {
  // Map our string[] back to the option objects Base UI tracks.
  const selected = (value ?? [])
    .map((v) => options.find((option) => option.value === v))
    .filter((option): option is ComboboxOption => option != null);

  return (
    <BaseCombobox.Root
      multiple
      items={options}
      value={selected}
      disabled={disabled}
      onValueChange={(selectedOptions) => onValueChange?.(selectedOptions.map((o) => o.value))}
    >
      <BaseCombobox.InputGroup
        className={cn(comboboxVariants({ size }), 'eui-combobox--multiple', className)}
      >
        <BaseCombobox.Value>
          {(selectedOptions: ComboboxOption[]) => (
            <>
              <BaseCombobox.Chips className="eui-combobox__chips">
                {selectedOptions.map((option) => (
                  <BaseCombobox.Chip key={option.value} className="eui-combobox__chip">
                    {option.label}
                    <BaseCombobox.ChipRemove
                      className="eui-combobox__chip-remove"
                      aria-label={`Remove ${option.label}`}
                    >
                      <X />
                    </BaseCombobox.ChipRemove>
                  </BaseCombobox.Chip>
                ))}
              </BaseCombobox.Chips>
              <BaseCombobox.Input placeholder={placeholder} className="eui-combobox__input" />
            </>
          )}
        </BaseCombobox.Value>
        <BaseCombobox.Clear className="eui-combobox__clear" aria-label="Clear all">
          <X />
        </BaseCombobox.Clear>
        <BaseCombobox.Trigger className="eui-combobox__trigger" aria-label="Toggle options">
          <CaretDown />
        </BaseCombobox.Trigger>
      </BaseCombobox.InputGroup>
      <OptionList options={options} />
    </BaseCombobox.Root>
  );
}

/**
 * Pluggable combobox (searchable select). Pass props matching
 * {@link ComboboxContract} plus presentation/behaviour from {@link ComboboxProps},
 * or feed a data source through an adapter in `./adapters`.
 *
 * Wraps the Base UI `Combobox` primitive (`@base-ui/react/combobox`). Base UI
 * works with the option *objects* internally (so it can show labels and filter),
 * while this wrapper keeps a **string-based** public API. Set `multiple` to allow
 * several selections — they render as removable chips inside the input and
 * `value`/`onValueChange` become `string[]`. The string API suits Mendix
 * attributes and other flat data sources.
 */
export function Combobox(props: ComboboxProps) {
  return props.multiple ? <MultipleCombobox {...props} /> : <SingleCombobox {...props} />;
}
