import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Tag, Button } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import type { ContactCardProps } from './ContactCard';

/** V2 accepts the exact same props as {@link ContactCard} — a drop-in replacement. */
export type ContactCardV2Props = ContactCardProps;

/**
 * ContactCard **design V2** — a *centered profile card*. Where the original is a
 * left-aligned avatar row, V2 stacks a large centered avatar, name and
 * title·company, a centered wrap of tag chips, and a full-width row of quick
 * actions across the footer — a proper contact "hero". Elevated on a token
 * shadow. Same props as {@link ContactCard}; empty tag/action arrays render
 * nothing; `loading` shows a skeleton. Token-pure.
 */
export function ContactCardV2({
  name,
  title,
  company,
  avatarUrl,
  tags,
  actions,
  variant = 'default',
  loading = false,
  onPress,
  testID,
  style,
}: ContactCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 6 });
  const compact = variant === 'compact';
  const hasTags = !compact && Array.isArray(tags) && tags.length > 0;
  const hasActions = !compact && Array.isArray(actions) && actions.length > 0;

  const body: React.ReactElement = (
    <Animated.View
      style={[
        {
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          padding: compact ? tokens.spacing.md : tokens.spacing.lg,
          gap: tokens.spacing.md,
          alignItems: 'center',
          opacity: enter.opacity,
        },
        shadow('md', tokens),
        style,
      ]}
    >
      {loading ? (
        <View accessibilityLabel="Loading contact" style={{ alignItems: 'center', gap: tokens.spacing.sm, alignSelf: 'stretch' }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: colors.border }} />
          <View style={{ height: tokens.typography.scale.base, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: tokens.typography.scale.sm, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        </View>
      ) : (
        <>
          <Avatar size={compact ? 'md' : 'xl'} name={name} src={avatarUrl} />
          <View style={{ alignItems: 'center', gap: 2 }}>
            <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
              {name}
            </Text>
            {title || company ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                {[title, company].filter(Boolean).join(' · ')}
              </Text>
            ) : null}
          </View>

          {hasTags ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: tokens.spacing.xs }}>
              {tags!.map((t, i) => (
                <Tag key={`${t}-${i}`} tone="neutral" variant="soft" size="sm">
                  {t}
                </Tag>
              ))}
            </View>
          ) : null}

          {hasActions ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: tokens.spacing.sm, alignSelf: 'stretch' }}>
              {actions!.map((a) => (
                <View key={a.key} style={{ flexGrow: 1, flexBasis: 0, minWidth: 96 }}>
                  <Button variant="soft" size="sm" onPress={a.onPress} accessibilityLabel={a.label} style={{ alignSelf: 'stretch' }}>
                    {`${a.glyph} ${a.label}`}
                  </Button>
                </View>
              ))}
            </View>
          ) : null}
        </>
      )}
    </Animated.View>
  );

  if (onPress && !loading) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Contact ${name}`} onPress={onPress} testID={testID}>
        {body}
      </Pressable>
    );
  }
  return <View testID={testID}>{body}</View>;
}
