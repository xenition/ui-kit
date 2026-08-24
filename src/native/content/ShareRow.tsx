import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import type { ShareTarget } from './types';

export type ShareRowVariant = 'icons' | 'labeled';

/** A sensible default set of share destinations (glyphs, no icon font needed). */
export const DEFAULT_SHARE_TARGETS: ShareTarget[] = [
  { id: 'twitter', label: 'Share on X', glyph: '𝕏' },
  { id: 'facebook', label: 'Share on Facebook', glyph: 'f' },
  { id: 'link', label: 'Copy link', glyph: '🔗' },
  { id: 'mail', label: 'Share by email', glyph: '✉' },
];

export interface ShareRowProps {
  /** Called with the pressed target's id. */
  onShare: (id: string) => void;
  /** Destinations to render. Defaults to {@link DEFAULT_SHARE_TARGETS}. */
  targets?: ShareTarget[];
  /**
   * - `icons`   — round glyph buttons (default).
   * - `labeled` — glyph + label pills.
   */
  variant?: ShareRowVariant;
  /** Optional leading label, e.g. `'Share'`. Pass `null` to hide. */
  heading?: string | null;
  style?: StyleProp<ViewStyle>;
}

/**
 * A row of share actions for an article — X, Facebook, copy-link, email, etc.
 * Data-driven via `targets` (each supplies a glyph + accessible label) and a
 * single `onShare(id)` callback; the parent decides what each id does. Two
 * variants: round `icons` or `labeled` pills. Colors come only from
 * `SemanticColors`; no literal hex.
 */
export function ShareRow({
  onShare,
  targets = DEFAULT_SHARE_TARGETS,
  variant = 'icons',
  heading = 'Share',
  style,
}: ShareRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {heading != null ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '700',
            letterSpacing: 0.6,
            textTransform: 'uppercase',
          }}
        >
          {heading}
        </Text>
      ) : null}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
        {targets.map((t) => (
          <Pressable
            key={t.id}
            accessibilityRole="button"
            accessibilityLabel={t.label}
            onPress={() => onShare(t.id)}
            hitSlop={6}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              width: variant === 'icons' ? 40 : undefined,
              height: 40,
              paddingHorizontal: variant === 'labeled' ? tokens.spacing.md : 0,
              justifyContent: 'center',
              borderRadius: variant === 'icons' ? tokens.radius.full : tokens.radius.md,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.surface,
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Icon glyph={t.glyph} size="base" color="onSurface" />
            {variant === 'labeled' ? (
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                {t.label}
              </Text>
            ) : null}
          </Pressable>
        ))}
      </View>
    </View>
  );
}
