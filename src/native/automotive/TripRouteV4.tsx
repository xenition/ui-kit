import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { mixToken } from '../../primitives/internal/v4-depth';
import { MARKER_STEP, ROUTE_DOTS, metaLine, onPair, toneFill, type ToneV4 } from './internal/fleet-v4';
import type { RoutePoint, TripRouteProps } from './TripRoute';

export interface TripRouteV4Props extends TripRouteProps {
  /** Glyphs on the two end markers. Defaults `'A'` / `'B'`. */
  originGlyph?: string;
  destinationGlyph?: string;
  /** Announced for the whole map. Default `'Route from A to B'`. */
  formatRouteLabel?: (origin: string, destination: string) => string;
}

/** How far the map's ground travels from the card toward the brand. */
const MAP_TINT = 0.06;

/** The connector dot's diameter, as a fraction of a marker's. */
const DOT_RATIO = 0.25;

const clamp01 = (n: number): number => Math.max(0, Math.min(1, Number.isFinite(n) ? n : 0));

/**
 * **V4 trip route** — same props as {@link TripRoute} plus `originGlyph`,
 * `destinationGlyph` and `formatRouteLabel`.
 *
 * ## Four changes
 *
 * 1. **The markers use their *paired* ink.** This is the defect that put
 *    `onPair()` in `tone-v4`: the base filled each marker `colors[tone]` and
 *    inked its glyph `colors.onPrimary` regardless, so a `success` origin
 *    marker was a green disc wearing the brand's ink and whether it was
 *    readable depended on the seed. Both sides are `string`, so no type could
 *    catch it.
 * 2. **The marker's size comes off the spacing scale.** `width: 24,
 *    height: 24, marginLeft: -12, marginTop: -12` was four literals that had
 *    to stay in sync and did not scale with the seed; the offset is now
 *    derived from the diameter.
 * 3. **The map has one accessible name** naming both endpoints, rather than
 *    being a decorative box with two unlabelled discs in it.
 * 4. **The ground is a mixed tint**, not a flat neutral, so it reads as a
 *    surface behind the route in both schemes.
 */
export function TripRouteV4({
  origin,
  destination,
  waypoints = [],
  distance,
  duration,
  height = 180,
  originGlyph = 'A',
  destinationGlyph = 'B',
  formatRouteLabel,
  onPress,
  style,
}: TripRouteV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const marker = tokens.spacing.lg * MARKER_STEP;
  const dot = marker * DOT_RATIO;

  const oAt = origin.at ?? { x: 0.2, y: 0.75 };
  const dAt = destination.at ?? { x: 0.8, y: 0.25 };
  const ox = clamp01(oAt.x);
  const oy = clamp01(oAt.y);
  const dx = clamp01(dAt.x);
  const dy = clamp01(dAt.y);

  const dots = Array.from({ length: ROUTE_DOTS }, (_, i) => {
    const t = (i + 1) / (ROUTE_DOTS + 1);
    return { x: ox + (dx - ox) * t, y: oy + (dy - oy) * t };
  });

  const pin = (x: number, y: number, glyph: string, tone: ToneV4, testID: string) => (
    <View
      key={testID}
      testID={testID}
      style={{
        position: 'absolute',
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        // The offset is half the diameter, derived — not a second literal.
        marginLeft: -marker / 2,
        marginTop: -marker / 2,
        width: marker,
        height: marker,
        borderRadius: tokens.radius.full,
        backgroundColor: toneFill(theme, tone),
        borderWidth: 2,
        borderColor: colors.card,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* `onPair()`, not `onPrimary`. See the note on this component. */}
      <TextV4 size="xs" weight="bold" style={{ color: onPair(theme, tone) }}>
        {glyph}
      </TextV4>
    </View>
  );

  const label = (formatRouteLabel ?? ((a: string, b: string) => `Route from ${a} to ${b}`))(
    origin.label,
    destination.label
  );
  const caption = metaLine([distance, duration]);

  const map = (
    <View
      testID="xen-trip-route"
      style={{
        height,
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: mixToken(colors.card, colors.primary, MAP_TINT),
        overflow: 'hidden',
      }}
    >
      {dots.map((d, i) => (
        <View
          key={`dot-${i}`}
          style={{
            position: 'absolute',
            left: `${d.x * 100}%`,
            top: `${d.y * 100}%`,
            marginLeft: -dot / 2,
            marginTop: -dot / 2,
            width: dot,
            height: dot,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.primary,
          }}
        />
      ))}
      {waypoints.map((w: RoutePoint, i) =>
        w.at
          ? pin(clamp01(w.at.x), clamp01(w.at.y), String(i + 1), 'accent', `xen-route-waypoint-${i}`)
          : null
      )}
      {pin(ox, oy, originGlyph, 'success', 'xen-route-origin')}
      {pin(dx, dy, destinationGlyph, 'primary', 'xen-route-destination')}
    </View>
  );

  const body = (
    <View style={{ gap: tokens.spacing.sm }}>
      {map}
      <View style={{ gap: tokens.spacing.xs }}>
        <TextV4 size="sm" weight="semibold" tone="onSurface" numberOfLines={1}>
          {origin.label}
        </TextV4>
        <TextV4 size="sm" weight="semibold" tone="onSurface" numberOfLines={1}>
          {destination.label}
        </TextV4>
        {caption ? (
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {caption}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={metaLine([label, caption])} style={style}>
        {body}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={metaLine([label, caption])}
      onPress={onPress}
      style={({ pressed }) => [
        {
          borderRadius: tokens.radius.lg,
          backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
        },
        style,
      ]}
    >
      {body}
    </Pressable>
  );
}
