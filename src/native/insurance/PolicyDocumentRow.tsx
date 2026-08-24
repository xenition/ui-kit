import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Button } from '../primitives';
import { withAlpha } from './internal/format';

/** Document kind — drives the leading glyph. */
export type DocumentKind = 'policy' | 'declaration' | 'id-card' | 'invoice' | 'letter';

const KIND_GLYPH: Record<DocumentKind, string> = {
  policy: '📄',
  declaration: '📋',
  'id-card': '🪪',
  invoice: '🧾',
  letter: '✉️',
};

export interface PolicyDocumentRowProps {
  /** Document title (e.g. "Auto policy declarations"). */
  title: string;
  /** Document kind (default `policy`). */
  kind?: DocumentKind;
  /** Human-readable size (e.g. "1.2 MB"), already formatted by the caller. */
  size?: string;
  /** Localized date string (already formatted by the caller). */
  date?: string;
  /** Download button label (default "Download"). Hidden when no `onDownload`. */
  downloadLabel?: string;
  /** Fires when the row is pressed (open/preview). */
  onPress?: () => void;
  /** Fires when the download action is pressed. */
  onDownload?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * One document in a policy's document list: a tinted kind glyph, a title with a
 * kind · size · date meta line, and an optional download action. The row opens
 * on press when `onPress` is supplied; the download `Button` is only shown when
 * `onDownload` is supplied. Token-bound throughout — no literal colors.
 */
export function PolicyDocumentRow({
  title,
  kind = 'policy',
  size,
  date,
  downloadLabel = 'Download',
  onPress,
  onDownload,
  style,
}: PolicyDocumentRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.policy;

  const meta = [kind.replace('-', ' '), size, date].filter((v) => v != null && v !== '').join(' · ');

  const row = (
    <View
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm },
        style,
      ]}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors.primary, 0.12),
        }}
      >
        <Icon glyph={glyph} accessibilityLabel={`${kind} document`} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {title}
        </Text>
        {meta !== '' ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {meta}
          </Text>
        ) : null}
      </View>
      {onDownload != null ? (
        <Button variant="soft" size="sm" onPress={onDownload}>
          {downloadLabel}
        </Button>
      ) : null}
    </View>
  );

  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title} document`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {row}
    </Pressable>
  );
}
