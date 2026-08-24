import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Button, Card, Icon } from '../primitives';

export type FeatureLockVariant = 'card' | 'inline';

export interface FeatureLockCardProps {
  /** Name of the gated capability (e.g. `'Unlimited exports'`). */
  title: string;
  /** One-line description of what unlocking delivers. */
  description?: string;
  /** Lock glyph. Default `'🔒'`. */
  icon?: string;
  /** Ribbon copy on the medallion. Default `'Pro'`. */
  planLabel?: string;
  /** Unlock CTA copy. Default `'Unlock'` — override with the outcome. */
  unlockLabel?: string;
  /** Fires on the unlock CTA. */
  onUnlock?: () => void;
  /** `'inline'` renders a compact borderless row. Default `'card'`. */
  variant?: FeatureLockVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * Locked-feature teaser — shown where a free user hits a gated capability. It
 * names the feature, says what unlocking gets them and offers the upgrade CTA,
 * turning a dead end into a value pitch (paywall-after-value, design.md §27-28).
 * The `inline` variant collapses to a compact row for list contexts. Colors are
 * token-bound via the {@link Card}/{@link Badge} primitives. No literal colors.
 */
export function FeatureLockCard({
  title,
  description,
  icon = '🔒',
  planLabel = 'Pro',
  unlockLabel = 'Unlock',
  onUnlock,
  variant = 'card',
  style,
}: FeatureLockCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const body = (
    <>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.border,
        }}
      >
        <Icon glyph={icon} size="lg" color="muted" accessibilityLabel="Locked" />
      </View>
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {title}
          </Text>
          <Badge tone="primary">{planLabel}</Badge>
        </View>
        {description ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{description}</Text>
        ) : null}
      </View>
    </>
  );

  if (variant === 'inline') {
    return (
      <View
        accessibilityRole="summary"
        style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, style]}
      >
        {body}
        <Button variant="secondary" size="sm" onPress={onUnlock} accessibilityLabel={unlockLabel}>
          {unlockLabel}
        </Button>
      </View>
    );
  }

  return (
    <Card style={[{ gap: tokens.spacing.md }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>{body}</View>
      <Button variant="primary" size="md" onPress={onUnlock} accessibilityLabel={unlockLabel} style={{ alignSelf: 'stretch' }}>
        {unlockLabel}
      </Button>
    </Card>
  );
}
