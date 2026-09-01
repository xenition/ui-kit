import * as React from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import { appearanceStyle } from '../primitives/internal/appearance';
import type { AttachmentBarProps, AttachmentKind } from './AttachmentBar';

export interface AttachmentBarV4Props extends AttachmentBarProps {
  /** Accessible name for a remove control. Default `'Remove {name}'`. */
  formatRemoveLabel?: (name: string) => string;
  /** Override the kind words — four English words lived inside. */
  kindLabels?: Partial<Record<AttachmentKind, string>>;
}

/** Kind → glyph and default word. */
const KIND_META: Record<AttachmentKind, { glyph: string; label: string }> = {
  image: { glyph: '🖼', label: 'Image' },
  video: { glyph: '🎬', label: 'Video' },
  file: { glyph: '📄', label: 'File' },
  audio: { glyph: '🎵', label: 'Audio' },
};

/**
 * **V4 attachment bar** — same props as {@link AttachmentBar} plus
 * `formatRemoveLabel` and `kindLabels`.
 *
 * ## Four changes
 *
 * 1. **The remove control clears 44 and is named per attachment.** It was an
 *    unlabelled `✕` at glyph size, so a reader heard "button" four times and a
 *    thumb missed it.
 * 2. **The thumbnail ground is `colors.muted`** at a fixed square, so a bar of
 *    staged files does not reflow as thumbnails decode.
 * 3. **The kind is named**, not only glyphed — the glyph is emoji and is read
 *    aloud as its own name.
 * 4. **Nothing renders for an empty list** (§4.5) — the base drew an empty
 *    strip above the composer.
 */
export function AttachmentBarV4({
  attachments,
  onRemove,
  appearance = 'classic',
  formatRemoveLabel,
  kindLabels,
  style,
}: AttachmentBarV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const list = attachments?.filter(Boolean) ?? [];
  if (list.length === 0) return null;

  const tap = minTap(tokens.spacing);
  const thumb = tokens.spacing['2xl'] + tokens.spacing.sm;
  const removeLabel = formatRemoveLabel ?? ((n: string) => `Remove ${n}`);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: tokens.spacing.sm, padding: tokens.spacing.sm }}
      style={[{ ...appearanceStyle(appearance, colors, tokens) }, style]}
    >
      {list.map((item) => {
        const kind = item.kind ?? 'file';
        const meta = KIND_META[kind];
        const word = kindLabels?.[kind] ?? meta.label;
        const name = item.name ?? word;

        return (
          <View key={item.id} style={{ width: thumb }}>
            <View
              accessible
              accessibilityLabel={`${word}, ${name}`}
              style={{
                width: thumb,
                height: thumb,
                borderRadius: tokens.radius.md,
                overflow: 'hidden',
                backgroundColor: colors.muted,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item.thumbnailUri ? (
                <Image
                  source={{ uri: item.thumbnailUri }}
                  accessible={false}
                  resizeMode="cover"
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <IconV4 glyph={meta.glyph} size="xl" />
              )}

              {onRemove ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={removeLabel(name)}
                  onPress={() => onRemove(item.id)}
                  hitSlop={tokens.spacing.sm}
                  style={({ pressed }) => ({
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: tap / 2,
                    height: tap / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    backgroundColor: pressed ? pressFill(theme) : colors.surface,
                  })}
                >
                  <IconV4 name="close" size="xs" color="onSurface" />
                </Pressable>
              ) : null}
            </View>

            {item.name ? (
              <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
                {item.name}
              </TextV4>
            ) : null}
          </View>
        );
      })}
    </ScrollView>
  );
}
