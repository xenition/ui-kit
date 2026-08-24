import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatRelative } from './format';
import { APPLICATION_STAGES, STAGE_LABEL } from './types';
import type { ApplicationRowProps } from './ApplicationRow';

/** Drop-in alternate: identical props to {@link ApplicationRowProps}. */
export type ApplicationRowV3Props = ApplicationRowProps;

/**
 * ApplicationRow — design V3. A dense single line: a colored status dot, the
 * job title, then the stage word and applied age trailing. The stage is carried
 * by the WORD (and a ✕ glyph on rejection), never the dot color alone, and the
 * full context lives in the accessible label. Same props as
 * {@link ApplicationRowProps} (drop-in). Token-pure.
 */
export function ApplicationRowV3({
  application,
  onPress,
  accessory,
  style,
}: ApplicationRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const applied = formatRelative(application.appliedAt);

  // Guarded indexing: an unknown stage still resolves to a real label.
  const idx = Math.max(0, APPLICATION_STAGES.indexOf(application.stage));
  const label = STAGE_LABEL[application.stage] ?? STAGE_LABEL[APPLICATION_STAGES[0]!];
  const rejected = !!application.rejected;
  const hired = application.stage === 'hired';

  const dotColor = rejected ? colors.danger : hired ? colors.success : colors.primary;
  const stageColor = rejected ? colors.dangerText : hired ? colors.successText : colors.primaryText;
  const stageWord = rejected ? `✕ ${label}` : hired ? `✓ ${label}` : label;
  const summary = rejected
    ? `${application.jobTitle} at ${application.companyName}, rejected at ${label}, stage ${idx + 1} of ${APPLICATION_STAGES.length}`
    : `${application.jobTitle} at ${application.companyName}, ${label}, stage ${idx + 1} of ${APPLICATION_STAGES.length}`;

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={summary}
      disabled={!onPress}
      onPress={onPress ? () => onPress(application) : undefined}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        },
        pressed && onPress ? { opacity: 0.9 } : null,
        style,
      ]}
    >
      <View style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: dotColor }} />
      <Text
        numberOfLines={1}
        style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
      >
        {application.jobTitle}
      </Text>
      <Text numberOfLines={1} style={{ color: stageColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
        {stageWord}
      </Text>
      {applied ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{applied}</Text>
      ) : null}
      {accessory ? <View>{accessory}</View> : null}
    </Pressable>
  );
}
