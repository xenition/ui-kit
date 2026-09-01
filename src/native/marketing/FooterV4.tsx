import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { FooterProps, FooterColumn } from './Footer';

/** Drop-in for {@link FooterProps} — same props, the V4 "showcase" design. */
export type FooterV4Props = FooterProps;

/**
 * Drop-in for the base `FooterColumn` — the native base `Footer` has no separate
 * column sub-component (columns are supplied as the `columns` data array), so
 * `FooterColumnV4Props` aliases the base column type rather than a distinct
 * component's props.
 */
export type FooterColumnV4Props = FooterColumn;

/**
 * Footer — **V4** "showcase" design (native mirror of the web V4). A refined
 * multi-column marketing footer on `colors.surface` opened by a top hairline:
 * the `logo` brand slot above a wrapping row of link groups (`columns`, each
 * `{ title, links }`), then a bordered bottom bar carrying the legal line +
 * social/`bottom` row. NOT a gradient surface. Column headings are bold,
 * uppercase, wide-tracked; links are muted and each a `≥44px` tap target that
 * dims on press. `logo` and `bottom` are node slots. Honors every prop —
 * `logo`, `columns` (`title`/`links` with `label`/`onPress`), `bottom`. Same
 * props/behavior as {@link FooterProps}; token-only colors, no literals.
 */
export function FooterV4({
  logo,
  columns,
  bottom,
  style,
}: FooterV4Props): React.ReactElement {
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
          <View style={{ gap: tokens.spacing.md }}>{logo}</View>
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
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '800',
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
                      style={({ pressed }) => ({
                        minHeight: 44,
                        justifyContent: 'center',
                        opacity: pressed && link.onPress ? 0.6 : 1,
                      })}
                    >
                      <Text
                        style={{
                          color: colors.muted,
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
              gap: tokens.spacing.md,
            }}
          >
            {bottom}
          </View>
        </View>
      ) : null}
    </View>
  );
}
