import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { FlashCardProps } from './FlashCard';

/** Drop-in for {@link FlashCardProps} — same props, the V4 "campus" design. */
export type FlashCardV4Props = FlashCardProps;

/**
 * FlashCard — **V4** "campus" design (native twin of the web V4). A tap-to-flip
 * study card on an elevated rounded surface with a soft shadow: shows the `front`
 * (prompt) and flips to the `back` (answer) on a soft-primary ground. The face
 * label pill + a "Tap to flip" hint keep the state legible without color. Works
 * controlled or uncontrolled. Token-only colors via `useXenitionTheme()`.
 */
export function FlashCardV4({ front, back, frontLabel = 'Term', backLabel = 'Definition', flipped, defaultFlipped = false, onFlip, style }: FlashCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [internal, setInternal] = React.useState(defaultFlipped);
  const isControlled = flipped != null;
  const isFlipped = isControlled ? flipped : internal;

  const toggle = (): void => {
    const next = !isFlipped;
    if (!isControlled) setInternal(next);
    onFlip?.(next);
  };

  const label = isFlipped ? backLabel : frontLabel;
  const content = isFlipped ? back : front;
  const shell: ViewStyle = {
    minHeight: 160,
    padding: tokens.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing.sm,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: isFlipped ? withAlpha(colors.primary, 0.1) : colors.card,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ expanded: isFlipped }}
      accessibilityLabel={`Flashcard, ${label}: ${content}. Tap to flip.`}
      onPress={toggle}
      style={({ pressed }) => [shell, { opacity: pressed ? 0.92 : 1 }, style]}
    >
      <View style={{ borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs, backgroundColor: isFlipped ? withAlpha(colors.primary, 0.15) : withAlpha(colors.onSurface, 0.06) }}>
        <Text style={{ color: isFlipped ? colors.primary : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</Text>
      </View>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700', textAlign: 'center' }}>{content}</Text>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Tap to flip</Text>
    </Pressable>
  );
}
