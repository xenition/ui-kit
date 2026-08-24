import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Badge, Button } from '../primitives';

export type AdoptionStatus = 'available' | 'pending' | 'adopted' | 'fostered';

const STATUS_META: Record<AdoptionStatus, { label: string; tone: 'success' | 'warn' | 'neutral' | 'accent'; slot: keyof SemanticColors }> = {
  available: { label: 'Available', tone: 'success', slot: 'success' },
  pending: { label: 'Pending', tone: 'warn', slot: 'warn' },
  adopted: { label: 'Adopted', tone: 'neutral', slot: 'muted' },
  fostered: { label: 'In foster', tone: 'accent', slot: 'accent' },
};

export interface AdoptionCardProps {
  /** Pet's name. */
  name: string;
  /** Species / breed line, e.g. "Tabby cat". */
  breed?: string;
  /** Age label, e.g. "2 yrs". */
  age?: string;
  /** Sex label. */
  sex?: string;
  /** Shelter / rescue name. */
  shelter?: string;
  /** Photo URL for the banner; a glyph placeholder shows otherwise. */
  photoUrl?: string;
  /** Placeholder glyph when there's no photo. */
  glyph?: string;
  /** Adoption fee label, e.g. "$120". */
  fee?: string;
  /** Availability status; drives the chip. */
  status: AdoptionStatus;
  /** Whether the viewer has favorited this listing. */
  favorited?: boolean;
  /** Apply/adopt action label; hidden once adopted or no `onApply`. */
  applyLabel?: string;
  onApply?: () => void;
  onFavorite?: () => void;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * An adoption listing card: photo banner (or emoji placeholder), name + breed,
 * age/sex meta, shelter, a status chip, an optional fee, and adopt + favorite
 * actions. Whole card is pressable when `onPress` is set. Availability reads via
 * a labelled chip (not color alone). Token-only colors; a `View` placeholder
 * stands in for the pet photo.
 */
export function AdoptionCard({
  name,
  breed,
  age,
  sex,
  shelter,
  photoUrl,
  glyph = '🐾',
  fee,
  status,
  favorited = false,
  applyLabel = 'Apply to adopt',
  onApply,
  onFavorite,
  onPress,
  style,
}: AdoptionCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const statusMeta = STATUS_META[status];
  const meta = [age, sex, breed].filter(Boolean).join(' · ');
  const showApply = onApply != null && status !== 'adopted';

  const inner = (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{ height: 120, backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center' }}
      >
        {!photoUrl ? (
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['3xl'] }}>
            {glyph}
          </Text>
        ) : null}
        <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
          <Badge tone={statusMeta.tone} variant="solid" size="sm">
            {statusMeta.label}
          </Badge>
        </View>
        {onFavorite ? (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: favorited }}
            accessibilityLabel={favorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
            onPress={onFavorite}
            style={{
              position: 'absolute',
              top: tokens.spacing.sm,
              right: tokens.spacing.sm,
              width: 32,
              height: 32,
              borderRadius: tokens.radius.full,
              backgroundColor: colors.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text allowFontScaling={false} style={{ color: favorited ? colors.danger : colors.muted, fontSize: tokens.typography.scale.base }}>
              {favorited ? '♥' : '♡'}
            </Text>
          </Pressable>
        ) : null}
      </View>

      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.sm }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {name}
        </Text>
        {meta ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {meta}
          </Text>
        ) : null}
        {shelter ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            📍 {shelter}
          </Text>
        ) : null}

        {fee || showApply ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
            {fee ? (
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{fee}</Text>
            ) : (
              <View />
            )}
            {showApply ? (
              <Button variant="primary" size="sm" onPress={onApply}>
                {applyLabel}
              </Button>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );

  const a11y = `${name}${meta ? `, ${meta}` : ''}, ${statusMeta.label}`;
  if (!onPress) {
    return <View accessibilityLabel={a11y}>{inner}</View>;
  }
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}>
      {inner}
    </Pressable>
  );
}
