import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { StatusPill } from './StatusPill';
import {
  DOCUMENT_KIND_META,
  DOCUMENT_STATUS_META,
  type DocumentKind,
  type DocumentStatus,
} from './internal';

export type DocumentRowVariant = 'default' | 'compact';

export interface DocumentRowProps {
  /** Document title / filename. */
  title: string;
  /** Document kind — drives the leading glyph. */
  kind?: DocumentKind;
  /** Lifecycle state — glyph + word pill, never color alone. */
  status?: DocumentStatus;
  /** Pre-formatted last-modified label. */
  modified?: string;
  /** Version label (e.g. "v3"). */
  version?: string;
  /** File size label (e.g. "1.2 MB"). */
  size?: string;
  /** Author / owner. */
  author?: string;
  /** Density. */
  variant?: DocumentRowVariant;
  /** Tap handler (open / preview the document). */
  onPress?: () => void;
  /** Optional download affordance. */
  onDownload?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * One document in a matter's file: kind glyph, title, and a status pill (glyph +
 * word so state never rests on color alone), plus optional version / size /
 * modified metadata. `compact` collapses the metadata line. An optional
 * `onDownload` renders a trailing action. All colors are theme tokens — no
 * literals.
 */
export function DocumentRow({
  title,
  kind = 'other',
  status,
  modified,
  version,
  size,
  author,
  variant = 'default',
  onPress,
  onDownload,
  testID,
  style,
}: DocumentRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const kindMeta = DOCUMENT_KIND_META[kind];

  const meta = [version, size, modified ? `Modified ${modified}` : undefined, author]
    .filter((s): s is string => Boolean(s))
    .join(' · ');

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <Text accessibilityElementsHidden importantForAccessibility="no" style={{ fontSize: tokens.typography.scale.lg }}>
        {kindMeta.glyph}
      </Text>
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {title}
        </Text>
        {!compact && meta ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {meta}
          </Text>
        ) : null}
      </View>
      {status ? <StatusPill meta={DOCUMENT_STATUS_META[status]} variant="inline" size="sm" /> : null}
      {onDownload ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Download ${title}`}
          onPress={onDownload}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, paddingHorizontal: tokens.spacing.xs })}
        >
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base }}>⤓</Text>
        </Pressable>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Document ${title}`} onPress={onPress} testID={testID}>
        {content}
      </Pressable>
    );
  }
  return <View testID={testID}>{content}</View>;
}
