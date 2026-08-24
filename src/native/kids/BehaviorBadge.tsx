import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Badge } from '../primitives';
import type { BadgeTone } from '../primitives';

export type BehaviorTone = 'positive' | 'negative' | 'neutral';

interface ToneMeta {
  glyph: string;
  badge: BadgeTone;
  sign: string;
}

const TONE_META: Record<BehaviorTone, ToneMeta> = {
  positive: { glyph: '👍', badge: 'success', sign: '+' },
  negative: { glyph: '👎', badge: 'danger', sign: '−' },
  neutral: { glyph: '•', badge: 'neutral', sign: '' },
};

export interface BehaviorBadgeProps {
  /** Behavior label, e.g. "Shared toys" or "Interrupted". */
  label: string;
  /** Whether the behavior is positive, negative, or neutral. */
  tone?: BehaviorTone;
  /** Points awarded/deducted; rendered with a +/− sign. */
  points?: number;
  /** Explicit emoji/glyph (overrides the tone's default). */
  icon?: string;
  /** Badge size. */
  size?: 'sm' | 'md';
  /** Fires when the badge is tapped. */
  onPress?: () => void;
}

/**
 * A compact behavior chip for logging conduct: an icon + label, optionally with
 * a signed point value. Positive/negative is conveyed by the glyph and the
 * numeric sign in addition to the badge tone (never color alone). Delegates all
 * color to the shared `Badge` primitive — token-only.
 */
export function BehaviorBadge({
  label,
  tone = 'neutral',
  points,
  icon,
  size = 'md',
  onPress,
}: BehaviorBadgeProps): React.ReactElement {
  const meta = TONE_META[tone] ?? TONE_META.neutral;
  const glyph = icon ?? meta.glyph;
  const pointsLabel =
    typeof points === 'number' ? ` (${meta.sign}${Math.abs(points)})` : '';
  const a11y = `${tone} behavior: ${label}${pointsLabel}`;

  const badge = (
    <Badge tone={meta.badge} variant="soft" size={size}>
      {`${glyph} ${label}${pointsLabel}`}
    </Badge>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onPress}
        style={({ pressed }) => ({ alignSelf: 'flex-start', opacity: pressed ? 0.7 : 1 })}
      >
        {badge}
      </Pressable>
    );
  }
  return (
    <View accessibilityLabel={a11y} style={{ alignSelf: 'flex-start' }}>
      {badge}
    </View>
  );
}
