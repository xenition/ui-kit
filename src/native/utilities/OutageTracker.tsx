import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Button } from '../primitives';
import { withAlpha } from './internal/format';
import { outageState, type OutageState } from './internal/status';

export type { OutageState };

export interface OutageStep {
  label: string;
  time?: string;
  done?: boolean;
  current?: boolean;
}

export interface OutageTrackerProps {
  /** Outage lifecycle — drives heading, glyph, and tint (default `active`). */
  state?: OutageState;
  /** Affected area / description (e.g. "Downtown · ~1,200 customers"). */
  area?: string;
  /** Localized estimated-restoration string (hidden when resolved). */
  eta?: string;
  /** Timeline steps (default: Reported → Crew dispatched → Power restored). */
  steps?: OutageStep[];
  /** Fires when the details action is pressed; the button renders only then. */
  onDetails?: () => void;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT_STEPS: OutageStep[] = [
  { label: 'Reported', done: true },
  { label: 'Crew dispatched', current: true },
  { label: 'Power restored' },
];

/**
 * A clean-card outage progress timeline. The event state (active → danger,
 * scheduled → warn, resolved → success) is conveyed by **glyph + heading + a
 * tint that traces to a `SemanticColors` slot** — never color alone — over a
 * soft tinted header strip. A vertical timeline traces the restoration: a
 * completed step is a filled dot with a connector, the current step is ringed,
 * and pending steps are `border`-colored. The estimated restoration is shown for
 * active/scheduled events and suppressed once resolved. Token-bound throughout.
 */
export function OutageTracker({
  state = 'active',
  area,
  eta,
  steps = DEFAULT_STEPS,
  onDetails,
  style,
}: OutageTrackerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const od = outageState(state);
  const tint = colors[od.color];
  const showEta = eta != null && state !== 'resolved';

  const card = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  return (
    <View
      accessibilityLabel={`${od.heading}${area != null ? `, ${area}` : ''}`}
      style={[card, style]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          backgroundColor: withAlpha(tint, 0.1),
          padding: tokens.spacing.md,
        }}
      >
        <Icon glyph={od.glyph} size="xl" color={od.color} accessibilityLabel={od.label} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {od.heading}
          </Text>
          {area != null ? (
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>{area}</Text>
          ) : null}
          {showEta ? (
            <Text style={{ marginTop: 2, color: tint, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              Estimated restoration: {eta}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={{ marginTop: tokens.spacing.lg, gap: 0 }}>
        {steps.map((step, i) => {
          const last = i === steps.length - 1;
          const dotColor = step.done ? tint : colors.border;
          return (
            <View key={`${step.label}-${i}`} style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
              <View style={{ alignItems: 'center', width: 16 }}>
                <View
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: tokens.radius.full,
                    backgroundColor: step.done ? tint : colors.card,
                    borderWidth: step.current ? 3 : step.done ? 0 : 2,
                    borderColor: step.current ? tint : dotColor,
                  }}
                />
                {!last ? (
                  <View
                    style={{
                      flex: 1,
                      width: 2,
                      minHeight: tokens.spacing.lg,
                      backgroundColor: step.done ? tint : colors.border,
                    }}
                  />
                ) : null}
              </View>
              <View style={{ flex: 1, paddingBottom: last ? 0 : tokens.spacing.lg, gap: 2 }}>
                <Text
                  style={{
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: step.current ? '700' : '600',
                  }}
                >
                  {step.label}
                </Text>
                {step.time != null ? (
                  <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{step.time}</Text>
                ) : null}
              </View>
            </View>
          );
        })}
      </View>

      {onDetails != null ? (
        <Button variant="outline" onPress={onDetails} style={{ marginTop: tokens.spacing.md }}>
          View details
        </Button>
      ) : null}
    </View>
  );
}
