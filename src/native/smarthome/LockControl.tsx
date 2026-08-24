import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card, Icon, Button, Badge } from '../primitives';

/** State of a smart lock. */
export type LockState = 'locked' | 'unlocked' | 'jammed' | 'offline';

export interface LockControlProps {
  /** Lock display name (e.g. "Front Door"). */
  name: string;
  /** Current lock state. */
  state?: LockState;
  /** Battery percentage 0–100. Shows a low-battery hint under 20%. */
  batteryPct?: number;
  /** Fires with the requested locked value when the action button is pressed. */
  onToggle?: (next: boolean) => void;
  /** Show a spinner and block the action (command in flight). */
  busy?: boolean;
  style?: StyleProp<ViewStyle>;
}

const STATE_META: Record<
  LockState,
  { glyph: string; label: string; accent: keyof SemanticColors; tone: 'success' | 'warn' | 'danger' | 'neutral' }
> = {
  locked: { glyph: '🔒', label: 'Locked', accent: 'success', tone: 'success' },
  unlocked: { glyph: '🔓', label: 'Unlocked', accent: 'warn', tone: 'warn' },
  jammed: { glyph: '⚠️', label: 'Jammed', accent: 'danger', tone: 'danger' },
  offline: { glyph: '🚫', label: 'Offline', accent: 'muted', tone: 'neutral' },
};

/**
 * Smart-lock control — a state glyph + a status {@link Badge} over a single
 * lock/unlock {@link Button}. `state` selects the accent slot and a text label
 * (`locked`→success, `unlocked`→warn, `jammed`→danger, `offline`→muted) so the
 * status reads without color; the action button flips between "Lock"/"Unlock",
 * is danger-toned when unlocking, and is disabled when `offline`/`jammed` or
 * `busy` (which also shows a spinner). Optional `batteryPct` surfaces a low
 * hint under 20%. No literal colors.
 */
export function LockControl({
  name,
  state = 'locked',
  batteryPct,
  onToggle,
  busy = false,
  style,
}: LockControlProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATE_META[state];
  const isLocked = state === 'locked';
  const actionable = state === 'locked' || state === 'unlocked';
  const lowBattery = typeof batteryPct === 'number' && batteryPct <= 20;

  return (
    <Card variant="outlined" style={[{ opacity: state === 'offline' ? 0.7 : 1 }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors[meta.accent],
          }}
        >
          <Icon glyph={meta.glyph} color={meta.accent} size="xl" />
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginTop: 2 }}>
            <Badge tone={meta.tone} variant="soft" size="sm">
              {meta.label}
            </Badge>
            {typeof batteryPct === 'number' ? (
              <Text style={{ color: lowBattery ? colors.danger : colors.muted, fontSize: tokens.typography.scale.xs }}>
                {`🔋 ${Math.round(Math.min(Math.max(batteryPct, 0), 100))}%`}
              </Text>
            ) : null}
          </View>
        </View>
      </View>

      <View style={{ marginTop: tokens.spacing.md }}>
        <Button
          variant="primary"
          tone={isLocked ? 'default' : 'danger'}
          disabled={!actionable}
          loading={busy}
          onPress={() => onToggle?.(!isLocked)}
        >
          {state === 'offline' ? 'Unavailable' : state === 'jammed' ? 'Jammed' : isLocked ? 'Unlock' : 'Lock'}
        </Button>
      </View>
    </Card>
  );
}
