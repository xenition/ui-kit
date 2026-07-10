import * as React from 'react';
import { cn } from './cn';

export interface StepItem {
  title: React.ReactNode;
  description?: React.ReactNode;
}

export interface StepsProps {
  steps: StepItem[];
  /** Zero-based index of the active step. */
  current: number;
  className?: string;
}

/** Horizontal step indicator bound to the theme tokens — for wizards/checkout. */
export function Steps({ steps, current, className }: StepsProps): React.ReactElement {
  return (
    <ol className={cn('flex w-full items-start', className)}>
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={i} className="flex flex-1 flex-col items-center">
            <span
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold',
                done
                  ? 'bg-primary text-on-primary'
                  : active
                    ? 'border-2 border-primary text-primary'
                    : 'border-2 border-border text-muted'
              )}
            >
              {done ? '✓' : i + 1}
            </span>
            <div className="mt-2 text-center">
              <div className={cn('text-xs font-medium', active || done ? 'text-on-surface' : 'text-muted')}>
                {s.title}
              </div>
              {s.description != null && <div className="text-xs text-muted">{s.description}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
