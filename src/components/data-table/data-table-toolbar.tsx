export function DataTableToolbar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="eui-datatable__toolbar">
      <input
        type="search"
        className="eui-datatable__search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search table"
      />
    </div>
  );
}
