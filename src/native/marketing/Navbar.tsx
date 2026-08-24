import * as React from 'react';
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';

export interface NavbarLink {
  label: string;
  /** Fires on press (RN equivalent of the web link `href`). */
  onPress?: () => void;
  /** Marks the link as the current page (bolder tint). */
  active?: boolean;
}

export interface NavbarProps {
  /** Brand slot (logo image, wordmark, …). */
  logo?: React.ReactNode;
  /** Nav links — the web `children` become a data array (idiomatic for RN). */
  links?: NavbarLink[];
  /** Right-side slot (sign-in button, theme toggle, …), rendered as-is. */
  actions?: React.ReactNode;
  /** Accessible label for the mobile menu toggle (default `Menu`). */
  menuLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Marketing navbar — the native mirror of the web `Navbar`.
 *
 * The web version is a sticky `<header>` that gains a translucent
 * backdrop-blur bar once the page scrolls (a passive `scroll` listener +
 * `color-mix`). React Native has no page-scroll chrome, `backdrop-filter`, or
 * `color-mix`, so native **drops the sticky/scroll-blur behavior** and renders
 * a plain top bar over a translucent `surface` token. Web link `children`
 * become a `links` data array (`href`→`onPress`). On narrow layouts the links
 * collapse behind a disclosure toggle (a `Pressable` flipping a `View`), the
 * native equivalent of the web mobile menu. Token-only.
 */
export function Navbar({
  logo,
  links = [],
  actions,
  menuLabel = 'Menu',
  style,
}: NavbarProps): React.ReactElement {
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
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
    >
      <Text
        style={{
          color: link.active ? colors.primary : colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          fontWeight: link.active ? '700' : '500',
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
          backgroundColor: withAlpha(colors.surface, 0.8),
          borderBottomWidth: 1,
          borderBottomColor: withAlpha(colors.border, 0.7),
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
                width: 36,
                height: 36,
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
