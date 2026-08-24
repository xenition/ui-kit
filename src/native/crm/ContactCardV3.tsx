import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives';
import type { ContactCardProps } from './ContactCard';

/** V3 accepts the exact same props as {@link ContactCard} — a drop-in replacement. */
export type ContactCardV3Props = ContactCardProps;

/**
 * ContactCard **design V3** — a *compact directory row*: small avatar, name with
 * title·company beneath, and (when present) the first tag as a trailing muted
 * chip. No card surface, no action pills — the densest possible list item for an
 * A–Z contacts index. Same props as {@link ContactCard}; a `loading` skeleton is
 * supported. Token-pure.
 */
export function ContactCardV3({
  name,
  title,
  company,
  avatarUrl,
  tags,
  loading = false,
  onPress,
  testID,
  style,
}: ContactCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const trailingTag = Array.isArray(tags) && tags.length > 0 ? tags[0] : undefined;

  const row: React.ReactElement = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {loading ? (
        <View accessibilityLabel="Loading contact" style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.border }} />
          <View style={{ flex: 1, gap: tokens.spacing.xs / 2 }}>
            <View style={{ height: tokens.typography.scale.sm, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
            <View style={{ height: tokens.typography.scale.xs, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          </View>
        </View>
      ) : (
        <>
          <Avatar size="sm" name={name} src={avatarUrl} />
          <View style={{ flex: 1, gap: 1 }}>
            <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {name}
            </Text>
            {title || company ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {[title, company].filter(Boolean).join(' · ')}
              </Text>
            ) : null}
          </View>
          {trailingTag ? (
            <View
              style={{
                paddingHorizontal: tokens.spacing.xs,
                paddingVertical: 2,
                borderRadius: tokens.radius.full,
                backgroundColor: colors.border,
              }}
            >
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {trailingTag}
              </Text>
            </View>
          ) : null}
        </>
      )}
    </View>
  );

  if (onPress && !loading) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Contact ${name}`} onPress={onPress} testID={testID}>
        {row}
      </Pressable>
    );
  }
  return <View testID={testID}>{row}</View>;
}
