import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  CASE_PRIORITY_META,
  CASE_STATUS_META,
  PRACTICE_AREA_META,
  type CasePriority,
  type CaseStatus,
  type PracticeArea,
} from './internal';

export type CaseCardVariant = 'default' | 'compact' | 'detailed';

export interface CaseCardProps {
  /** Case / docket number (e.g. "2026-CV-01184"). */
  caseNumber: string;
  /** Case caption / title. */
  title: string;
  /** Client name. */
  client?: string;
  /** Area of practice — glyph + word chip. */
  practiceArea?: PracticeArea;
  /** Lifecycle state — glyph + word chip, never color alone. */
  status?: CaseStatus;
  /** Priority — glyph + word chip. */
  priority?: CasePriority;
  /** Lead attorney of record (detailed variant). */
  leadAttorney?: string;
  /** Pre-formatted next-event label (detailed variant). */
  nextEvent?: string;
  /** Visual density / emphasis. */
  variant?: CaseCardVariant;
  /** Render a placeholder skeleton instead of content. */
  loading?: boolean;
  /** Tap handler for the whole card (open the case). */
  onPress?: () => void;
  /** Explicit "Open case" affordance; renders a footer button when provided. */
  onOpen?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Summary card for a single case / matter file: docket number, caption, client,
 * and practice-area / status / priority chips (each a glyph + word so state
 * never rests on color alone). `compact` trims to a header row for lists;
 * `detailed` adds lead attorney and the next scheduled event. An optional
 * `onOpen` renders an explicit "Open case" button. Renders a `loading` skeleton
 * on demand. All colors are theme tokens — no literals.
 */
export function CaseCard({
  caseNumber,
  title,
  client,
  practiceArea,
  status,
  priority,
  leadAttorney,
  nextEvent,
  variant = 'default',
  loading = false,
  onPress,
  onOpen,
  testID,
  style,
}: CaseCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const detailed = variant === 'detailed';
  const closed = status === 'closed';

  const body = (
    <Card
      variant="outlined"
      padding={compact ? 'sm' : 'md'}
      style={[{ gap: tokens.spacing.sm, opacity: closed ? 0.7 : 1 }, style]}
    >
      {loading ? (
        <View accessibilityLabel="Loading case" style={{ gap: tokens.spacing.xs }}>
          <View style={{ height: tokens.typography.scale.xs, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: tokens.typography.scale.base, width: '75%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: tokens.typography.scale.sm, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        </View>
      ) : (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', letterSpacing: 0.4 }}>
                {caseNumber}
              </Text>
              <Text numberOfLines={compact ? 1 : 2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
                {title}
              </Text>
              {client ? (
                <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                  {client}
                </Text>
              ) : null}
            </View>
            {status ? <StatusPill meta={CASE_STATUS_META[status]} size="sm" /> : null}
          </View>

          {!compact && (practiceArea || priority) ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs }}>
              {practiceArea ? <StatusPill meta={PRACTICE_AREA_META[practiceArea]} variant="soft" size="sm" /> : null}
              {priority ? <StatusPill meta={CASE_PRIORITY_META[priority]} variant="soft" size="sm" /> : null}
            </View>
          ) : null}

          {detailed && (leadAttorney || nextEvent) ? (
            <View style={{ gap: 2 }}>
              {leadAttorney ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Lead: {leadAttorney}</Text>
              ) : null}
              {nextEvent ? (
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>⏭ {nextEvent}</Text>
              ) : null}
            </View>
          ) : null}

          {onOpen ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Open case ${caseNumber}`}
              onPress={onOpen}
              style={({ pressed }) => ({
                alignSelf: 'flex-start',
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>Open case</Text>
            </Pressable>
          ) : null}
        </>
      )}
    </Card>
  );

  if (onPress && !loading) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Case ${caseNumber}: ${title}`} onPress={onPress} testID={testID}>
        {body}
      </Pressable>
    );
  }
  return <View testID={testID}>{body}</View>;
}
