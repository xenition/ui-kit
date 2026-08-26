import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { GetStartedButton } from './GetStartedButton';
import type { InterestPickerProps } from './InterestPicker';

/** Drop-in for {@link InterestPicker} — identical props, different design. */
export type InterestPickerV3Props = InterestPickerProps;

/** §10: geometry only — the 44px minimum tap target a chip must clear. */
const TAP_TARGET_CLASS = 'min-h-11';

/**
 * Interest chips — V3, the compact line. No hero panel at all: a small badge
 * sits beside the headline on one row, the copy is left-aligned, and the chip
 * field is denser (tighter padding, no leading glyphs) so the whole step fits a
 * sheet or a short screen without scrolling.
 *
 * `illustration` is deliberately ignored — the compact line has nowhere to put a
 * hero, and silently squeezing one in is how a "compact" screen stops being
 * compact. `logoGlyph` still drives the small leading badge.
 *
 * §7 survives the density: the chips still **wrap** and are never clipped. A
 * denser row is not a licence to hide the last option.
 *
 * Same props as {@link InterestPicker}. Token-pure.
 */
export const InterestPickerV3 = React.forwardRef<HTMLDivElement, InterestPickerV3Props>(
  function InterestPickerV3(
    {
      options,
      selectedIds,
      onChange,
      title,
      helper,
      maxSelections,
      groupLabel = 'Interests',
      subtitle,
      illustration: _illustration,
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
    const caption = subtitle != null ? helper : undefined;
    const showHeader = onBack != null || onDismiss != null || progress != null;

    return (
      <div ref={ref} className={cn('flex flex-col gap-md', className)} {...rest}>
        {showHeader ? (
          <div className="flex items-center gap-sm">
            {onBack ? (
              <button type="button" aria-label="Back" onClick={onBack} className="flex h-11 w-11 items-center justify-center">
                <Icon name="chevron-left" size="xl" color="onSurface" />
              </button>
            ) : null}
            <div className="flex-1">{progress}</div>
            {onDismiss ? (
              <button type="button" aria-label="Dismiss" onClick={onDismiss} className="flex h-11 w-11 items-center justify-center">
                <Icon name="close" size="lg" color="muted" />
              </button>
            ) : null}
          </div>
        ) : null}

        {/* Small leading badge beside the headline — the compact line's stand-in
            for the hero panel. Left-aligned per §11's V3 brief. */}
        {title != null || subhead != null ? (
          <div className="flex items-center gap-md">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50">
              <Icon glyph={logoGlyph ?? '✦'} size="lg" color="primary" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-xs">
              {title ? (
                <h2>
                  <Text size="lg" weight="bold" tone="onSurface" numberOfLines={2} className="block">
                    {title}
                  </Text>
                </h2>
              ) : null}
              {subhead ? (
                <Text size="sm" tone="muted" numberOfLines={2}>
                  {subhead}
                </Text>
              ) : null}
            </div>
          </div>
        ) : null}

        {caption ? (
          <Text size="sm" tone="muted">
            {caption}
          </Text>
        ) : null}

        {options.length === 0 ? (
          <Text size="sm" tone="muted">
            {emptyMessage}
          </Text>
        ) : (
          <div
            role="group"
            aria-label={`${groupLabel}, ${selectedSet.size} selected`}
            // §7 — wrap, never clip, density or no density.
            className="flex flex-wrap gap-sm"
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
                    'inline-flex items-center gap-xs rounded-full border px-sm py-xs text-sm font-semibold transition-colors',
                    TAP_TARGET_CLASS,
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    'disabled:pointer-events-none disabled:opacity-45',
                    selected
                      ? 'border-primary bg-primary text-on-primary'
                      : 'border-border bg-surface text-on-surface'
                  )}
                >
                  {selected ? <Icon name="check" size="xs" color="onPrimary" /> : null}
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}

        {error ? (
          <p role="alert" className="flex items-center gap-xs">
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
          <div className="mt-auto flex flex-col gap-xs border-t border-border bg-surface pb-lg pt-sm">
            <GetStartedButton label={ctaLabel} loading={loading} onClick={onContinue} />
            {secondaryLabel && onSecondary ? (
              <button
                type="button"
                aria-label={secondaryLabel}
                onClick={onSecondary}
                className={cn('flex items-center justify-center text-center', TAP_TARGET_CLASS)}
              >
                <Text size="sm" weight="medium" tone="muted">
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
