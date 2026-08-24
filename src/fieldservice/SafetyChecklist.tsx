import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon, Badge, Alert, Skeleton, type IconColor } from '../primitives';
import { EmptyState } from '../commerce';
import { DISC_TINT, type FieldSlot } from './internal/format';

/** Per-item safety verdict — text + glyph + color (never color-alone). */
export type SafetyVerdict = 'pass' | 'fail' | 'unchecked';

export interface SafetyItem {
  /** Stable id. */
  id: string;
  /** Safety checkpoint label (e.g. "Fall protection anchored"). */
  label: string;
  /** Verdict — pass / fail / unchecked. */
  verdict: SafetyVerdict;
  /** Marks a failure as a blocking hazard (drives the top hazard banner). */
  hazard?: boolean;
}

interface VerdictDescriptor {
  glyph: string;
  slot: FieldSlot;
  label: string;
}

const VERDICT: Record<SafetyVerdict, VerdictDescriptor> = {
  pass: { glyph: '✓', slot: 'success', label: 'Pass' },
  fail: { glyph: '✕', slot: 'danger', label: 'Fail' },
  unchecked: { glyph: '○', slot: 'muted', label: 'Unchecked' },
};

export interface SafetyChecklistProps {
  /** Section title (e.g. "Pre-task safety"). */
  title?: string;
  /** The safety items to render. */
  items: SafetyItem[];
  /** Fires with the item id and the verdict to advance to on tap. */
  onToggle?: (id: string, next: SafetyVerdict) => void;
  /** Show skeleton placeholders instead of the list. */
  loading?: boolean;
  /** Copy for the empty state when there are no items. */
  emptyLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

/** Cycle a verdict pass → fail → unchecked → pass on tap. */
function nextVerdict(current: SafetyVerdict): SafetyVerdict {
  return current === 'pass' ? 'fail' : current === 'fail' ? 'unchecked' : 'pass';
}

/**
 * A pass/fail safety checklist. Each item is a clickable `<button>` row with a
 * verdict glyph disc (pass → success, fail → danger — conveyed by glyph +
 * label + color, never color alone) that cycles the verdict via `onToggle`.
 * When any item is a flagged `hazard` failure, a danger `Alert` banner is
 * raised at the top. Handles the empty state (`EmptyState`) and a `loading`
 * skeleton. No literal colors.
 */
export const SafetyChecklist = React.forwardRef<HTMLDivElement, SafetyChecklistProps>(
  function SafetyChecklist(
    { title, items, onToggle, loading = false, emptyLabel = 'No safety items', className, style },
    ref
  ) {
    const list = Array.isArray(items) ? items : [];
    const hazardCount = list.filter((i) => i.hazard && i.verdict === 'fail').length;
    const failCount = list.filter((i) => i.verdict === 'fail').length;

    if (loading) {
      return (
        <Card ref={ref} className={className} style={style}>
          <div aria-label="Loading safety checklist" className="flex flex-col gap-[var(--xen-space-md)]">
            <Skeleton variant="text" width="50%" height={14} />
            <Skeleton variant="text" lines={3} />
          </div>
        </Card>
      );
    }

    if (list.length === 0) {
      return (
        <EmptyState
          ref={ref}
          title={emptyLabel}
          description="Safety checkpoints will appear here."
          className={className}
          style={style}
        />
      );
    }

    return (
      <Card ref={ref} className={className} style={style}>
        <div className="flex items-center justify-between">
          {title != null ? (
            <span className="text-base font-bold text-on-surface">{title}</span>
          ) : (
            <span />
          )}
          <Badge tone={failCount > 0 ? 'danger' : 'success'}>
            {failCount > 0 ? `✕ ${failCount} failing` : '✓ All clear'}
          </Badge>
        </div>

        {hazardCount > 0 ? (
          <div className="mt-[var(--xen-space-md)]">
            <Alert tone="danger" title="Hazard — do not proceed">
              {`${hazardCount} blocking safety ${hazardCount === 1 ? 'item is' : 'items are'} failing.`}
            </Alert>
          </div>
        ) : null}

        <div className="mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]">
          {list.map((item) => {
            const vd = VERDICT[item.verdict] ?? VERDICT.unchecked;
            const iconColor: IconColor = vd.slot === 'muted' ? 'muted' : (vd.slot as IconColor);
            return (
              <button
                key={item.id}
                type="button"
                aria-label={`${item.label}, ${vd.label}`}
                onClick={() => onToggle?.(item.id, nextVerdict(item.verdict))}
                className="flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-left transition-opacity hover:opacity-80"
              >
                <span
                  className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full', DISC_TINT[vd.slot])}
                >
                  <Icon glyph={vd.glyph} size="sm" color={iconColor} aria-label={vd.label} />
                </span>
                <span className="flex-1 text-sm font-medium text-on-surface">{item.label}</span>
                {item.hazard ? <Badge tone="danger">⚠ Hazard</Badge> : null}
              </button>
            );
          })}
        </div>
      </Card>
    );
  }
);
