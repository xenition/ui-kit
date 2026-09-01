import * as React from 'react';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { GetStartedButtonV4 } from './GetStartedButtonV4';
import {
  FlowFooterV4,
  FlowHeaderV4,
  FlowHeadlineV4,
  FlowHeroV4,
  FlowScreenV4,
  flowGroundVars,
  type OnboardingFlowV4Props,
} from './internal/flow-v4';
import type { InterestPickerProps } from './InterestPicker';

export interface InterestPickerV4Props extends InterestPickerProps, OnboardingFlowV4Props {
  /**
   * Render as a whole screen — the shared shell, with the header fixed, the
   * chips scrolling and the CTA pinned above the safe-area inset.
   *
   * Default `false`, which is the base's rendering: a block the caller places.
   * `PermissionPrompt` already draws this distinction with the same prop name.
   */
  fullScreen?: boolean;
  /**
   * Build the "n of m selected" counter. Default `'3 of 5 selected'`; return
   * an empty string to hide it.
   *
   * It exists because `maxSelections` was **silently** enforced: at the cap,
   * clicking an unselected chip did nothing, with no message and no visible
   * reason. A control that refuses an interaction has to say why.
   */
  formatSelectionCount?: (selected: number, max: number) => string;
}

/**
 * **V4 interest picker** — the web twin of the native `InterestPickerV4`: the
 * base's props plus `fullScreen`, `formatSelectionCount` and the line's
 * `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **The cap explains itself.** A live counter under the chips, and the
 *    blocked chips carry `aria-disabled` with the counter as their description.
 * 2. **Chips have hover and press states**, through the shared chrome layers.
 * 3. **Unselected chips sit on `card`.** On `surface` they were the page colour
 *    with a hairline around them, so a dark page read as a field of outlines.
 * 4. **Selected chips answer in the configured accent.**
 * 5. **`fullScreen`** — the shared shell, which is where the scroll, the pinned
 *    CTA and the inset come from.
 *
 * An empty `options` renders `emptyMessage`, never a bare gap. Selection stays
 * fully controlled.
 */
export const InterestPickerV4 = React.forwardRef<HTMLDivElement, InterestPickerV4Props>(
  function InterestPickerV4(
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
      fullScreen = false,
      formatSelectionCount,
      ground = 'plain',
      accent = 'primary',
      className,
      style,
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
    const showHero = illustration != null || logoGlyph != null;

    const counter =
      maxSelections != null
        ? (formatSelectionCount ?? ((n: number, max: number) => `${n} of ${max} selected`))(
            selectedSet.size,
            maxSelections
          )
        : '';
    const counterId = React.useId();

    const chips =
      options.length === 0 ? (
        <div className="flex justify-center p-lg">
          <TextV4 size="base" tone="mutedText" align="center">
            {emptyMessage}
          </TextV4>
        </div>
      ) : (
        <div
          role="group"
          aria-label={`${groupLabel}, ${selectedSet.size} selected`}
          // §7 — wrap, never scroll. A user cannot choose what they cannot see.
          className="flex flex-wrap justify-center gap-sm"
        >
          {options.map((opt) => {
            const selected = selectedSet.has(opt.id);
            const blocked = !selected && atCap;
            return (
              <button
                key={opt.id}
                type="button"
                role="checkbox"
                aria-checked={selected}
                aria-disabled={blocked || undefined}
                // The reason, once, on the control that is refusing — not a
                // silent no-op the way the base handled the cap.
                aria-describedby={blocked && counter ? counterId : undefined}
                disabled={blocked}
                onClick={() => toggle(opt.id)}
                data-xen-v4-chrome={selected ? 'filled-primary' : 'on-surface'}
                className={cn(
                  'flex items-center justify-center gap-xs rounded-full border px-md py-sm text-sm font-semibold',
                  MIN_TAP_CLASS,
                  selected
                    ? 'border-[var(--flow-fill)] bg-[var(--flow-fill)] text-[var(--flow-on-fill)]'
                    : 'border-border bg-card text-on-card'
                )}
              >
                {selected ? (
                  <IconV4 name="check" size="sm" />
                ) : opt.icon ? (
                  <IconV4 glyph={opt.icon} size="sm" />
                ) : null}
                {opt.label}
              </button>
            );
          })}
        </div>
      );

    const messages = (
      <>
        {counter ? (
          <TextV4 id={counterId} size="sm" tone="mutedText" align="center" aria-live="polite">
            {counter}
          </TextV4>
        ) : null}
        {error ? (
          <p
            role="alert"
            className="flex items-center justify-center gap-xs text-sm text-danger-text"
          >
            <IconV4 name="error" size="sm" />
            {error}
          </p>
        ) : null}
      </>
    );

    const header = <FlowHeaderV4 onBack={onBack} onDismiss={onDismiss} progress={progress} />;

    const footer = onContinue ? (
      <FlowFooterV4
        secondaryLabel={onSecondary ? secondaryLabel : undefined}
        onSecondary={onSecondary}
        safeArea={fullScreen}
      >
        <GetStartedButtonV4 label={ctaLabel} loading={loading} onClick={onContinue} />
      </FlowFooterV4>
    ) : null;

    const body = (
      <>
        {showHero ? <FlowHeroV4 illustration={illustration} logoGlyph={logoGlyph} /> : null}
        <FlowHeadlineV4 title={title ?? ''} subtitle={subhead} />
        {caption ? (
          <TextV4 size="sm" tone="mutedText" align="center">
            {caption}
          </TextV4>
        ) : null}
        {chips}
        {messages}
      </>
    );

    if (fullScreen) {
      return (
        <FlowScreenV4
          ref={ref}
          {...rest}
          ground={ground}
          accent={accent}
          center={false}
          className={className}
          style={style}
          header={header}
          footer={footer}
        >
          {body}
        </FlowScreenV4>
      );
    }

    return (
      <div
        ref={ref}
        style={{ ...flowGroundVars(ground, accent), ...style }}
        className={cn('flex flex-col gap-lg', className)}
        {...rest}
      >
        {onBack != null || onDismiss != null || progress != null ? header : null}
        {body}
        {/* In block mode the footer is the last thing in the flow, not a pinned
            band — `mt-auto` lets it settle at the bottom when the caller gave
            the block a height, and sit under the chips when they did not. */}
        {footer ? <div className="mt-auto w-full">{footer}</div> : null}
      </div>
    );
  }
);
