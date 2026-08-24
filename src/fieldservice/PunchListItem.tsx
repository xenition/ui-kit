import * as React from 'react';
import { cn } from '../primitives/cn';
import { Checkbox, Badge, type BadgeTone } from '../primitives';

/** Defect severity — drives the severity pill (text + glyph + color). */
export type PunchSeverity = 'minor' | 'major' | 'critical';

interface SeverityDescriptor {
  label: string;
  glyph: string;
  tone: BadgeTone;
}

const SEVERITY: Record<PunchSeverity, SeverityDescriptor> = {
  minor: { label: 'Minor', glyph: '·', tone: 'neutral' },
  major: { label: 'Major', glyph: '▲', tone: 'warn' },
  critical: { label: 'Critical', glyph: '!', tone: 'danger' },
};

export interface PunchListItemProps {
  /** Defect / task description (e.g. "Touch-up paint scuff in lobby"). */
  label: string;
  /** Whether the item has been resolved / signed off. */
  done: boolean;
  /** Defect severity; when set, renders a severity pill. */
  severity?: PunchSeverity;
  /** Trade or location shown as a meta line. */
  location?: string;
  /** Person the item is assigned to, shown as a meta line. */
  assignee?: string;
  /** Fires with the next `done` value when the checkbox is toggled. */
  onToggle?: (done: boolean) => void;
  /** Disables the checkbox. */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * One punch-list defect: a leading checkbox to mark it resolved, a description
 * that strikes through when `done` (so completion reads without color alone), a
 * severity pill (text + glyph + a color that traces to a semantic token), and
 * location / assignee meta. Toggling fires `onToggle` with the next state. No
 * literal colors.
 */
export const PunchListItem = React.forwardRef<HTMLDivElement, PunchListItemProps>(
  function PunchListItem(
    { label, done, severity, location, assignee, onToggle, disabled = false, className, style },
    ref
  ) {
    const sd = severity ? SEVERITY[severity] : undefined;
    const meta = [location, assignee].filter((v): v is string => v != null).join(' · ');

    return (
      <div
        ref={ref}
        style={style}
        className={cn('flex items-start gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', className)}
      >
        <span className="pt-0.5">
          <Checkbox
            checked={done}
            disabled={disabled}
            onChange={(e) => onToggle?.(e.target.checked)}
            aria-label={label}
          />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span
            className={cn(
              'line-clamp-3 text-base font-semibold',
              done ? 'text-muted line-through' : 'text-on-surface'
            )}
          >
            {label}
          </span>
          {meta !== '' ? <span className="text-xs text-muted">{meta}</span> : null}
        </div>
        {sd ? <Badge tone={sd.tone}>{`${sd.glyph} ${sd.label}`}</Badge> : null}
      </div>
    );
  }
);
