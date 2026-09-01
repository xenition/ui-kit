import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { flowGrounds, flowMetrics, type OnboardingAccentV4 } from './internal/flow-v4';
import type { FeatureLockCardProps } from './FeatureLockCard';

export interface FeatureLockCardV4Props extends FeatureLockCardProps {
  /** Which brand slot the badge and CTA answer in. Default `'primary'`. */
  accent?: OnboardingAccentV4;
  /**
   * What the user would get — up to three short outcome lines under the
   * description.
   *
   * The base named the feature and stopped, which makes a teaser a *label on a
   * locked door*. §27-28 asks a gate to sell: the three lines are what turns
   * "Unlimited exports 🔒" into a reason to tap.
   */
  benefits?: string[];
  /**
   * A dimmed glimpse of the gated feature, drawn above the copy.
   *
   * The most persuasive thing a gate can show is the thing itself. The kit
   * ships no artwork, so this is a slot: pass a chart, a screenshot, a sample
   * row. It is rendered at reduced opacity behind nothing — no blur, because
   * React Native has no portable one and a fake blur is worse than an honest
   * dim.
   */
  preview?: React.ReactNode;
  /**
   * A price or terms hint under the CTA (e.g. `'From $4.99/mo · cancel
   * anytime'`). `xs`, `mutedText`, centred.
   */
  priceHint?: string;
}

/** How far the preview is dimmed — M3's `disabledContent`, the "not yours yet" opacity. */
const PREVIEW_OPACITY = 0.38;

/** At most this many benefit lines. A gate that lists six is a feature page. */
const MAX_BENEFITS = 3;

/**
 * **V4 locked-feature teaser** — same props as {@link FeatureLockCard} plus
 * `accent`, `benefits`, `preview` and `priceHint`.
 *
 * Still drawn as a §8 feature row so a teaser met mid-app reads as the same
 * object as the rows on the paywall it leads to.
 *
 * ## Four changes
 *
 * 1. **The badge tint survives dark mode.** The base branched on `scheme` and
 *    reached into `tokens.ramps.primary[50 | 900]` — the ramps carry the light
 *    orientation in both schemes, so the branch was a workaround for reading
 *    the wrong tokens. `flowGrounds()` mixes the tint from resolved semantic
 *    colours instead, which lands on the right side of the page with no
 *    branch, and gives the whole module one tint rather than four copies.
 * 2. **It sells.** `benefits` and `priceHint` — a gate that only names what is
 *    locked is a dead end with a lock on it (§27-28).
 * 3. **The card is raised on `card`, not flat on `surface`.** `CardV4` paints
 *    the raised ground the base line did not have, which is what makes a
 *    teaser inside a scrolling page read as an object rather than as a region.
 * 4. **The glyph takes a contrast-corrected tone.** `primaryText`, not
 *    `primary` — a fill slot used as ink measured as low as 1.3:1 on a pale
 *    seed.
 *
 * `inline` still collapses to a compact borderless row for list contexts, and
 * drops the preview and the price hint with it: a row inside a list is not the
 * place for either. **Renders nothing without a `title`** (§4.5).
 */
export function FeatureLockCardV4({
  title,
  description,
  icon = '🔒',
  planLabel = 'Pro',
  unlockLabel = 'Unlock',
  onUnlock,
  variant = 'card',
  accent = 'primary',
  benefits,
  preview,
  priceHint,
  style,
}: FeatureLockCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const grounds = flowGrounds(theme, 'plain', accent);
  const { badge } = flowMetrics(theme, 0);

  if (!title) return null;

  const lines = benefits?.filter(Boolean).slice(0, MAX_BENEFITS) ?? [];

  const row = (
    <>
      <View
        style={{
          width: badge,
          height: badge,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: grounds.badge,
        }}
      >
        <IconV4 glyph={icon} size="lg" accessibilityLabel="Locked" style={{ color: grounds.ink }} />
      </View>
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <TextV4 size="base" weight="semibold" tone="onSurface" style={{ flexShrink: 1 }}>
            {title}
          </TextV4>
          {planLabel ? (
            <BadgeV4 tone={accent === 'accent' ? 'accent' : 'primary'} size="sm">
              {planLabel}
            </BadgeV4>
          ) : null}
        </View>
        {description ? (
          <TextV4 size="sm" tone="mutedText">
            {description}
          </TextV4>
        ) : null}
      </View>
    </>
  );

  if (variant === 'inline') {
    return (
      <View
        accessibilityRole="summary"
        style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, style]}
      >
        {row}
        <ButtonV4 variant="secondary" size="sm" onPress={onUnlock} accessibilityLabel={unlockLabel}>
          {unlockLabel}
        </ButtonV4>
      </View>
    );
  }

  return (
    <CardV4 style={[{ gap: tokens.spacing.md }, style]}>
      {preview ? (
        <View
          // Not interactive and not announced: it is a picture of something the
          // user does not have yet, and a screen reader walking into it would
          // read a UI they cannot reach.
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          pointerEvents="none"
          style={{
            opacity: PREVIEW_OPACITY,
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
          }}
        >
          {preview}
        </View>
      ) : null}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        {row}
      </View>

      {lines.length > 0 ? (
        <View style={{ gap: tokens.spacing.xs }}>
          {lines.map((line) => (
            <View
              key={line}
              style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}
            >
              <IconV4 name="check" size="sm" color="successText" />
              <TextV4 size="sm" tone="onSurface" style={{ flex: 1 }}>
                {line}
              </TextV4>
            </View>
          ))}
        </View>
      ) : null}

      <ButtonV4
        variant="primary"
        size="md"
        onPress={onUnlock}
        accessibilityLabel={unlockLabel}
        style={{ alignSelf: 'stretch' }}
      >
        {unlockLabel}
      </ButtonV4>

      {priceHint ? (
        <TextV4 size="xs" tone="mutedText" align="center">
          {priceHint}
        </TextV4>
      ) : null}
    </CardV4>
  );
}
