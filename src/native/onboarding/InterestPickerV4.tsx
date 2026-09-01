import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { GetStartedButtonV4 } from './GetStartedButtonV4';
import {
  FlowFooterV4,
  FlowHeaderV4,
  FlowHeadlineV4,
  FlowHeroV4,
  FlowScreenV4,
  flowGrounds,
  type OnboardingFlowV4Props,
} from './internal/flow-v4';
import type { InterestPickerProps } from './InterestPicker';

export interface InterestPickerV4Props extends InterestPickerProps, OnboardingFlowV4Props {
  /**
   * Render as a whole screen — the shared shell, with the header pinned, the
   * chips scrolling and the CTA fixed above the safe-area inset.
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
   * tapping an unselected chip did nothing, with no message and no visible
   * reason. A control that refuses a tap has to say why.
   */
  formatSelectionCount?: (selected: number, max: number) => string;
}

/**
 * **V4 interest picker** — the base's props plus `fullScreen`,
 * `formatSelectionCount` and the line's `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **The cap explains itself.** With `maxSelections` set, a live counter sits
 *    under the chips and the chips that can no longer be chosen say so through
 *    `accessibilityState` as well as opacity. The base just stopped responding.
 * 2. **Chips press.** An M3 state layer over the chip's own fill. The base had
 *    no pressed state at all, so on a slow render a tap looked ignored.
 * 3. **Unselected chips sit on `card`.** On `surface` they were the page
 *    colour with a hairline around them — the border was doing all the work,
 *    and on a dark seed the row read as a field of outlines.
 * 4. **Selected chips answer in the configured accent**, so two apps on one
 *    seed do not have identical chip rows.
 * 5. **`fullScreen`** — the shared shell, which is where the scroll, the
 *    pinned CTA and the safe-area inset come from.
 *
 * An empty `options` renders `emptyMessage`, never a bare gap. Selection stays
 * fully controlled: the component computes nothing it does not display.
 */
export function InterestPickerV4({
  options,
  selectedIds,
  onChange,
  title,
  helper,
  maxSelections,
  accessibilityLabel = 'Interests',
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
  style,
}: InterestPickerV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const grounds = flowGrounds(theme, ground, accent);
  const tap = minTap(tokens.spacing);

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

  const chips =
    options.length === 0 ? (
      <View accessibilityRole="summary" style={{ padding: tokens.spacing.lg, alignItems: 'center' }}>
        <TextV4 size="base" tone="mutedText" align="center">
          {emptyMessage}
        </TextV4>
      </View>
    ) : (
      <View
        accessibilityRole="list"
        accessibilityLabel={`${accessibilityLabel}, ${selectedSet.size} selected`}
        // §7 — wrap, never scroll. A user cannot choose what they cannot see.
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: tokens.spacing.sm,
          justifyContent: 'center',
        }}
      >
        {options.map((opt) => {
          const selected = selectedSet.has(opt.id);
          const blocked = !selected && atCap;
          const fill = selected ? grounds.fill : colors.card;
          const ink = selected ? grounds.onFill : colors.onCard;
          return (
            <Pressable
              key={opt.id}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: selected, disabled: blocked }}
              accessibilityLabel={opt.label}
              // The reason, once, on the control that is refusing — not a
              // silent no-op the way the base handled the cap.
              accessibilityHint={blocked && counter ? counter : undefined}
              disabled={blocked}
              onPress={() => toggle(opt.id)}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.xs,
                minHeight: tap,
                borderRadius: tokens.radius.full,
                borderWidth: 1,
                borderColor: selected ? grounds.fill : colors.border,
                backgroundColor: pressed ? pressOver(theme, fill, ink) : fill,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                opacity: disabledOpacity(theme.state, blocked),
              })}
            >
              {selected ? (
                <IconV4 name="check" size="sm" style={{ color: ink }} />
              ) : opt.icon ? (
                <IconV4 glyph={opt.icon} size="sm" style={{ color: ink }} />
              ) : null}
              <TextV4 size="sm" weight="semibold" style={{ color: ink }}>
                {opt.label}
              </TextV4>
            </Pressable>
          );
        })}
      </View>
    );

  const messages = (
    <>
      {counter ? (
        <TextV4 accessibilityLiveRegion="polite" size="sm" tone="mutedText" align="center">
          {counter}
        </TextV4>
      ) : null}
      {error ? (
        <View
          accessibilityLiveRegion="assertive"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.xs,
          }}
        >
          <IconV4 name="error" size="sm" color="dangerText" />
          <TextV4 size="sm" tone="dangerText">
            {error}
          </TextV4>
        </View>
      ) : null}
    </>
  );

  const header = (
    <FlowHeaderV4 onBack={onBack} onDismiss={onDismiss} progress={progress} />
  );

  const footer = onContinue ? (
    <FlowFooterV4
      secondaryLabel={onSecondary ? secondaryLabel : undefined}
      onSecondary={onSecondary}
      safeArea={fullScreen}
    >
      <GetStartedButtonV4 label={ctaLabel} loading={loading} onPress={onContinue} />
    </FlowFooterV4>
  ) : null;

  const body = (
    <>
      {showHero ? (
        <FlowHeroV4 illustration={illustration} logoGlyph={logoGlyph} grounds={grounds} />
      ) : null}
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
      <FlowScreenV4 grounds={grounds} center={false} header={header} footer={footer} style={style}>
        {body}
      </FlowScreenV4>
    );
  }

  return (
    <View style={[{ gap: tokens.spacing.lg }, style]}>
      {onBack != null || onDismiss != null || progress != null ? header : null}
      {body}
      {/* In block mode the footer is the last thing in the flow, not a pinned
          band — `marginTop: 'auto'` lets it settle at the bottom when the
          caller gave the block a height, and sit right under the chips when
          they did not. */}
      {footer ? <View style={{ marginTop: 'auto', alignSelf: 'stretch' }}>{footer}</View> : null}
    </View>
  );
}
