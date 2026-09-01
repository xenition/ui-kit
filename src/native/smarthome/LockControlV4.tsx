import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card, Icon, Button, Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { LockControlProps, LockState } from './LockControl';

/** Drop-in for {@link LockControlProps} — same props, the V4 "ambient" design. */
export type LockControlV4Props = LockControlProps;

const STATE_META: Record<
  LockState,
  { glyph: string; label: string; accent: keyof SemanticColors; tone: 'success' | 'warn' | 'danger' | 'primary' | 'neutral'; glow: boolean }
> = {
  locked: { glyph: '🔒', label: 'Locked', accent: 'primary', tone: 'primary', glow: false },
  unlocked: { glyph: '🔓', label: 'Unlocked', accent: 'warn', tone: 'warn', glow: true },
  jammed: { glyph: '⚠️', label: 'Jammed', accent: 'danger', tone: 'danger', glow: false },
  offline: { glyph: '🚫', label: 'Offline', accent: 'muted', tone: 'neutral', glow: false },
};

/**
 * LockControl — **V4** "ambient" design. A calm control-panel lock: a **big state
 * glyph sits in a state-tinted disc** — `locked` takes the primary slot,
 * `unlocked` glows softly (warn wash + shadow) so an open lock reads at a glance,
 * `jammed`→danger, `offline`→muted. A status {@link Badge} + optional low-battery
 * hint keep the meaning textual (never color alone), over a single big
 * lock/unlock {@link Button} (≥44px). The action flips between "Lock"/"Unlock",
 * is danger-toned when unlocking, and is disabled when `offline`/`jammed` or
 * `busy` (which also shows a spinner). Same props/behavior as
 * {@link LockControlProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`.
 */
export function LockControlV4({
  name,
  state = 'locked',
  batteryPct,
  onToggle,
  busy = false,
  style,
}: LockControlV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATE_META[state];
  const isLocked = state === 'locked';
  const actionable = state === 'locked' || state === 'unlocked';
  const lowBattery = typeof batteryPct === 'number' && batteryPct <= 20;
  const accent = colors[meta.accent];

  return (
    <Card
      variant="outlined"
      style={[
        { opacity: state === 'offline' ? 0.7 : 1 },
        meta.glow
          ? { shadowColor: accent, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
          : null,
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {/* State-tinted lock disc — glows soft when unlocked. */}
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(accent, 0.12),
            borderWidth: 1,
            borderColor: withAlpha(accent, meta.glow ? 0.5 : 0.4),
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
