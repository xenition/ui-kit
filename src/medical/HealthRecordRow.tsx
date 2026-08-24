import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { TEXT_TONE, type MedicalTone } from './internal';

export type HealthRecordType = 'lab' | 'imaging' | 'note' | 'immunization' | 'prescription' | 'document';

const TYPE_META: Record<HealthRecordType, { glyph: string; label: string; tone: MedicalTone }> = {
  lab: { glyph: '🧪', label: 'Lab', tone: 'primary' },
  imaging: { glyph: '🩻', label: 'Imaging', tone: 'accent' },
  note: { glyph: '📝', label: 'Note', tone: 'muted' },
  immunization: { glyph: '💉', label: 'Immunization', tone: 'success' },
  prescription: { glyph: '💊', label: 'Prescription', tone: 'warn' },
  document: { glyph: '📄', label: 'Document', tone: 'muted' },
};

export interface HealthRecordRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Record type; drives the leading icon + type tag. */
  type: HealthRecordType;
  /** Record title, e.g. "CBC panel". */
  title: string;
  /** Date line, e.g. "24 Aug 2026". */
  date?: string;
  /** Ordering provider / facility. */
  provider?: string;
  /** Marks the record as unread/new. */
  unread?: boolean;
  /** Fires when the row is activated to open the record — web mirror of native `onPress`. */
  onClick?: () => void;
}

/**
 * A health-record list row for a patient timeline / documents screen — the web
 * mirror of the native `HealthRecordRow`. Shows a type-coded icon, the record
 * title, a provider · date meta line, a type tag, and an optional unread dot.
 * The type is labelled in text as well as token color-coded. When `onClick` is
 * set the row is a keyboard-activatable `role="button"`. Token-only colors.
 * Informational UI only — not a medical device.
 */
export const HealthRecordRow = React.forwardRef<HTMLDivElement, HealthRecordRowProps>(
  function HealthRecordRow({ type, title, date, provider, unread = false, onClick, className, ...rest }, ref) {
    const meta = TYPE_META[type] ?? TYPE_META.document;
    const toneClass = TEXT_TONE[meta.tone];
    const interactive = !!onClick;
    const metaLine = [provider, date].filter(Boolean) as string[];
    const a11y = `${meta.label}: ${title}${metaLine.length ? `, ${metaLine.join(', ')}` : ''}${
      unread ? ', unread' : ''
    }`;

    return (
      <div
        ref={ref}
        data-xen-health-record-row=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={a11y}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        className={cn(
          'flex min-h-[56px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          interactive && 'cursor-pointer rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-80',
          className
        )}
        {...rest}
      >
        <Icon glyph={meta.glyph} size="lg" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className={cn('truncate text-base text-on-surface', unread ? 'font-bold' : 'font-semibold')}>
            {title}
          </span>
          <span className="flex items-center gap-[var(--xen-space-xs)]">
            <span className={cn('text-xs font-bold', toneClass)}>{meta.label}</span>
            {metaLine.length ? (
              <span className="truncate text-xs text-muted">· {metaLine.join('  ·  ')}</span>
            ) : null}
          </span>
        </div>
        {unread ? (
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
        ) : (
          <span aria-hidden="true" className="text-base text-muted">
            ›
          </span>
        )}
      </div>
    );
  }
);
