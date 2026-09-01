import * as React from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressLayer, pressOver } from '../primitives/internal/state-v4';
import { spokenLine } from './internal/mail-v4';
import type { AttachmentChipProps, AttachmentKind } from './AttachmentChip';

/**
 * The file-kind glyphs, exactly the base's map. It is module-private there and
 * a base file is never edited, so it is spelled again rather than reached for.
 */
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

export interface AttachmentChipV4Props extends AttachmentChipProps {
  /**
   * Abandon an upload that is still in flight. Shown for exactly the interval
   * `onRemove` is hidden for.
   */
  onCancel?: () => void;
  /** Name the cancel control. Default `'Cancel upload'`. */
  cancelLabel?: string;
  /** Name the download control. Default `'Download'`. */
  downloadLabel?: string;
  /** Name the remove control. Default `'Remove'`. */
  removeLabel?: string;
}

/**
 * **V4 attachment chip** — same props as {@link AttachmentChip} plus
 * `onCancel`, `cancelLabel`, `downloadLabel` and `removeLabel`.
 *
 * ## Five changes
 *
 * 1. **An upload in flight can be abandoned.** The base hid remove for the
 *    whole of `uploadProgress` — which is exactly the interval in which a user
 *    notices they attached the wrong file, and the only interval in which
 *    stopping it saves them anything. `onCancel` fills it.
 * 2. **Progress is a progressbar with a value**, not the sentence
 *    "Uploading… 40%" and nothing else. A reader can now poll it; before, the
 *    number only changed if you happened to be looking.
 * 3. **Download and remove are siblings of the chip's button**, not children
 *    of it. Nesting them inside an `accessible` Pressable made them
 *    presentational: on VoiceOver the only thing you could do to an attachment
 *    was open it.
 * 4. **A chip with no `onPress` is not announced as a button.** The base
 *    always claimed the role and then set `disabled` — a reader was told there
 *    was a button and then that it did not work.
 * 5. **The glyph well is gone and press is a state layer.** The well was
 *    `withAlpha(colors.primary, 0.12)` carrying a `primary` glyph — a fill
 *    slot used as ink on a tint nobody measured it against — and a file kind
 *    is identity, so the glyph carries it in neutral ink. `opacity: 0.85`
 *    becomes M3's layer.
 */
export function AttachmentChipV4({
  name,
  kind = 'file',
  size,
  uploadProgress,
  onPress,
  onDownload,
  onRemove,
  onCancel,
  cancelLabel = 'Cancel upload',
  downloadLabel = 'Download',
  removeLabel = 'Remove',
  style,
}: AttachmentChipV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.file;
  const uploading = uploadProgress != null && uploadProgress >= 0 && uploadProgress < 1;
  const pct = uploading ? Math.round((uploadProgress ?? 0) * 100) : null;
  const tap = minTap(tokens.spacing);

  const spoken = spokenLine([
    `Attachment ${name}`,
    size,
    uploading ? `Uploading, ${pct} percent` : null,
  ]);

  const body = (
    <>
      <IconV4 glyph={glyph} size="lg" color="mutedText" />
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        <TextV4 size="sm" weight="semibold" tone="onSurface" numberOfLines={1}>
          {name}
        </TextV4>
        {uploading ? (
          <ProgressV4 value={pct ?? 0} size="sm" />
        ) : size ? (
          <TextV4 size="xs" tone="mutedText">
            {size}
          </TextV4>
        ) : null}
      </View>
    </>
  );

  const rowStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    flex: 1,
    minWidth: 0,
    minHeight: tap,
    paddingVertical: tokens.spacing.xs,
    paddingLeft: tokens.spacing.sm,
    borderRadius: tokens.radius.md,
  };

  const action = (
    label: string,
    actionGlyph: string,
    onActionPress: () => void
  ): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onActionPress}
      style={({ pressed }) => ({
        width: tap,
        height: tap,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressLayer(theme) : 'transparent',
      })}
    >
      <IconV4 glyph={actionGlyph} size="base" color="mutedText" />
    </Pressable>
  );

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          // Wide enough for a file name and two 44 targets without the name
          // collapsing to an ellipsis on the first character.
          maxWidth: tap * 6,
          paddingRight: tokens.spacing.xs,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={spoken}
          accessibilityState={{ busy: uploading }}
          onPress={onPress}
          style={({ pressed }) => [
            rowStyle,
            {
              backgroundColor: pressed
                ? pressOver(theme, colors.surface, colors.onSurface)
                : 'transparent',
            },
          ]}
        >
          {body}
        </Pressable>
      ) : (
        // No `onPress` means no button — the base claimed the role anyway and
        // then disabled it.
        <View accessible accessibilityLabel={spoken} style={rowStyle}>
          {body}
        </View>
      )}
      {uploading && onCancel ? action(cancelLabel, '×', onCancel) : null}
      {!uploading && onDownload ? action(downloadLabel, '⤓', onDownload) : null}
      {!uploading && onRemove ? action(removeLabel, '×', onRemove) : null}
    </View>
  );
}
