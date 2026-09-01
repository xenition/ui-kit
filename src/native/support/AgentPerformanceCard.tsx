import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { GradientSurface } from './internal/GradientSurface';
import { consoleGradient, consoleInk, consoleInkSoft, consoleTile, consoleBorder } from './internal/console';

/** One agent metric shown as a frosted tile (e.g. `{ label: 'Solved', value: '128' }`). */
export interface AgentStat {
  /** Short metric label (e.g. `"Solved"`, `"CSAT"`, `"Avg reply"`). */
  label: string;
  /** Pre-formatted metric value (e.g. `"128"`, `"96%"`, `"4m"`). */
  value: string;
}

export interface AgentPerformanceCardProps {
  /** Agent display name — the near-white headline on the gradient. */
  agentName: string;
  /** Optional agent avatar URL. */
  agentAvatar?: string;
  /** Metrics rendered as frosted tiles on the gradient (pre-formatted values). */
  stats: readonly AgentStat[];
  /** Reporting period caption (default `"This week"`). */
  period?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * AgentPerformanceCard — a gradient "console" stats hero for an agent. The agent
 * name and period sit as near-white ink over the console gradient; each metric
 * renders as a frosted tile with a big value and a soft label. A calm
 * peak-moment surface, dark-mode safe, every color from the compiled theme ramps
 * (token-only, no literals). Presentational — shaped stats only, nothing
 * fetches.
 */
export function AgentPerformanceCard({
  agentName,
  agentAvatar,
  stats,
  period = 'This week',
  style,
}: AgentPerformanceCardProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = consoleInk(r);
  const inkSoft = consoleInkSoft(r);

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={consoleGradient(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden', gap: tokens.spacing.lg }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <Avatar size="lg" name={agentName} src={agentAvatar} />
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '800', letterSpacing: -0.5 }}>
              {agentName}
            </Text>
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{period}</Text>
          </View>
        </View>

        {stats.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
            {stats.map((stat) => (
              <View
                key={stat.label}
                accessible
                accessibilityRole="text"
                accessibilityLabel={`${stat.label} ${stat.value}`}
                style={{
                  flexGrow: 1,
                  flexBasis: '30%',
                  gap: tokens.spacing.xs,
                  padding: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  backgroundColor: consoleTile(r),
                  borderWidth: 1,
                  borderColor: consoleBorder(r),
                }}
              >
                <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                  {stat.label}
                </Text>
                <Text style={{ color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', letterSpacing: -0.5 }}>
                  {stat.value}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
