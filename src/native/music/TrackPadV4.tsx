import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { EmptyState, Icon, useXenitionTheme } from '../primitives';
import { padAccentKey, withAlpha } from './types';
import type { TrackPadProps } from './TrackPad';

/** Drop-in for {@link TrackPadProps} — same props, the V4 "session" design. */
export type TrackPadV4Props = TrackPadProps;

/**
 * TrackPad — **V4** "session" design. The tactile take on a drum / sample pad
 * grid: pads are rounded token tiles carrying their per-cell accent
 * (position-derived or `pad.color`) as a soft tint, and an `activePadIds` pad
 * lights with a stronger accent fill + a heavier accent ring + a filled corner
 * dot + bold label (never color alone). No gradient — performance surfaces stay
 * clean and tactile; ≥44px tap targets. Honors both `variant`s (`grid` /
 * `compact`), the empty-cell state and `onPadPress(pad, index)` behavior
 * identical to {@link TrackPadProps}. Renders an `EmptyState` when there are no
 * pads. Token-only colors via `useXenitionTheme()`.
 */
export function TrackPadV4({
  pads,
  columns = 4,
  variant = 'grid',
  activePadIds,
  label,
  emptyLabel = 'No pads assigned',
  onPadPress,
  style,
}: TrackPadV4Props): React.ReactElement {
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
          // Preserve the per-cell accent exactly as the base: explicit
          // `pad.color`, else position-derived, resolved to a token color.
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
                  padding: tokens.spacing.xs,
                  borderRadius: tokens.radius.md,
                  borderWidth: isActive ? 2 : 1,
                  borderStyle: isEmpty ? 'dashed' : 'solid',
                  borderColor: isEmpty ? colors.border : isActive ? accent : withAlpha(accent, 0.4),
                  backgroundColor: isEmpty
                    ? colors.surface
                    : withAlpha(accent, pressed || isActive ? 0.3 : 0.14),
                  opacity: isEmpty ? 0.45 : 1,
                })}
              >
                {isActive ? (
                  // Non-color "playing" affordance: a filled accent corner dot.
                  <View
                    style={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      width: 8,
                      height: 8,
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
                    fontWeight: isActive ? '700' : '600',
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
