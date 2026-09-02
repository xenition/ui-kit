import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { StatusPill } from './StatusPill';
import { EVIDENCE_KIND_META, EVIDENCE_STATUS_META } from './internal';
import type { EvidenceRowProps } from './EvidenceRow';

/** Drop-in for {@link EvidenceRowProps} — same props, the V4 "chambers" design. */
export type EvidenceRowV4Props = EvidenceRowProps;

/**
 * EvidenceRow — **V4** "chambers" design (native twin of the web V4). An elevated
 * rounded row with a soft shadow, the kind glyph in a soft-primary well, an
 * exhibit eyebrow over the description, a chain-of-custody meta line, an optional
 * "Chain verified" marker (glyph + word, not bare color), and a labelled glyph +
 * word admissibility pill (never color alone). `compact` truncates and hides the
 * meta line. Tappable when `onPress` is set. Reuses the base `variant`
 * (`default` / `compact`). Token-only colors via `useXenitionTheme()`.
 */
export function EvidenceRowV4({
  exhibit,
  title,
  kind = 'document',
  status,
  source,
  date,
  custodyVerified,
  variant = 'default',
  onPress,
  testID,
  style,
}: EvidenceRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const kindMeta = EVIDENCE_KIND_META[kind];
  const meta = [source, date].filter(Boolean).join(' · ');
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    minHeight: compact ? 44 : 56,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const content = (
    <>
      <View style={{ width: 40, height: 40, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: withAlpha(colors.primary, 0.1) }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>{kindMeta.glyph}</Text>
      </View>
      <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
        {exhibit ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 0.4 }}>{exhibit}</Text> : null}
        <Text numberOfLines={compact ? 1 : undefined} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{title}</Text>
        {!compact && meta ? <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{meta}</Text> : null}
        {custodyVerified ? <Text style={{ color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>🔗 Chain verified</Text> : null}
      </View>
      {status ? <StatusPill meta={EVIDENCE_STATUS_META[status]} variant="soft" size="sm" /> : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Evidence ${exhibit ? `${exhibit}, ` : ''}${title}`} onPress={onPress} testID={testID} style={({ pressed }) => [shell, { opacity: pressed ? 0.8 : 1 }, style]}>
        {content}
      </Pressable>
    );
  }
  return <View testID={testID} style={[shell, style]}>{content}</View>;
}
