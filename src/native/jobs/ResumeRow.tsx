import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Button } from '../primitives';
import type { Resume } from './types';
import { formatRelative } from './format';

export interface ResumeRowProps {
  /** The résumé file to render. */
  resume: Resume;
  /** Fired when the row is pressed (preview / open). */
  onPress?: (resume: Resume) => void;
  /** Fired when the download affordance is pressed. */
  onDownload?: (resume: Resume) => void;
  /** Fired to make this the default résumé (hidden when already default). */
  onSetDefault?: (resume: Resume) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A row in the résumé / documents list: a file glyph, the file name, an
 * updated-age + size line, a "Default" badge, and optional download / set-default
 * actions. Data + callbacks only; tokens only.
 */
export function ResumeRow({
  resume,
  onPress,
  onDownload,
  onSetDefault,
  style,
}: ResumeRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = [formatRelative(resume.updatedAt), resume.sizeLabel].filter(Boolean).join(' · ');

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${resume.name}${resume.isDefault ? ', default résumé' : ''}`}
      disabled={!onPress}
      onPress={onPress ? () => onPress(resume) : undefined}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.md,
        },
        pressed && onPress ? { opacity: 0.9 } : null,
        style,
      ]}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: tokens.radius.sm,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.border,
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
          📄
        </Text>
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text
            numberOfLines={1}
            style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
          >
            {resume.name}
          </Text>
          {resume.isDefault ? <Badge tone="success">Default</Badge> : null}
        </View>
        {meta ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{meta}</Text>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        {!resume.isDefault && onSetDefault ? (
          <Button
            variant="ghost"
            size="sm"
            onPress={() => onSetDefault(resume)}
            accessibilityLabel={`Set ${resume.name} as default`}
          >
            Set default
          </Button>
        ) : null}
        {onDownload ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Download ${resume.name}`}
            onPress={() => onDownload(resume)}
            hitSlop={8}
          >
            <Text style={{ fontSize: tokens.typography.scale.lg, color: colors.primary }}>⬇</Text>
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
}
