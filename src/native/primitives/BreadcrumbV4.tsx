import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { minTap } from './internal/nav-v4';
import type { BreadcrumbItem, BreadcrumbProps } from './Breadcrumb';
import { pressLayer } from './internal/state-v4';

export type { BreadcrumbProps as BreadcrumbV4Props, BreadcrumbItem };

/**
 * **V4 breadcrumb** — same props as {@link Breadcrumb}, a different design
 * line.
 *
 * ## What a breadcrumb is for
 *
 * §29 asks that the user always know three things: where they are, what they
 * are editing, and how to go back. A breadcrumb is the only component in the
 * kit that answers all three at once, so the whole design is about making the
 * answer separable at a glance (§33 — users scan before they read).
 *
 * The trail therefore has exactly two registers, not a gradient of them:
 *
 * - **Where you are** is the last item, in `onSurface` at weight 600. It is
 *   the only full-contrast text in the row, so a scan finds it without
 *   counting separators.
 * - **How to go back** is everything before it, in `muted` at 400, each one a
 *   real target.
 *
 * ## The separator is a chevron, not a slash
 *
 * The base default was `/`, which reads as a path — a filesystem string the
 * user is expected to parse. `›` reads as *direction*: this came from that.
 * Same prop, same type, a different default; pass `separator` to override it
 * exactly as before. It is drawn in `muted`, because a separator that competes
 * with the labels it separates is noise (§7).
 *
 * ## Reach
 *
 * Each link is a full 44pt target, composed from the spacing scale. The base
 * trail wrapped bare `Text` in a `Pressable` with no padding at all — a 17pt
 * tap target, and the one control on the screen whose entire job is *getting
 * out of here* (§30).
 */
export function BreadcrumbV4({
  items,
  separator = '›',
  style,
}: BreadcrumbProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const size = tokens.typography.scale.sm;

  return (
    <View
      accessibilityLabel="Breadcrumb"
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: tokens.spacing.xs,
        },
        style,
      ]}
    >
      {items.map((item, index) => {
        const last = index === items.length - 1;
        const label =
          typeof item.label === 'string' ? (
            <Text
              numberOfLines={1}
              style={{
                fontSize: size,
                fontFamily: tokens.typography.fontBody,
                // Two registers only: the page you are on, and the way back.
                color: last ? colors.onSurface : colors.mutedText,
                fontWeight: last ? '600' : '400',
              }}
            >
              {item.label}
            </Text>
          ) : (
            item.label
          );

        return (
          <React.Fragment key={index}>
            {item.onPress !== undefined && !last ? (
              <Pressable
                accessibilityRole="link"
                onPress={item.onPress}
                style={({ pressed }) => ({
                  minHeight: minTap(tokens.spacing),
                  justifyContent: 'center',
                  paddingHorizontal: tokens.spacing.xs,
                  borderRadius: tokens.radius.sm,
                  backgroundColor: pressed ? pressLayer(theme) : 'transparent',
                })}
              >
                {label}
              </Pressable>
            ) : (
              <View
                accessibilityState={last ? { selected: true } : undefined}
                style={{
                  minHeight: minTap(tokens.spacing),
                  justifyContent: 'center',
                  paddingHorizontal: tokens.spacing.xs,
                }}
              >
                {label}
              </View>
            )}
            {!last ? (
              typeof separator === 'string' ? (
                <Text
                  // Decorative: a screen reader reading "chevron" between every
                  // crumb is noise, and the order already carries the nesting.
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                  style={{ fontSize: size, color: colors.mutedText }}
                >
                  {separator}
                </Text>
              ) : (
                separator
              )
            ) : null}
          </React.Fragment>
        );
      })}
    </View>
  );
}
