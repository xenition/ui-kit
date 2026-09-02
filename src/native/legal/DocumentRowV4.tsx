import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { StatusPill } from './StatusPill';
import { DOCUMENT_KIND_META, DOCUMENT_STATUS_META } from './internal';
import type { DocumentRowProps } from './DocumentRow';

/** Drop-in for {@link DocumentRowProps} — same props, the V4 "chambers" design. */
export type DocumentRowV4Props = DocumentRowProps;

/**
 * DocumentRow — **V4** "chambers" design (native twin of the web V4). An elevated
 * rounded row with a soft shadow, the kind glyph in a soft-primary well, the
 * title, a version · size · modified meta line, a labelled glyph + word status
 * pill (never color alone), and an optional trailing download control. `compact`
 * collapses the metadata line. Tappable when `onPress` is set. Reuses the base
 * `variant` (`default` / `compact`). Token-only colors via `useXenitionTheme()`.
 */
export function DocumentRowV4({
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
}: DocumentRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const kindMeta = DOCUMENT_KIND_META[kind];
  const meta = [version, size, modified ? `Modified ${modified}` : undefined, author].filter((s): s is string => Boolean(s)).join(' · ');
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    minHeight: compact ? 44 : 56,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const content = (
    <>
      <View style={{ width: 40, height: 40, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: withAlpha(colors.primary, 0.1) }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>{kindMeta.glyph}</Text>
      </View>
      <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{title}</Text>
        {!compact && meta ? <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{meta}</Text> : null}
      </View>
      {status ? <StatusPill meta={DOCUMENT_STATUS_META[status]} variant="soft" size="sm" /> : null}
      {onDownload ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Download ${title}`}
          onPress={onDownload}
          hitSlop={8}
          style={({ pressed }) => ({ width: 32, height: 32, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: withAlpha(colors.primary, 0.1), opacity: pressed ? 0.7 : 1 })}
        >
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base }}>⤓</Text>
        </Pressable>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Document ${title}`} onPress={onPress} testID={testID} style={({ pressed }) => [shell, { opacity: pressed ? 0.8 : 1 }, style]}>
        {content}
      </Pressable>
    );
  }
  return <View testID={testID} style={[shell, style]}>{content}</View>;
}
