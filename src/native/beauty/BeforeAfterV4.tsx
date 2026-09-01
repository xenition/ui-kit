import * as React from 'react';
import { Image, PanResponder, Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { withAlpha } from '../primitives/internal/color';
import { DRAG_SLOP, HANDLE_STEP } from './internal/salon-v4';
import type { BeforeAfterProps } from './BeforeAfter';

export interface BeforeAfterV4Props extends BeforeAfterProps {
  /** Let the divider be dragged. Default `true`. */
  draggable?: boolean;
  /** How far each nudge moves the divider, in percent. Default `10`. */
  step?: number;
  /** Accessible names for the two nudge controls. */
  lessLabel?: string;
  moreLabel?: string;
  /** Shown in the panel when a URL is missing. Default: the side's own label. */
  placeholderLabel?: string;
}

const clamp = (n: number): number => Math.max(0, Math.min(100, Number.isFinite(n) ? n : 50));

/**
 * **V4 before / after** — same props as {@link BeforeAfter} plus `draggable`,
 * `step`, `lessLabel`, `moreLabel` and `placeholderLabel`.
 *
 * ## The change this component exists for
 *
 * **The base could not be slid.** `variant="split"` drew a divider at
 * `position` and offered two −/+ buttons that stepped 10% at a time. There was
 * no drag. A before/after comparison is *the* gesture-first control in a
 * beauty app, and it shipped as a pair of nudge buttons.
 *
 * V4 adds a real drag — a `PanResponder` on a grab area wide enough for a
 * thumb, over a divider still drawn as a hairline — and **keeps the nudge
 * buttons**. They are the switch-control and assistive path, and trading one
 * group of users for another is not an upgrade.
 *
 * ## Three more
 *
 * 1. **The divider reports itself as a slider** with a real value, so a
 *    screen reader says "50 percent after" and an assistive pointer can move
 *    it.
 * 2. **The placeholder is `colors.muted`**, not a translucent wash of it that
 *    borrows whatever is behind the panel.
 * 3. **The tag chips use the scrim colour**, which is dark in both schemes —
 *    the base mixed `onSurface`, which inverts, so on a dark page the labels
 *    were dark text on a near-white chip over a photograph.
 */
export function BeforeAfterV4({
  beforeUrl,
  afterUrl,
  position = 50,
  variant = 'split',
  height = 220,
  beforeLabel = 'Before',
  afterLabel = 'After',
  draggable = true,
  step = 10,
  lessLabel = 'Show less after',
  moreLabel = 'Show more after',
  placeholderLabel,
  onPositionChange,
  style,
}: BeforeAfterV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [showAfter, setShowAfter] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const pos = clamp(position);

  // The responder reads the latest values without being rebuilt each render.
  const live = React.useRef({ width, onPositionChange });
  live.current = { width, onPositionChange };

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_e, g) => Math.abs(g.dx) > DRAG_SLOP,
        onPanResponderMove: (e) => {
          const { width: w, onPositionChange: cb } = live.current;
          if (!w || !cb) return;
          cb(clamp((e.nativeEvent.locationX / w) * 100));
        },
      }),
    []
  );

  const placeholder = (label: string): React.ReactElement => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.muted,
      }}
    >
      <TextV4 size="sm" tone="onSurface">
        {placeholderLabel ?? label}
      </TextV4>
    </View>
  );

  const tag = (label: string, side: 'left' | 'right'): React.ReactElement => (
    <View
      style={{
        position: 'absolute',
        bottom: tokens.spacing.sm,
        [side]: tokens.spacing.sm,
        borderRadius: tokens.radius.sm,
        paddingHorizontal: tokens.spacing.sm,
        paddingVertical: tokens.spacing.xs / 2,
        // The shadow colour does not invert with the scheme; `onSurface` does,
        // so the base's chip turned near-white on a dark page.
        backgroundColor: withAlpha(theme.elevation.sheet.color, 0.6),
      }}
    >
      <TextV4 size="xs" weight="bold" style={{ color: tokens.ramps.neutral[50] }}>
        {label}
      </TextV4>
    </View>
  );

  if (variant === 'toggle') {
    const label = showAfter ? afterLabel : beforeLabel;
    const url = showAfter ? afterUrl : beforeUrl;
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Showing ${label}. Tap to compare.`}
        onPress={() => setShowAfter((v) => !v)}
        style={[
          {
            height,
            borderRadius: tokens.radius.lg,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: colors.border,
          },
          style,
        ]}
      >
        {url ? (
          <Image source={{ uri: url }} resizeMode="cover" style={{ flex: 1 }} />
        ) : (
          placeholder(label)
        )}
        {tag(label, 'left')}
      </Pressable>
    );
  }

  const handle = tokens.spacing.md * HANDLE_STEP;

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      <View
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        accessibilityRole="adjustable"
        accessibilityLabel={`${beforeLabel} and ${afterLabel} comparison`}
        accessibilityValue={{ min: 0, max: 100, now: Math.round(pos) }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={(e) => {
          if (!onPositionChange) return;
          if (e.nativeEvent.actionName === 'increment') onPositionChange(clamp(pos + step));
          if (e.nativeEvent.actionName === 'decrement') onPositionChange(clamp(pos - step));
        }}
        style={{
          height,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: colors.border,
        }}
        {...(draggable && onPositionChange ? panResponder.panHandlers : {})}
      >
        {beforeUrl ? (
          <Image
            source={{ uri: beforeUrl }}
            resizeMode="cover"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
        ) : (
          placeholder(beforeLabel)
        )}

        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: `${pos}%`,
            overflow: 'hidden',
          }}
        >
          {afterUrl ? (
            <Image source={{ uri: afterUrl }} resizeMode="cover" style={{ height, width: '100%' }} />
          ) : (
            placeholder(afterLabel)
          )}
        </View>

        {/* A hairline rule, a thumb-wide grab area, and a visible knob. */}
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${pos}%`,
            marginLeft: -handle / 2,
            width: handle,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={{ position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: colors.surface }} />
          <View
            style={{
              width: handle,
              height: handle,
              borderRadius: tokens.radius.full,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconV4 name="sort" size="xs" color="onSurface" />
          </View>
        </View>

        {tag(beforeLabel, 'right')}
        {tag(afterLabel, 'left')}
      </View>

      {/*
        The nudge buttons stay. They are the switch-control and keyboard path,
        and adding a drag is not a reason to take them away.
      */}
      {onPositionChange ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, justifyContent: 'center' }}>
          {[
            { label: lessLabel, glyph: '−', to: clamp(pos - step) },
            { label: moreLabel, glyph: '+', to: clamp(pos + step) },
          ].map((b) => (
            <Pressable
              key={b.label}
              accessibilityRole="button"
              accessibilityLabel={b.label}
              onPress={() => onPositionChange(b.to)}
              style={{
                width: minTap(tokens.spacing),
                height: minTap(tokens.spacing),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.full,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}
            >
              <TextV4 size="base" weight="bold" tone="onCard">
                {b.glyph}
              </TextV4>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}
