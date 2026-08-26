import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { EmptyState } from '../commerce';
import { GetStartedButton } from './GetStartedButton';
import type { InterestOption } from './types';

/*
  Geometry, not theme. ONBOARDING-DESIGN-SPEC §10 allows exactly these bare
  numbers: the 44px minimum tap target a chip and a header control must clear
  (§7) — Tailwind's `min-h-11`/`h-11` — and the 56 (`h-14`) the §6 fields and the
  sticky CTA stand at. Every colour, radius, gap and font size here is a token
  class.
*/
const TAP_TARGET_CLASS = 'min-h-11';

export interface InterestPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'title'> {
  /** Choosable topics. Empty renders the empty state. */
  options: InterestOption[];
  /** Currently selected ids (controlled). */
  selectedIds: string[];
  /** Fires with the full next selection set on each toggle. */
  onChange: (selectedIds: string[]) => void;
  /** Optional heading above the chips. */
  title?: string;
  /** Optional helper line (e.g. `'Pick at least 3'`). */
  helper?: string;
  /** Cap on selections; chips past the cap disable when unselected. */
  maxSelections?: number;
  /** Accessible name for the chip group. Default `'Interests'`. */
  groupLabel?: string;
  /**
   * Supporting line under the headline (§4). Falls back to `helper` when only
   * `helper` is given, so an existing caller's one line still reads as the
   * subhead rather than disappearing.
   */
  subtitle?: string;
  /** Hero art for the step (§3). Rendered in a centred, tinted panel. */
  illustration?: React.ReactNode;
  /** Glyph for the fallback hero medallion when `illustration` is absent (§3). */
  logoGlyph?: string;
  /**
   * Header progress slot (§1/§2) — pass the segmented bars, e.g.
   * `<ProgressDots variant="bars" count={4} activeIndex={1} />`. A slot rather
   * than a `steps` number so this screen never owns the progress rendering.
   */
  progress?: React.ReactNode;
  /** Renders the header's back control. */
  onBack?: () => void;
  /** Renders the header's dismiss (✕) control. */
  onDismiss?: () => void;
  /**
   * Validation message (e.g. `'Pick at least 3 to continue'`). Rendered as a
   * `danger-text` line beside a danger glyph — never colour alone.
   */
  error?: string;
  /** Sticky-footer CTA copy. The footer is hidden without `onContinue`. */
  ctaLabel?: string;
  /** Fires from the sticky CTA. */
  onContinue?: () => void;
  /** CTA spinner + block. */
  loading?: boolean;
  /** Secondary action under the CTA (`'Skip'`). Hidden without `onSecondary`. */
  secondaryLabel?: string;
  /** Fires from the secondary link. */
  onSecondary?: () => void;
  /** Empty-state copy. Default `'No topics to choose from.'`. */
  emptyMessage?: string;
}

/**
 * Multi-select interest chips — the "personalize your feed" onboarding step,
 * built to the step anatomy in `ONBOARDING-DESIGN-SPEC.md`: an optional header
 * (back · progress · dismiss), a hero slot, a centred headline block, the chip
 * field, and an optional sticky CTA footer.
 *
 * **The chips wrap and are never clipped.** The shipped screen scrolled its
 * options horizontally and cut the last one off the right edge —
 * "Pace / Filler words / Clarity / Structure / Confiden…" — which made that
 * option impossible to choose at all, not merely hard to read. §7 is therefore
 * a hard rule here: `flex-wrap` with token gaps and no `overflow-x` container
 * anywhere in this file. A user cannot choose what they cannot see.
 *
 * Selected chips take the `primary` fill with an `on-primary` label; unselected
 * chips are `surface` with a `border` outline; both clear the 44px tap target.
 * Selection state is announced per-chip (`aria-checked`) and the running count
 * is exposed on the group label plus a polite live region. Enforces an optional
 * `maxSelections` cap and guards an empty option list with {@link EmptyState}.
 * Every new prop is optional — a caller passing only the original
 * `options`/`selectedIds`/`onChange` gets the same component it always had, in
 * better clothes. No literal colors.
 */
export const InterestPicker = React.forwardRef<HTMLDivElement, InterestPickerProps>(
  function InterestPicker(
    {
      options,
      selectedIds,
      onChange,
      title,
      helper,
      maxSelections,
      groupLabel = 'Interests',
      subtitle,
      illustration,
      logoGlyph,
      progress,
      onBack,
      onDismiss,
      error,
      ctaLabel = 'Continue',
      onContinue,
      loading = false,
      secondaryLabel,
      onSecondary,
      emptyMessage = 'No topics to choose from.',
      className,
      ...rest
    },
    ref
  ) {
    const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);
    const atCap = maxSelections != null && selectedSet.size >= maxSelections;

    const toggle = (id: string): void => {
      const next = new Set(selectedSet);
      if (next.has(id)) next.delete(id);
      else {
        if (atCap) return;
        next.add(id);
      }
      onChange(Array.from(next));
    };

    const subhead = subtitle ?? helper;
    // `helper` keeps its own slot only when it is not already doing the
    // subhead's job, so the two never print the same sentence twice.
    const caption = subtitle != null ? helper : undefined;
    const showHeader = onBack != null || onDismiss != null || progress != null;
    const showHero = illustration != null || logoGlyph != null;

    return (
      <div ref={ref} className={cn('flex flex-col gap-lg', className)} {...rest}>
        {showHeader ? (
          <div className="flex items-center gap-sm">
            {onBack ? (
              <button type="button" aria-label="Back" onClick={onBack} className="flex h-11 w-11 items-center justify-center">
                <Icon name="chevron-left" size="xl" color="onSurface" />
              </button>
            ) : (
              <span className="h-11 w-11" />
            )}
            <div className="flex flex-1 justify-center">{progress}</div>
            {onDismiss ? (
              <button type="button" aria-label="Dismiss" onClick={onDismiss} className="flex h-11 w-11 items-center justify-center">
                <Icon name="close" size="lg" color="muted" />
              </button>
            ) : (
              <span className="h-11 w-11" />
            )}
          </div>
        ) : null}

        {showHero ? (
          <div className="flex aspect-[4/3] max-h-[38vh] items-center justify-center overflow-hidden rounded-[var(--xen-radius-lg)] bg-primary-50 p-lg">
            {illustration ?? (
              <span className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-primary">
                <Icon glyph={logoGlyph} size="3xl" color="onPrimary" />
              </span>
            )}
          </div>
        ) : null}

        {title != null || subhead != null ? (
          <div className="flex flex-col gap-sm">
            {title ? (
              <h2>
                <Text size="2xl" weight="bold" tone="onSurface" align="center" numberOfLines={2} className="block">
                  {title}
                </Text>
              </h2>
            ) : null}
            {subhead ? (
              <Text size="base" tone="muted" align="center" numberOfLines={3}>
                {subhead}
              </Text>
            ) : null}
          </div>
        ) : null}

        {caption ? (
          <Text size="sm" tone="muted" align="center">
            {caption}
          </Text>
        ) : null}

        {options.length === 0 ? (
          <EmptyState title={emptyMessage} />
        ) : (
          <div
            role="group"
            aria-label={`${groupLabel}, ${selectedSet.size} selected`}
            // §7 — wrap, never scroll. This one class is the fix for an option
            // the user could not reach.
            className="flex flex-wrap justify-center gap-sm"
          >
            {options.map((opt) => {
              const selected = selectedSet.has(opt.id);
              const disabled = !selected && atCap;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="checkbox"
                  aria-checked={selected}
                  aria-label={opt.label}
                  disabled={disabled}
                  onClick={() => toggle(opt.id)}
                  className={cn(
                    'inline-flex items-center justify-center gap-xs rounded-full border px-md py-sm text-sm font-semibold transition-colors',
                    TAP_TARGET_CLASS,
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    'disabled:pointer-events-none disabled:opacity-45',
                    selected
                      ? 'border-primary bg-primary text-on-primary'
                      : 'border-border bg-surface text-on-surface'
                  )}
                >
                  {selected ? (
                    <Icon name="check" size="sm" color="onPrimary" />
                  ) : opt.icon ? (
                    <Icon glyph={opt.icon} size="sm" color="onSurface" />
                  ) : null}
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}

        {error ? (
          <p role="alert" className="flex items-center justify-center gap-xs">
            <Icon name="error" size="sm" color="danger" />
            <Text size="sm" tone="dangerText">
              {error}
            </Text>
          </p>
        ) : null}

        <p aria-live="polite" className="sr-only">
          {selectedSet.size} selected
        </p>

        {onContinue ? (
          <div className="mt-auto flex flex-col gap-sm border-t border-border bg-surface pb-lg pt-md">
            <GetStartedButton label={ctaLabel} loading={loading} onClick={onContinue} />
            {secondaryLabel && onSecondary ? (
              <button
                type="button"
                aria-label={secondaryLabel}
                onClick={onSecondary}
                className={cn('flex items-center justify-center text-center', TAP_TARGET_CLASS)}
              >
                <Text size="base" weight="medium" tone="muted">
                  {secondaryLabel}
                </Text>
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
