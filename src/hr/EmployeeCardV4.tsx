import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { AvatarV4 } from '../primitives/AvatarV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { StatusPillV4 } from './StatusPillV4';
import {
  cardStateVars,
  EMPLOYMENT_META_V4,
  FOCUS_RING_CLASS,
  metaLine,
  MIN_TAP_CLASS,
  PLACEHOLDER_CLASS,
  spokenLine,
} from './internal/tone-v4';
import { EMPLOYEE_STATUS_META } from './internal';
import type { EmployeeCardProps } from './EmployeeCard';

export interface EmployeeCardV4Props extends EmployeeCardProps {
  /** Announced while the skeleton is up. Default `'Loading employee'`. */
  loadingLabel?: string;
  /** Render the hire date. Default `'Since 4 Mar 2024'`. */
  formatTenure?: (since: string) => string;
  /** Test hook. Every native `hr` component had one; no web one did. */
  testID?: string;
}

/**
 * **V4 employee card** — the web twin of the native `EmployeeCardV4`, same
 * props as {@link EmployeeCard} plus `loadingLabel`, `formatTenure` and
 * `testID`.
 *
 * ## Six changes
 *
 * 1. **Tabbing to "Email" and pressing Enter no longer opens the profile
 *    instead.** The quick-contact `<button>`s sat inside a card that `onClick`
 *    had turned into a `role="button"` with its own Enter/Space handler. The
 *    click was guarded; the keydown was not, and `preventDefault()` on the
 *    bubbled Enter cancels the button's own activation. So a keyboard user
 *    navigated away and mailed nobody. The card is now a plain container, the
 *    activation is a real `<button>` around the avatar and the identity block,
 *    and the action pills are its **siblings** — with no ancestor handler
 *    left, no guard is needed.
 * 2. **The card is one accessible name.** `Employee Ada Lovelace` replaced the
 *    subtree, so the title, the department and — the one that matters —
 *    whether she is *terminated* were never announced.
 * 3. **The skeleton is an opaque placeholder.** `bg-neutral-200` is a ramp
 *    step: it mirrors under `[data-theme="dark"]`, so the loading card was
 *    three pale slabs on a dark page. It also announced nothing while it was
 *    up, and the card stayed clickable through it.
 * 4. **Employment arrangement stops spending a status colour.**
 *    `contractor: warn` drew every contractor as a warning; the glyph already
 *    says which arrangement it is.
 * 5. **The action pills are real buttons at 44.** They were hand-rolled
 *    `bg-primary-50` / `hover:bg-primary-100` ramp steps at whatever height
 *    their padding produced; they are `ButtonV4` `soft` now, which is what the
 *    native twin already drew.
 * 6. **`Since …` is a prop.** `formatTenure` — the base concatenated an
 *    English preposition onto a date the caller had already formatted.
 */
export const EmployeeCardV4 = React.forwardRef<HTMLDivElement, EmployeeCardV4Props>(
  function EmployeeCardV4(
    {
      name,
      title,
      department,
      avatarUrl,
      employmentType,
      status,
      location,
      startDate,
      actions,
      variant = 'default',
      loading = false,
      loadingLabel = 'Loading employee',
      formatTenure,
      onClick,
      testID,
      className,
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    // A card with nobody on it is a bordered box around nothing.
    if (!name) return null;

    const compact = variant === 'compact';
    const detailed = variant === 'detailed';
    const interactive = onClick != null && !loading;
    const statusMeta = status ? EMPLOYEE_STATUS_META[status] : undefined;
    const subtitle = metaLine([title, department]);
    const tenure = startDate ? (formatTenure ?? ((s: string) => `Since ${s}`))(startDate) : undefined;
    const hasActions = !compact && Array.isArray(actions) && actions.length > 0;

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
      <Card ref={ref} data-testid={testID} className={cn('flex flex-col gap-sm', className)}>
        {loading ? (
          <div
            role="status"
            aria-live="polite"
            aria-label={loadingLabel}
            className="flex items-center gap-sm"
          >
            {/*
              The radius rides on `style`: `cn()` is a plain join with no
              tailwind-merge behind it, so a second `rounded-[…]` beside the
              placeholder's own would let stylesheet order pick the winner.
            */}
            <div
              style={{ borderRadius: 'var(--xen-radius-full)' }}
              className={cn('h-2xl w-2xl shrink-0', PLACEHOLDER_CLASS)}
            />
            <div className="flex flex-1 flex-col gap-xs">
              <div className={cn('h-md w-[60%]', PLACEHOLDER_CLASS)} />
              <div className={cn('h-sm w-[40%]', PLACEHOLDER_CLASS)} />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-sm">
              {interactive ? (
                <button
                  type="button"
                  aria-label={spokenLine([name, title, department, statusMeta?.label])}
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
              {statusMeta ? (
                <StatusPillV4 meta={statusMeta} size="sm" aria-hidden={interactive || undefined} />
              ) : null}
            </div>

            {!compact && (employmentType || detailed) ? (
              <div className="flex flex-wrap items-center gap-xs">
                {employmentType ? (
                  <StatusPillV4 meta={EMPLOYMENT_META_V4[employmentType]} size="sm" />
                ) : null}
                {detailed && location ? (
                  <span className="text-xs text-muted-text">
                    <span aria-hidden="true">📍 </span>
                    {location}
                  </span>
                ) : null}
                {detailed && tenure ? (
                  <span className="text-xs text-muted-text">{tenure}</span>
                ) : null}
              </div>
            ) : null}

            {/*
              Siblings of the card's own button, never descendants of it — the
              structural half of change 1.
            */}
            {hasActions ? (
              <div className="flex flex-wrap gap-xs">
                {actions!.map((a) => (
                  <ButtonV4
                    key={a.key}
                    variant="soft"
                    size="sm"
                    aria-label={a.label}
                    onClick={a.onClick}
                    className={MIN_TAP_CLASS}
                  >
                    <span aria-hidden="true">{a.glyph}</span>
                    <span className="ml-xs">{a.label}</span>
                  </ButtonV4>
                ))}
              </div>
            ) : null}
          </>
        )}
      </Card>
    );
  }
);
