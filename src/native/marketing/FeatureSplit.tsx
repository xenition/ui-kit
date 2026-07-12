import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Eyebrow } from '../primitives/Eyebrow';

export interface FeatureSplitProps {
  /** Small kicker above the title. */
  eyebrow?: React.ReactNode;
  /** Feature headline. */
  title: React.ReactNode;
  /** Supporting copy under the title. */
  description?: React.ReactNode;
  /** Check-marked selling points. */
  bullets?: string[];
  /** Visual slot; omit for a token-styled placeholder. */
  media?: React.ReactNode;
  /** Flip the stack order — media below the copy instead of above. */
  reverse?: boolean;
  /** Call-to-action slot under the copy — rendered as-is. */
  action?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Media-beside-copy feature row — the native mirror of the web `FeatureSplit`.
 * The web version is a two-column grid on desktop; **native always stacks
 * vertically** (phones are narrow), with media on top by default and `reverse`
 * flipping it below the copy. When no `media` is supplied the web seeds a
 * `GenerativeCover`; native renders a token-styled 16:9 placeholder instead
 * (no generative canvas on native). Token-only.
 */
export function FeatureSplit({
  eyebrow,
  title,
  description,
  bullets,
  media,
  reverse = false,
  action,
  style,
}: FeatureSplitProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const mediaNode =
    media !== undefined ? (
      media
    ) : (
      <View
        style={{
          aspectRatio: 16 / 9,
          width: '100%',
          borderRadius: tokens.radius.lg,
          backgroundColor: tokens.ramps.neutral[100],
        }}
      />
    );

  const mediaBlock = (
    <View key="media" style={{ width: '100%' }}>
      {mediaNode}
    </View>
  );

  const copyBlock = (
    <View key="copy" style={{ gap: tokens.spacing.sm }}>
      {eyebrow !== undefined && eyebrow !== null ? (
        typeof eyebrow === 'string' ? (
          <Eyebrow tone="accent" align="start">
            {eyebrow}
          </Eyebrow>
        ) : (
          eyebrow
        )
      ) : null}

      {typeof title === 'string' ? (
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale['3xl'],
            fontWeight: '700',
          }}
        >
          {title}
        </Text>
      ) : (
        title
      )}

      {description !== undefined && description !== null ? (
        typeof description === 'string' ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.lg }}>
            {description}
          </Text>
        ) : (
          description
        )
      ) : null}

      {bullets && bullets.length > 0 ? (
        <View style={{ gap: tokens.spacing.xs }}>
          {bullets.map((bullet, i) => (
            <View
              key={i}
              style={{ flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'flex-start' }}
            >
              <Text style={{ color: colors.primary, fontWeight: '700' }}>✓</Text>
              <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base }}>
                {bullet}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {action !== undefined && action !== null ? (
        <View
          style={{
            marginTop: tokens.spacing.sm,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: tokens.spacing.sm,
          }}
        >
          {action}
        </View>
      ) : null}
    </View>
  );

  return (
    <View testID="xen-feature-split" style={[{ gap: tokens.spacing.xl }, style]}>
      {reverse ? [copyBlock, mediaBlock] : [mediaBlock, copyBlock]}
    </View>
  );
}
