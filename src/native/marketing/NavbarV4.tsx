import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { NavbarProps, NavbarLink } from './Navbar';

/** Drop-in for {@link NavbarProps} — same props, the V4 "showcase" design. */
export type NavbarV4Props = NavbarProps;

/**
 * Navbar — **V4** "showcase" design (native mirror of the web V4). NOT a
 * gradient surface: a crisp, refined marketing bar on a solid `surface` ground
 * with a clean bottom border, a bolder brand slot, and clear links. Web link
 * `children` become the `links` data array (`href` → `onPress`); on narrow
 * layouts they collapse behind a disclosure toggle. Honors every prop of
 * {@link NavbarProps} (`logo`/`links`/`actions`/`menuLabel`); ≥44px tap
 * targets; token-only colors, no literals.
 */
export function NavbarV4({
  logo,
  links = [],
  actions,
  menuLabel = 'Menu',
  style,
}: NavbarV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [open, setOpen] = React.useState(false);

  const renderLink = (link: NavbarLink, i: number): React.ReactElement => (
    <Pressable
      key={i}
      accessibilityRole="link"
      accessibilityState={{ selected: link.active }}
      onPress={() => {
        setOpen(false);
        link.onPress?.();
      }}
      style={({ pressed }) => ({
        minHeight: 44,
        justifyContent: 'center',
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <Text
        style={{
          color: link.active ? colors.primary : colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          fontWeight: link.active ? '800' : '600',
          paddingVertical: tokens.spacing.xs,
        }}
      >
        {link.label}
      </Text>
    </Pressable>
  );

  return (
    <View
      testID="xen-navbar"
      style={[
        {
          backgroundColor: colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      {/* top bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
          paddingVertical: tokens.spacing.sm,
        }}
      >
        {logo !== undefined ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>{logo}</View>
        ) : (
          <View />
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
          }}
        >
          {actions !== undefined && actions !== null ? actions : null}
          {links.length > 0 ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={menuLabel}
              accessibilityState={{ expanded: open }}
              onPress={() => setOpen((prev) => !prev)}
              style={({ pressed }) => ({
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.sm,
                opacity: pressed ? 0.6 : 1,
              })}
            >
              {/* token-drawn hamburger / close glyph (no icon lib) */}
              {open ? (
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg }}>
                  ✕
                </Text>
              ) : (
                <View style={{ width: 18, gap: 4 }}>
                  {[0, 1, 2].map((i) => (
                    <View
                      key={i}
                      style={{ height: 2, borderRadius: 1, backgroundColor: colors.onSurface }}
                    />
                  ))}
                </View>
              )}
            </Pressable>
          ) : null}
        </View>
      </View>

      {/* disclosure menu */}
      {open && links.length > 0 ? (
        <View
          testID="xen-navbar-menu"
          style={{
            borderTopWidth: 1,
            borderTopColor: withAlpha(colors.border, 0.7),
            backgroundColor: colors.surface,
            paddingHorizontal: tokens.spacing.lg,
            paddingVertical: tokens.spacing.md,
            gap: tokens.spacing.sm,
          }}
        >
          {links.map(renderLink)}
        </View>
      ) : null}
    </View>
  );
}
