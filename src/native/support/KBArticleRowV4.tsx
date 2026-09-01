import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from './internal';
import type { KBArticleRowProps, KBStatus } from './KBArticleRow';

/** Drop-in for {@link KBArticleRowProps} — same props, the V4 "calm console" design. */
export type KBArticleRowV4Props = KBArticleRowProps;

interface StatusSpec {
  slot: keyof SemanticColors;
  glyph: string;
  label: string;
}

// published → success, draft → warn, archived → muted. Each has a distinct glyph
// so status is never color-only.
const STATUS: Record<KBStatus, StatusSpec> = {
  published: { slot: 'success', glyph: '✓', label: 'Published' },
  draft: { slot: 'warn', glyph: '✎', label: 'Draft' },
  archived: { slot: 'muted', glyph: '⌷', label: 'Archived' },
};

/**
 * KBArticleRow — **V4** "calm console" design. A knowledge-base article row as an
 * elevated rounded card: a leading doc glyph disc, title, a soft-tint status pill
 * carrying glyph + label (published→success, draft→warn, archived→muted — never
 * color alone), and a category · views · helpful meta hint. Tapping fires
 * `onPress(id)`; an optional `onInsertLink` gets its own ≥44px affordance that
 * does not bubble. Press paints a soft-primary tint. Same props/behavior as
 * {@link KBArticleRowProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`. Dark-mode safe.
 */
export function KBArticleRowV4({
  article,
  onPress,
  onInsertLink,
  loading = false,
  style,
}: KBArticleRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const cardBase = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: tokens.spacing.md,
    padding: tokens.spacing.md,
    minHeight: 44,
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading article" style={[cardBase, style]}>
        <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
        <View style={{ flex: 1, gap: 6 }}>
          <View style={{ height: 12, width: '65%', borderRadius: 4, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
          <View style={{ height: 10, width: '35%', borderRadius: 4, backgroundColor: withAlpha(colors.onSurface, 0.08) }} />
        </View>
      </View>
    );
  }

  const status = article.status ?? 'published';
  const spec = STATUS[status] ?? STATUS.published;
  const statusColor = colors[spec.slot];
  const views = typeof article.views === 'number' && article.views >= 0 ? article.views : undefined;
  const helpful = typeof article.helpful === 'number' && article.helpful >= 0 ? article.helpful : undefined;

  const metaParts: string[] = [];
  if (article.category) metaParts.push(article.category);
  if (views !== undefined) metaParts.push(`${views} views`);
  if (helpful !== undefined) metaParts.push(`${helpful} helpful`);
  if (article.updatedLabel) metaParts.push(article.updatedLabel);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Article: ${article.title}, ${spec.label}`}
      onPress={onPress ? () => onPress(article.id) : undefined}
      disabled={!onPress}
      style={({ pressed }) => [
        cardBase,
        { backgroundColor: pressed && onPress ? withAlpha(colors.primary, 0.1) : colors.card },
        style,
      ]}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors.primary, 0.12),
        }}
      >
        <Text style={{ fontSize: tokens.typography.scale.base }}>📄</Text>
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600', flexShrink: 1 }}
          >
            {article.title}
          </Text>
          {/* Soft-tint status pill — glyph + label, never color-only. */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: 2,
              borderRadius: tokens.radius.full,
              backgroundColor: withAlpha(statusColor, 0.12),
            }}
          >
            <Text style={{ color: statusColor, fontSize: tokens.typography.scale.xs }}>{spec.glyph}</Text>
            <Text style={{ color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
              {spec.label}
            </Text>
          </View>
        </View>
        {metaParts.length > 0 ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {metaParts.join(' · ')}
          </Text>
        ) : null}
      </View>
      {onInsertLink ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Insert link to ${article.title}`}
          hitSlop={8}
          onPress={() => onInsertLink(article)}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: pressed ? withAlpha(colors.primary, 0.1) : 'transparent',
          })}
        >
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm }}>🔗</Text>
        </Pressable>
      ) : null}
    </Pressable>
  );
}
