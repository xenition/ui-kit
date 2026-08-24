import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { EmptyState, Icon, useXenitionTheme } from '../primitives';
import { padAccentKey, withAlpha } from './types';
import type { TrackPadProps } from './TrackPad';

/** Same public contract as {@link TrackPad} — a drop-in alternate design. */
export type TrackPadV3Props = TrackPadProps;

/**
 * TrackPad, redesigned (v3): a **compact minimal grid** of small flat cells —
 * no card, no shadow, hairline separators only. A lit pad (`activePadIds`)
 * reads through a tiny filled beacon plus a bolder label (never color alone);
 * empty slots dim out and stop responding. Built for a tight strip above a
 * timeline. Accents trace to semantic token slots; no literals. Distinct at a
 * glance from v1's larger labelled squares. Same props.
 */
export function TrackPadV3({
  pads,
  columns = 4,
  variant = 'grid',
  activePadIds,
  label,
  emptyLabel = 'No pads assigned',
  onPadPress,
  style,
}: TrackPadV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (pads.length === 0) {
    return (
      <EmptyState
        icon={<Icon glyph="🥁" size="lg" color="muted" accessibilityLabel="Pads" />}
        title={emptyLabel}
        style={style}
      />
    );
  }

  const cols = Math.max(1, Math.trunc(Number.isFinite(columns) ? columns : 4));
  const active = new Set(activePadIds ?? []);
  const gap = 4;
  const minHeight = variant === 'compact' ? 30 : 40;

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]}>
      {label ? (
        <Text
          accessibilityRole="header"
          style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 0.5 }}
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
          const widthPct = `${100 / cols}%` as const;
          return (
            <View key={pad.id} style={{ width: widthPct, padding: gap / 2 }}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={isEmpty ? `${name}, empty` : isActive ? `${name}, live` : name}
                accessibilityState={{ disabled: isEmpty, selected: isActive }}
                disabled={isEmpty || !onPadPress}
                onPress={() => onPadPress?.(pad, i)}
                style={({ pressed }) => ({
                  minHeight,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  paddingHorizontal: tokens.spacing.xs,
                  borderRadius: tokens.radius.sm,
                  borderWidth: 1,
                  borderColor: isEmpty ? colors.border : isActive ? accent : withAlpha(accent, 0.35),
                  backgroundColor: isEmpty
                    ? 'transparent'
                    : withAlpha(accent, pressed || isActive ? 0.22 : 0.08),
                  opacity: isEmpty ? 0.4 : 1,
                })}
              >
                {isActive ? (
                  <View
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: tokens.radius.full,
                      backgroundColor: accent,
                    }}
                  />
                ) : null}
                {pad.glyph ? <Icon glyph={pad.glyph} size="xs" color={isEmpty ? 'muted' : accentKey} /> : null}
                <Text
                  numberOfLines={1}
                  style={{
                    color: isEmpty ? colors.muted : colors.onSurface,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: isActive ? '800' : '500',
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
