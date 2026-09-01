import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Eyebrow } from '../primitives/Eyebrow';
import { withAlpha } from '../primitives/internal/color';
import type { FeatureSplitProps } from './FeatureSplit';

/** Drop-in for {@link FeatureSplitProps} — same props, the V4 "showcase" design. */
export type FeatureSplitV4Props = FeatureSplitProps;

/**
 * FeatureSplit — **V4** "showcase" design (native mirror of the web V4). A
 * content section, so NOT a gradient surface: bold copy beside a media slot.
 * Mirrors the web V4; native always stacks vertically (phones are narrow), with
 * media on top by default and `reverse` flipping it below the copy. Honors every
 * base prop (`eyebrow`/`title`/`description`/`bullets`/`media`/`reverse`/
 * `action`); when no `media` is supplied a token-styled 16:9 placeholder is
 * rendered. Same props/behavior as {@link FeatureSplitProps}. Token-only.
 */
export function FeatureSplitV4({
  eyebrow,
  title,
  description,
  bullets,
  media,
  reverse = false,
  action,
  style,
}: FeatureSplitV4Props): React.ReactElement {
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
          borderWidth: 1,
          borderColor: colors.border,
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
            fontWeight: '800',
            letterSpacing: -0.5,
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
              <View
                accessibilityElementsHidden
                importantForAccessibility="no"
                style={{
                  height: 20,
                  width: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: tokens.radius.full,
                  backgroundColor: withAlpha(colors.primary, 0.1),
                }}
              >
                <Text style={{ color: colors.primary, fontWeight: '800', fontSize: tokens.typography.scale.xs }}>✓</Text>
              </View>
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
