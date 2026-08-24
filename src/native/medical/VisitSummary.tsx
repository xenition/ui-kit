import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface VisitSummarySection {
  /** Section heading, e.g. "Assessment". */
  heading: string;
  /** Section body text. */
  body: string;
}

export interface VisitSummaryProps {
  /** Visit title, e.g. "Follow-up visit". */
  title: string;
  /** Provider name. */
  provider?: string;
  /** Visit date line. */
  date?: string;
  /** Primary diagnosis / reason, highlighted at the top. */
  diagnosis?: string;
  /** Structured note sections (assessment, plan, instructions, …). */
  sections?: VisitSummarySection[];
  /** Skeleton placeholder while the summary loads. */
  loading?: boolean;
  /** Message shown when there is no content. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A visit / encounter summary card: title, provider + date, a highlighted
 * diagnosis chip, and any number of structured note sections (assessment, plan,
 * instructions). Renders loading and empty states. Informational UI only — not
 * a medical device. Token-only colors.
 */
export function VisitSummary({
  title,
  provider,
  date,
  diagnosis,
  sections,
  loading = false,
  emptyLabel = 'No visit notes available',
  style,
}: VisitSummaryProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = sections ?? [];
  const meta = [provider, date].filter(Boolean) as string[];

  const shell = (children: React.ReactNode, label?: string): React.ReactElement => (
    <View
      accessibilityLabel={label}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (loading) {
    return shell(
      <>
        <View style={{ height: 16, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        <View style={{ height: 12, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        <View style={{ height: 12, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
      </>,
      'Loading visit summary'
    );
  }

  return shell(
    <>
      <View style={{ gap: 3 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>{title}</Text>
        {meta.length ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{meta.join('  ·  ')}</Text>
        ) : null}
      </View>

      {diagnosis ? (
        <View
          style={{
            alignSelf: 'flex-start',
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.full,
            backgroundColor: tokens.ramps.primary[100],
          }}
        >
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            🩺 {diagnosis}
          </Text>
        </View>
      ) : null}

      {list.length === 0 && !diagnosis ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      ) : (
        list.map((s, i) => (
          <View key={`${s.heading}-${i}`} style={{ gap: 2 }}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }}>
              {s.heading}
            </Text>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{s.body}</Text>
          </View>
        ))
      )}
    </>,
    `Visit summary: ${title}`
  );
}
