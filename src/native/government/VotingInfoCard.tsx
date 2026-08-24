import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Badge, Button, type BadgeTone } from '../primitives';
import { withAlpha } from './internal/format';

/** Voter registration status. */
export type RegistrationStatus = 'registered' | 'pending' | 'not-registered' | 'inactive';

const REG: Record<RegistrationStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  registered: { label: 'Registered', glyph: '✓', tone: 'success' },
  pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
  'not-registered': { label: 'Not registered', glyph: '!', tone: 'danger' },
  inactive: { label: 'Inactive', glyph: '✕', tone: 'neutral' },
};

export interface VotingInfoCardProps {
  /** Voter registration status — conveyed by text + glyph + color. */
  registration: RegistrationStatus;
  /** Localized upcoming election date (already formatted). */
  electionDate?: string;
  /** Name / title of the upcoming election. */
  electionName?: string;
  /** Assigned polling place name. */
  pollingPlace?: string;
  /** Polling place address. */
  pollingAddress?: string;
  /** Whether the voter is registered for mail / absentee ballot. */
  mailBallot?: boolean;
  /** Fires "Register" / "Update registration" (shown when handler present). */
  onRegister?: () => void;
  /** Fires "Find polling place" (shown when handler present). */
  onFindPolling?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A voter-information card: registration status conveyed by **text + glyph +
 * color** (never color alone), the next election, an assigned polling place, and
 * gated Register / Find-polling actions. The action label adapts to whether the
 * voter is already registered. Every color traces to a `SemanticColors` slot or
 * a token-derived tint — no literals.
 */
export function VotingInfoCard({
  registration,
  electionDate,
  electionName,
  pollingPlace,
  pollingAddress,
  mailBallot = false,
  onRegister,
  onFindPolling,
  style,
}: VotingInfoCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const reg = REG[registration] ?? REG['not-registered'];
  const isRegistered = registration === 'registered';
  const tint = reg.tone === 'neutral' ? colors.muted : colors[reg.tone];

  return (
    <Card variant="elevated" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(tint, 0.14),
          }}
        >
          <Icon glyph="🗳️" size="xl" accessibilityLabel="Voting" />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            Voter status
          </Text>
          <Badge tone={reg.tone} variant="soft" size="sm">
            {`${reg.glyph} ${reg.label}`}
          </Badge>
        </View>
        {mailBallot ? (
          <Badge tone="accent" variant="soft" size="sm">
            📮 Mail ballot
          </Badge>
        ) : null}
      </View>

      {electionName != null || electionDate != null ? (
        <View
          style={{
            marginTop: tokens.spacing.md,
            paddingTop: tokens.spacing.md,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            gap: 2,
          }}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Next election</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {[electionName, electionDate].filter((v) => v != null && v !== '').join(' · ')}
          </Text>
        </View>
      ) : null}

      {pollingPlace != null ? (
        <View style={{ marginTop: tokens.spacing.sm, gap: 2 }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Polling place</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>📍 {pollingPlace}</Text>
          {pollingAddress != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{pollingAddress}</Text>
          ) : null}
        </View>
      ) : null}

      {onRegister != null || onFindPolling != null ? (
        <View
          style={{
            marginTop: tokens.spacing.md,
            flexDirection: 'row',
            gap: tokens.spacing.sm,
            justifyContent: 'flex-end',
          }}
        >
          {onFindPolling != null ? (
            <Button size="sm" variant="outline" onPress={onFindPolling}>
              Find polling place
            </Button>
          ) : null}
          {onRegister != null ? (
            <Button size="sm" onPress={onRegister}>
              {isRegistered ? 'Update registration' : 'Register to vote'}
            </Button>
          ) : null}
        </View>
      ) : null}
    </Card>
  );
}
