import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Icon } from '../primitives';
import { appearanceStyle } from '../primitives/internal/appearance';
import { PresenceDot } from './PresenceDot';
import type { ChatHeaderProps } from './ChatHeader';

/** Drop-in alternate design for {@link ChatHeader} — identical props. */
export type ChatHeaderV3Props = ChatHeaderProps;

/**
 * ChatHeader — **compact centered** variant. A slim iOS-style bar: back button
 * pinned far-left, trailing actions pinned far-right, and a small `xs` avatar
 * stacked above a centered title + subtitle in the middle. Minimal height, no
 * large avatar — the counterpart to the roomy v2 header. Same props as
 * `ChatHeader`. No literal colors.
 */
export function ChatHeaderV3({
  title,
  subtitle,
  avatarUri,
  presence,
  typing = false,
  onBack,
  onPressTitle,
  actions,
  appearance = 'classic',
  style,
}: ChatHeaderV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      accessibilityRole="header"
      style={[
        appearance === 'classic' ? null : appearanceStyle(appearance, colors, tokens),
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: appearance === 'classic' ? colors.surface : undefined,
        },
        style,
      ]}
    >
      {/* Left cluster (fixed width so the center title stays optically centered). */}
      <View style={{ width: 64, flexDirection: 'row', alignItems: 'center' }}>
        {onBack ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={onBack} hitSlop={8}>
            <Icon glyph="‹" color="primary" size="2xl" />
          </Pressable>
        ) : null}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPressTitle}
        disabled={!onPressTitle}
        style={{ flex: 1, alignItems: 'center', gap: 2 }}
      >
        <View>
          <Avatar size="xs" src={avatarUri} name={title} />
          {presence ? (
            <View style={{ position: 'absolute', bottom: -2, right: -2 }}>
              <PresenceDot status={presence} size={7} />
            </View>
          ) : null}
        </View>
        <Text
          numberOfLines={1}
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '700',
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
        {typing ? (
          <Text
            accessibilityLiveRegion="polite"
            numberOfLines={1}
            style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}
          >
            typing…
          </Text>
        ) : subtitle ? (
          <Text
            numberOfLines={1}
            style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}
          >
            {subtitle}
          </Text>
        ) : null}
      </Pressable>

      {/* Right cluster (mirrors the left width to keep the title centered). */}
      <View
        style={{
          width: 64,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: tokens.spacing.xs,
        }}
      >
        {actions?.map((action) => (
          <Pressable
            key={action.id}
            accessibilityRole="button"
            accessibilityLabel={action.label}
            onPress={action.onPress}
            hitSlop={8}
            style={{ padding: tokens.spacing.xs }}
          >
            <Icon glyph={action.glyph} color="primary" size="lg" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
