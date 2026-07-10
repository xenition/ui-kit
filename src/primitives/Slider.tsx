import * as React from 'react';
import { cn } from './cn';

export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

/** Range slider bound to the theme tokens (accent = primary). */
export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled,
  className,
}: SliderProps): React.ReactElement {
  return (
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      onChange={(e) => onChange(Number(e.target.value))}
      className={cn('w-full accent-primary disabled:pointer-events-none disabled:opacity-50', className)}
    />
  );
}
