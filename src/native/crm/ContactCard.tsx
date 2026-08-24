import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Avatar, Tag, Button } from '../primitives';

export type ContactCardVariant = 'default' | 'compact';

export interface ContactAction {
  key: string;
  /** Glyph shown on the pill (e.g. `📞`, `✉`). */
  glyph: string;
  /** Accessible label (e.g. "Call"). */
  label: string;
  onPress: () => void;
}

export interface ContactCardProps {
  /** Full name. */
  name: string;
  /** Job title / role. */
  title?: string;
  /** Company / account. */
  company?: string;
  /** Avatar image URL; initials of `name` are the fallback. */
  avatarUrl?: string;
  /** Free-form labels (segments, interests). */
  tags?: string[];
  /** Quick-action pills (call / email / …). */
  actions?: ContactAction[];
  variant?: ContactCardVariant;
  /** Skeleton placeholder while data loads. */
  loading?: boolean;
  /** Tap handler for the card body. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Profile card for a CRM contact: avatar, name, title, company, tag chips and a
 * row of quick-action pills (call / email / etc — caller-supplied glyph +
 * handler). `compact` hides tags and actions for list rows. Guards an empty
 * `tags`/`actions` array (renders nothing) and offers a `loading` skeleton.
 * All colors are theme tokens.
 */
export function ContactCard({
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
}: ContactCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const hasTags = !compact && Array.isArray(tags) && tags.length > 0;
  const hasActions = !compact && Array.isArray(actions) && actions.length > 0;

  const body = (
    <Card padding={compact ? 'sm' : 'md'} style={[{ gap: tokens.spacing.sm }, style]}>
      {loading ? (
        <View accessibilityLabel="Loading contact" style={{ flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'center' }}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.border }} />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <View style={{ height: tokens.typography.scale.base, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
            <View style={{ height: tokens.typography.scale.sm, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          </View>
        </View>
      ) : (
        <>
          <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'center' }}>
            <Avatar size={compact ? 'sm' : 'md'} name={name} src={avatarUrl} />
            <View style={{ flex: 1, gap: 1 }}>
              <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
                {name}
              </Text>
              {title || company ? (
                <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                  {[title, company].filter(Boolean).join(' · ')}
                </Text>
              ) : null}
            </View>
          </View>

          {hasTags ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
              {tags!.map((t, i) => (
                <Tag key={`${t}-${i}`} tone="neutral" variant="soft" size="sm">
                  {t}
                </Tag>
              ))}
            </View>
          ) : null}

          {hasActions ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
              {actions!.map((a) => (
                <Button
                  key={a.key}
                  variant="soft"
                  size="sm"
                  onPress={a.onPress}
                  accessibilityLabel={a.label}
                >
                  {`${a.glyph} ${a.label}`}
                </Button>
              ))}
            </View>
          ) : null}
        </>
      )}
    </Card>
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
