import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Icon, Switch } from '../primitives';

export interface AutomationRuleProps {
  /** Rule name (e.g. "Lights off at sunset"). */
  name: string;
  /** Human "when" clause (e.g. "When sunset"). */
  trigger?: string;
  /** Human "then" clause (e.g. "Turn off all lights"). */
  action?: string;
  /** Leading glyph/emoji. Default "⚙️". */
  icon?: string;
  /** Whether the rule is enabled. */
  enabled?: boolean;
  /** Rule references an unreachable device — disables the toggle. */
  offline?: boolean;
  /** Fires with the requested enabled value. */
  onToggle?: (next: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * An automation rule row — name plus a "when → then" trigger/action summary and
 * an enable {@link Switch}. Enabled rules tint the glyph with `primary`; disabled
 * or `offline` rules fall back to `muted`, and a text `On`/`Off`/`Offline` label
 * carries the state independent of color. The trigger and action clauses join
 * with a token-colored arrow. `offline` blocks toggling. No literal colors.
 */
export function AutomationRule({
  name,
  trigger,
  action,
  icon = '⚙️',
  enabled = false,
  offline = false,
  onToggle,
  style,
}: AutomationRuleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const active = enabled && !offline;
  const statusLabel = offline ? 'Offline' : enabled ? 'On' : 'Off';

  return (
    <Card variant="outlined" style={[{ opacity: offline ? 0.7 : 1 }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: active ? colors.primary : colors.border,
          }}
        >
          <Icon glyph={icon} color={active ? 'primary' : 'muted'} size="lg" />
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
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>→</Text>
          ) : null}
          {action != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{action}</Text>
          ) : null}
        </View>
      ) : null}
    </Card>
  );
}
