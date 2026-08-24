import * as React from 'react';
import { ActivityIndicator, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Button, Card, Icon, useXenitionTheme } from '../primitives';
import { clamp, formatElapsed, type MatchmakingPhase } from './types';

export interface MatchmakingStatusProps {
  /** Current phase — drives the icon, headline, and available actions. */
  phase: MatchmakingPhase;
  /** Seconds spent searching (shown as `m:ss` while searching). */
  elapsedSeconds?: number;
  /** Players found so far (for the "3 / 10" slot readout). */
  found?: number;
  /** Total players needed. */
  needed?: number;
  /** Optional queue / mode label, e.g. `'Ranked · Solo'`. */
  queueLabel?: string;
  /** Called to cancel the search (shown while `searching`). */
  onCancel?: () => void;
  /** Called to accept a found match (shown while `found`). */
  onAccept?: () => void;
  /** Called to retry after a failure (shown while `failed`). */
  onRetry?: () => void;
  style?: StyleProp<ViewStyle>;
}

const PHASE_COPY: Record<MatchmakingPhase, { title: string; glyph: string }> = {
  idle: { title: 'Ready to queue', glyph: '🎯' },
  searching: { title: 'Finding a match…', glyph: '🔎' },
  found: { title: 'Match found!', glyph: '✅' },
  failed: { title: 'Matchmaking failed', glyph: '⚠️' },
};

/**
 * A matchmaking status panel — reflects the queue `phase` with an icon,
 * headline, a live elapsed timer + player-slot readout, and phase-appropriate
 * actions (Cancel while searching, Accept when found, Retry on failure). While
 * `searching` it shows a spinner; the phase is announced via the accessible
 * label (never conveyed by color alone). Composes `Card`, `Button`, `Icon`.
 * Token-only.
 */
export function MatchmakingStatus({
  phase,
  elapsedSeconds,
  found,
  needed,
  queueLabel,
  onCancel,
  onAccept,
  onRetry,
  style,
}: MatchmakingStatusProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const copy = PHASE_COPY[phase];
  const searching = phase === 'searching';

  const slots =
    needed != null && needed > 0
      ? `${clamp(found ?? 0, 0, needed)} / ${needed} players`
      : undefined;

  const accentColor =
    phase === 'found' ? colors.success : phase === 'failed' ? colors.danger : colors.primary;

  return (
    <Card
      style={[{ gap: tokens.spacing.md, alignItems: 'center' }, style]}
      accessible
      accessibilityRole="summary"
      accessibilityLabel={`${copy.title}${slots ? `, ${slots}` : ''}${searching && elapsedSeconds != null ? `, ${formatElapsed(elapsedSeconds)} elapsed` : ''}`}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          borderWidth: 2,
          borderColor: accentColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {searching ? (
          <ActivityIndicator color={accentColor} />
        ) : (
          <Icon glyph={copy.glyph} size="2xl" color="onSurface" />
        )}
      </View>

      <View style={{ alignItems: 'center', gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {copy.title}
        </Text>
        {queueLabel ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{queueLabel}</Text>
        ) : null}
        <View style={{ flexDirection: 'row', gap: tokens.spacing.md, marginTop: 2 }}>
          {searching && elapsedSeconds != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {formatElapsed(elapsedSeconds)}
            </Text>
          ) : null}
          {slots ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {slots}
            </Text>
          ) : null}
        </View>
      </View>

      {phase === 'found' && onAccept ? (
        <Button variant="primary" tone="success" onPress={onAccept} style={{ alignSelf: 'stretch' }} accessibilityLabel="Accept match">
          Accept
        </Button>
      ) : null}
      {phase === 'failed' && onRetry ? (
        <Button variant="primary" onPress={onRetry} style={{ alignSelf: 'stretch' }} accessibilityLabel="Retry matchmaking">
          Retry
        </Button>
      ) : null}
      {searching && onCancel ? (
        <Button variant="outline" tone="danger" onPress={onCancel} style={{ alignSelf: 'stretch' }} accessibilityLabel="Cancel search">
          Cancel
        </Button>
      ) : null}
    </Card>
  );
}
