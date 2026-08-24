import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { useEnter } from '../primitives/internal/motion';
import { StatusPill } from './StatusPill';
import { DOCUMENT_KIND_META, DOCUMENT_STATUS_META, toneColor } from './internal';
import type { DocumentRowProps } from './DocumentRow';

/** Alternate design — identical Props to {@link DocumentRow}, drop-in swap. */
export type DocumentRowV2Props = DocumentRowProps;
/** Alternate design — identical Props to {@link DocumentRow}, drop-in swap. */
export type DocumentRowV3Props = DocumentRowProps;

/**
 * DocumentRow, design v2 — an **elevated card** with a tinted kind-glyph tile,
 * title + metadata block, a status pill and an explicit round download button.
 * Same Props as {@link DocumentRow}; a richer, card-shaped presentation vs. the
 * flat inline original. Token-pure; status is a glyph + word, never color alone.
 */
export function DocumentRowV2({
  title,
  kind = 'other',
  status,
  modified,
  version,
  size,
  author,
  variant = 'default',
  onPress,
  onDownload,
  testID,
  style,
}: DocumentRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 6 });
  const compact = variant === 'compact';
  const kindMeta = DOCUMENT_KIND_META[kind];
  const kindTint = toneColor(colors, kindMeta.tone);

  const meta = [version, size, modified ? `Modified ${modified}` : undefined, author]
    .filter((s): s is string => Boolean(s))
    .join(' · ');

  const body = (
    <Card variant="elevated" padding={compact ? 'sm' : 'md'} radius="lg" style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(kindTint, 0.14),
          }}
        >
          <Text accessibilityElementsHidden importantForAccessibility="no" style={{ fontSize: tokens.typography.scale.lg }}>
            {kindMeta.glyph}
          </Text>
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {title}
          </Text>
          {!compact && meta ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {meta}
            </Text>
          ) : null}
          {status ? (
            <View style={{ marginTop: 2 }}>
              <StatusPill meta={DOCUMENT_STATUS_META[status]} variant="soft" size="sm" />
            </View>
          ) : null}
        </View>
        {onDownload ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Download ${title}`}
            onPress={onDownload}
            hitSlop={8}
            style={({ pressed }) => ({
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.full,
              backgroundColor: withAlpha(colors.primary, 0.12),
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.base }}>⤓</Text>
          </Pressable>
        ) : null}
      </View>
    </Card>
  );

  const animated = (
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>{body}</Animated.View>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Document ${title}`} onPress={onPress} testID={testID}>
        {animated}
      </Pressable>
    );
  }
  return <View testID={testID}>{animated}</View>;
}

/**
 * DocumentRow, design v3 — a **dense single line**: a bare kind glyph, the title,
 * a trailing inline status and a compact download glyph, on a hairline divider.
 * Same Props as {@link DocumentRow}; the tightest list treatment. Token-pure;
 * status remains a glyph + word, never color alone.
 */
export function DocumentRowV3({
  title,
  kind = 'other',
  status,
  modified,
  version,
  onPress,
  onDownload,
  testID,
  style,
}: DocumentRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 4 });
  const kindMeta = DOCUMENT_KIND_META[kind];
  const trailing = [version, modified].filter((s): s is string => Boolean(s)).join(' · ');

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
      <Text accessibilityElementsHidden importantForAccessibility="no" style={{ fontSize: tokens.typography.scale.base }}>
        {kindMeta.glyph}
      </Text>
      <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
        {title}
      </Text>
      {trailing ? (
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {trailing}
        </Text>
      ) : null}
      {status ? <StatusPill meta={DOCUMENT_STATUS_META[status]} variant="inline" size="sm" /> : null}
      {onDownload ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Download ${title}`}
          onPress={onDownload}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, paddingHorizontal: tokens.spacing.xs })}
        >
          <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.base }}>⤓</Text>
        </Pressable>
      ) : null}
    </Animated.View>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Document ${title}`} onPress={onPress} testID={testID}>
        {row}
      </Pressable>
    );
  }
  return <View testID={testID}>{row}</View>;
}
