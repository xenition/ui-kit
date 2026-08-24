import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { withAlpha } from './tint';

export type AttachmentKind = 'image' | 'pdf' | 'doc' | 'sheet' | 'audio' | 'video' | 'zip' | 'file';

const KIND_GLYPH: Record<AttachmentKind, string> = {
  image: '🖼️',
  pdf: '📕',
  doc: '📄',
  sheet: '📊',
  audio: '🎵',
  video: '🎬',
  zip: '🗜️',
  file: '📎',
};

export interface AttachmentChipProps {
  /** File name shown as the label. */
  name: string;
  /** File kind → leading glyph. Default `'file'`. */
  kind?: AttachmentKind;
  /** Human-readable size (e.g. "1.2 MB"). */
  size?: string;
  /** Uploading progress 0–1; renders a loading state and disables actions. */
  uploadProgress?: number;
  /** Tap the chip (preview / open). */
  onPress?: () => void;
  /** Download affordance; shown when provided. */
  onDownload?: () => void;
  /** Remove affordance (compose staging); shown when provided. */
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single mail attachment as a compact chip — kind glyph, file name, optional
 * size, and optional download / remove affordances. While `uploadProgress` is
 * between 0 and 1 it reads as loading and suppresses the trailing actions.
 * Surface, border, and the soft icon well all resolve from theme tokens. No
 * literal colors.
 */
export function AttachmentChip({
  name,
  kind = 'file',
  size,
  uploadProgress,
  onPress,
  onDownload,
  onRemove,
  style,
}: AttachmentChipProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.file;
  const uploading = uploadProgress != null && uploadProgress >= 0 && uploadProgress < 1;
  const pct = uploading ? Math.round((uploadProgress ?? 0) * 100) : null;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Attachment ${name}${size ? `, ${size}` : ''}${uploading ? ', uploading' : ''}`}
      accessibilityState={{ busy: uploading }}
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          alignSelf: 'flex-start',
          maxWidth: 260,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          opacity: pressed && onPress ? 0.85 : 1,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: tokens.radius.sm,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors.primary, 0.12),
        }}
      >
        <Icon glyph={glyph} size="base" color="primary" />
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          {name}
        </Text>
        {uploading ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {`Uploading… ${pct}%`}
          </Text>
        ) : size ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{size}</Text>
        ) : null}
      </View>
      {!uploading && onDownload ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Download ${name}`}
          onPress={onDownload}
          hitSlop={6}
        >
          <Icon glyph="⤓" size="base" color="muted" />
        </Pressable>
      ) : null}
      {!uploading && onRemove ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove ${name}`}
          onPress={onRemove}
          hitSlop={6}
        >
          <Icon glyph="×" size="base" color="muted" />
        </Pressable>
      ) : null}
    </Pressable>
  );
}
