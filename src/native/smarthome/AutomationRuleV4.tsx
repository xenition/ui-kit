import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card, Icon, Switch } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { AutomationRuleProps } from './AutomationRule';

/** Drop-in for {@link AutomationRuleProps} — same props, the V4 "ambient" design. */
export type AutomationRuleV4Props = AutomationRuleProps;

/**
 * AutomationRule — **V4** "ambient" design. The control-panel take on an
 * automation row: an **enabled rule glows** — when active the card takes a soft
 * `primary`-tinted wash, a primary border, and a glowing icon disc; disabled or
 * `offline` rules stay calm and muted. The "when → then" clause reads as a
 * trigger → action line, and a text `On`/`Off`/`Offline` label carries the state
 * independent of color. The enable {@link Switch} is blocked while `offline`.
 * Same props/behavior as {@link AutomationRuleProps}; token-only colors via
 * `useXenitionTheme()`.
 */
export function AutomationRuleV4({
  name,
  trigger,
  action,
  icon = '⚙️',
  enabled = false,
  offline = false,
  onToggle,
  style,
}: AutomationRuleV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const active = enabled && !offline;
  const statusLabel = offline ? 'Offline' : enabled ? 'On' : 'Off';
  const accent: keyof SemanticColors = active ? 'primary' : 'muted';

  return (
    <Card
      variant="outlined"
      style={[
        {
          opacity: offline ? 0.7 : 1,
          backgroundColor: active ? withAlpha(colors.primary, 0.08) : colors.card,
          borderColor: active ? withAlpha(colors.primary, 0.5) : colors.border,
          ...(active
            ? { shadowColor: colors.primary, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
            : {}),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {/* Glowing icon disc — the ambient signature. */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: active ? withAlpha(colors.primary, 0.16) : withAlpha(colors.onSurface, 0.05),
            borderWidth: 1,
            borderColor: active ? withAlpha(colors.primary, 0.4) : colors.border,
          }}
        >
          <Icon glyph={icon} color={accent} size="lg" />
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {name}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{statusLabel}</Text>
        </View>
        <Switch checked={enabled} disabled={offline} onCheckedChange={onToggle} accessibilityLabel={`${name} enabled`} />
      </View>

      {trigger != null || action != null ? (
        <View style={{ marginTop: tokens.spacing.sm, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
          {trigger != null ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs }}>{trigger}</Text>
          ) : null}
          {trigger != null && action != null ? (
            <Text style={{ color: active ? colors.primary : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>→</Text>
          ) : null}
          {action != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{action}</Text>
          ) : null}
        </View>
      ) : null}
    </Card>
  );
}
