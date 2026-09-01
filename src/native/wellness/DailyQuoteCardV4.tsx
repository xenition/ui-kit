import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { GradientSurface } from './internal/GradientSurface';
import { calmGradient, calmInk, calmInkSoft, calmTile, calmBorder } from './internal/calm';
import type { DailyQuoteCardProps } from './DailyQuoteCard';

export type DailyQuoteCardV4Props = DailyQuoteCardProps;

/**
 * DailyQuoteCardV4 — the "calm" restyle of {@link DailyQuoteCard}. Same props,
 * defaults, labels, a11y and behavior; the whole card becomes a soft gradient
 * ground: the quote in near-white ink, the author/category eyebrow in the softer
 * ink, and favorite/share as frosted round icon buttons. `favorited` flips the
 * heart glyph and its a11y state; `loading` shows frosted skeleton bars and a
 * missing quote shows the empty note.
 */
export function DailyQuoteCardV4({
  quote,
  author,
  category,
  // tone retained in the public props for parity; the calm ground is single-hue.
  tone = 'primary',
  favorited = false,
  loading = false,
  onFavorite,
  onShare,
  emptyLabel = 'No quote today.',
  style,
}: DailyQuoteCardV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = calmInk(r);
  const inkSoft = calmInkSoft(r);
  void tone;

  const Ground = ({
    children,
    label,
    align,
  }: {
    children: React.ReactNode;
    label?: string;
    align?: boolean;
  }): React.ReactElement => (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={calmGradient(r)}
        style={{
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          overflow: 'hidden',
          gap: tokens.spacing.md,
          ...(align ? { alignItems: 'center' as const } : null),
        }}
      >
        <View accessibilityLabel={label} style={{ gap: tokens.spacing.md, ...(align ? { alignItems: 'center' as const } : null) }}>
          {children}
        </View>
      </GradientSurface>
    </View>
  );

  if (loading) {
    return (
      <Ground label="Loading quote">
        <View style={{ height: tokens.typography.scale.lg, width: '90%', borderRadius: tokens.radius.sm, backgroundColor: calmTile(r) }} />
        <View style={{ height: tokens.typography.scale.lg, width: '75%', borderRadius: tokens.radius.sm, backgroundColor: calmTile(r) }} />
        <View style={{ height: tokens.typography.scale.sm, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: calmTile(r) }} />
      </Ground>
    );
  }

  if (!quote) {
    return (
      <Ground label={emptyLabel} align>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
          🕊️
        </Text>
        <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </Ground>
    );
  }

  const RoundButton = ({
    label,
    onPress,
    children,
    selected,
  }: {
    label: string;
    onPress: () => void;
    children: React.ReactNode;
    selected?: boolean;
  }): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityState={selected != null ? { selected } : undefined}
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        borderRadius: tokens.radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: calmTile(r),
        borderWidth: 1,
        borderColor: calmBorder(r),
        opacity: pressed ? 0.85 : 1,
      })}
    >
      {children}
    </Pressable>
  );

  return (
    <Ground label={`Quote${author ? ` by ${author}` : ''}: ${quote}`}>
      {category ? (
        <Text
          style={{
            color: inkSoft,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '700',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          {category}
        </Text>
      ) : null}

      <Text
        style={{
          color: ink,
          fontSize: tokens.typography.scale.xl,
          fontWeight: '700',
          lineHeight: Math.round(tokens.typography.scale.xl * 1.4),
        }}
      >
        {`“${quote}”`}
      </Text>

      {author ? (
        <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontStyle: 'italic' }}>
          — {author}
        </Text>
      ) : null}

      {onFavorite || onShare ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {onFavorite ? (
            <RoundButton
              label={favorited ? 'Remove from favorites' : 'Add to favorites'}
              selected={favorited}
              onPress={() => onFavorite(!favorited)}
            >
              <Icon glyph={favorited ? '♥' : '♡'} size={tokens.typography.scale.lg} style={{ color: ink }} />
            </RoundButton>
          ) : null}
          {onShare ? (
            <RoundButton label="Share quote" onPress={onShare}>
              <Icon glyph="↗" size={tokens.typography.scale.lg} style={{ color: ink }} />
            </RoundButton>
          ) : null}
        </View>
      ) : null}
    </Ground>
  );
}
