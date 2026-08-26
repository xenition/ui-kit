import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { minTap } from './internal/nav-v4';
import { elevationStyle, panelSkin } from './internal/surface-v4';
import type { ToolbarAction, ToolbarProps } from './Toolbar';
import { pressLayer } from './internal/state-v4';

export type { ToolbarProps as ToolbarV4Props, ToolbarAction };

/**
 * **V4 toolbar** — same props as {@link Toolbar}, a different design line.
 *
 * ## A toolbar is not a pill
 *
 * §8 lists excessive pill-shaped controls among the tells of generic AI UI. A
 * `Segmented` thumb is a pill because the capsule IS that control; a toolbar is
 * a bar, and it keeps `radius.md` — the seed's own corner, 0 on a `sharp`
 * brand. Nothing inside it is capsuled either.
 *
 * ## Actions that are legible as actions
 *
 * The base painted every action with `colors.primary` — a FILL slot with no
 * contrast promise as text, so on a light-primary seed the toolbar's controls
 * were the least readable thing in it. V4 uses `primaryText`, the same hue
 * walked until it clears AA on the surface, and `dangerText` for a destructive
 * one. That leaves exactly two colours in the bar: the actions, and the one
 * that will delete something — different, not louder (§32).
 *
 * A disabled action drops to `muted` AND loses half its opacity, so the state
 * survives a reader who cannot separate the two colours.
 *
 * ## Reach
 *
 * Every action and the `⋯` toggle are 44pt targets composed from the spacing
 * scale. The base gave them `spacing.sm` of padding around a 14pt label —
 * about 30pt, and the `⋯` was the smallest target in the kit (§30).
 *
 * ## The overflow panel is a menu
 *
 * So it is skinned like one: `elevation.sheet` and the shared `panelSkin`, the
 * same altitude as `MenuV4` and the V4 sheets, because a kit where an overflow
 * menu and a dropdown menu look different has two answers to one question.
 * Glass applies only at `depth: 'glass'`; elevation is consumed
 * unconditionally, so a flat seed lands flat with no branch here.
 */
export function ToolbarV4({
  title,
  actions = [],
  overflowActions = [],
  style,
}: ToolbarProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [overflowOpen, setOverflowOpen] = React.useState(false);

  const renderAction = (action: ToolbarAction, inPanel: boolean): React.ReactElement => {
    const disabled = action.disabled === true;
    // `primaryText` / `dangerText`, never the FILL slots: these are words on a
    // surface, and only the text forms carry a contrast promise there.
    const color = disabled
      ? colors.mutedText
      : action.destructive === true
        ? colors.dangerText
        : colors.primaryText;

    return (
      <Pressable
        key={action.key}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={() => {
          setOverflowOpen(false);
          action.onPress?.();
        }}
        style={({ pressed }) => ({
          minHeight: minTap(tokens.spacing),
          justifyContent: 'center',
          alignItems: inPanel ? 'flex-start' : 'center',
          alignSelf: inPanel ? 'stretch' : undefined,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.radius.sm,
          opacity: disabled ? theme.state.disabledContent : 1,
          backgroundColor: pressed && !disabled ? pressLayer(theme) : 'transparent',
        })}
      >
        {typeof action.label === 'string' ? (
          <Text
            numberOfLines={1}
            style={{
              color,
              fontSize: tokens.typography.scale.sm,
              fontFamily: tokens.typography.fontBody,
              fontWeight: '600',
            }}
          >
            {action.label}
          </Text>
        ) : (
          action.label
        )}
      </Pressable>
    );
  };

  return (
    <View style={style}>
      <View
        accessibilityRole="toolbar"
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.xs,
          paddingVertical: tokens.spacing.xs,
          borderWidth: 1,
          borderColor: colors.border,
          // A bar, not a capsule (§8).
          borderRadius: tokens.radius.md,
          backgroundColor: colors.surface,
        }}
      >
        {title != null ? (
          typeof title === 'string' ? (
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                color: colors.onSurface,
                fontSize: tokens.typography.scale.base,
                fontFamily: tokens.typography.fontHeading,
                fontWeight: '600',
                paddingHorizontal: tokens.spacing.sm,
              }}
            >
              {title}
            </Text>
          ) : (
            <View style={{ flex: 1 }}>{title}</View>
          )
        ) : (
          <View style={{ flex: 1 }} />
        )}

        {actions.map((action) => renderAction(action, false))}

        {overflowActions.length > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="More actions"
            accessibilityState={{ expanded: overflowOpen }}
            onPress={() => setOverflowOpen((o) => !o)}
            style={({ pressed }) => ({
              minHeight: minTap(tokens.spacing),
              minWidth: minTap(tokens.spacing),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.sm,
              backgroundColor: pressed ? pressLayer(theme) : 'transparent',
            })}
          >
            <Text
              style={{
                color: colors.onSurface,
                fontSize: tokens.typography.scale.lg,
                fontWeight: '700',
              }}
            >
              ⋯
            </Text>
          </Pressable>
        ) : null}
      </View>

      {overflowOpen && overflowActions.length > 0 ? (
        <View
          accessibilityRole="menu"
          style={[
            {
              marginTop: tokens.spacing.xs,
              borderRadius: tokens.radius.md,
              overflow: 'hidden',
              paddingVertical: tokens.spacing.xs,
            },
            panelSkin(theme),
            elevationStyle(theme.elevation.sheet),
          ]}
        >
          {overflowActions.map((action) => renderAction(action, true))}
        </View>
      ) : null}
    </View>
  );
}
