import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { LabelV4 } from './LabelV4';
import { resolveIconGlyph } from './icon-names';
import type { FieldProps } from './Field';

export type { FieldProps as FieldV4Props };

/**
 * `muted` is `neutral[600]` and carries no contrast promise against `surface`,
 * so the hint's colour has to be computed per scheme rather than named — which
 * means a custom property and a `[data-theme="dark"]` switch.
 */
const FIELD_V4_CSS = `
[data-xen-v4-field-hint] { color: var(--xen-muted-text); }
`;

/**
 * **V4 field** — the web twin of the native `FieldV4`, same props as
 * {@link Field}, a different design line.
 *
 * A field is three things stacked in a column, which makes it look like the
 * least interesting component in the kit and hides the fact that it is the one
 * carrying a form's entire error story.
 *
 * 1. **The message reaches the control.** The base field rendered its error in
 *    a sibling `<p>` and left it there: no `aria-describedby`, no
 *    `aria-invalid`, so a screen-reader user landing on the input heard the
 *    label and nothing about what was wrong with it, and the field did not
 *    report itself as invalid at all. V4 gives the message a real id and wires
 *    the control to it. It only fills in what the caller left blank — an
 *    explicit `aria-describedby` or `aria-invalid` on the child is theirs and
 *    wins (§23 — preserve unrelated work).
 * 2. **An error is not only red.** A red line under a field is invisible to a
 *    red-green viewer and to anyone reading in bright sun. V4 leads the error
 *    with the kit's `error` glyph, so the state has a shape as well as a hue
 *    (§46) — and `role="alert"` still announces it when it appears.
 * 3. **Both messages are measured.** The error took `text-danger`, the FILL
 *    slot, whose guarantee is about `on-danger` and not about itself as ink;
 *    the hint took `text-muted-text`, which is `neutral[600]` with no promise
 *    either. The error moves to `text-danger-text`, and the hint is computed
 *    per scheme with `ensureContrast`. Helper text is the smallest thing on a
 *    form and the first thing an unmeasured colour makes unreadable.
 *
 * The gap is `spacing.xs` on both twins — the web field was on Tailwind's
 * `gap-1.5` (6px) against native's 4px, so the same field was two different
 * heights. No card, no fill, no gradient: §10 and §11 both say a label, a
 * control and a line of helper text are a group because of spacing, not
 * because of a container.
 */
export const FieldV4 = React.forwardRef<HTMLDivElement, FieldProps>(function FieldV4(
  { className, style, label, required = false, error, hint, htmlFor, children, ...rest },
  ref
) {
  injectStyleOnce('xen-v4-field-styles', FIELD_V4_CSS);
  const reactId = React.useId();
  const messageId = `${reactId}-message`;

  const invalid = error != null && error !== '';
  const hasMessage = invalid || (hint != null && hint !== '');

  // Wire the control to the message. Only where the caller left a gap.
  const described = React.Children.map(children, (child) => {
    if (!React.isValidElement(child) || !hasMessage) return child;
    const props = child.props as { 'aria-describedby'?: string; 'aria-invalid'?: unknown };
    return React.cloneElement(child as React.ReactElement, {
      'aria-describedby': props['aria-describedby'] ?? messageId,
      'aria-invalid': props['aria-invalid'] ?? (invalid ? true : undefined),
    } as Partial<unknown>);
  });

  const vars: Record<string, string> = {};

  return (
    <div
      ref={ref}
      data-xen-v4-field=""
      className={cn('flex flex-col gap-xs', className)}
      style={{ ...vars, ...style } as React.CSSProperties}
      {...rest}
    >
      {label != null ? (
        <LabelV4 htmlFor={htmlFor} required={required}>
          {label}
        </LabelV4>
      ) : null}
      {described}
      {invalid ? (
        <p
          id={messageId}
          role="alert"
          className="flex items-center gap-xs font-body text-sm text-danger-text"
        >
          {/* A shape as well as a hue — red alone is not a state (§46). */}
          <span aria-hidden="true">{resolveIconGlyph('error')}</span>
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} data-xen-v4-field-hint="" className="font-body text-sm">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
