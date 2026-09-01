import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { TEXT_TONE, type MedicalTone } from './internal';
import type { HealthRecordRowProps, HealthRecordType } from './HealthRecordRow';

/** Drop-in for {@link HealthRecordRowProps} — same props, the V4 "clinic" design. */
export type HealthRecordRowV4Props = HealthRecordRowProps;

const TYPE_META: Record<HealthRecordType, { glyph: string; label: string; tone: MedicalTone }> = {
  lab: { glyph: '🧪', label: 'Lab', tone: 'primary' },
  imaging: { glyph: '🩻', label: 'Imaging', tone: 'accent' },
  note: { glyph: '📝', label: 'Note', tone: 'muted' },
  immunization: { glyph: '💉', label: 'Immunization', tone: 'success' },
  prescription: { glyph: '💊', label: 'Prescription', tone: 'warn' },
  document: { glyph: '📄', label: 'Document', tone: 'muted' },
};

/**
 * HealthRecordRow — **V4** "clinic" design (web parity of the native V4). The
 * calm, clinical take on a patient-timeline row: an elevated rounded surface with
 * a soft shadow, the type glyph tucked in a soft-primary well, the record title,
 * a provider · date meta line, a labelled type chip (text label + token tone,
 * never color alone), and an optional unread dot. When `onClick` is set the row
 * is a keyboard-activatable `role="button"` with a ≥44px tap target. Identical
 * props/behavior to {@link HealthRecordRowProps}. All colors from `--xen-*` token
 * classes (no literals). Informational UI only — not a medical device.
 */
export const HealthRecordRowV4 = React.forwardRef<HTMLDivElement, HealthRecordRowV4Props>(
  function HealthRecordRowV4({ type, title, date, provider, unread = false, onClick, className, ...rest }, ref) {
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
          'flex min-h-[56px] items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          interactive && 'cursor-pointer transition-opacity hover:opacity-80',
          className
        )}
        {...rest}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10">
          <Icon glyph={meta.glyph} size="lg" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className={cn('truncate text-base text-on-surface', unread ? 'font-bold' : 'font-semibold')}>
            {title}
          </span>
          <span className="flex items-center gap-[var(--xen-space-xs)]">
            <span className={cn('inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold', toneClass)}>
              {meta.label}
            </span>
            {metaLine.length ? (
              <span className="truncate text-xs text-muted">{metaLine.join('  ·  ')}</span>
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
