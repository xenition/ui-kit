import * as React from 'react';
import { Image, Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';

/** Kinds of staged attachment, driving the fallback glyph. */
export type AttachmentKind = 'image' | 'video' | 'file' | 'audio';

export interface StagedAttachment {
  /** Stable identifier passed back to `onRemove`. */
  id: string;
  /** Display name (file name / caption). */
  name?: string;
  /** Attachment kind → fallback glyph when there's no thumbnail. */
  kind?: AttachmentKind;
  /** Optional thumbnail URI (shown for image/video). */
  thumbnailUri?: string;
}

export interface AttachmentBarProps {
  /** Staged attachments to preview before sending. */
  attachments: StagedAttachment[];
  /** Called with an attachment id when its remove button is tapped. */
  onRemove?: (id: string) => void;
  style?: StyleProp<ViewStyle>;
}

const KIND_GLYPH: Record<AttachmentKind, string> = {
  image: '🖼️',
  video: '🎬',
  file: '📄',
  audio: '🎵',
};

/**
 * Horizontal strip of staged attachments shown above the composer before a
 * message is sent. Each tile shows a thumbnail (or a kind glyph) and a remove
 * button. Scrolls horizontally; renders nothing when empty. No literal colors.
 */
export function AttachmentBar({
  attachments,
  onRemove,
  style,
}: AttachmentBarProps): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  if (attachments.length === 0) return null;
  const tile = 56;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityLabel="Staged attachments"
      contentContainerStyle={{ gap: tokens.spacing.sm, padding: tokens.spacing.sm }}
      style={style}
    >
      {attachments.map((att) => {
        const kind = att.kind ?? 'file';
        return (
          <View key={att.id} style={{ width: tile }}>
            <View
              style={{
                width: tile,
                height: tile,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {att.thumbnailUri ? (
                <Image
                  source={{ uri: att.thumbnailUri }}
                  style={{ width: tile, height: tile }}
                  resizeMode="cover"
                  accessibilityLabel={att.name ?? 'Attachment'}
                />
              ) : (
                <Icon glyph={KIND_GLYPH[kind]} accessibilityLabel={att.name ?? kind} />
              )}
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Remove ${att.name ?? 'attachment'}`}
              onPress={() => onRemove?.(att.id)}
              style={{
                position: 'absolute',
                top: -tokens.spacing.xs,
                right: -tokens.spacing.xs,
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: colors.danger,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon glyph="×" size="sm" color="onDanger" />
            </Pressable>
            {att.name ? (
              <Text
                numberOfLines={1}
                style={{
                  marginTop: 2,
                  color: colors.muted,
                  fontSize: tokens.typography.scale.xs,
                  textAlign: 'center',
                }}
              >
                {att.name}
              </Text>
            ) : null}
          </View>
        );
      })}
    </ScrollView>
  );
}
