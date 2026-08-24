import * as React from 'react';
import { cn } from './cn';

export interface PinInputProps {
  /** Number of digit boxes (default 6). */
  length?: number;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/** OTP / PIN entry — one box per character, with focus advance. Bound to the theme tokens. */
export function PinInput({ length = 6, value, onChange, className }: PinInputProps): React.ReactElement {
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);
  const chars = Array.from({ length }, (_, i) => value[i] ?? '');

  const setChar = (i: number, c: string) => {
    const next = chars.slice();
    next[i] = c.slice(-1);
    onChange(next.join(''));
    if (c && i < length - 1) refs.current[i + 1]?.focus();
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !chars[i] && i > 0) refs.current[i - 1]?.focus();
  };

  return (
    <div className={cn('flex gap-2', className)}>
      {chars.map((c, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          maxLength={1}
          value={c}
          onChange={(e) => setChar(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          className="h-11 w-10 rounded-[var(--xen-radius-sm)] border border-border bg-surface text-center text-lg text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      ))}
    </div>
  );
}
