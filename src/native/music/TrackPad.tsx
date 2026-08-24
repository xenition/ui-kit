import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { EmptyState, Icon, useXenitionTheme } from '../primitives';
import { padAccentKey, withAlpha, type PadCell } from './types';

export type TrackPadVariant = 'grid' | 'compact';

export interface TrackPadProps {
  /** The pads to render (drum / sample cells). */
  pads: PadCell[];
  /** Grid columns (default `4`). Clamped to `>= 1`. */
  columns?: number;
  /**
   * - `grid` — square, labelled pads with a glyph (default).
   * - `compact` — shorter pads for a tight strip.
   */
  variant?: TrackPadVariant;
  /** Ids of pads currently triggered/lit (playing state). */
  activePadIds?: string[];
  /** Optional header label above the grid. */
  label?: string;
  /** Message shown when there are no pads. */
  emptyLabel?: string;
  /** Fires when a (non-empty) pad is hit, with the pad and its index. */
  onPadPress?: (pad: PadCell, index: number) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A drum / sample pad grid — a UI shell only, it triggers no audio. Renders
 * `pads` as a wrapped grid of tappable cells; `activePadIds` lights a pad's
 * "playing" state via a border + a filled corner dot (never color alone), and
 * `empty` pads render dimmed and non-triggering. Hitting a live pad fires
 * `onPadPress(pad, index)`. Renders an `EmptyState` when there are no pads.
 * Pad accents come from semantic token slots (position-derived or `pad.color`);
 * no literal colors.
 */
export function TrackPad({
  pads,
  columns = 4,
  variant = 'grid',
  activePadIds,
  label,
  emptyLabel = 'No pads assigned',
  onPadPress,
  style,
}: TrackPadProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (pads.length === 0) {
    return (
      <EmptyState
        icon={<Icon glyph="🥁" size="2xl" color="muted" accessibilityLabel="Pads" />}
        title={emptyLabel}
        style={style}
      />
    );
  }

  const cols = Math.max(1, Math.trunc(Number.isFinite(columns) ? columns : 4));
  const active = new Set(activePadIds ?? []);
  const gap = tokens.spacing.xs;
  const minHeight = variant === 'compact' ? 44 : 64;

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {label ? (
        <Text
          accessibilityRole="header"
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {label}
        </Text>
      ) : null}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap }}>
        {pads.map((pad, i) => {
          const accentKey = pad.color ?? padAccentKey(i);
          const accent = colors[accentKey];
          const isEmpty = pad.empty === true;
          const isActive = active.has(pad.id);
          const name = pad.label ?? pad.note ?? `Pad ${i + 1}`;
          // Percentage width so the row wraps into `cols` columns, gap-aware.
          const widthPct = `${100 / cols}%` as const;

          return (
            <View key={pad.id} style={{ width: widthPct, padding: gap / 2 }}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={isEmpty ? `${name}, empty` : name}
                accessibilityState={{ disabled: isEmpty, selected: isActive }}
                disabled={isEmpty || !onPadPress}
                onPress={() => onPadPress?.(pad, i)}
                style={({ pressed }) => ({
                  minHeight,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  borderRadius: tokens.radius.md,
                  borderWidth: isActive ? 2 : 1,
                  borderColor: isEmpty ? colors.border : isActive ? accent : withAlpha(accent, 0.4),
                  backgroundColor: isEmpty
                    ? colors.surface
                    : withAlpha(accent, pressed || isActive ? 0.3 : 0.14),
                  opacity: isEmpty ? 0.45 : 1,
                })}
              >
                {isActive ? (
                  // Non-color "playing" affordance: a filled corner dot.
                  <View
                    style={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      width: 6,
                      height: 6,
                      borderRadius: tokens.radius.full,
                      backgroundColor: accent,
                    }}
                  />
                ) : null}
                {pad.glyph ? (
                  <Icon glyph={pad.glyph} size="lg" color={isEmpty ? 'muted' : accentKey} />
                ) : null}
                <Text
                  numberOfLines={1}
                  style={{
                    color: isEmpty ? colors.muted : colors.onSurface,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: isActive ? '700' : '500',
                  }}
                >
                  {isEmpty ? '—' : name}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}
