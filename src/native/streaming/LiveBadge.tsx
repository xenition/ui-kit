import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { formatCount } from './types';

export type LiveBadgeVariant = 'solid' | 'outline' | 'dot';

export interface LiveBadgeProps {
  /**
   * - `solid`   — filled `danger` pill with white-on-danger text (default).
   * - `outline` — `danger` border + text on a transparent surface.
   * - `dot`     — just the pulsing dot + label, no pill chrome.
   */
  variant?: LiveBadgeVariant;
  /** Label text (default `'LIVE'`). */
  label?: string;
  /** Optional concurrent viewer count, appended after the label when set. */
  viewers?: number;
  /** Announced label; defaults to the visible text + viewers. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A "LIVE" indicator for streams — a `danger`-toned pill with a leading dot.
 * Three variants (`solid` / `outline` / `dot`) and an optional viewer count.
 * Presentational only; every color resolves from `SemanticColors` (`danger` /
 * `onDanger` / `muted`) — no literal hex.
 */
export function LiveBadge({
  variant = 'solid',
  label = 'LIVE',
  viewers,
  accessibilityLabel,
  style,
}: LiveBadgeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const solid = variant === 'solid';
  const dotOnly = variant === 'dot';

  const fg = solid ? colors.onDanger : colors.danger;
  const countText = viewers != null ? `${formatCount(viewers)} watching` : undefined;
  const a11y =
    accessibilityLabel ?? [label, countText].filter(Boolean).join(', ');

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={a11y}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          gap: tokens.spacing.xs,
          borderRadius: tokens.radius.full,
          paddingVertical: dotOnly ? 0 : 2,
          paddingHorizontal: dotOnly ? 0 : tokens.spacing.sm,
          backgroundColor: solid ? colors.danger : 'transparent',
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: variant === 'outline' ? colors.danger : 'transparent',
        },
        style,
      ]}
    >
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: tokens.radius.full,
          backgroundColor: fg,
        }}
      />
      <Text
        style={{
          color: fg,
          fontSize: tokens.typography.scale.xs,
          fontWeight: '700',
          letterSpacing: 0.5,
        }}
      >
        {label.toUpperCase()}
      </Text>
      {countText ? (
        <Text
          style={{
            color: solid ? colors.onDanger : colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '500',
          }}
        >
          {countText}
        </Text>
      ) : null}
    </View>
  );
}
