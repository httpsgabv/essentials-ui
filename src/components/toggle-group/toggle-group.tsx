import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { cn } from '@/core';
import { toggleGroupVariants } from './toggle-group.variants';
import type { ToggleGroupOption } from './toggle-group.contract';
import type { ToggleGroupProps, SingleToggleGroupProps, MultipleToggleGroupProps } from './toggle-group.types';

function ToggleItems({ options }: { options: ToggleGroupOption[] }) {
  return (
    <>
      {options.map((option) => (
        <BaseToggle
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          className="eui-toggle-group__item"
        >
          {option.icon && (
            <span className="eui-toggle-group__item-icon" aria-hidden>
              <option.icon />
            </span>
          )}
          <span className="eui-toggle-group__item-label">{option.label}</span>
        </BaseToggle>
      ))}
    </>
  );
}

function SingleToggleGroup({
  options,
  value,
  onValueChange,
  disabled,
  orientation,
  size,
  className,
}: SingleToggleGroupProps) {
  const valueProps = value !== undefined ? { value: value != null ? [value] : ([] as string[]) } : {};

  return (
    <BaseToggleGroup
      {...valueProps}
      onValueChange={(arr) => onValueChange?.(arr[0] ?? null)}
      disabled={disabled}
      orientation={orientation}
      className={cn(toggleGroupVariants({ size }), className)}
    >
      <ToggleItems options={options} />
    </BaseToggleGroup>
  );
}

function MultipleToggleGroup({
  options,
  value,
  onValueChange,
  disabled,
  orientation,
  size,
  className,
}: MultipleToggleGroupProps) {
  const valueProps = value !== undefined ? { value } : {};

  return (
    <BaseToggleGroup
      multiple
      {...valueProps}
      onValueChange={(arr) => onValueChange?.(arr)}
      disabled={disabled}
      orientation={orientation}
      className={cn(toggleGroupVariants({ size }), className)}
    >
      <ToggleItems options={options} />
    </BaseToggleGroup>
  );
}

/**
 * Pluggable toggle group. Pass `options` from {@link ToggleGroupContract} plus
 * presentation/behaviour from {@link ToggleGroupProps}.
 *
 * Wraps the Base UI `ToggleGroup` + `Toggle` primitives. The public API is
 * string-based (`value: string | null` for single, `string[]` for multiple),
 * mapped internally to the Base UI `string[]` representation. Set `multiple`
 * to allow several items to be pressed simultaneously.
 */
export function ToggleGroup(props: ToggleGroupProps) {
  return props.multiple ? <MultipleToggleGroup {...props} /> : <SingleToggleGroup {...props} />;
}
