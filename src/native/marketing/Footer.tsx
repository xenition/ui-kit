import * as React from 'react';
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface FooterLink {
  /** Link label. */
  label: string;
  /** Press handler (RN equivalent of the web `href`). Omit for a plain label. */
  onPress?: () => void;
}

export interface FooterColumn {
  /** Column heading. */
  title: string;
  /** Links in this group. */
  links: FooterLink[];
}

export interface FooterProps {
  /** Brand slot rendered above the columns. */
  logo?: React.ReactNode;
  /**
   * Link groups. Web accepts `FooterColumn` children; native has no
   * children-as-config, so columns are passed as data.
   */
  columns?: FooterColumn[];
  /** Bottom bar content (copyright, social row, …) — rendered as-is. */
  bottom?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Multi-column marketing footer — the native mirror of the web `Footer` +
 * `FooterColumn`. React Native can't accept typed `FooterColumn` children, so
 * the columns are supplied as a `columns` array (each `{ title, links }`) and
 * each link renders as a `Pressable` row. `logo` and `bottom` are node slots.
 * Token-only.
 */
export function Footer({
  logo,
  columns,
  bottom,
  style,
}: FooterProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        style,
      ]}
    >
      <View
        style={{
          paddingVertical: tokens.spacing['2xl'],
          paddingHorizontal: tokens.spacing.lg,
          gap: tokens.spacing.xl,
        }}
      >
        {logo !== undefined && logo !== null ? (
          <View style={{ gap: tokens.spacing.sm }}>{logo}</View>
        ) : null}

        {columns && columns.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: tokens.spacing.xl,
            }}
          >
            {columns.map((column) => (
              <View key={column.title} style={{ gap: tokens.spacing.sm, minWidth: 120 }}>
                <Text
                  style={{
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                  }}
                >
                  {column.title}
                </Text>
                <View style={{ gap: tokens.spacing.xs }}>
                  {column.links.map((link) => (
                    <Pressable
                      key={link.label}
                      accessibilityRole={link.onPress ? 'link' : 'text'}
                      accessibilityLabel={link.label}
                      disabled={!link.onPress}
                      onPress={link.onPress}
                      style={({ pressed }) => ({ opacity: pressed && link.onPress ? 0.6 : 1 })}
                    >
                      <Text
                        style={{
                          color: colors.onSurface,
                          fontSize: tokens.typography.scale.sm,
                        }}
                      >
                        {link.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      {bottom !== undefined && bottom !== null ? (
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: colors.border,
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.lg,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: tokens.spacing.sm,
            }}
          >
            {bottom}
          </View>
        </View>
      ) : null}
    </View>
  );
}
