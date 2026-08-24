import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { countdownParts } from './format';

/** Layout of a {@link CountdownBadge}. */
export type CountdownVariant = 'inline' | 'blocks';

/** Semantic tone of the badge. */
export type CountdownTone = 'primary' | 'accent' | 'neutral';

export interface CountdownBadgeProps {
  /** Absolute target time. Ignored when `remainingMs` is given. */
  target?: Date;
  /** Explicit remaining milliseconds (wins over `target`; handy for tests). */
  remainingMs?: number;
  /** Reference "now" for computing the delta from `target` (defaults to now). */
  now?: Date;
  /** Leading caption, e.g. `Starts in`. */
  label?: string;
  /** Text shown once the target has passed. */
  elapsedLabel?: string;
  /** `inline` compact chip, or `blocks` of dd/hh/mm tiles. */
  variant?: CountdownVariant;
  /** Color tone. */
  tone?: CountdownTone;
  style?: StyleProp<ViewStyle>;
}

const TONE_BG: Record<CountdownTone, keyof SemanticColors> = {
  primary: 'primary',
  accent: 'accent',
  neutral: 'border',
};
const TONE_FG: Record<CountdownTone, keyof SemanticColors> = {
  primary: 'onPrimary',
  accent: 'onAccent',
  neutral: 'onSurface',
};

const pad = (n: number): string => String(n).padStart(2, '0');

/**
 * Countdown to an event. Accepts an absolute `target` (measured against `now`)
 * or explicit `remainingMs`. `inline` renders a single chip (`3d 04h 12m`);
 * `blocks` renders separate dd / hh / mm tiles. Once elapsed it shows
 * `elapsedLabel`. This is a pure display component — it does not tick on its
 * own; the host re-renders with a fresh `now`/`remainingMs`. Colors come from
 * the compiled theme tokens; no literal colors.
 */
export function CountdownBadge({
  target,
  remainingMs,
  now,
  label,
  elapsedLabel = 'Started',
  variant = 'inline',
  tone = 'primary',
  style,
}: CountdownBadgeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const ms =
    typeof remainingMs === 'number'
      ? remainingMs
      : target
        ? target.getTime() - (now ?? new Date()).getTime()
        : 0;
  const parts = countdownParts(ms);
  const bg = colors[TONE_BG[tone]];
  const fg = colors[TONE_FG[tone]];

  const a11y = parts.elapsed
    ? elapsedLabel
    : `${label ? `${label} ` : ''}${parts.days} days ${parts.hours} hours ${parts.minutes} minutes`;

  if (parts.elapsed) {
    return (
      <View
        accessibilityLabel={a11y}
        style={[
          { alignSelf: 'flex-start', borderRadius: tokens.radius.full, backgroundColor: colors.border, paddingVertical: tokens.spacing.xs, paddingHorizontal: tokens.spacing.md },
          style,
        ]}
      >
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{elapsedLabel}</Text>
      </View>
    );
  }

  if (variant === 'blocks') {
    const blocks: { value: string; unit: string }[] = [
      { value: pad(parts.days), unit: 'DAY' },
      { value: pad(parts.hours), unit: 'HR' },
      { value: pad(parts.minutes), unit: 'MIN' },
    ];
    return (
      <View accessibilityLabel={a11y} style={[{ gap: tokens.spacing.xs }, style]}>
        {label ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{label}</Text> : null}
        <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
          {blocks.map((b) => (
            <View
              key={b.unit}
              style={{ alignItems: 'center', minWidth: tokens.spacing['2xl'] + tokens.spacing.sm, borderRadius: tokens.radius.md, backgroundColor: bg, paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.sm }}
            >
              <Text style={{ color: fg, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>{b.value}</Text>
              <Text style={{ color: fg, fontSize: tokens.typography.scale.xs, letterSpacing: 1 }}>{b.unit}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  const compact = `${parts.days > 0 ? `${parts.days}d ` : ''}${pad(parts.hours)}h ${pad(parts.minutes)}m`;
  return (
    <View
      accessibilityLabel={a11y}
      style={[
        { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: bg, paddingVertical: tokens.spacing.xs, paddingHorizontal: tokens.spacing.md },
        style,
      ]}
    >
      {label ? <Text style={{ color: fg, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{label}</Text> : null}
      <Text style={{ color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>{compact}</Text>
    </View>
  );
}
