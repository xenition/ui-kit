import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { StatusPill } from './StatusPill';
import {
  EVIDENCE_KIND_META,
  EVIDENCE_STATUS_META,
  toneColor,
  type EvidenceKind,
  type EvidenceStatus,
} from './internal';

export type EvidenceRowVariant = 'default' | 'compact';

export interface EvidenceRowProps {
  /** Exhibit label / number (e.g. "Exhibit A-12"). */
  exhibit?: string;
  /** Description of the evidence item. */
  title: string;
  /** Kind of evidence — drives the leading glyph. */
  kind?: EvidenceKind;
  /** Admissibility / evidentiary status — glyph + word pill, never color alone. */
  status?: EvidenceStatus;
  /** Chain-of-custody / source label. */
  source?: string;
  /** Pre-formatted date collected / logged. */
  date?: string;
  /** Whether custody is verified (adds a "Chain verified" marker). */
  custodyVerified?: boolean;
  /** Density. */
  variant?: EvidenceRowVariant;
  /** Tap handler (open the exhibit). */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * One evidence exhibit in a matter: exhibit label, description, kind glyph, and
 * an admissibility pill (glyph + word so status never rests on color alone),
 * plus optional chain-of-custody source / date. A verified custody marker is a
 * glyph + word, not a bare color. All colors are theme tokens — no literals.
 */
export function EvidenceRow({
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
}: EvidenceRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const kindMeta = EVIDENCE_KIND_META[kind];
  const kindTint = toneColor(colors, kindMeta.tone);

  const meta = [source, date].filter(Boolean).join(' · ');

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 36,
          height: 36,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: tokens.radius.sm,
          backgroundColor: withAlpha(kindTint, 0.14),
        }}
      >
        <Text accessibilityElementsHidden importantForAccessibility="no" style={{ fontSize: tokens.typography.scale.base }}>
          {kindMeta.glyph}
        </Text>
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        {exhibit ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 0.4 }}>{exhibit}</Text>
        ) : null}
        <Text numberOfLines={compact ? 1 : 2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {title}
        </Text>
        {!compact && meta ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{meta}</Text>
        ) : null}
        {custodyVerified ? (
          <Text style={{ color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>🔗 Chain verified</Text>
        ) : null}
      </View>
      {status ? <StatusPill meta={EVIDENCE_STATUS_META[status]} size="sm" /> : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Evidence ${exhibit ? `${exhibit}, ` : ''}${title}`} onPress={onPress} testID={testID}>
        {content}
      </Pressable>
    );
  }
  return <View testID={testID}>{content}</View>;
}
