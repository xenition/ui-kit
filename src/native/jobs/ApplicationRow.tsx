import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives';
import type { Application } from './types';
import { StatusPipeline } from './StatusPipeline';
import { formatRelative } from './format';

export interface ApplicationRowProps {
  /** The application to render. */
  application: Application;
  /** Fired when the row is pressed (open application detail). */
  onPress?: (application: Application) => void;
  /** Trailing accessory (e.g. a chevron or action button). */
  accessory?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single row in the "my applications" list: company avatar, job title,
 * applied age, and a compact {@link StatusPipeline} showing where it sits in the
 * funnel (with rejection called out as text). Data + `onPress` only; tokens only.
 */
export function ApplicationRow({
  application,
  onPress,
  accessory,
  style,
}: ApplicationRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const applied = formatRelative(application.appliedAt);

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${application.jobTitle} at ${application.companyName}`}
      disabled={!onPress}
      onPress={onPress ? () => onPress(application) : undefined}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
        },
        pressed && onPress ? { opacity: 0.9 } : null,
        style,
      ]}
    >
      <Avatar name={application.companyName} size="sm" />
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          <Text
            numberOfLines={1}
            style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
          >
            {application.jobTitle}
          </Text>
          {applied ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{applied}</Text>
          ) : null}
        </View>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {application.companyName}
        </Text>
        <StatusPipeline stage={application.stage} rejected={application.rejected} variant="compact" />
      </View>
      {accessory ? <View>{accessory}</View> : null}
    </Pressable>
  );
}
