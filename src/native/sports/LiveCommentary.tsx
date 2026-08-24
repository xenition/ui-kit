import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';

/** Kind of commentary entry — drives the leading glyph + a11y prefix. */
export type CommentaryKind =
  | 'goal'
  | 'card'
  | 'sub'
  | 'chance'
  | 'var'
  | 'whistle'
  | 'info';

/** One commentary feed entry. */
export interface CommentaryEntry {
  /** Stable key. */
  id: string;
  /** Match clock label (e.g. `45+2'`). */
  minute?: string;
  /** Entry kind. Default `info`. */
  kind?: CommentaryKind;
  /** The commentary line. */
  text: string;
  /** Which side the event belongs to (used for subtle alignment accent). */
  side?: 'home' | 'away';
  /** Emphasise (e.g. key moment). */
  important?: boolean;
}

export interface LiveCommentaryProps {
  /** Feed entries — newest first is the convention. */
  entries: CommentaryEntry[];
  /** Header title. Default `Live commentary`. */
  title?: string;
  /** Show a pulsing live indicator in the header. */
  live?: boolean;
  /** Loading skeleton row count; when set, entries are ignored. */
  loadingRows?: number;
  /** Empty-state label. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const KIND_META: Record<CommentaryKind, { glyph: string; label: string; tone?: 'success' | 'warn' | 'danger' | 'primary' }> = {
  goal: { glyph: '⚽', label: 'Goal', tone: 'success' },
  card: { glyph: '🟨', label: 'Card', tone: 'warn' },
  sub: { glyph: '🔁', label: 'Substitution', tone: 'primary' },
  chance: { glyph: '🎯', label: 'Chance' },
  var: { glyph: '📺', label: 'VAR', tone: 'primary' },
  whistle: { glyph: '📣', label: 'Whistle' },
  info: { glyph: '•', label: 'Update' },
};

/**
 * A live text commentary feed — a vertical list of timestamped entries, each
 * with a kind glyph and an accessible kind prefix so meaning survives without
 * color. Handles a `live` header pulse, a loading skeleton, and an empty
 * state. Presentational: pass shaped `entries`; nothing polls. Token-only
 * colors.
 */
export function LiveCommentary({
  entries,
  title = 'Live commentary',
  live = false,
  loadingRows,
  emptyLabel = 'No commentary yet',
  style,
}: LiveCommentaryProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
  };

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
      {live ? <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.danger }} /> : null}
      <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
        {title}
      </Text>
      {live ? (
        <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>LIVE</Text>
      ) : null}
    </View>
  );

  if (loadingRows && loadingRows > 0) {
    return (
      <View accessibilityState={{ busy: true }} accessibilityLabel="Loading commentary" style={[container, style]}>
        {header}
        {Array.from({ length: loadingRows }).map((_, i) => (
          <View
            key={i}
            style={{ height: tokens.spacing.xl, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }}
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
          const toneColor =
            meta.tone === 'success'
              ? colors.success
              : meta.tone === 'warn'
                ? colors.warn
                : meta.tone === 'danger'
                  ? colors.danger
                  : meta.tone === 'primary'
                    ? colors.primary
                    : colors.muted;
          return (
            <View
              key={e.id}
              accessible
              accessibilityLabel={`${e.minute ? e.minute + ', ' : ''}${meta.label}: ${e.text}`}
              style={{
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
                paddingLeft: e.important ? tokens.spacing.sm : 0,
                borderLeftWidth: e.important ? 3 : 0,
                borderColor: toneColor,
                backgroundColor: e.important ? tokens.ramps.neutral[50] : 'transparent',
                borderRadius: e.important ? tokens.radius.sm : 0,
              }}
            >
              {e.minute ? (
                <Text
                  style={{
                    minWidth: 40,
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                  }}
                >
                  {e.minute}
                </Text>
              ) : null}
              <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
                {meta.glyph}
              </Text>
              <Text
                style={{
                  flex: 1,
                  color: e.important ? colors.onSurface : colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: e.important ? '600' : '400',
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
