import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Button, Checkbox } from '../primitives';
import { StatusPill } from './StatusPill';
import { POLICY_STATUS_META, type PolicyStatus } from './internal';

export type PolicyAcknowledgeVariant = 'default' | 'compact';

export interface PolicyAcknowledgeProps {
  /** Policy title (e.g. "Code of Conduct"). */
  title: string;
  /** Version / revision label (e.g. "v3.1"). */
  version?: string;
  /** Pre-formatted effective date. */
  effectiveDate?: string;
  /** Short summary of what's being acknowledged. */
  summary?: string;
  /** Acknowledgement status — glyph + word pill. */
  status?: PolicyStatus;
  /** Whether the user has acknowledged (controls the checkbox + action). */
  acknowledged?: boolean;
  /** Pre-formatted acknowledgement date (shown once acknowledged). */
  acknowledgedDate?: string;
  /** Consent line next to the checkbox. */
  consentLabel?: string;
  /** Density. */
  variant?: PolicyAcknowledgeVariant;
  /** Fires with the next checked value when the consent box is toggled. */
  onToggle?: (checked: boolean) => void;
  /** Fires when the acknowledge button is pressed. */
  onAcknowledge?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A policy-acknowledgement card: title, version, effective date and a summary,
 * with a consent checkbox and an acknowledge action. Status is a glyph + word
 * pill (acknowledged → success, overdue → danger, never color alone). Once
 * acknowledged the control collapses to a confirmation line with the date. The
 * acknowledge button stays disabled until consent is checked. `compact` drops
 * the summary. All colors are theme tokens — no literals.
 */
export function PolicyAcknowledge({
  title,
  version,
  effectiveDate,
  summary,
  status,
  acknowledged = false,
  acknowledgedDate,
  consentLabel = 'I have read and agree to this policy',
  variant = 'default',
  onToggle,
  onAcknowledge,
  testID,
  style,
}: PolicyAcknowledgeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const derivedStatus: PolicyStatus = status ?? (acknowledged ? 'acknowledged' : 'pending');
  const [consented, setConsented] = React.useState(false);

  const meta = [version, effectiveDate ? `Effective ${effectiveDate}` : null].filter(Boolean).join('  ·  ');

  const handleToggle = (next: boolean): void => {
    setConsented(next);
    onToggle?.(next);
  };

  return (
    <Card variant="outlined" padding={compact ? 'sm' : 'md'} style={[{ gap: tokens.spacing.sm }, style]} testID={testID}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {title}
          </Text>
          {meta ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{meta}</Text>
          ) : null}
        </View>
        <StatusPill meta={POLICY_STATUS_META[derivedStatus]} size="sm" />
      </View>

      {!compact && summary ? (
        <Text numberOfLines={4} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {summary}
        </Text>
      ) : null}

      {acknowledged ? (
        <Text style={{ color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          ✓ Acknowledged{acknowledgedDate ? ` on ${acknowledgedDate}` : ''}
        </Text>
      ) : (
        <View style={{ gap: tokens.spacing.sm }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            <Checkbox checked={consented} onCheckedChange={handleToggle} accessibilityLabel={consentLabel} />
            <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.xs }}>{consentLabel}</Text>
          </View>
          <Button size="sm" disabled={!consented} onPress={onAcknowledge}>
            Acknowledge
          </Button>
        </View>
      )}
    </Card>
  );
}
