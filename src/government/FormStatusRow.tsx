import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Badge } from '../primitives/Badge';
import { formStatus, type FormStatusValue } from './internal/status';
import { TONE_TINT } from './internal/tint';
import { pressableProps } from './internal/pressable';

export type { FormStatusValue };

export interface FormStatusRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Form / application reference (e.g. "APP-77412"). */
  formNumber: string;
  /** Short title of the form (e.g. "Homestead exemption"). */
  title: string;
  /** Submission lifecycle status — conveyed by text + glyph + color. */
  status: FormStatusValue;
  /** Agency / department that owns the form. */
  agency?: string;
  /** Localized date (submitted / last updated, already formatted). */
  date?: string;
  /** Fires on row click (e.g. open form detail / continue). */
  onClick?: () => void;
}

/**
 * One line in a list of submitted civic forms / applications: a tinted status
 * glyph disc, a title/number stack, and a status pill. Status is conveyed
 * redundantly (glyph + label + a color that traces to a semantic token slot:
 * complete → success, rejected/action-needed → danger) — never color alone.
 * Becomes a keyboard-operable button only when `onClick` is supplied. Web parity
 * of the native `FormStatusRow`.
 */
export const FormStatusRow = React.forwardRef<HTMLDivElement, FormStatusRowProps>(
  function FormStatusRow(
    { formNumber, title, status, agency, date, onClick, className, ...rest },
    ref
  ) {
    const sd = formStatus(status);
    const interactive = pressableProps(onClick);

    return (
      <div
        ref={ref}
        aria-label={interactive ? `Form ${formNumber}, ${title}, ${sd.label}` : undefined}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          interactive &&
            'cursor-pointer rounded-[var(--xen-radius-sm)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...interactive}
        {...rest}
      >
        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
            TONE_TINT[sd.tone]
          )}
        >
          <Icon glyph={sd.glyph} aria-label={sd.label} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-on-surface">{title}</p>
          <div className="mt-0.5 flex items-center gap-[var(--xen-space-xs)]">
            <span className="text-xs text-muted">{formNumber}</span>
            {agency != null ? <span className="text-xs text-muted">· {agency}</span> : null}
          </div>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <Badge tone={sd.tone}>
            <span aria-hidden="true">{sd.glyph}</span> {sd.label}
          </Badge>
          {date != null ? <span className="text-xs text-muted">{date}</span> : null}
        </div>
      </div>
    );
  }
);
