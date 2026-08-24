import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Icon } from '../primitives';
import { appearanceStyle } from '../primitives/internal/appearance';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { PresenceDot } from './PresenceDot';
import type { ChatHeaderProps } from './ChatHeader';

/** Drop-in alternate design for {@link ChatHeader} — identical props. */
export type ChatHeaderV2Props = ChatHeaderProps;

/**
 * ChatHeader — **prominent** variant. A taller bar with a large `lg` avatar, a
 * big `2xl` title, and the presence/subtitle as a colored status line
 * (success-tinted when online). Trailing actions render as filled circular
 * buttons in a primary-tinted well — the call/video affordance reads as a real
 * button, not a bare glyph. Elevated with a drop shadow instead of a divider.
 * Same props as `ChatHeader`. No literal colors.
 */
export function ChatHeaderV2({
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
}: ChatHeaderV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const online = presence === 'online';

  return (
    <View
      accessibilityRole="header"
      style={[
        appearance === 'classic'
          ? { backgroundColor: colors.surface, ...shadow('md', tokens) }
          : appearanceStyle(appearance, colors, tokens),
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.md,
        },
        style,
      ]}
    >
      {onBack ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={onBack} hitSlop={8}>
          <Icon glyph="‹" color="primary" size="3xl" />
        </Pressable>
      ) : null}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPressTitle}
        disabled={!onPressTitle}
        style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}
      >
        <View>
          <Avatar size="lg" src={avatarUri} name={title} ring={online} status={presence} />
          {presence ? (
            <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <PresenceDot status={presence} size={12} />
            </View>
          ) : null}
        </View>
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale['2xl'],
              fontWeight: '800',
            }}
          >
            {title}
          </Text>
          {typing ? (
            <Text
              accessibilityLiveRegion="polite"
              numberOfLines={1}
              style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
            >
              typing…
            </Text>
          ) : subtitle ? (
            <Text
              numberOfLines={1}
              style={{
                color: online ? colors.successText : colors.muted,
                fontSize: tokens.typography.scale.sm,
                fontWeight: online ? '600' : '400',
              }}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      </Pressable>

      {actions?.map((action) => (
        <Pressable
          key={action.id}
          accessibilityRole="button"
          accessibilityLabel={action.label}
          onPress={action.onPress}
          hitSlop={8}
          style={({ pressed }) => ({
            width: 42,
            height: 42,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.primary, pressed ? 0.22 : 0.12),
          })}
        >
          <Icon glyph={action.glyph} color="primary" />
        </Pressable>
      ))}
    </View>
  );
}
