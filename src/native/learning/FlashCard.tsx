import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface FlashCardProps {
  /** Prompt side content. */
  front: string;
  /** Answer side content, revealed on flip. */
  back: string;
  /** Small label above the front, e.g. "Term". */
  frontLabel?: string;
  /** Small label above the back, e.g. "Definition". */
  backLabel?: string;
  /** Controlled flipped state; omit for internal (uncontrolled) flipping. */
  flipped?: boolean;
  /** Default flipped state when uncontrolled. */
  defaultFlipped?: boolean;
  /** Fires with the next flipped value on tap. */
  onFlip?: (flipped: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A tap-to-flip study card. Shows the `front` (prompt) and flips to the `back`
 * (answer) on press. Works controlled (via `flipped` + `onFlip`) or uncontrolled
 * (via `defaultFlipped`). Announced as a button whose label reflects the visible
 * face. Token-only colors.
 */
export function FlashCard({
  front,
  back,
  frontLabel = 'Term',
  backLabel = 'Definition',
  flipped,
  defaultFlipped = false,
  onFlip,
  style,
}: FlashCardProps): React.ReactElement {
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

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ expanded: isFlipped }}
      accessibilityLabel={`Flashcard, ${label}: ${content}. Tap to flip.`}
      onPress={toggle}
      style={({ pressed }) => [
        {
          minHeight: 160,
          padding: tokens.spacing.xl,
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: isFlipped ? colors.primary : colors.surface,
          opacity: pressed ? 0.92 : 1,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: isFlipped ? colors.onPrimary : colors.muted,
          fontSize: tokens.typography.scale.xs,
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color: isFlipped ? colors.onPrimary : colors.onSurface,
          fontSize: tokens.typography.scale.xl,
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        {content}
      </Text>
      <Text style={{ color: isFlipped ? colors.onPrimary : colors.muted, fontSize: tokens.typography.scale.xs }}>
        Tap to flip
      </Text>
    </Pressable>
  );
}
