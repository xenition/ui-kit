import * as React from 'react';
import { cn } from './cn';
import { useDismiss } from './useDismiss';

export interface ComboboxOption {
  label: string;
  value: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/** Searchable single-select (typeahead) bound to the theme tokens. */
export function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Search…',
  className,
}: ComboboxProps): React.ReactElement {
  const [query, setQuery] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));
  const selected = options.find((o) => o.value === value);
  const filtered = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div ref={ref} className={cn('relative', className)}>
      <input
        value={open ? query : selected?.label ?? ''}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className="w-full rounded-[var(--xen-radius-sm)] border border-border bg-surface px-3 py-2 text-base text-on-surface placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      {open && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-[var(--xen-radius-md)] border border-border bg-surface py-1 shadow-lg">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm text-muted">No matches</div>
          ) : (
            filtered.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setQuery('');
                  setOpen(false);
                }}
                className={cn(
                  'block w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-neutral-100',
                  o.value === value ? 'font-medium text-primary' : 'text-on-surface'
                )}
              >
                {o.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
