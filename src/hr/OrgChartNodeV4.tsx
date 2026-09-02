import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { AvatarV4 } from '../primitives/AvatarV4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { pluralizeCount } from './workforce-v4';
import {
  cardStateVars,
  FOCUS_RING_CLASS,
  indentWidth,
  metaLine,
  MIN_TAP_CLASS,
  MIN_TAP_SQUARE_CLASS,
  spokenLine,
} from './internal/tone-v4';
import type { OrgChartNodeProps } from './OrgChartNode';

export interface OrgChartNodeV4Props extends OrgChartNodeProps {
  /** Render the direct-report count. Default `'4 reports'` / `'1 report'`. */
  formatReports?: (count: number) => string;
  /** Copy on the disclosure when collapsed. Default `'Expand'`. */
  expandLabel?: string;
  /** Copy on the disclosure when expanded. Default `'Collapse'`. */
  collapseLabel?: string;
  /** Test hook. Every native `hr` component had one; no web one did. */
  testID?: string;
}

/**
 * **V4 org chart node** — the web twin of the native `OrgChartNodeV4`, same
 * props as {@link OrgChartNode} plus `formatReports`, `expandLabel`,
 * `collapseLabel` and `testID`.
 *
 * ## Six changes
 *
 * 1. **Pressing Enter on the disclosure no longer opens the person instead.**
 *    The chevron was a `<button>` inside a `<Card role="button">` carrying its
 *    own Enter/Space handler. Its click was guarded with `stopPropagation`;
 *    its keydown was not, and the card's `preventDefault()` cancels the
 *    button's own activation. So a keyboard user trying to open a branch was
 *    navigated to the manager's profile and the tree never expanded — which,
 *    on a tree, means the rest of the org is simply unreachable. The card is a
 *    plain container now and the disclosure is a **sibling** of the
 *    activation.
 * 2. **The disclosure is a 44 target.** It was 28 square — the smallest
 *    control in the module, on the affordance the whole component is for.
 * 3. **The indent is a spacing token.** `style={{ width: level * 24 }}` — a
 *    raw pixel literal in a file whose own docstring claims "no literals", and
 *    24 is not a step on the scale, so a seed that retuned its rhythm indented
 *    at the old pitch and the rail stopped lining up with anything around it.
 * 4. **`highlighted` uses the selected pair.** `bg-primary-50` is a ramp step:
 *    it mirrors under `[data-theme="dark"]`, so the focused person was a pale
 *    plate on a dark page — and the text on it kept `on-surface`, a pairing
 *    nobody had measured. `selected`/`on-selected` is the compiler's slot for
 *    exactly this and ships as a guaranteed pair.
 * 5. **The node is one accessible name.** `Org node Ada Lovelace` replaced the
 *    subtree, so the title, the department and the report count went unspoken.
 * 6. **"report"/"reports", "Expand" and "Collapse" are props.** The count
 *    pluralised by appending `'s'`, which is wrong in every language the kit
 *    is otherwise ready for.
 */
export const OrgChartNodeV4 = React.forwardRef<HTMLDivElement, OrgChartNodeV4Props>(
  function OrgChartNodeV4(
    {
      name,
      title,
      avatarUrl,
      department,
      directReports = 0,
      depth = 0,
      expandable = false,
      expanded = false,
      variant = 'default',
      onToggle,
      onClick,
      formatReports,
      expandLabel = 'Expand',
      collapseLabel = 'Collapse',
      testID,
      className,
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    // A node with nobody on it is a card with a rail beside it.
    if (!name) return null;

    const compact = variant === 'compact';
    const highlighted = variant === 'highlighted';
    const level = Math.max(0, Math.floor(Number.isFinite(depth) ? depth : 0));
    const reports = Math.max(0, Math.floor(Number.isFinite(directReports) ? directReports : 0));
    const isManager = reports > 0;
    const reportsText = isManager
      ? (formatReports ?? ((n: number) => pluralizeCount(n, 'report')))(reports)
      : undefined;
    const subtitle = metaLine([title, department]);
    const interactive = onClick != null;

    const identity = (
      <>
        <AvatarV4 size={compact ? 'sm' : 'md'} name={name} src={avatarUrl} alt="" />
        <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
          <span className="truncate text-base font-bold text-on-card">{name}</span>
          {subtitle ? <span className="truncate text-sm text-muted-text">{subtitle}</span> : null}
        </span>
      </>
    );

    return (
      <div ref={ref} data-testid={testID} className={cn('flex items-stretch', className)}>
        {level > 0 ? (
          <div className="flex justify-end" style={{ width: indentWidth(level) }} aria-hidden="true">
            <div className="w-px bg-border" />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <Card
            className={cn(
              'flex items-center gap-sm',
              highlighted && 'border-primary bg-selected text-on-selected'
            )}
          >
            {interactive ? (
              <button
                type="button"
                aria-label={spokenLine([name, title, department, reportsText])}
                onClick={onClick}
                data-xen-v4-state=""
                style={cardStateVars()}
                className={cn(
                  'flex min-w-0 flex-1 items-center gap-sm rounded-[var(--xen-radius-md)] text-left',
                  MIN_TAP_CLASS,
                  FOCUS_RING_CLASS
                )}
              >
                {identity}
              </button>
            ) : (
              <div className="flex min-w-0 flex-1 items-center gap-sm">{identity}</div>
            )}

            {reportsText ? (
              <span
                className="shrink-0 text-xs font-semibold text-muted-text"
                aria-hidden={interactive || undefined}
              >
                {reportsText}
              </span>
            ) : null}

            {/*
              A sibling of the activation, never a descendant of it — the whole
              fix. A tree whose branches cannot be opened from the keyboard is
              a tree with one visible level.
            */}
            {expandable ? (
              <button
                type="button"
                aria-label={`${expanded ? collapseLabel : expandLabel} ${name}`}
                aria-expanded={expanded}
                onClick={() => onToggle?.(!expanded)}
                data-xen-v4-state=""
                style={cardStateVars()}
                className={cn(
                  'inline-flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]',
                  'text-on-card',
                  MIN_TAP_SQUARE_CLASS,
                  FOCUS_RING_CLASS
                )}
              >
                <span aria-hidden="true">{expanded ? '▾' : '▸'}</span>
              </button>
            ) : null}
          </Card>
        </div>
      </div>
    );
  }
);
