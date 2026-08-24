import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { EmptyState, Icon, useXenitionTheme } from '../primitives';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { padAccentKey, withAlpha } from './types';
import type { TrackPadProps } from './TrackPad';

/** Same public contract as {@link TrackPad} — a drop-in alternate design. */
export type TrackPadV2Props = TrackPadProps;

/**
 * TrackPad, redesigned (v2): a **big glowing pad grid** on an elevated card.
 * Each cell is a large, tappable square with an oversized glyph; a lit pad
 * (`activePadIds`) grows a soft glow halo, a thick accent ring, a filled corner
 * beacon **and** a "LIVE" caption — the playing state never rides on color
 * alone. Empty slots render dimmed and inert. Pads spring on press and the
 * board fades in on mount. Accents trace to semantic token slots; no literals.
 * Distinct at a glance from v1's flat bordered grid. Same props.
 */
export function TrackPadV2({
  pads,
  columns = 4,
  variant = 'grid',
  activePadIds,
  label,
  emptyLabel = 'No pads assigned',
  onPadPress,
  style,
}: TrackPadV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 8 });

  if (pads.length === 0) {
    return (
      <EmptyState
        icon={<Icon glyph="🥁" size="3xl" color="muted" accessibilityLabel="Pads" />}
        title={emptyLabel}
        style={style}
      />
    );
  }

  const cols = Math.max(1, Math.trunc(Number.isFinite(columns) ? columns : 4));
  const active = new Set(activePadIds ?? []);
  const gap = tokens.spacing.sm;
  const minHeight = variant === 'compact' ? 60 : 92;

  return (
    <Animated.View
      style={[
        {
          gap: tokens.spacing.md,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          ...shadow('lg', tokens),
          opacity: enter.opacity,
          transform: enter.transform,
        },
        style,
      ]}
    >
      {label ? (
        <Text
          accessibilityRole="header"
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}
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
              <GlowPad
                name={name}
                glyph={pad.glyph}
                accent={accent}
                accentKey={accentKey}
                isEmpty={isEmpty}
                isActive={isActive}
                minHeight={minHeight}
                disabled={isEmpty || !onPadPress}
                onPress={() => onPadPress?.(pad, i)}
              />
            </View>
          );
        })}
      </View>
    </Animated.View>
  );
}

function GlowPad({
  name,
  glyph,
  accent,
  accentKey,
  isEmpty,
  isActive,
  minHeight,
  disabled,
  onPress,
}: {
  name: string;
  glyph?: string;
  accent: string;
  accentKey: TrackPadV2Props['pads'][number]['color'];
  isEmpty: boolean;
  isActive: boolean;
  minHeight: number;
  disabled: boolean;
  onPress: () => void;
}): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale(0.94);
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      {isActive ? (
        // Soft glow halo behind the lit pad (a shape cue, not color-only).
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: -3,
            left: -3,
            right: -3,
            bottom: -3,
            borderRadius: tokens.radius.lg,
            backgroundColor: withAlpha(accent, 0.3),
          }}
        />
      ) : null}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isEmpty ? `${name}, empty` : isActive ? `${name}, live` : name}
        accessibilityState={{ disabled, selected: isActive }}
        disabled={disabled}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({
          minHeight,
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.xs,
          borderRadius: tokens.radius.lg,
          borderWidth: isActive ? 2.5 : 1,
          borderColor: isEmpty ? colors.border : isActive ? accent : withAlpha(accent, 0.45),
          backgroundColor: isEmpty
            ? colors.surface
            : withAlpha(accent, pressed || isActive ? 0.34 : 0.16),
          opacity: isEmpty ? 0.45 : 1,
        })}
      >
        {isActive ? (
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              width: 9,
              height: 9,
              borderRadius: tokens.radius.full,
              backgroundColor: accent,
            }}
          />
        ) : null}
        {glyph ? (
          <Icon glyph={glyph} size="2xl" color={isEmpty ? 'muted' : accentKey ?? 'onSurface'} />
        ) : null}
        <Text
          numberOfLines={1}
          style={{
            color: isEmpty ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: isActive ? '800' : '600',
          }}
        >
          {isEmpty ? '—' : name}
        </Text>
        {isActive ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1 }}>
            LIVE
          </Text>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}
