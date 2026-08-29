import * as React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { stateMix } from '../../primitives/internal/v4-state';
import { SELECT_MIX } from '../../primitives/internal/v4-data';
import { mixToken } from '../../primitives/internal/v4-depth';
import type { SidebarGroup, SidebarItem, SidebarProps } from './Sidebar';
import { minTap } from './internal/chrome-v4';

export type { SidebarProps as SidebarV4Props, SidebarItem, SidebarGroup };

/**
 * `Sidebar`, V4 — the same props, and a rail that answers "where am I?".
 *
 * ## No shadow, and that is the point
 *
 * A persistent nav rail is **not** a layer. It is attached to the edge of the
 * page and separated by a hairline, and §11 asks that a container earn its
 * existence rather than draw a box because that looks modern. So this component
 * spends no `elevation` at all: the only V4 primitive in the chrome family that
 * deliberately does not.
 *
 * The rail genuinely does become a layer in one situation — slid in over the
 * page on a phone — and that is `AppShellV4`'s job, because the drawer is the
 * thing that is floating, not the sidebar inside it. Putting the shadow here
 * would make the persistent rail cast one onto the content beside it, which is
 * a shadow with nothing to fall from.
 *
 * ## Saying where the user is
 *
 * §29 gives navigation one job above every other: the user should always know
 * where they are, and §32 asks that they recognise it rather than recall it. The
 * base fills the current row solid `primary` — which wins the "which one"
 * question and loses the icon, the label and the group structure under a brand
 * bar, exactly what §35.6 calls colour as noise rather than hierarchy.
 *
 * V4 uses three quieter signals instead: a brand **tint** at 12% composited
 * into `surface`, the contrast-corrected `primaryText` for the label, and a
 * leading rail in `primary`. The tint is composited rather than laid on with
 * alpha, so the row owns its colour instead of borrowing whatever it sits on;
 * the rail survives for a user who cannot separate the tint from the surface at
 * all. Selection also reaches the accessibility layer, not just the pixels.
 *
 * The tint mixes the **scheme-resolved** `primary` into the scheme-resolved
 * `surface`, never `tokens.ramps.primary[50]` — the ramps carry the light
 * orientation in both schemes, so that step is the palest one on a dark page
 * too.
 *
 * Group headings move from `muted` to `mutedText`: `muted` is a decorative slot
 * with no contrast promise, and a section heading is text.
 *
 * ## Feedback
 *
 * Press is the M3 state layer — the row's own content colour over its own
 * ground, at `state.pressed`. Every row clears 44pt, composed from the spacing
 * scale; the base's `paddingVertical: sm` put it around 34.
 */
export function SidebarV4({
  brand,
  items,
  groups,
  footer,
  style,
}: SidebarProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const resolvedGroups: SidebarGroup[] = groups ?? (items ? [{ items }] : []);
  const tap = minTap(tokens.spacing);

  /** The current row's ground: brand, composited into the surface it sits on. */
  const activeGround = mixToken(colors.surface, colors.primary, SELECT_MIX);

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: colors.surface,
          borderRightWidth: 1,
          borderColor: colors.border,
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: tokens.spacing.lg,
        },
        style,
      ]}
    >
      {brand != null ? (
        <View style={{ paddingHorizontal: tokens.spacing.sm, marginBottom: tokens.spacing.md }}>
          {typeof brand === 'string' ? (
            <Text
              style={{
                color: colors.onSurface,
                fontFamily: tokens.typography.fontHeading,
                fontSize: tokens.typography.scale.lg,
                fontWeight: '700',
              }}
            >
              {brand}
            </Text>
          ) : (
            brand
          )}
        </View>
      ) : null}

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: tokens.spacing.lg }}>
        {resolvedGroups.map((group, gi) => (
          <View key={gi} style={{ gap: tokens.spacing.xs }}>
            {group.label != null ? (
              <Text
                style={{
                  // `mutedText`, not `muted`: this is text, and `muted` carries
                  // no contrast promise.
                  color: colors.mutedText,
                  fontFamily: tokens.typography.fontBody,
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  paddingHorizontal: tokens.spacing.md,
                  paddingBottom: tokens.spacing.xs,
                }}
              >
                {group.label}
              </Text>
            ) : null}
            {group.items.map((item, ii) => {
              const active = item.active === true;
              return (
                <Pressable
                  key={ii}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                  accessibilityState={{ selected: active }}
                  onPress={item.onSelect}
                  style={({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    minHeight: tap,
                    borderRadius: tokens.radius.md,
                    paddingHorizontal: tokens.spacing.md,
                    overflow: 'hidden',
                    backgroundColor: pressed
                      ? stateMix(
                          active ? activeGround : colors.surface,
                          active ? colors.primary : colors.onSurface,
                          'pressed',
                          theme.state
                        )
                      : active
                        ? activeGround
                        : 'transparent',
                  })}
                >
                  {active ? (
                    <View
                      // The signal that survives when the tint does not: a user
                      // who cannot separate a 12% brand wash from the surface
                      // can still see an edge marker.
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: tokens.spacing.sm,
                        bottom: tokens.spacing.sm,
                        width: 2,
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.primary,
                      }}
                    />
                  ) : null}
                  {item.icon != null ? <View>{item.icon}</View> : null}
                  <Text
                    numberOfLines={1}
                    style={{
                      // `primaryText`, the contrast-corrected brand ink — the
                      // plain `primary` slot is a FILL colour.
                      color: active ? colors.primaryText : colors.onSurface,
                      fontFamily: tokens.typography.fontBody,
                      fontSize: tokens.typography.scale.sm,
                      fontWeight: active ? '600' : '500',
                    }}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {footer != null ? (
        <View
          style={{
            borderTopWidth: 1,
            borderColor: colors.border,
            paddingTop: tokens.spacing.md,
          }}
        >
          {footer}
        </View>
      ) : null}
    </View>
  );
}
