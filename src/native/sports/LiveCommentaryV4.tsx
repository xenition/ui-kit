import * as React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { LiveCommentaryProps, CommentaryKind } from './LiveCommentary';

/** Drop-in for {@link LiveCommentaryProps} — same props, the V4 "broadcast" design. */
export type LiveCommentaryV4Props = LiveCommentaryProps;

const KIND_META: Record<
  CommentaryKind,
  { glyph: string; label: string; key: boolean; slot: keyof SemanticColors }
> = {
  goal: { glyph: '⚽', label: 'Goal', key: true, slot: 'success' },
  card: { glyph: '🟨', label: 'Card', key: true, slot: 'warn' },
  sub: { glyph: '🔁', label: 'Substitution', key: false, slot: 'primary' },
  chance: { glyph: '🎯', label: 'Chance', key: false, slot: 'primary' },
  var: { glyph: '📺', label: 'VAR', key: false, slot: 'primary' },
  whistle: { glyph: '📣', label: 'Whistle', key: false, slot: 'muted' },
  info: { glyph: '•', label: 'Update', key: false, slot: 'muted' },
};

/**
 * LiveCommentary — **V4** "broadcast" design. A live text feed on an elevated
 * card: a `live` header carries a pulsing `danger` dot + "LIVE" label (never
 * color alone), and each entry pairs a minute chip with a kind glyph + text.
 * Key events (goal / card) and any `important` entry get a soft-tint accent
 * lane. One accent: `primary`. Same props/behavior as
 * {@link LiveCommentaryProps} (drop-in) — keeps the entry list contract,
 * kinds/minutes, loading and empty states. Token-only colors via
 * `useXenitionTheme()`.
 */
export function LiveCommentaryV4({
  entries,
  title = 'Live commentary',
  live = false,
  loadingRows,
  emptyLabel = 'No commentary yet',
  style,
}: LiveCommentaryV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  };

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
      {live ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: 2,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.danger, 0.12),
          }}
        >
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.danger }} />
          <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>LIVE</Text>
        </View>
      ) : null}
      <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
        {title}
      </Text>
    </View>
  );

  if (loadingRows && loadingRows > 0) {
    return (
      <View accessibilityState={{ busy: true }} accessibilityLabel="Loading commentary" style={[container, style]}>
        {header}
        {Array.from({ length: loadingRows }).map((_, i) => (
          <View
            key={i}
            style={{ height: tokens.spacing.xl, borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.onSurface, 0.1) }}
          />
        ))}
      </View>
    );
  }

  return (
    <View accessibilityRole="list" style={[container, style]}>
      {header}
      {entries.length === 0 ? (
        <View style={{ paddingVertical: tokens.spacing.lg, alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {emptyLabel}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}>
            Updates will stream in once the match kicks off.
          </Text>
        </View>
      ) : (
        entries.map((e) => {
          const meta = KIND_META[e.kind ?? 'info'] ?? KIND_META.info;
          const accent = meta.key || Boolean(e.important);
          const accentColor = colors[meta.slot];
          return (
            <View
              key={e.id}
              accessible
              accessibilityLabel={`${e.minute ? e.minute + ', ' : ''}${meta.label}: ${e.text}`}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
                paddingLeft: accent ? tokens.spacing.sm : 0,
                borderLeftWidth: accent ? 3 : 0,
                borderColor: accentColor,
                backgroundColor: accent ? withAlpha(accentColor, 0.1) : 'transparent',
                borderRadius: accent ? tokens.radius.sm : 0,
              }}
            >
              {e.minute ? (
                <Text
                  style={{
                    minWidth: 40,
                    textAlign: 'center',
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '800',
                    backgroundColor: withAlpha(colors.onSurface, 0.05),
                    borderRadius: tokens.radius.full,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    overflow: 'hidden',
                  }}
                >
                  {e.minute}
                </Text>
              ) : null}
              <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
                {meta.glyph}
              </Text>
              <Text
                style={{
                  flex: 1,
                  color: colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: accent ? '600' : '400',
                }}
              >
                {e.text}
              </Text>
            </View>
          );
        })
      )}
    </View>
  );
}
