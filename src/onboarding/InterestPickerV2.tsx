import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { EmptyState } from '../commerce';
import { GetStartedButton } from './GetStartedButton';
import type { InterestPickerProps } from './InterestPicker';

/** Drop-in for {@link InterestPicker} — identical props, different design. */
export type InterestPickerV2Props = InterestPickerProps;

/** §10: geometry only — the 44px minimum tap target a chip must clear. */
const TAP_TARGET_CLASS = 'min-h-11';

/**
 * Interest chips — V2, the editorial line. The hero runs full-bleed to the top
 * edge with no radius and no inset, and the content rises over it on a sheet
 * whose top corners are rounded and which overlaps the seam. The chips
 * themselves keep §7 exactly: they **wrap**, they never scroll sideways, and no
 * option is ever clipped out of reach.
 *
 * Same props as {@link InterestPicker}. Token-pure.
 */
export const InterestPickerV2 = React.forwardRef<HTMLDivElement, InterestPickerV2Props>(
  function InterestPickerV2(
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
    const caption = subtitle != null ? helper : undefined;
    const showHeader = onBack != null || onDismiss != null || progress != null;

    return (
      <div ref={ref} className={cn('flex flex-col bg-surface', className)} {...rest}>
        {/* Full-bleed hero: no radius, no inset, runs to the top edge. */}
        <div className="relative flex h-[38vh] items-center justify-center overflow-hidden bg-primary-50">
          {illustration ?? (
            <span className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-primary">
              <Icon glyph={logoGlyph ?? '✦'} size="3xl" color="onPrimary" />
            </span>
          )}

          {showHeader ? (
            <div className="absolute inset-x-0 top-0 flex items-center gap-sm px-sm">
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
        </div>

        {/* The sheet rises over the hero and carries everything else. */}
        <div className="-mt-xl flex flex-col gap-lg rounded-t-[var(--xen-radius-lg)] bg-surface p-xl shadow-lg">
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
              // §7 — wrap, never clip.
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
                      'inline-flex items-center gap-xs rounded-full border px-md py-sm text-sm font-semibold transition-colors',
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
      </div>
    );
  }
);
