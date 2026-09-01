import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from './internal';

/** Accent tone for a stat tile — one primary accent, plus the semantic set. */
export type QueueOverviewTone = 'primary' | 'success' | 'warn' | 'danger' | 'muted';

/** A single queue metric shown as a calm stat tile. */
export interface QueueStatItem {
  /** Muted caption under the value (e.g. "Open tickets"). */
  label: string;
  /** Headline value — a big numeral (number) or preformatted string (e.g. "1.2k", "98%"). */
  value: string | number;
  /** Accent tone for the value + optional delta emphasis. Defaults to `primary`. */
  tone?: QueueOverviewTone;
  /** Signed change vs. the prior period; colored by sign (▲ success / ▼ danger). */
  delta?: number;
}

export interface QueueOverviewProps {
  /** The queue metrics to display, left→right, wrapping on small widths. */
  stats: readonly QueueStatItem[];
  /** Optional section heading above the tile strip. */
  title?: string;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
}

// Tone → SemanticColors slot for the big value numeral. Token-only (no hex).
const VALUE_SLOT: Record<QueueOverviewTone, keyof SemanticColors> = {
  primary: 'primaryText',
  success: 'successText',
  warn: 'warnText',
  danger: 'dangerText',
  muted: 'onSurface',
};

/**
 * QueueOverview — **V4** "calm console" dashboard strip. A responsive
 * row of elevated stat tiles giving a helpdesk queue its at-a-glance vitals
 * ("Open", "Waiting", "Breached SLA", "CSAT"). Each tile is a big value numeral
 * with a muted caption and an optional signed delta colored by sign (▲ up /
 * ▼ down). One accent = primary; other tones swap in a semantic accent. Tiles
 * wrap onto new rows on narrow widths. Presentational only — shaped data in, no
 * fetching. Token-only colors via `useXenitionTheme()`; NO gradients.
 * Dark-mode safe.
 */
export function QueueOverview({ stats, title, style }: QueueOverviewProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      accessibilityRole="summary"
      accessibilityLabel={title ?? 'Queue overview'}
      style={[{ gap: tokens.spacing.md }, style]}
    >
      {title ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          {title}
        </Text>
      ) : null}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }}>
        {stats.map((stat, i) => {
          const tone = stat.tone ?? 'primary';
          const valueColor = colors[VALUE_SLOT[tone] ?? 'primaryText'];
          const hasDelta = typeof stat.delta === 'number' && Number.isFinite(stat.delta);
          const up = hasDelta && stat.delta! > 0;
          const down = hasDelta && stat.delta! < 0;
          const deltaText = hasDelta
            ? `${up ? '▲' : down ? '▼' : ''} ${Math.abs(stat.delta!)}`.trim()
            : null;
          const deltaColor = up ? colors.successText : down ? colors.dangerText : colors.muted;
          return (
            <View
              key={`${stat.label}-${i}`}
              accessible
              accessibilityLabel={`${stat.label}: ${String(stat.value)}${
                deltaText ? `, change ${up ? 'up' : 'down'} ${Math.abs(stat.delta!)}` : ''
              }`}
              style={{
                flexGrow: 1,
                flexBasis: 140,
                minWidth: 140,
                gap: 4,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: tone === 'primary' ? withAlpha(colors.primary, 0.12) : colors.card,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.06,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
                elevation: 2,
              }}
            >
              <Text style={{ color: valueColor, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
                {String(stat.value)}
              </Text>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>
                {stat.label}
              </Text>
              {deltaText ? (
                <Text style={{ color: deltaColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                  {deltaText}
                </Text>
              ) : null}
            </View>
          );
        })}
      </View>
    </View>
  );
}
