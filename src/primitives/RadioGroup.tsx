import * as React from 'react';
import { cn } from './cn';

export interface RadioOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

/** Single-choice radio group bound to the theme tokens. */
export function RadioGroup({
  options,
  value,
  onChange,
  name,
  orientation = 'vertical',
  className,
}: RadioGroupProps): React.ReactElement {
  return (
    <div
      role="radiogroup"
      className={cn('flex gap-3', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap', className)}
    >
      {options.map((o) => (
        <label
          key={o.value}
          className={cn('inline-flex items-center gap-2 text-sm text-on-surface', o.disabled && 'opacity-50')}
        >
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={o.value === value}
            disabled={o.disabled}
            onChange={() => onChange(o.value)}
            className="h-4 w-4 border-border accent-primary"
          />
          {o.label}
        </label>
      ))}
    </div>
  );
}
