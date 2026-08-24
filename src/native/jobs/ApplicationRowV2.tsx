import * as React from 'react';
import { Animated, Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives';
import { appearanceStyle } from '../primitives/internal/appearance';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import { StatusPipelineV2 } from './StatusPipelineV2';
import { formatRelative } from './format';
import type { ApplicationRowProps } from './ApplicationRow';

/** Drop-in alternate: identical props to {@link ApplicationRowProps}. */
export type ApplicationRowV2Props = ApplicationRowProps;

/**
 * ApplicationRow — design V2. An elevated card that gives the application room:
 * a header of company avatar + job title + applied age, then the full
 * {@link StatusPipelineV2} funnel (big numbered steps with connectors) laid out
 * horizontally. Same props as {@link ApplicationRowProps} (drop-in). Token-pure,
 * mount enter + press spring via the shared motion hooks.
 */
export function ApplicationRowV2({
  application,
  onPress,
  accessory,
  style,
}: ApplicationRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();
  const applied = formatRelative(application.appliedAt);

  const surface: ViewStyle = {
    ...appearanceStyle('elevated', colors, tokens),
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
  };

  return (
    <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
      <Pressable
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityLabel={`${application.jobTitle} at ${application.companyName}`}
        disabled={!onPress}
        onPress={onPress ? () => onPress(application) : undefined}
        onPressIn={onPress ? press.onPressIn : undefined}
        onPressOut={onPress ? press.onPressOut : undefined}
        style={({ pressed }) => [surface, pressed && onPress ? { opacity: 0.95 } : null, style]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <Avatar name={application.companyName} size="md" shape="rounded" />
          <View style={{ flex: 1, gap: 2 }}>
            <Text
              numberOfLines={1}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
            >
              {application.jobTitle}
            </Text>
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {application.companyName}
              {applied ? ` · ${applied}` : ''}
            </Text>
          </View>
          {accessory ? <View>{accessory}</View> : null}
        </View>

        <StatusPipelineV2 stage={application.stage} rejected={application.rejected} />
      </Pressable>
    </Animated.View>
  );
}
