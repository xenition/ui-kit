import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { OUTCOME_META, type DealOutcome } from './internal';
import { BADGE_V4, toneInkOf } from './internal/crm-v4';
import type { WinLossBadgeProps } from './WinLossBadge';

export interface WinLossBadgeV4Props extends WinLossBadgeProps {
  /** Override the outcome words (`Open` / `Won` / `Lost` / `Pending`). */
  outcomeLabels?: Partial<Record<DealOutcome, string>>;
}

/**
 * **V4 win/loss badge** — same props as {@link WinLossBadge} plus
 * `outcomeLabels`.
 *
 * ## Four changes
 *
 * 1. **`size` is honoured in the `badge` variant.** On web it was destructured
 *    and read only in the `inline` branch, never forwarded to `Badge` — so
 *    `DealCard` passing `size="sm"` got an `sm` badge on native and an `md`
 *    one on web, from identical props. It is forwarded on both, over the
 *    shared `BADGE_V4` shape.
 * 2. **One pill on both platforms.** Web took `Badge`'s `solid` default while
 *    native passed `variant="soft"`, so a won deal was a saturated green pill
 *    on one platform and a tinted chip on the other — the module's single most
 *    repeated element, drawn two ways (rule C).
 * 3. **The `inline` variant is one reader stop.** The glyph and the label were
 *    two sibling `Text` nodes under a label on a `View` that was not backed by
 *    `accessible`, so the badge announced twice or not at all.
 * 4. **The glyph scales with Dynamic Type.** It carried
 *    `allowFontScaling={false}` while the word beside it scaled, so at large
 *    text sizes the pair came apart.
 */
export function WinLossBadgeV4({
  outcome,
  variant = 'badge',
  size = 'md',
  hideLabel = false,
  outcomeLabels,
  style,
}: WinLossBadgeV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const meta = OUTCOME_META[outcome];
  const word = outcomeLabels?.[outcome] ?? meta.label;
  const label = `${word} deal`;

  if (variant === 'inline') {
    const ink = toneInkOf(theme, meta.tone);
    const step = size === 'sm' ? 'xs' : 'sm';
    return (
      <View
        accessible
        accessibilityRole="text"
        accessibilityLabel={label}
        style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style]}
      >
        <TextV4 size={step} style={{ color: ink }}>
          {meta.glyph}
        </TextV4>
        {hideLabel ? null : (
          <TextV4 size={step} weight="semibold" style={{ color: ink }}>
            {word}
          </TextV4>
        )}
      </View>
    );
  }

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={label}
      style={[{ alignSelf: 'flex-start' }, style]}
    >
      {/* The shared shape, with the caller's `size` still winning. */}
      <BadgeV4 {...BADGE_V4} tone={meta.tone} size={size}>
        {hideLabel ? meta.glyph : `${meta.glyph} ${word}`}
      </BadgeV4>
    </View>
  );
}
