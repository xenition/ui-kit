import * as React from 'react';
import { cn } from './cn';

export type TimelineTone = 'primary' | 'success' | 'warn' | 'danger' | 'neutral';

export interface TimelineItemData {
  title: React.ReactNode;
  description?: React.ReactNode;
  time?: React.ReactNode;
  tone?: TimelineTone;
}

export interface TimelineProps {
  items: TimelineItemData[];
  className?: string;
}

const DOT: Record<TimelineTone, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
  neutral: 'bg-neutral-300',
};

/** Vertical activity timeline bound to the theme tokens. */
export function Timeline({ items, className }: TimelineProps): React.ReactElement {
  return (
    <ol className={cn('flex flex-col', className)}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <li key={i} className="flex gap-3 pb-6 last:pb-0">
            <div className="flex flex-col items-center">
              <span className={cn('mt-1 h-2.5 w-2.5 shrink-0 rounded-full', DOT[it.tone ?? 'primary'])} />
              {!last && <span className="w-px flex-1 bg-border" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-on-surface">{it.title}</div>
              {it.description != null && <div className="text-sm text-muted">{it.description}</div>}
              {it.time != null && <div className="text-xs text-muted">{it.time}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
