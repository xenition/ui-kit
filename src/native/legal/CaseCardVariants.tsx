import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import { StatusPill } from './StatusPill';
import {
  CASE_PRIORITY_META,
  CASE_STATUS_META,
  PRACTICE_AREA_META,
  toneColor,
} from './internal';
import type { CaseCardProps } from './CaseCard';

/** Alternate design — identical Props to {@link CaseCard}, drop-in swap. */
export type CaseCardV2Props = CaseCardProps;
/** Alternate design — identical Props to {@link CaseCard}, drop-in swap. */
export type CaseCardV3Props = CaseCardProps;

/**
 * CaseCard, design v2 — an **elevated** card led by a practice-area glyph tile,
 * with the status pill and priority pinned to the header. Same Props as
 * {@link CaseCard}; visually a floating, tile-anchored card rather than the flat
 * bordered original. Token-pure; status stays a glyph + word, never color alone.
 */
export function CaseCardV2({
  caseNumber,
  title,
  client,
  practiceArea = 'other',
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
}: CaseCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 8 });
  const press = usePressScale();
  const compact = variant === 'compact';
  const detailed = variant === 'detailed';
  const closed = status === 'closed';

  const areaMeta = PRACTICE_AREA_META[practiceArea];
  const areaTint = toneColor(colors, areaMeta.tone);

  const body = (
    <Card
      variant="elevated"
      padding={compact ? 'sm' : 'md'}
      radius="lg"
      style={[{ gap: tokens.spacing.sm, opacity: closed ? 0.7 : 1 }, style]}
    >
      {loading ? (
        <View accessibilityLabel="Loading case" style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          <View style={{ width: 44, height: 44, borderRadius: tokens.radius.md, backgroundColor: colors.border }} />
          <View style={{ flex: 1, gap: tokens.spacing.xs, justifyContent: 'center' }}>
            <View style={{ height: tokens.typography.scale.xs, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
            <View style={{ height: tokens.typography.scale.base, width: '75%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          </View>
        </View>
      ) : (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
            <View
              style={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.md,
                backgroundColor: withAlpha(areaTint, 0.14),
              }}
            >
              <Text accessibilityElementsHidden importantForAccessibility="no" style={{ fontSize: tokens.typography.scale.lg }}>
                {areaMeta.glyph}
              </Text>
            </View>
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

          {!compact && priority ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs }}>
              <StatusPill meta={CASE_PRIORITY_META[priority]} variant="soft" size="sm" />
            </View>
          ) : null}

          {detailed && (leadAttorney || nextEvent) ? (
            <View style={{ gap: 2, paddingTop: tokens.spacing.xs, borderTopWidth: 1, borderTopColor: colors.border }}>
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
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.full,
                backgroundColor: withAlpha(colors.primary, 0.12),
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>Open case</Text>
            </Pressable>
          ) : null}
        </>
      )}
    </Card>
  );

  const animated = (
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>{body}</Animated.View>
  );

  if (onPress && !loading) {
    return (
      <Animated.View style={{ transform: [{ scale: press.scale }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Case ${caseNumber}: ${title}`}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          testID={testID}
        >
          {animated}
        </Pressable>
      </Animated.View>
    );
  }
  return <View testID={testID}>{animated}</View>;
}

/**
 * CaseCard, design v3 — a **minimal single line** anchored by a status dot, for
 * the densest lists. Same Props as {@link CaseCard}; no card chrome, just a
 * pressable row with a hairline divider. The dot is decorative — the status is
 * still carried by the trailing glyph + word pill, never color alone.
 */
export function CaseCardV3({
  caseNumber,
  title,
  client,
  status,
  priority,
  loading = false,
  onPress,
  onOpen,
  testID,
  style,
}: CaseCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 4 });
  const closed = status === 'closed';
  const dotColor = status ? toneColor(colors, CASE_STATUS_META[status].tone) : colors.border;

  const row = (
    <Animated.View
      style={[
        {
          opacity: enter.opacity,
          transform: enter.transform,
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.xs,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      {loading ? (
        <View accessibilityLabel="Loading case" style={{ flex: 1, height: tokens.typography.scale.sm, borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
      ) : (
        <>
          <View
            accessibilityElementsHidden
            importantForAccessibility="no"
            style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: dotColor, opacity: closed ? 0.6 : 1 }}
          />
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{caseNumber}</Text>
            <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {title}
            </Text>
          </View>
          {priority ? <StatusPill meta={CASE_PRIORITY_META[priority]} variant="inline" size="sm" /> : null}
          {status ? <StatusPill meta={CASE_STATUS_META[status]} variant="inline" size="sm" /> : null}
          {client ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {client}
            </Text>
          ) : null}
        </>
      )}
    </Animated.View>
  );

  if ((onPress || onOpen) && !loading) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Case ${caseNumber}: ${title}`}
        onPress={onPress ?? onOpen}
        testID={testID}
      >
        {row}
      </Pressable>
    );
  }
  return <View testID={testID}>{row}</View>;
}
