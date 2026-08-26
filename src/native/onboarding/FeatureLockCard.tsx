import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Button, Card, Icon, Text } from '../primitives';

/* §10.1 geometry: the badge is the module's 44 circle, same as a §8 feature row. */
const BADGE = 44;

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
 *
 * Drawn as a single §8 row so a teaser encountered mid-app reads as the same
 * object as the rows on the paywall it leads to: the 44 circular badge on a
 * `primary[50]` ground with the glyph in `colors.primary`, a semibold title and
 * a muted description. It used to sit on a grey `border` ground, which read as
 * "disabled" rather than "worth buying".
 *
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
  const { scheme, tokens } = useXenitionTheme();
  // The native ramps keep their light orientation in both schemes — see the
  // note in `PaywallScreen`'s `PaywallFeatureRows`.
  const badgeGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];

  const body = (
    <>
      <View
        style={{
          width: BADGE,
          height: BADGE,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: badgeGround,
        }}
      >
        <Icon glyph={icon} size="lg" color="primary" accessibilityLabel="Locked" />
      </View>
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text size="base" weight="semibold" style={{ flexShrink: 1 }}>
            {title}
          </Text>
          <Badge tone="primary" size="sm">
            {planLabel}
          </Badge>
        </View>
        {description ? (
          <Text size="sm" tone="muted">
            {description}
          </Text>
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
